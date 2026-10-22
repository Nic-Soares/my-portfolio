import { useLayoutEffect, useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import { type SizeClass, useSizeClass } from "./useSizeClass.ts";

const STEP = 0.05;
const px = (value: number) => `${Math.round(value * 100) / 100}px`;

// Line budget per size class; a missing size class has no limit
export type LineBudget = number | Partial<Record<SizeClass, number>>;

// Keeps a headline-level text within a number of lines, so switching
// language doesn't reflow the layout: a longer translation shrinks its font
// (5% steps, never below `min`) instead of taking another line. The budget
// is the number of lines the English copy uses. Body text is left alone:
// paragraphs grow, they don't shrink.
export function useFitLines<T extends HTMLElement>(
  budget: LineBudget,
  min = 0.8,
) {
  const ref = useRef<T>(null);
  const { locale } = useI18n();
  const sizeClass = useSizeClass();
  const maxLines = typeof budget === "number" ? budget : budget[sizeClass];

  // biome-ignore lint/correctness/useExhaustiveDependencies: the locale changes the text to fit
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const fit = () => {
      // Measure at the size the type styles give
      element.style.fontSize = "";
      element.style.lineHeight = "";
      element.style.letterSpacing = "";
      if (maxLines === undefined) return;

      const style = getComputedStyle(element);
      const fontSize = Number.parseFloat(style.fontSize);
      const lineHeight = Number.parseFloat(style.lineHeight);
      const tracking = Number.parseFloat(style.letterSpacing) || 0;
      if (!fontSize || !lineHeight) return;

      const lines = (scale: number) =>
        Math.round(
          element.getBoundingClientRect().height / (lineHeight * scale),
        );

      let scale = 1;
      while (lines(scale) > maxLines && scale - STEP >= min - 0.001) {
        scale -= STEP;
        element.style.fontSize = px(fontSize * scale);
        element.style.lineHeight = px(lineHeight * scale);
        element.style.letterSpacing = px(tracking * scale);
      }
    };

    fit();
    // Re-fit when the width changes (observing the parent: the element's own
    // size changes as it fits). No ResizeObserver (old browsers, jsdom): once.
    const parent = element.parentElement;
    if (!parent || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [locale, maxLines, min]);

  return ref;
}
