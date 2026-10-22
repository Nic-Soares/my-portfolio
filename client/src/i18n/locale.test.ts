import { afterEach, describe, expect, it } from "vitest";
import {
  detectBrowserLocale,
  initialLocale,
  LOCALE_STORAGE_KEY,
  readStoredLocale,
  storeLocale,
} from "./locale.ts";

describe("locale", () => {
  afterEach(() => localStorage.clear());

  it("maps the first supported browser language to a locale", () => {
    expect(detectBrowserLocale(["pt-BR", "en-US"])).toBe("pt");
    expect(detectBrowserLocale(["fr-FR", "es-MX"])).toBe("es");
    expect(detectBrowserLocale(["fr-FR", "de"])).toBeNull();
  });

  it("prefers the stored choice over the browser language", () => {
    storeLocale("es");
    expect(readStoredLocale()).toBe("es");
    expect(initialLocale()).toBe("es");
  });

  it("ignores an unknown stored value", () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, "fr");
    expect(readStoredLocale()).toBeNull();
  });
});
