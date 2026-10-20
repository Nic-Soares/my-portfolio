import { render, screen } from "@testing-library/react";
import { lazy, Suspense } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App.tsx";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary.tsx";

// ST-10.3: the real flows fall into the designed states
vi.stubGlobal(
  "matchMedia",
  vi.fn(() => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  })),
);

describe("System states in real flows", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.history.pushState({}, "", "/");
  });

  it("shows the 404 for a project slug that doesn't exist", () => {
    window.history.pushState({}, "", "/projects/does-not-exist");
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeInTheDocument();
  });

  it("shows the 404 for an unknown path", () => {
    window.history.pushState({}, "", "/nowhere");
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeInTheDocument();
  });

  it("shows the 500 when a page fails to load", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const Broken = lazy(() => Promise.reject(new Error("chunk failed")));
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Broken />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("heading", { name: "Something went wrong" }),
    ).toBeInTheDocument();
  });

  it("shows the projects page once its code has loaded", async () => {
    window.history.pushState({}, "", "/projects");
    render(<App />);
    expect(
      await screen.findByRole("heading", { level: 1, name: "Projects" }),
    ).toBeInTheDocument();
  });
});
