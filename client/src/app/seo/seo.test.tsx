import { pageMeta } from "@shared/pageMeta.ts";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { aboutData } from "@/features/about/data/about.data.ts";
import { en } from "@/i18n/locales/en.ts";
import { renderLoaded } from "@/test/projectsApi.tsx";
import RouteMeta from "./RouteMeta.tsx";

const projects = [
  { slug: "spotify-clone", name: "Spotify Web", description: "A player" },
  {
    slug: "reference",
    name: "Reference",
    description: "Blocks",
    noindex: true,
  },
];
const sources = { t: en, about: aboutData, projects };

describe("pageMeta", () => {
  it("titles each route after its page and the owner", () => {
    expect(pageMeta("/", sources).title).toBe(
      `${aboutData.name} — ${aboutData.role}`,
    );
    expect(pageMeta("/about/", sources).title).toBe(
      `About Me · ${aboutData.name}`,
    );
    expect(pageMeta("/projects/spotify-clone", sources)).toMatchObject({
      title: `Spotify Web · ${aboutData.name}`,
      noindex: undefined,
    });
  });

  it("keeps placeholders and unknown routes out of search", () => {
    expect(pageMeta("/projects/reference", sources).noindex).toBe(true);
    expect(pageMeta("/projects/nope", sources)).toMatchObject({
      title: `Page not found · ${aboutData.name}`,
      noindex: true,
    });
  });
});

describe("RouteMeta", () => {
  it("syncs the title and description with the route", async () => {
    await renderLoaded(
      <MemoryRouter initialEntries={["/projects"]}>
        <RouteMeta />
      </MemoryRouter>,
    );
    expect(document.title).toBe(`Projects · ${aboutData.name}`);
    expect(
      document.head
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toBe(en.seo.projectsDescription);
  });
});
