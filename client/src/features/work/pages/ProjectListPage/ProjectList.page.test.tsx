import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
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

const renderAt = (url: string, compact = false) => {
  stubViewport(compact);
  return render(
    <MemoryRouter initialEntries={[url]}>
      <ProjectListPage />
    </MemoryRouter>,
  );
};

const titles = () =>
  screen.queryAllByRole("heading", { level: 3 }).map((h) => h.textContent);

describe("ProjectListPage filters", () => {
  afterEach(() => vi.useRealTimers());

  it("shows every project with counts", () => {
    renderAt("/projects");
    expect(titles()).toEqual(["Clone do Spotify", "Reference"]);
    expect(screen.getByRole("button", { name: "All · 2" })).toBeInTheDocument();
  });

  it("filters by the areas in the URL and toggles several at once", () => {
    renderAt("/projects?area=design");
    expect(titles()).toEqual(["Reference"]);

    const backend = screen.getByRole("button", { name: "Backend · 1" });
    fireEvent.click(backend); // Design + Backend: either area matches
    expect(titles()).toEqual(["Clone do Spotify", "Reference"]);
    expect(backend).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "Design · 1" }));
    expect(titles()).toEqual(["Clone do Spotify"]);

    fireEvent.click(screen.getByRole("button", { name: "All · 2" }));
    expect(titles()).toEqual(["Clone do Spotify", "Reference"]);
    expect(backend).toHaveAttribute("aria-pressed", "false");
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

  it("shows one tool at a time below Large", () => {
    renderAt("/projects", true);
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
