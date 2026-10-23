// @vitest-environment node
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { aboutData } from "../client/src/features/about/data/about.data.ts";
import { en } from "../client/src/i18n/locales/en.ts";
import { buildCatalog } from "../shared/catalog.ts";
import { type AppOptions, createApp } from "./app.ts";
import { fixtureCatalog } from "./local/fixtureCatalog.ts";
import { type AssetSource, cachedCatalog } from "./sources.ts";

const TEMPLATE = `<!doctype html><html><head>
    <!-- seo:start -->
    <title>Portfolio</title>
    <!-- seo:end -->
  </head><body><script>window.theme = "light";</script>
  <script type="module" src="/assets/index-abc.js"></script></body></html>`;

const assets: AssetSource = {
  async get(path) {
    if (path === "/assets/index-abc.js") return new Response("console.log(1)");
    if (path === "/favicon.svg") return new Response("<svg/>");
    return null;
  },
  indexHtml: async () => TEMPLATE,
};

const fixtures = join(import.meta.dirname, "fixtures/projects");

function app(overrides: Partial<AppOptions> = {}) {
  return createApp({
    catalog: fixtureCatalog(fixtures),
    assets,
    siteUrl: "https://example.dev",
    texts: en,
    person: aboutData,
    log: () => {},
    ...overrides,
  });
}

describe("projects API", () => {
  it("lists project summaries in the requested locale", async () => {
    const res = await app().request("/api/v1/projects?locale=pt");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.locale).toBe("pt");
    expect(body.projects.map((p: { slug: string }) => p.slug)).toEqual([
      "spotify-clone",
    ]);
    expect(body.projects[0]).not.toHaveProperty("tabs");
    expect(body.projects[0].hero.src).toBe("/media/spotify-clone/hero.webp");
  });

  it("serves one project, and 304 when the ETag still matches", async () => {
    const server = app();
    const res = await server.request("/api/v1/projects/spotify-clone");
    expect(res.status).toBe(200);
    expect((await res.json()).project.tabs.length).toBeGreaterThan(0);
    const again = await server.request("/api/v1/projects/spotify-clone", {
      headers: { "If-None-Match": res.headers.get("ETag") ?? "" },
    });
    expect(again.status).toBe(304);
  });

  it("answers errors in one JSON shape", async () => {
    const server = app();
    const bad = await server.request("/api/v1/projects?locale=xx");
    expect(bad.status).toBe(400);
    expect(await bad.json()).toMatchObject({ error: { code: "bad_request" } });
    const missing = await server.request("/api/v1/projects/nope");
    expect(missing.status).toBe(404);
    expect(await missing.json()).toMatchObject({
      error: { code: "not_found" },
    });
    const unknown = await server.request("/api/v1/nope");
    expect(unknown.status).toBe(404);
  });

  it("says when a project fell back to English", async () => {
    const catalog = buildCatalog(
      [
        {
          manifest: { schemaVersion: 1, slug: "only-en", areas: ["Data"] },
          contents: {
            en: {
              name: "Only English",
              description: "d",
              context: "c",
              tabs: [{ id: "o", title: "O", sidebarItems: [], content: [] }],
            },
          },
          resolve: (src) => ({ src }),
        },
      ],
      "v1",
    );
    const res = await app({ catalog: { load: async () => catalog } }).request(
      "/api/v1/projects/only-en?locale=es",
    );
    expect((await res.json()).locale).toBe("en");
  });
});

describe("pages", () => {
  it("fills each page's head and status", async () => {
    const server = app();
    const project = await server.request("/projects/spotify-clone");
    expect(project.status).toBe(200);
    const html = await project.text();
    expect(html).toContain(`<title>Spotify Web · ${aboutData.name}</title>`);
    expect(html).toContain(
      '<link rel="canonical" href="https://example.dev/projects/spotify-clone" />',
    );
    expect(html).not.toContain("seo:start");

    const home = await (await server.request("/")).text();
    expect(home).toContain('"@type":"Person"');

    const unknown = await server.request("/projects/nope");
    expect(unknown.status).toBe(404);
    expect(await unknown.text()).toContain('content="noindex"');
  });

  it("serves build files with cache headers", async () => {
    const server = app();
    const hashed = await server.request("/assets/index-abc.js");
    expect(hashed.headers.get("Cache-Control")).toContain("immutable");
    const plain = await server.request("/favicon.svg");
    expect(plain.headers.get("Cache-Control")).toBe("public, max-age=86400");
    expect((await server.request("/missing.png")).status).toBe(404);
  });

  it("lists only indexable pages in the sitemap", async () => {
    const xml = await (await app().request("/sitemap.xml")).text();
    expect(xml).toContain("https://example.dev/projects/spotify-clone</loc>");
    expect(xml).not.toContain("/404");
    expect(xml).not.toContain("coming-soon");
    const robots = await (await app().request("/robots.txt")).text();
    expect(robots).toContain("Sitemap: https://example.dev/sitemap.xml");
  });

  it("publishes the JSON Schemas", async () => {
    const res = await app().request("/schema/project.v1.json");
    expect((await res.json()).title).toContain("project.json");
  });
});

describe("security headers", () => {
  it("allows only the site's scripts and the template's inline script", async () => {
    const res = await app().request("/");
    const csp = res.headers.get("Content-Security-Policy") ?? "";
    expect(csp).toContain("script-src 'self' 'sha256-");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(res.headers.get("Strict-Transport-Security")).toContain("max-age");
    expect(res.headers.get("Referrer-Policy")).toBe(
      "strict-origin-when-cross-origin",
    );
  });
});

describe("cachedCatalog", () => {
  it("keeps serving the last catalog when a reload fails", async () => {
    let calls = 0;
    let time = 0;
    const source = cachedCatalog(
      {
        load: async () => {
          calls += 1;
          if (calls > 1) throw new Error("R2 down");
          return buildCatalog([], "v1");
        },
      },
      1000,
      () => time,
    );
    expect((await source.load()).version).toBe("v1");
    time = 5000;
    expect((await source.load()).version).toBe("v1");
    expect(calls).toBe(2);
  });
});
