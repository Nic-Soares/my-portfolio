// The portfolio server (ADR-007): serves the client build with each page's
// <head> filled in, the projects API, sitemap.xml, robots.txt and the JSON
// Schemas. It only reads: the catalog comes from a CatalogSource, the build
// from an AssetSource. Web-standard APIs only, so it runs on Cloudflare
// Workers and on Node alike.
import { type Context, Hono } from "hono";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { z } from "zod";
import {
  type Catalog,
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
} from "../shared/catalog.ts";
import type { PageTexts, Person } from "../shared/pageMeta.ts";
import { jsonSchemas } from "../shared/schema/jsonSchemas.ts";
import {
  fillHead,
  knownPaths,
  metaFor,
  renderHead,
  robots,
  sitemap,
} from "./seo.ts";
import type { AssetSource, CatalogSource } from "./sources.ts";

export interface AppOptions {
  catalog: CatalogSource;
  assets: AssetSource;
  // Absolute origin, without a trailing slash
  siteUrl: string;
  // English UI strings and About data for each page's <head>
  texts: PageTexts;
  person: Person;
  // Where project images are served from, when not the site itself
  mediaOrigin?: string;
  log?: (entry: Record<string, unknown>) => void;
}

type ErrorCode = "bad_request" | "not_found" | "internal";

const localeQuery = z.object({
  locale: z.enum(LOCALES).default(DEFAULT_LOCALE),
});

const HASHED_ASSET = /^\/assets\//;
const HAS_EXTENSION = /\.[a-z0-9]+$/i;

// One shape for every API error
function apiError(
  c: Context,
  status: 400 | 404 | 500,
  code: ErrorCode,
  message: string,
) {
  return c.json({ error: { code, message } }, status);
}

// sha256 sources for the inline scripts in index.html (theme and language
// bootstrap), so the CSP can allow exactly those and nothing else
async function inlineScriptHashes(html: string): Promise<string[]> {
  const scripts = [
    ...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g),
  ]
    .filter((match) => !match[0].includes("application/ld+json"))
    .map((match) => match[1]);
  return Promise.all(
    scripts.map(async (script) => {
      const digest = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(script),
      );
      const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)));
      return `'sha256-${base64}'`;
    }),
  );
}

