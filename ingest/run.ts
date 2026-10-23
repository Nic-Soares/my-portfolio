// One ingestion run (ADR-007): list the repositories, re-read only the ones
// whose .portfolio/ changed, validate, publish images, and publish a new
// catalog version only when something changed. A broken project keeps its
// last good version; the others still update.
import {
  buildCatalog,
  type Catalog,
  imagePaths,
  LOCALES,
  type Locale,
  type SourceProject,
} from "../shared/catalog.ts";
import {
  type ProjectContent,
  type ProjectData,
  projectContent,
  projectManifest,
  type ResponsiveImage,
} from "../shared/project.ts";
import { type Cleanup, cleanUp } from "./cleanup.ts";
import { publishImage } from "./images.ts";
import type { ObjectStore, RepoSnapshot, RepoSource } from "./types.ts";

const CURRENT = "catalog/current.json";
// Bump when what ingestion writes changes (paths, image variants…), so the
// next run re-reads every repository instead of carrying old output over.
// 2: media under media/<slug>/
export const INGEST_FORMAT = 2;
const NO_CACHE = "no-cache";

export interface IngestReport {
  published: string[];
  unchanged: string[];
  // repo → why it was rejected (its last good version stays)
  rejected: Record<string, string[]>;
  fallbacks: Record<string, Locale[]>;
  // The catalog version now current, and whether this run wrote it
  version: string;
  wrote: boolean;
  // Old catalog versions and unused media deleted after writing
  cleaned: Cleanup;
}

export interface IngestOptions {
  repos: RepoSource;
  store: ObjectStore;
  // URL prefix the site serves media/ from
  mediaBase: string;
  now?: () => Date;
}

const decoder = new TextDecoder();
const json = (bytes: Uint8Array) => JSON.parse(decoder.decode(bytes));

export async function loadCurrentCatalog(
  store: ObjectStore,
): Promise<Catalog | null> {
  const pointer = await store.get(CURRENT);
  if (!pointer) return null;
  const { version } = json(pointer) as { version: string };
  const catalog = await store.get(`catalog/${version}.json`);
  return catalog ? (json(catalog) as Catalog) : null;
}

const issues = (
  label: string,
  error: { issues: { path: PropertyKey[]; message: string }[] },
) =>
  error.issues.map(
    (issue) =>
      `${label}: ${issue.path.map(String).join(".") || "(root)"} — ${issue.message}`,
  );

// Reads, validates and publishes one repository; throws a list of problems
async function readProject(
  snapshot: RepoSnapshot,
  options: IngestOptions,
): Promise<SourceProject> {
  const files = await options.repos.files(snapshot);
  const problems: string[] = [];

  const manifestFile = files.get("project.json");
  if (!manifestFile) throw ["project.json is missing"];
  const manifest = projectManifest.safeParse(json(manifestFile));
  if (!manifest.success) throw issues("project.json", manifest.error);

  const contents: Partial<Record<Locale, ProjectContent>> = {};
  for (const locale of LOCALES) {
    const file = files.get(`content.${locale}.json`);
    if (!file) continue;
    const parsed = projectContent.safeParse(json(file));
    if (parsed.success) contents[locale] = parsed.data;
    else problems.push(...issues(`content.${locale}.json`, parsed.error));
  }
  if (!contents.en && !problems.some((p) => p.startsWith("content.en"))) {
    problems.push("content.en.json is missing");
  }
  if (problems.length > 0) throw problems;

  const published = new Map<string, Omit<ResponsiveImage, "sizes">>();
  let shareImage: string | undefined;
  for (const path of imagePaths(manifest.data, Object.values(contents))) {
    const bytes = files.get(path);
    if (!bytes) {
      problems.push(`${path} is referenced but not in .portfolio/`);
      continue;
    }
    try {
      const isHero = path === manifest.data.hero?.image;
      const result = await publishImage(
        options.store,
        bytes,
        options.mediaBase,
        manifest.data.slug,
        { share: isHero },
      );
      published.set(path, result.image);
      if (isHero) shareImage = result.share;
    } catch (error) {
      problems.push(`${path}: ${(error as Error).message}`);
    }
  }
  if (problems.length > 0) throw problems;

  return {
    repo: snapshot.repo,
    sha: snapshot.sha,
    manifest: manifest.data,
    contents: { ...contents, en: contents.en as ProjectContent },
    shareImage,
    resolve: (path, sizes) => {
      const image = published.get(path);
      if (!image) throw new Error(`unpublished image ${path}`);
      return image.srcSet ? { ...image, sizes } : image;
    },
  };
}

