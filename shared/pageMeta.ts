// Per-route title, description and social tags. One source for the browser
// (RouteMeta keeps <head> in sync while navigating), the build (seo.plugin.ts)
// and the server, which fills each page's <head> per request (ADR-007), so
// link previews, which don't run JS, still get the right page.
import type { ProjectData } from "./project.ts";

// Square icon until there is a designed 1200×630 share image
const SHARE_IMAGE = "/web-app-manifest-512x512.png";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  // Share image (Open Graph) path; the site icon when absent
  image?: string;
}

// The UI strings a page's meta reads (a slice of the client's i18n catalog)
export interface PageTexts {
  home: { headlineLine2: string };
  about: { title: string };
  work: { title: string };
  seo: { projectsDescription: string };
  system: {
    underConstruction: string;
    underConstructionText: string;
    notFound: string;
    notFoundText: string;
  };
}

// The About data a page's meta and the Person JSON-LD read
export interface Person {
  name: string;
  role: string;
  bio: string;
  location: string;
  stack: { skills: string[] }[];
  contact: { social: { href: string }[] };
}

export interface MetaSources {
  t: PageTexts;
  about: Person;
  projects: Pick<
    ProjectData,
    "slug" | "name" | "description" | "noindex" | "shareImage"
  >[];
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
      image: project.shareImage,
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

// siteUrl: the absolute origin, without a trailing slash
export function headTags(
  meta: PageMeta,
  siteName: string,
  siteUrl: string,
): HeadTag[] {
  const url = `${siteUrl}${meta.path}`;
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
    property("og:image", `${siteUrl}${meta.image ?? SHARE_IMAGE}`),
    // A wide card when there's a 1200×630 image, a square one otherwise
    named("twitter:card", meta.image ? "summary_large_image" : "summary"),
    named("twitter:title", meta.title),
    named("twitter:description", meta.description),
  ];
}

// schema.org Person for the Home and About pages
export function personJsonLd(
  about: Person,
  siteUrl: string,
): Record<string, unknown> {
  const sameAs = about.contact.social
    .map((link) => link.href)
    .filter((href) => href.startsWith("http"));
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.name,
    jobTitle: about.role,
    description: about.bio,
    url: `${siteUrl}/`,
    homeLocation: { "@type": "Place", name: about.location },
    knowsAbout: about.stack.flatMap((group) => group.skills),
    ...(sameAs.length > 0 && { sameAs }),
  };
}
