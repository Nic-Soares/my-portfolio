import { fireEvent, render, screen } from "@testing-library/react";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ErrorBoundary from "./ErrorBoundary.tsx";

vi.stubGlobal(
  "matchMedia",
  vi.fn(() => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  })),
);

// Throws while `broken.current` is true, so a retry can succeed
const broken = { current: true };
const Fragile = () => {
  if (broken.current) throw new Error("boom");
  return <p>Page content</p>;
};

function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/fragile"]}>
      <Link to="/about">About</Link>
      <ErrorBoundary>
        <Routes>
          <Route path="/fragile" element={<Fragile />} />
          <Route path="/about" element={<p>About page</p>} />
          <Route path="/" element={<p>Home page</p>} />
        </Routes>
      </ErrorBoundary>
    </MemoryRouter>,
  );
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    broken.current = true;
    // React logs caught errors; keep the test output clean
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  it("shows the 500 state when a page throws", () => {
    renderApp();
    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toBeInTheDocument();
  });

  it("renders the page again on Try again", () => {
    renderApp();
    broken.current = false;
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("clears the error when navigating away", () => {
    renderApp();
    fireEvent.click(screen.getByRole("link", { name: "About" }));
    expect(screen.getByText("About page")).toBeInTheDocument();
  });

  it("goes home from Back to home", () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: "Back to home" }));
    expect(screen.getByText("Home page")).toBeInTheDocument();
  });
});
