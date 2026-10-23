// Writes the JSON Schemas that .portfolio/ files point at with "$schema"
// (npm run schema). schema.test.ts fails when they're out of date.
import { writeFile } from "node:fs/promises";
import { jsonSchemas } from "./jsonSchemas.ts";

for (const [file, schema] of Object.entries(jsonSchemas())) {
  await writeFile(
    new URL(file, import.meta.url),
    `${JSON.stringify(schema, null, 2)}\n`,
  );
}
