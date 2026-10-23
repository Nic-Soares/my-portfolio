// Per-route title, description and social tags. One source for both the
// browser (RouteMeta keeps <head> in sync while navigating) and the build
// (seo.plugin.ts writes one HTML file per route, so link previews, which
// don't run JS, still get the right page).
import type { AboutData } from "@/features/about/data/about.types.ts";
import type { ProjectData } from "@/features/work/data/project-data.types.ts";
import type { Messages } from "@/i18n/messages.ts";

// Absolute origin for canonical, Open Graph and the sitemap. Set
// VITE_SITE_URL once the domain exists (ST-12.4); until then the local
// preview origin keeps the URLs well formed.
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "http://localhost:4173"
).replace(/\/+$/, "");

// Square icon until there is a designed 1200×630 share image
const SHARE_IMAGE = "/web-app-manifest-512x512.png";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

export interface MetaSources {
  t: Messages;
  about: AboutData;
  projects: ProjectData[];
}

export function pageMeta(
  pathname: string,
  { t, about, projects }: MetaSources,
): PageMeta {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const titled = (page: string) => `${page} · ${about.name}`;

  if (path === "/") {
    return {
      path,
      title: `${about.name} — ${about.role}`,
      description: t.home.headlineLine2,
    };
  }
  if (path === "/about") {
    return { path, title: titled(t.about.title), description: about.bio };
  }
  if (path === "/projects") {
    return {
      path,
      title: titled(t.work.title),
      description: t.seo.projectsDescription,
    };
  }
  if (path === "/coming-soon") {
    return {
      path,
      title: titled(t.system.underConstruction),
      description: t.system.underConstructionText,
      noindex: true,
    };
  }
  const project = projects.find((p) => `/projects/${p.slug}` === path);
  if (project) {
    return {
      path,
      title: titled(project.name),
      description: project.description,
      noindex: project.noindex,
    };
  }
  return {
    path,
    title: titled(t.system.notFound),
    description: t.system.notFoundText,
    noindex: true,
  };
}

export interface HeadTag {
  tag: "title" | "meta" | "link";
  // The attribute that identifies the tag in <head> (name, property or rel)
  key: [string, string];
  attrs: Record<string, string>;
  text?: string;
}

export function headTags(meta: PageMeta, siteName: string): HeadTag[] {
  const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
  const named = (name: string, content: string): HeadTag => ({
    tag: "meta",
    key: ["name", name],
    attrs: { name, content },
  });
  const property = (prop: string, content: string): HeadTag => ({
    tag: "meta",
    key: ["property", prop],
    attrs: { property: prop, content },
  });

  return [
    { tag: "title", key: ["", ""], attrs: {}, text: meta.title },
    named("description", meta.description),
    named("robots", meta.noindex ? "noindex" : "index, follow"),
    {
      tag: "link",
      key: ["rel", "canonical"],
      attrs: { rel: "canonical", href: url },
    },
    property("og:type", "website"),
    property("og:site_name", siteName),
    property("og:title", meta.title),
    property("og:description", meta.description),
    property("og:url", url),
    property("og:image", `${SITE_URL}${SHARE_IMAGE}`),
    named("twitter:card", "summary"),
    named("twitter:title", meta.title),
    named("twitter:description", meta.description),
  ];
}

// schema.org Person for the Home and About pages
export function personJsonLd(about: AboutData): Record<string, unknown> {
  const sameAs = about.contact.social
    .map((link) => link.href)
    .filter((href) => href.startsWith("http"));
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.name,
    jobTitle: about.role,
    description: about.bio,
    url: `${SITE_URL}/`,
    homeLocation: { "@type": "Place", name: about.location },
    knowsAbout: about.stack.flatMap((group) => group.skills),
    ...(sameAs.length > 0 && { sameAs }),
  };
}