export function createApp(options: AppOptions) {
  const { catalog, assets, siteUrl, mediaOrigin } = options;
  const log = options.log ?? ((entry) => console.log(JSON.stringify(entry)));
  const seo = {
    siteUrl,
    texts: options.texts,
    person: options.person,
  };

  let csp: Promise<string> | null = null;
  const contentSecurityPolicy = () => {
    csp ??= assets.indexHtml().then(async (html) => {
      const hashes = await inlineScriptHashes(html);
      const media = mediaOrigin ? ` ${mediaOrigin}` : "";
      return [
        "default-src 'self'",
        `script-src 'self' ${hashes.join(" ")}`.trim(),
        "style-src 'self'",
        `img-src 'self' data: blob:${media}`,
        "font-src 'self'",
        `media-src 'self' https:${media}`,
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
      ].join("; ");
    });
    return csp;
  };

  const app = new Hono();

  app.use(requestId());
  app.use(async (c, next) => {
    const started = performance.now();
    await next();
    log({
      requestId: c.get("requestId"),
      method: c.req.method,
      path: c.req.path,
      status: c.res.status,
      ms: Math.round(performance.now() - started),
    });
  });
  app.use(
    secureHeaders({
      strictTransportSecurity: "max-age=31536000; includeSubDomains",
      referrerPolicy: "strict-origin-when-cross-origin",
      xFrameOptions: "DENY",
      permissionsPolicy: {
        camera: [],
        microphone: [],
        geolocation: [],
        payment: [],
        usb: [],
      },
    }),
  );
  app.use(async (c, next) => {
    await next();
    c.res.headers.set("Content-Security-Policy", await contentSecurityPolicy());
  });

  // ---- API ----

  const withCatalog = async (c: Context) => {
    const parsed = localeQuery.safeParse(c.req.query());
    if (!parsed.success) {
      return {
        response: apiError(
          c,
          400,
          "bad_request",
          `locale must be one of ${LOCALES.join(", ")}`,
        ),
      };
    }
    const loaded = await catalog.load();
    const locale: Locale = parsed.data.locale;
    const etag = `W/"${loaded.version}-${locale}"`;
    c.header("ETag", etag);
    c.header("Cache-Control", "no-cache");
    if (c.req.header("If-None-Match") === etag) {
      return { response: c.body(null, 304) };
    }
    return { catalog: loaded, locale };
  };

  app.get("/api/v1/health", async (c) => {
    const loaded = await catalog.load();
    c.header("Cache-Control", "no-store");
    return c.json({ status: "ok", catalog: loaded.version });
  });

  app.get("/api/v1/projects", async (c) => {
    const result = await withCatalog(c);
    if ("response" in result) return result.response;
    const { catalog: loaded, locale } = result;
    return c.json({
      locale,
      projects: loaded.projects[locale].map(
        ({ slug, name, description, areas, context, hero }) => ({
          slug,
          name,
          description,
          areas,
          context,
          ...(hero && { hero }),
        }),
      ),
    });
  });

  app.get("/api/v1/projects/:slug", async (c) => {
    const result = await withCatalog(c);
    if ("response" in result) return result.response;
    const { catalog: loaded, locale } = result;
    const slug = c.req.param("slug");
    const project = loaded.projects[locale].find((p) => p.slug === slug);
    if (!project) {
      return apiError(c, 404, "not_found", `No project "${slug}"`);
    }
    const servedLocale = loaded.fallbacks[slug]?.includes(locale)
      ? DEFAULT_LOCALE
      : locale;
    return c.json({ locale: servedLocale, project });
  });

  app.all("/api/*", (c) =>
    apiError(c, 404, "not_found", `No API route ${c.req.method} ${c.req.path}`),
  );

  // ---- Files for crawlers and editors ----

  app.get("/schema/:file", (c) => {
    const schema = jsonSchemas()[c.req.param("file")];
    if (!schema) return c.notFound();
    c.header("Cache-Control", "public, max-age=3600");
    return c.json(schema);
  });

  app.get("/sitemap.xml", async (c) => {
    c.header("Content-Type", "application/xml; charset=utf-8");
    c.header("Cache-Control", "public, max-age=3600");
    return c.body(sitemap(await catalog.load(), seo));
  });

  app.get("/robots.txt", (c) => {
    c.header("Cache-Control", "public, max-age=3600");
    return c.text(robots(siteUrl));
  });

  // ---- The client build ----

  app.get("*", async (c) => {
    const path = c.req.path;

    if (HAS_EXTENSION.test(path)) {
      const file = await assets.get(path);
      if (!file) return c.text("Not found", 404);
      const response = new Response(file.body, file);
      response.headers.set(
        "Cache-Control",
        HASHED_ASSET.test(path)
          ? "public, max-age=31536000, immutable"
          : "public, max-age=86400",
      );
      return response;
    }

    // A page: index.html with this route's <head>. Unknown routes get the
    // 404 page's tags and status; the SPA shows its 404 screen.
    const loaded = await catalog.load();
    const normalized = path.length > 1 ? path.replace(/\/+$/, "") : "/";
    const known = knownPaths(loaded).includes(normalized);
    const meta = metaFor(known ? normalized : "/404", loaded, seo);
    const html = fillHead(await assets.indexHtml(), renderHead(meta, seo));
    c.header("Cache-Control", "no-cache");
    return c.html(html, known && normalized !== "/404" ? 200 : 404);
  });

  app.onError((error, c) => {
    log({
      requestId: c.get("requestId"),
      level: "error",
      message: error.message,
      stack: error.stack,
    });
    return apiError(c, 500, "internal", "Something went wrong");
  });

  return app;
}

export type { Catalog };
