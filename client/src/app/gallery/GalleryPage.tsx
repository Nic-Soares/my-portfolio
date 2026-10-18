import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@/app/theme/ThemeProvider.tsx";
import type { ThemePreference } from "@/app/theme/theme.ts";
import styles from "./Gallery.module.css";
import GalleryContent from "./GalleryContent.tsx";

// Preview widths mirror the Figma frames (one per size class).
const WIDTHS = [
  { label: "Extra-large · 1920", value: 1920 },
  { label: "Large · 1512", value: 1512 },
  { label: "Medium · 744", value: 744 },
  { label: "Compact · 402", value: 402 },
] as const;

const THEMES: { label: string; value: ThemePreference }[] = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

/**
 * Dev-only gallery (/__gallery). The components render inside an iframe so
 * the media queries respond to the chosen width; `?frame` renders that
 * inner document. The theme syncs to the iframe through localStorage.
 */
export default function GalleryPage() {
  const [params] = useSearchParams();
  const { theme, setTheme } = useTheme();
  const [width, setWidth] = useState<number>(1512);

  if (params.has("frame")) {
    return (
      <main className={styles.frame}>
        <GalleryContent />
      </main>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.toolbar}>
        <h1 className="title-large">Component gallery</h1>
        <fieldset className={styles.group}>
          <legend className="label-medium">Theme</legend>
          {THEMES.map((option) => (
            <button
              key={option.value}
              type="button"
              className={styles.toggle}
              aria-pressed={theme === option.value}
              onClick={() => setTheme(option.value)}
            >
              {option.label}
            </button>
          ))}
        </fieldset>
        <fieldset className={styles.group}>
          <legend className="label-medium">Width</legend>
          {WIDTHS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={styles.toggle}
              aria-pressed={width === option.value}
              onClick={() => setWidth(option.value)}
            >
              {option.label}
            </button>
          ))}
        </fieldset>
      </header>
      <div className={styles.viewport}>
        <iframe
          className={styles.preview}
          title="Component preview"
          src="/__gallery?frame"
          style={{ width }}
        />
      </div>
    </div>
  );
}
