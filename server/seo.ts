// The <head> of each page, sitemap.xml and robots.txt, from the catalog.
// English, the default locale; the client switches the tags on language
// change (RouteMeta).
import type { Catalog } from "../shared/catalog.ts";
import {
  type HeadTag,
  headTags,
  type PageMeta,
  type PageTexts,
  type Person,
  pageMeta,
  personJsonLd,
} from "../shared/pageMeta.ts";

export interface SeoContext {
  siteUrl: string;
  texts: PageTexts;
  person: Person;
}

// Routes that exist besides /projects/:slug
const STATIC_ROUTES = ["/", "/about", "/projects", "/coming-soon", "/404"];
const PERSON_PAGES = new Set(["/", "/about"]);
const SEO_BLOCK = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;

export function knownPaths(catalog: Catalog): string[] {
  return [
    ...STATIC_ROUTES,
    ...catalog.projects.en.map((project) => `/projects/${project.slug}`),
  ];
}

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function renderTag({ tag, attrs, text }: HeadTag): string {
  if (tag === "title") return `<title>${escapeHtml(text ?? "")}</title>`;
  const attributes = Object.entries(attrs)
    .map(([name, value]) => `${name}="${escapeHtml(value)}"`)
    .join(" ");
  return `<${tag} ${attributes} />`;
}

export function metaFor(
  path: string,
  catalog: Catalog,
  { texts, person }: SeoContext,
): PageMeta {
  return pageMeta(path, {
    t: texts,
    about: person,
    projects: catalog.projects.en,
  });
}

export function renderHead(meta: PageMeta, context: SeoContext): string {
  const { siteUrl, person } = context;
  const tags = headTags(meta, person.name, siteUrl).map(renderTag);
  if (PERSON_PAGES.has(meta.path)) {
    // `<` escaped so the JSON can never close the script tag
    const json = JSON.stringify(personJsonLd(person, siteUrl)).replaceAll(
      "<",
      "\\u003c",
    );
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }
  return tags.join("\n    ");
}

export function fillHead(template: string, head: string): string {
  if (!SEO_BLOCK.test(template)) {
    throw new Error("index.html has no seo:start/seo:end block");
  }
  return template.replace(SEO_BLOCK, head);
}

export function sitemap(catalog: Catalog, context: SeoContext): string {
  const urls = knownPaths(catalog)
    .map((path) => metaFor(path, catalog, context))
    .filter((meta) => !meta.noindex)
    .map((meta) => `  <url><loc>${context.siteUrl}${meta.path}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

export function robots(siteUrl: string): string {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}
