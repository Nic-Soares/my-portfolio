// Translations keep the English structure: same keys, block types, ids,
// anchors, images and code — only the text differs. Used by ingestion for
// content.<locale>.json and by the About data's test.

// Values that must match exactly across languages; any other string is text
const KEEP = new Set([
  "type",
  "id",
  "anchorId",
  "slug",
  "areas",
  "src",
  "layout",
  "code",
  "language",
  "level",
  "snug",
  "ordered",
  "aspectRatio",
  "href",
  "email",
  "cvHref",
]);

export function shape(value: unknown, key = ""): unknown {
  if (Array.isArray(value)) return value.map((item) => shape(item, key));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([k]) => k !== "$schema")
        .map(([k, v]) => [k, shape(v, k)]),
    );
  }
  return KEEP.has(key) ? value : typeof value;
}

// The first path where `translated` stops matching `source`, or null
export function structureDiff(
  source: unknown,
  translated: unknown,
  path = "",
): string | null {
  const a = shape(source);
  const b = shape(translated);
  const walk = (x: unknown, y: unknown, at: string): string | null => {
    if (Array.isArray(x) || Array.isArray(y)) {
      if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length) {
        return `${at || "(root)"} has ${Array.isArray(y) ? y.length : "no"} items, English has ${Array.isArray(x) ? x.length : "none"}`;
      }
      for (let i = 0; i < x.length; i++) {
        const found = walk(x[i], y[i], `${at}[${i}]`);
        if (found) return found;
      }
      return null;
    }
    if (x && typeof x === "object" && y && typeof y === "object") {
      const keys = new Set([...Object.keys(x), ...Object.keys(y)]);
      for (const k of keys) {
        const found = walk(
          (x as Record<string, unknown>)[k],
          (y as Record<string, unknown>)[k],
          at ? `${at}.${k}` : k,
        );
        if (found) return found;
      }
      return null;
    }
    return x === y
      ? null
      : `${at || "(root)"} is ${JSON.stringify(y)}, English has ${JSON.stringify(x)}`;
  };
  return walk(a, b, path);
}
