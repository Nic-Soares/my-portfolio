import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "./ThemeProvider.tsx";
import { THEME_STORAGE_KEY } from "./theme.ts";

let systemDark = false;
let notifySystemChange: ((event: { matches: boolean }) => void) | undefined;

function stubMatchMedia() {
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: systemDark,
      addEventListener: (_: string, listener: typeof notifySystemChange) => {
        notifySystemChange = listener;
      },
      removeEventListener: () => {
        notifySystemChange = undefined;
      },
    })),
  );
}

function Probe() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <>
      <output>{`${theme}/${resolvedTheme}`}</output>
      <button type="button" onClick={() => setTheme("dark")}>
        dark
      </button>
      <button type="button" onClick={() => setTheme("system")}>
        system
      </button>
    </>
  );
}

function renderProvider() {
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    systemDark = false;
    localStorage.clear();
    stubMatchMedia();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete document.body.dataset.theme;
  });

  it("follows the system theme when nothing is stored", () => {
    systemDark = true;
    renderProvider();

    expect(screen.getByRole("status")).toHaveTextContent("system/dark");
    expect(document.body.dataset.theme).toBe("Dark");
  });

  it("tracks system changes while no choice is stored", () => {
    renderProvider();
    expect(document.body.dataset.theme).toBe("Light");

    act(() => notifySystemChange?.({ matches: true }));

    expect(document.body.dataset.theme).toBe("Dark");
  });

  it("uses a stored choice over the system theme", () => {
    systemDark = true;
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    renderProvider();

    expect(screen.getByRole("status")).toHaveTextContent("light/light");
    expect(document.body.dataset.theme).toBe("Light");
  });

  it("follows a choice saved by another tab or frame", () => {
    renderProvider();

    act(() => {
      localStorage.setItem(THEME_STORAGE_KEY, "dark");
      window.dispatchEvent(
        new StorageEvent("storage", { key: THEME_STORAGE_KEY }),
      );
    });

    expect(screen.getByRole("status")).toHaveTextContent("dark/dark");
    expect(document.body.dataset.theme).toBe("Dark");
  });

  it("saves an explicit choice and clears it when going back to system", () => {
    renderProvider();

    act(() => screen.getByRole("button", { name: "dark" }).click());
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.body.dataset.theme).toBe("Dark");

    act(() => screen.getByRole("button", { name: "system" }).click());
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    expect(document.body.dataset.theme).toBe("Light");
  });
});
