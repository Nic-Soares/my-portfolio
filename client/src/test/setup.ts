import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";
import { useProjectsApi } from "./projectsApi.tsx";

// jsdom has no matchMedia: default to "no query matches" (Compact size
// class, light theme). Tests that need another answer stub it themselves.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

afterEach(() => {
  cleanup();
});

// Client tests read projects from the server app over the fixtures
if (typeof window !== "undefined") {
  beforeEach(() => useProjectsApi());
}
