import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import NotFound from "./NotFound.tsx";

vi.stubGlobal(
  "matchMedia",
  vi.fn(() => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  })),
);

// Same fallback as App: unknown paths redirect to /404
function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<p>Home page</p>} />
        <Route path="/projects" element={<p>Projects page</p>} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("NotFound", () => {
  it("shows the 404 state for an unknown path", () => {
    renderAt("/does-not-exist");
    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Back to home" }),
    ).toBeInTheDocument();
  });

  it("goes home and to the projects", () => {
    renderAt("/404");
    fireEvent.click(screen.getByRole("button", { name: "Back to home" }));
    expect(screen.getByText("Home page")).toBeInTheDocument();

    renderAt("/404");
    fireEvent.click(screen.getByRole("button", { name: "View projects" }));
    expect(screen.getByText("Projects page")).toBeInTheDocument();
  });
});
