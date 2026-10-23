import { markdownProblems } from "@shared/markdown.ts";
import { describe, expect, it } from "vitest";
import { projectsByLocale } from "./index.ts";

// Text fields are Markdown (ADR-008): no HTML, links only over https
const TEXT_KEYS = new Set(["text", "caption", "items", "headers", "rows"]);

function textProblems(value: unknown, key = "", path = ""): string[] {
  if (typeof value === "string") {
    return TEXT_KEYS.has(key)
      ? markdownProblems(value).map((problem) => `${path}: ${problem}`)
      : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => textProblems(item, key, `${path}[${i}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) =>
      textProblems(v, k, path ? `${path}.${k}` : k),
    );
  }
  return [];
}

describe("project text is safe Markdown", () => {
  for (const locale of ["en", "pt", "es"] as const) {
    it(locale, () => {
      expect(textProblems(projectsByLocale[locale])).toEqual([]);
    });
  }
});