// A project already in the previous catalog, carried over unchanged
function carryOver(previous: Catalog, slug: string) {
  const byLocale = {} as Record<Locale, ProjectData>;
  for (const locale of LOCALES) {
    const project = previous.projects[locale].find((p) => p.slug === slug);
    if (!project) return null;
    byLocale[locale] = project;
  }
  return {
    byLocale,
    source: previous.sources[slug],
    fallbacks: previous.fallbacks[slug],
  };
}

export async function ingest(options: IngestOptions): Promise<IngestReport> {
  const now = options.now ?? (() => new Date());
  const previous = await loadCurrentCatalog(options.store);
  const report: IngestReport = {
    published: [],
    unchanged: [],
    rejected: {},
    fallbacks: {},
    version: "",
    wrote: false,
    cleaned: { versions: [], media: [] },
  };

  const sameFormat = previous?.format === INGEST_FORMAT;
  const fresh: SourceProject[] = [];
  const kept: string[] = [];
  const previousByRepo = new Map(
    Object.entries(previous?.sources ?? {}).map(([slug, source]) => [
      source.repo,
      { slug, ...source },
    ]),
  );

  for (const snapshot of await options.repos.list()) {
    const before = previousByRepo.get(snapshot.repo);
    if (before && before.sha === snapshot.sha && sameFormat) {
      kept.push(before.slug);
      report.unchanged.push(snapshot.repo);
      continue;
    }
    try {
      fresh.push(await readProject(snapshot, options));
      report.published.push(snapshot.repo);
    } catch (problems) {
      report.rejected[snapshot.repo] = Array.isArray(problems)
        ? problems
        : [(problems as Error).message];
      if (before) kept.push(before.slug);
    }
  }

  // Fresh projects, built now, plus carried-over ones from the last catalog
  const built = buildCatalog(fresh, "pending");
  const freshSlugs = new Set(fresh.map((source) => source.manifest.slug));
  const entries: {
    slug: string;
    order?: number;
    byLocale: Record<Locale, ProjectData>;
    source: Catalog["sources"][string];
    fallbacks?: Locale[];
  }[] = [];
  for (const source of fresh.filter((s) => !s.manifest.draft)) {
    const slug = source.manifest.slug;
    const byLocale = {} as Record<Locale, ProjectData>;
    for (const locale of LOCALES) {
      byLocale[locale] = built.projects[locale].find(
        (p) => p.slug === slug,
      ) as ProjectData;
    }
    entries.push({
      slug,
      order: source.manifest.order,
      byLocale,
      source: built.sources[slug],
      fallbacks: built.fallbacks[slug],
    });
  }
  for (const slug of kept) {
    if (freshSlugs.has(slug) || !previous) continue;
    const carried = carryOver(previous, slug);
    if (carried)
      entries.push({ slug, order: carried.source.order, ...carried });
  }
  entries.sort(
    (a, b) =>
      (a.order ?? Number.MAX_SAFE_INTEGER) -
        (b.order ?? Number.MAX_SAFE_INTEGER) || a.slug.localeCompare(b.slug),
  );

  const projects = {} as Catalog["projects"];
  for (const locale of LOCALES)
    projects[locale] = entries.map((e) => e.byLocale[locale]);
  const sources: Catalog["sources"] = {};
  const fallbacks: Catalog["fallbacks"] = {};
  for (const entry of entries) {
    sources[entry.slug] = entry.source;
    if (entry.fallbacks?.length) fallbacks[entry.slug] = entry.fallbacks;
  }
  report.fallbacks = fallbacks;

  const content = JSON.stringify({ projects, fallbacks, sources });
  const unchanged =
    previous &&
    sameFormat &&
    content ===
      JSON.stringify({
        projects: previous.projects,
        fallbacks: previous.fallbacks,
        sources: previous.sources,
      });
  if (unchanged) {
    report.version = previous.version;
    return report;
  }

  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(content),
  );
  const hash = [...new Uint8Array(digest).slice(0, 4)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const version = `${now().toISOString().replace(/[-:]/g, "").slice(0, 13)}Z-${hash}`;
  const catalog: Catalog = {
    version,
    projects,
    fallbacks,
    sources,
    format: INGEST_FORMAT,
  };
  const encode = (value: unknown) =>
    new TextEncoder().encode(`${JSON.stringify(value)}\n`);
  // The version first, then the pointer: until the pointer moves, the site
  // keeps serving the previous catalog whole
  await options.store.put(`catalog/${version}.json`, encode(catalog), {
    contentType: "application/json",
    cacheControl: "public, max-age=31536000, immutable",
  });
  await options.store.put(CURRENT, encode({ version }), {
    contentType: "application/json",
    cacheControl: NO_CACHE,
  });
  report.version = version;
  report.wrote = true;
  report.cleaned = await cleanUp(options.store);
  return report;
}
