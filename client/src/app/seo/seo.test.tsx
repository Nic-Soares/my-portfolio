import { pageMeta } from "@shared/pageMeta.ts";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { aboutData } from "@/features/about/data/about.data.ts";
import { projectsByLocale } from "@/features/work/data/projects/index.ts";
import { en } from "@/i18n/locales/en.ts";
import RouteMeta from "./RouteMeta.tsx";

const sources = { t: en, about: aboutData, projects: projectsByLocale.en };

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
  it("syncs the title and description with the route", () => {
    render(
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
