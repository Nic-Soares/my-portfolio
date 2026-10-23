import type { Catalog } from "../shared/catalog.ts";

// Where the catalog comes from: R2 on Cloudflare, a folder locally and in
// tests (ADR-007)
export interface CatalogSource {
  load(): Promise<Catalog>;
}

// The client build: static files and the HTML template every page fills
export interface AssetSource {
  // A file of the build (/assets/…, /fonts/…, /favicon.svg…) or null
  get(path: string): Promise<Response | null>;
  // client build's index.html, with the seo:start/seo:end block
  indexHtml(): Promise<string>;
}

// Keeps the catalog in memory for `ttlMs` and, when a reload fails, keeps
// serving the last copy it had
export function cachedCatalog(
  source: CatalogSource,
  ttlMs: number,
  now: () => number = Date.now,
): CatalogSource {
  let cached: { catalog: Catalog; at: number } | null = null;
  return {
    async load() {
      if (cached && now() - cached.at < ttlMs) return cached.catalog;
      try {
        cached = { catalog: await source.load(), at: now() };
      } catch (error) {
        if (!cached) throw error;
        cached.at = now();
      }
      return cached.catalog;
    },
  };
}
