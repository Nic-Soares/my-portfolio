import { describe, expect, it } from "vitest";
import { aboutData } from "@/features/about/data/about.data.ts";
import { aboutDataEs } from "@/features/about/data/about.es.data.ts";
import { aboutDataPt } from "@/features/about/data/about.pt.data.ts";
import { projectsByLocale } from "@/features/work/data/projects/index.ts";

// Structure without text: keys, types, ids, slugs, areas, src, layout, code
const KEEP = new Set([
  "type",
  "id",
  "anchorId",
  "slug",
  "areas",
  "src",
  "layout",
  "code",
  "level",
  "snug",
  "href",
  "email",
  "cvHref",
]);
function shape(v: unknown, key = ""): unknown {
  if (Array.isArray(v)) return v.map((x) => shape(x, key));
  if (v && typeof v === "object")
    return Object.fromEntries(
      Object.entries(v).map(([k, x]) => [k, shape(x, k)]),
    );
  return KEEP.has(key) ? v : typeof v;
}
describe("translated data keeps the English structure", () => {
  for (const locale of ["pt", "es"] as const) {
    it(`projects ${locale}`, () =>
      expect(shape(projectsByLocale[locale])).toEqual(
        shape(projectsByLocale.en),
      ));
  }
  it("about pt", () => expect(shape(aboutDataPt)).toEqual(shape(aboutData)));
  it("about es", () => expect(shape(aboutDataEs)).toEqual(shape(aboutData)));
});
