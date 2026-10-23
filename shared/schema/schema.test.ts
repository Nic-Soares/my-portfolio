import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { jsonSchemas } from "./jsonSchemas.ts";

describe("published JSON Schemas", () => {
  for (const [file, schema] of Object.entries(jsonSchemas())) {
    it(`${file} is up to date (npm run schema)`, async () => {
      const written = await readFile(new URL(file, import.meta.url), "utf8");
      expect(JSON.parse(written)).toEqual(JSON.parse(JSON.stringify(schema)));
    });
  }
});
