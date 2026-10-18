import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@/app/theme/ThemeProvider.tsx";
import TopAppBar from "./TopAppBar.tsx";

function scrollTo(y: number) {
  act(() => {
    Object.defineProperty(window, "scrollY", { value: y, configurable: true });
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("TopAppBar", () => {
  afterEach(() => scrollTo(0));

  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    })),
  );

  it("is flat at the top and elevated once the page scrolls", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <TopAppBar />
        </MemoryRouter>
      </ThemeProvider>,
    );
    const bar = screen.getByRole("banner");
    expect(bar).not.toHaveAttribute("data-scrolled");

    scrollTo(120);
    expect(bar).toHaveAttribute("data-scrolled");

    scrollTo(0);
    expect(bar).not.toHaveAttribute("data-scrolled");
  });
});
