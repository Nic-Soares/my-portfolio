import { z } from "zod";
import { projectContent, projectManifest } from "../project.ts";

const MARKDOWN_NOTE =
  "Text fields are Markdown: **bold**, *italic*, `code`, [links](https://…), paragraphs and lists. No HTML.";

// File name → JSON Schema, generated from the Zod contract
export function jsonSchemas(): Record<string, unknown> {
  return {
    "project.v1.json": {
      title: "Portfolio project (.portfolio/project.json)",
      ...z.toJSONSchema(projectManifest, { io: "input" }),
    },
    "content.v1.json": {
      title: "Portfolio project content (.portfolio/content.<locale>.json)",
      description: MARKDOWN_NOTE,
      ...z.toJSONSchema(projectContent, { io: "input" }),
    },
  };
}
