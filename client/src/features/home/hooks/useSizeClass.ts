import { useEffect, useState } from "react";

export type SizeClass = "compact" | "medium" | "large" | "extra-large";

// Same thresholds as styles/breakpoints.css (custom media can't be read in JS)
const QUERIES: [SizeClass, string][] = [
  ["compact", "(width < 600px)"],
  ["medium", "(600px <= width < 1200px)"],
  ["large", "(1200px <= width < 1600px)"],
];

function current(): SizeClass {
  for (const [sizeClass, query] of QUERIES) {
    if (window.matchMedia(query).matches) return sizeClass;
  }
  return "extra-large";
}

// The M3 size class for the viewport, for props CSS can't switch (e.g. Button size)
export function useSizeClass(): SizeClass {
  const [sizeClass, setSizeClass] = useState(current);

  useEffect(() => {
    const lists = QUERIES.map(([, query]) => window.matchMedia(query));
    const update = () => setSizeClass(current());
    for (const list of lists) list.addEventListener("change", update);
    return () => {
      for (const list of lists) list.removeEventListener("change", update);
    };
  }, []);

  return sizeClass;
}
