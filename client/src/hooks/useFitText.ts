import { useLayoutEffect, useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider.tsx";

const STEP = 0.05;

// Shrinks the text of a fixed-size block until it fits, instead of letting
// it clip. Put the returned ref on the box that has the fixed size (and the
// `fit-text` class): its children are scaled down in 5% steps, never below
// `min`, while the box's content overflows. Re-runs when the box is resized
// and when the language changes (translations differ in length). A box that
// grows with its content never overflows, so it keeps the full size.
export function useFitText<T extends HTMLElement>(min = 0.75) {
  const ref = useRef<T>(null);
  const { locale } = useI18n();

  // biome-ignore lint/correctness/useExhaustiveDependencies: the locale changes the text to fit
  useLayoutEffect(() => {
    const box = ref.current;
    if (!box) return;

    const overflows = () =>
      box.scrollHeight > box.clientHeight + 1 ||
      box.scrollWidth > box.clientWidth + 1;

    const fit = () => {
      let scale = 1;
      box.style.setProperty("--fit-scale", "1");
      while (overflows() && scale - STEP >= min - 0.001) {
        scale -= STEP;
        box.style.setProperty("--fit-scale", scale.toFixed(2));
      }
    };

    fit();
    // No ResizeObserver (old browsers, jsdom): fit once on mount only
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [locale, min]);

  return ref;
}
