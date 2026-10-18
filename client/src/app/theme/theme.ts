// Theme preference: an explicit choice, or "system" to follow the OS.
// The inline script in index.html repeats this logic to avoid a flash of
// the wrong theme before React loads — keep both in sync.
export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

export function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
  return "system";
}

export function storePreference(preference: ThemePreference): void {
  try {
    if (preference === "system") {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, preference);
    }
  } catch {
    // The choice still applies for this visit.
  }
}

export function getSystemTheme(): ResolvedTheme {
  return window.matchMedia?.(DARK_QUERY).matches ? "dark" : "light";
}

export function watchSystemTheme(
  onChange: (theme: ResolvedTheme) => void,
): () => void {
  const query = window.matchMedia?.(DARK_QUERY);
  if (!query) return () => {};

  const listener = (event: MediaQueryListEvent) =>
    onChange(event.matches ? "dark" : "light");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

// Picks up a choice saved in another tab or frame (e.g. the gallery preview).
export function watchStoredPreference(
  onChange: (preference: ThemePreference) => void,
): () => void {
  const listener = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) {
      onChange(readStoredPreference());
    }
  };
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}

// The palettes in styles/themes/*.css are scoped to body[data-theme="Light|Dark"].
export function applyTheme(theme: ResolvedTheme): void {
  document.body.dataset.theme = theme === "dark" ? "Dark" : "Light";
}
