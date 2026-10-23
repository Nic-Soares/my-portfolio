import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { projectsRequest } from "@/features/work/data/projectsApi.ts";
import ProjectListPage from "./ProjectList.page.tsx";

// Desktop by default; `compact` makes the (width < 600px) query match
const stubViewport = (compact = false) =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: compact && query === "(width < 600px)",
      addEventListener: () => {},
      removeEventListener: () => {},
    })),
  );

// The list is loaded first, so the page renders it at once (as on a revisit)
// and the filters' URL updates run as they do in the browser
const renderAt = async (url: string, compact = false) => {
  stubViewport(compact);
  await projectsRequest("en").promise;
  return render(
    <MemoryRouter initialEntries={[url]}>
      <ProjectListPage />
    </MemoryRouter>,
  );
};

// Card titles: the level-2 headings inside the card buttons
const titles = () =>
  screen
    .queryAllByRole("button")
    .flatMap((card) => card.querySelector("h2")?.textContent ?? []);

describe("ProjectListPage filters", () => {
  afterEach(() => vi.useRealTimers());

  it("shows every project with counts", async () => {
    await renderAt("/projects");
    expect(titles()).toEqual(["Spotify Web", "Reference"]);
    expect(screen.getByRole("button", { name: "All · 2" })).toBeInTheDocument();
  });

  it("filters by the areas in the URL and toggles several at once", async () => {
    await renderAt("/projects?area=design");
    expect(titles()).toEqual(["Reference"]);

    const backend = screen.getByRole("button", { name: "Backend · 1" });
    fireEvent.click(backend); // Design + Backend: either area matches
    expect(titles()).toEqual(["Spotify Web", "Reference"]);
    expect(backend).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "Design · 1" }));
    expect(titles()).toEqual(["Spotify Web"]);

    fireEvent.click(screen.getByRole("button", { name: "All · 2" }));
    expect(titles()).toEqual(["Spotify Web", "Reference"]);
    expect(backend).toHaveAttribute("aria-pressed", "false");
  });

  it("searches after typing pauses and clears", async () => {
    vi.useFakeTimers();
    await renderAt("/projects");
    fireEvent.change(screen.getByPlaceholderText("Search projects"), {
      target: { value: "nothing like this" },
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(titles()).toEqual([]);
    expect(
      screen.getByRole("heading", { level: 2, name: "No projects found" }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(titles()).toEqual(["Spotify Web", "Reference"]);
  });

  it("shows one tool at a time below Large", async () => {
    await renderAt("/projects", true);
    expect(screen.queryByPlaceholderText("Search projects")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Search/ }));
    const input = screen.getByPlaceholderText("Search projects");
    expect(input).toHaveFocus();

    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByPlaceholderText("Search projects")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Filter/ }));
    expect(screen.getByRole("button", { name: "All · 2" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close filter" }));
    expect(screen.getByRole("button", { name: /Filter/ })).toBeInTheDocument();
  });
});
