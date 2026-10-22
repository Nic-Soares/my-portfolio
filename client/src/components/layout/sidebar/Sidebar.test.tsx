import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@/app/theme/ThemeProvider.tsx";
import { I18nProvider } from "@/i18n/I18nProvider.tsx";
import Sidebar from "./Sidebar.tsx";

function renderSidebar(path = "/") {
  render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
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

describe("Sidebar destinations", () => {
  beforeEach(() => {
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
  });

  it("lists the three destinations and marks the current route", () => {
    renderSidebar("/projects/spotify-clone");
    const nav = screen.getByRole("navigation", { name: "Main" });

    expect(
      [...nav.querySelectorAll("a")].map((link) => link.textContent),
    ).toEqual(["homeHome", "personAbout Me", "folderProjects"]);
    expect(screen.getByRole("link", { name: /Projects/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: /About Me/ })).not.toHaveAttribute(
      "aria-current",
    );
  });
});

describe("Sidebar language menu", () => {
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

  function renderWithI18n() {
    render(
      <ThemeProvider>
        <I18nProvider>
          <MemoryRouter>
            <Sidebar />
          </MemoryRouter>
        </I18nProvider>
      </ThemeProvider>,
    );
  }

  it("opens the menu with the current language checked", async () => {
    renderWithI18n();
    const button = screen.getByRole("button", { name: /Language/ });
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    const menu = screen.getByRole("menu", { name: "Language" });
    expect(
      within(menu).getByRole("menuitemradio", { name: "English" }),
    ).toHaveAttribute("aria-checked", "true");
    expect(
      within(menu).getByRole("menuitemradio", { name: "English" }),
    ).toHaveFocus();
  });

  it("switches the UI language and remembers it", () => {
    renderWithI18n();
    fireEvent.click(screen.getByRole("button", { name: /Language/ }));
    fireEvent.click(screen.getByRole("menuitemradio", { name: "Português" }));

    expect(screen.queryByRole("menu")).toBeNull();
    expect(screen.getByRole("link", { name: /Sobre mim/ })).toBeInTheDocument();
    expect(localStorage.getItem("locale")).toBe("pt");
    expect(document.documentElement.lang).toBe("pt-BR");
  });

  it("closes on Escape", () => {
    renderWithI18n();
    fireEvent.click(screen.getByRole("button", { name: /Language/ }));
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });

    expect(screen.queryByRole("menu")).toBeNull();
  });
});
