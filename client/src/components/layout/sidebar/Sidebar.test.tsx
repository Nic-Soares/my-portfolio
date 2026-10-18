import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@/app/theme/ThemeProvider.tsx";
import Sidebar from "./Sidebar.tsx";

function renderSidebar() {
  render(
    <ThemeProvider>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("Sidebar theme toggle", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete document.body.dataset.theme;
  });

  it("switches between light and dark and reflects the state", () => {
    renderSidebar();
    const toggle = screen.getByRole("button", { name: "Dark theme" });

    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(toggle).toHaveTextContent("dark_mode");

    act(() => toggle.click());

    expect(document.body.dataset.theme).toBe("Dark");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveTextContent("light_mode");

    act(() => toggle.click());

    expect(document.body.dataset.theme).toBe("Light");
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
