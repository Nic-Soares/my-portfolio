import { useEffect, useState } from "react";

// Distance from the viewport top where a section counts as "current": below
// the sticky tab bar (and the top app bar below Large)
const ACTIVE_OFFSET = 160;

// Scroll spy for the summary: the last section whose heading has passed the
// offset, or the last one once the page is scrolled to the bottom
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const sectionIds = key ? key.split("|") : [];
    if (sectionIds.length === 0) {
      setActiveId(null);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const topBar =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--top-app-bar-height",
          ),
        ) || 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      let current: string | null = null;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= topBar + ACTIVE_OFFSET) {
          current = id;
        }
      }
      if (atBottom) current = sectionIds[sectionIds.length - 1];
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);

  return activeId;
}
