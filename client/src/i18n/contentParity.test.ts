import { shape } from "@shared/parity.ts";
import { describe, expect, it } from "vitest";
import { aboutData } from "@/features/about/data/about.data.ts";
import { aboutDataEs } from "@/features/about/data/about.es.data.ts";
import { aboutDataPt } from "@/features/about/data/about.pt.data.ts";

// Project translations are checked by ingestion (content.<locale>.json)
describe("translated About data keeps the English structure", () => {
  it("about pt", () => expect(shape(aboutDataPt)).toEqual(shape(aboutData)));
  it("about es", () => expect(shape(aboutDataEs)).toEqual(shape(aboutData)));
});
