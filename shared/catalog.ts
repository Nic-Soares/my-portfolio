// The catalog the server reads (ADR-007): every published project, already in
// the served format, per locale. Ingestion builds it from the .portfolio/
// folders; locally, server/local builds it from server/fixtures.
import type {
  Block,
  ContentBlock,
  ProjectContent,
  ProjectData,
  ProjectManifest,
  ResponsiveImage,
  SourceBlock,
} from "./project.ts";

export const LOCALES = ["en", "pt", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

export interface Catalog {
  // Changes whenever the content does; the API's ETag
  version: string;
  // In display order; every locale holds the same slugs
  projects: Record<Locale, ProjectData[]>;
  // Locales a project fell back to English for
  fallbacks: Record<string, Locale[]>;
  // Where each project came from: ingestion skips a repository whose
  // .portfolio/ hasn't changed since this commit
  sources: Record<string, { repo: string; sha: string; order?: number }>;
}

// Turns a repository image path (images/hero.webp) into a published image;
// `sizes` is how wide it shows, for srcset
export type ImageResolver = (path: string, sizes: string) => ResponsiveImage;

// How wide an image shows (stacked full width on Compact)
export const IMAGE_SIZES = {
  hero: "(width < 600px) 100vw, 50vw",
  block: "(width < 600px) 100vw, 760px",
  column: (count: number) =>
    `(width < 600px) 100vw, ${Math.round(100 / count)}vw`,
};

function resolveBlocks(
  blocks: SourceBlock[],
  resolve: ImageResolver,
  sizes: string,
): ContentBlock[] {
  return blocks.map((block): Block<ResponsiveImage> => {
    if (block.type === "image") {
      const { src, ...rest } = block;
      return { ...rest, ...resolve(src, sizes) };
    }
    if (block.type === "columns") {
      const columnSizes = IMAGE_SIZES.column(block.columns.length);
      return {
        ...block,
        columns: block.columns.map((column) =>
          resolveBlocks(column, resolve, columnSizes),
        ),
      };
    }
    return block;
  });
}

// Every image path a project uses, so ingestion can publish them first
export function imagePaths(
  manifest: ProjectManifest,
  contents: ProjectContent[],
): string[] {
  const paths = new Set<string>();
  if (manifest.hero) paths.add(manifest.hero.image);
  const visit = (blocks: SourceBlock[]) => {
    for (const block of blocks) {
      if (block.type === "image") paths.add(block.src);
      if (block.type === "columns") block.columns.forEach(visit);
    }
  };
  for (const content of contents) {
    for (const tab of content.tabs) visit(tab.content);
  }
  return [...paths];
}

// One project in one locale, in the served format
export function toProjectData(
  manifest: ProjectManifest,
  content: ProjectContent,
  resolve: ImageResolver,
  shareImage?: string,
): ProjectData {
  return {
    slug: manifest.slug,
    name: content.name,
    description: content.description,
    areas: manifest.areas,
    context: content.context,
    ...(content.facts && { facts: content.facts }),
    ...(manifest.hero && {
      hero: {
        type: "image" as const,
        ...resolve(manifest.hero.image, IMAGE_SIZES.hero),
        ...(content.heroAlt && { alt: content.heroAlt }),
      },
    }),
    tabs: content.tabs.map((tab) => ({
      ...tab,
      content: resolveBlocks(tab.content, resolve, IMAGE_SIZES.block),
    })),
    ...(shareImage && { shareImage }),
    ...(manifest.noindex && { noindex: true }),
  };
}

export interface SourceProject {
  // owner/name and the commit the content came from
  repo: string;
  sha: string;
  manifest: ProjectManifest;
  // English is required; a missing locale falls back to it
  contents: Partial<Record<Locale, ProjectContent>> & { en: ProjectContent };
  resolve: ImageResolver;
  // The published 1200×630 share image (Open Graph), when there's a hero
  shareImage?: string;
}

// The catalog from validated projects: drafts left out, ordered by `order`
// then slug, missing locales filled with English
export function buildCatalog(
  sources: SourceProject[],
  version: string,
): Catalog {
  const published = sources
    .filter((source) => !source.manifest.draft)
    .sort(
      (a, b) =>
        (a.manifest.order ?? Number.MAX_SAFE_INTEGER) -
          (b.manifest.order ?? Number.MAX_SAFE_INTEGER) ||
        a.manifest.slug.localeCompare(b.manifest.slug),
    );
  const projects = {} as Record<Locale, ProjectData[]>;
  const fallbacks: Record<string, Locale[]> = {};
  for (const locale of LOCALES) {
    projects[locale] = published.map((source) => {
      const content = source.contents[locale];
      if (!content) {
        fallbacks[source.manifest.slug] ??= [];
        fallbacks[source.manifest.slug].push(locale);
      }
      return toProjectData(
        source.manifest,
        content ?? source.contents.en,
        source.resolve,
        source.shareImage,
      );
    });
  }
  const catalogSources: Catalog["sources"] = {};
  for (const source of published) {
    catalogSources[source.manifest.slug] = {
      repo: source.repo,
      sha: source.sha,
      ...(source.manifest.order !== undefined && {
        order: source.manifest.order,
      }),
    };
  }
  return { version, projects, fallbacks, sources: catalogSources };
}
