import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProjectListPage from "./ProjectList.page.tsx";

const renderAt = (url: string) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <ProjectListPage />
    </MemoryRouter>,
  );

const titles = () =>
  screen.queryAllByRole("heading", { level: 3 }).map((h) => h.textContent);

describe("ProjectListPage filters", () => {
  afterEach(() => vi.useRealTimers());

  it("shows every project with counts", () => {
    renderAt("/projects");
    expect(titles()).toEqual(["Clone do Spotify", "Reference"]);
    expect(screen.getByRole("button", { name: "All · 2" })).toBeInTheDocument();
  });

  it("filters by the area in the URL and by clicking an area", () => {
    renderAt("/projects?area=design");
    expect(titles()).toEqual(["Reference"]);
    fireEvent.click(screen.getByRole("button", { name: /^Backend · 1$/ }));
    expect(titles()).toEqual(["Clone do Spotify"]);
  });

  it("searches after typing pauses and clears", () => {
    vi.useFakeTimers();
    renderAt("/projects");
    fireEvent.change(screen.getByPlaceholderText("Search projects"), {
      target: { value: "nothing like this" },
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(titles()).toEqual([]);
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(titles()).toEqual(["Clone do Spotify", "Reference"]);
  });
});
