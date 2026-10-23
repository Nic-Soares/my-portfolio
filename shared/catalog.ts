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
}

// Turns a repository image path (images/hero.webp) into a published image
export type ImageResolver = (path: string) => ResponsiveImage;

function resolveBlocks(
  blocks: SourceBlock[],
  resolve: ImageResolver,
): ContentBlock[] {
  return blocks.map((block): Block<ResponsiveImage> => {
    if (block.type === "image") {
      const { src, ...rest } = block;
      return { ...rest, ...resolve(src) };
    }
    if (block.type === "columns") {
      return {
        ...block,
        columns: block.columns.map((column) => resolveBlocks(column, resolve)),
      };
    }
    return block;
  });
}

// One project in one locale, in the served format
export function toProjectData(
  manifest: ProjectManifest,
  content: ProjectContent,
  resolve: ImageResolver,
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
        ...resolve(manifest.hero.image),
        ...(content.heroAlt && { alt: content.heroAlt }),
      },
    }),
    tabs: content.tabs.map((tab) => ({
      ...tab,
      content: resolveBlocks(tab.content, resolve),
    })),
    ...(manifest.noindex && { noindex: true }),
  };
}

export interface SourceProject {
  manifest: ProjectManifest;
  // English is required; a missing locale falls back to it
  contents: Partial<Record<Locale, ProjectContent>> & { en: ProjectContent };
  resolve: ImageResolver;
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
      );
    });
  }
  return { version, projects, fallbacks };
}
