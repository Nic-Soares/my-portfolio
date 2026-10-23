// @vitest-environment node
import { cp, mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { folderRepos } from "./repos.ts";
import { ingest, loadCurrentCatalog } from "./run.ts";
import { folderStore } from "./stores.ts";

const FIXTURES = join(import.meta.dirname, "../server/fixtures/projects");
let dir: string;
let projects: string;
let storeDir: string;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "ingest-"));
  projects = join(dir, "projects");
  storeDir = join(dir, "store");
  await cp(FIXTURES, projects, { recursive: true });
});
afterEach(() => rm(dir, { recursive: true, force: true }));

const run = () =>
  ingest({
    repos: folderRepos(projects),
    store: folderStore(storeDir),
    mediaBase: "/media",
    now: () => new Date("2026-10-23T12:00:00Z"),
  });

const portfolio = (name: string) => join(projects, name, ".portfolio");

async function addProject(name: string, content: Record<string, unknown>) {
  await cp(portfolio("spotify-clone"), portfolio(name), { recursive: true });
  const manifest = {
    schemaVersion: 1,
    slug: name,
    areas: ["Data"],
    order: 20,
  };
  await writeFile(
    join(portfolio(name), "project.json"),
    JSON.stringify(manifest),
  );
  for (const locale of ["pt", "es"]) {
    await rm(join(portfolio(name), `content.${locale}.json`));
  }
  await writeFile(
    join(portfolio(name), "content.en.json"),
    JSON.stringify({
      name: "Second",
      description: "Another project",
      context: "Personal project",
      tabs: [
        { id: "overview", title: "Overview", sidebarItems: [], content: [] },
      ],
      ...content,
    }),
  );
}

describe("ingest", () => {
  it("publishes images and a catalog, then skips what didn't change", async () => {
    const first = await run();
    expect(first.wrote).toBe(true);
    expect(first.published).toEqual(["local/spotify-clone"]);

    const catalog = await loadCurrentCatalog(folderStore(storeDir));
    const project = catalog?.projects.pt[0];
    expect(project?.hero?.srcSet).toMatch(/800w, .*1600w$/);
    expect(project?.hero?.sizes).toBe("(width < 600px) 100vw, 50vw");
    expect(project?.shareImage).toMatch(/^\/media\/\w+-share\.jpg$/);
    const media = await readdir(join(storeDir, "media"));
    expect(media.filter((file) => file.endsWith("-share.jpg"))).toHaveLength(1);

    const second = await run();
    expect(second).toMatchObject({
      wrote: false,
      unchanged: ["local/spotify-clone"],
    });
    expect(second.version).toBe(first.version);
  });

  it("orders projects and falls back to English for missing locales", async () => {
    await addProject("second", {});
    const report = await run();
    expect(report.fallbacks).toEqual({ second: ["pt", "es"] });
    const catalog = await loadCurrentCatalog(folderStore(storeDir));
    expect(catalog?.projects.es.map((p) => p.slug)).toEqual([
      "spotify-clone",
      "second",
    ]);
    expect(catalog?.projects.es[1].name).toBe("Second");
  });

  it("rejects a broken project, keeps its last good version, publishes the others", async () => {
    await addProject("second", {});
    await run();
    await writeFile(
      join(portfolio("second"), "content.en.json"),
      JSON.stringify({
        name: "Second",
        description: "Now broken",
        context: "Personal project",
        tabs: [
          {
            id: "overview",
            title: "Overview",
            sidebarItems: [],
            content: [{ type: "paragraph", text: "<script>alert(1)</script>" }],
          },
        ],
      }),
    );
    const report = await run();
    expect(report.rejected["local/second"].join()).toContain(
      "HTML tags are not allowed",
    );
    const catalog = await loadCurrentCatalog(folderStore(storeDir));
    expect(
      catalog?.projects.en.find((p) => p.slug === "second")?.description,
    ).toBe("Another project");
  });

  it("rejects a project that references a missing image", async () => {
    await addProject("second", {});
    await writeFile(
      join(portfolio("second"), "project.json"),
      JSON.stringify({
        schemaVersion: 1,
        slug: "second",
        areas: ["Data"],
        hero: { image: "images/missing.png" },
      }),
    );
    const report = await run();
    expect(report.rejected["local/second"]).toEqual([
      "images/missing.png is referenced but not in .portfolio/",
    ]);
  });

  it("leaves drafts out of the site", async () => {
    await addProject("second", {});
    await writeFile(
      join(portfolio("second"), "project.json"),
      JSON.stringify({
        schemaVersion: 1,
        slug: "second",
        areas: ["Data"],
        draft: true,
      }),
    );
    await run();
    const catalog = await loadCurrentCatalog(folderStore(storeDir));
    expect(catalog?.projects.en.map((p) => p.slug)).toEqual(["spotify-clone"]);
  });
});
