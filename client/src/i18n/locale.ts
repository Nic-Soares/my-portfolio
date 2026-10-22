// Supported locales. English is the default (the design is in English).
export const LOCALES = ["en", "pt", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "locale";

// Names shown in the language menu, each in its own language
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
};

// BCP 47 tags for <html lang> and Intl formatting
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en",
  pt: "pt-BR",
  es: "es",
};

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function readStoredLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
    return null;
  }
}

export function storeLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // The choice still applies for this visit.
  }
}

// First supported language in the browser's list ("pt-BR" → "pt")
export function detectBrowserLocale(
  languages: readonly string[] = navigator.languages ?? [navigator.language],
): Locale | null {
  for (const language of languages) {
    const base = language?.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return null;
}

export function initialLocale(): Locale {
  return readStoredLocale() ?? detectBrowserLocale() ?? DEFAULT_LOCALE;
}
