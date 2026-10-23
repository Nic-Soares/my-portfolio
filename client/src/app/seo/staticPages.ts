// Build-time pages for seo.plugin.ts: the <head> of every route, the
// sitemap and robots.txt. English, the default locale.

import {
  type HeadTag,
  headTags,
  type PageMeta,
  pageMeta,
  personJsonLd,
} from "@shared/pageMeta.ts";
import { aboutData } from "@/features/about/data/about.data.ts";
import { projectsByLocale } from "@/features/work/data/projects/index.ts";
import { en } from "@/i18n/locales/en.ts";
import { SITE_URL } from "./siteUrl.ts";

const PERSON_PAGES = new Set(["/", "/about"]);

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

function renderHead(meta: PageMeta): string {
  const tags = headTags(meta, aboutData.name, SITE_URL).map(renderTag);
  if (PERSON_PAGES.has(meta.path)) {
    // `<` escaped so the JSON can never close the script tag
    const json = JSON.stringify(personJsonLd(aboutData, SITE_URL)).replaceAll(
      "<",
      "\\u003c",
    );
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }
  return tags.join("\n    ");
}

export interface StaticPage {
  path: string;
  head: string;
  noindex: boolean;
}

export function staticPages(): StaticPage[] {
  const projects = projectsByLocale.en;
  const paths = [
    "/",
    "/about",
    "/projects",
    ...projects.map((project) => `/projects/${project.slug}`),
    "/coming-soon",
    "/404",
  ];
  return paths.map((path) => {
    const meta = pageMeta(path, { t: en, about: aboutData, projects });
    return { path, head: renderHead(meta), noindex: Boolean(meta.noindex) };
  });
}

export function sitemap(pages: StaticPage[]): string {
  const urls = pages
    .filter((page) => !page.noindex)
    .map((page) => `  <url><loc>${SITE_URL}${page.path}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

export function robots(): string {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export { SITE_URL };
