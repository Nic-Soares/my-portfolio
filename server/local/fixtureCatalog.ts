// Builds the catalog from .portfolio/ folders on disk (server/fixtures/projects
// by default): the same validation ingestion does, minus the image
// conversion — images are served as they are, from /media/<slug>/.
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import {
  buildCatalog,
  LOCALES,
  type Locale,
  type SourceProject,
} from "../../shared/catalog.ts";
import {
  type ProjectContent,
  projectContent,
  projectManifest,
} from "../../shared/project.ts";
import type { CatalogSource } from "../sources.ts";

async function readJson(file: string): Promise<unknown> {
  return JSON.parse(await readFile(file, "utf8"));
}

async function exists(file: string): Promise<boolean> {
  return stat(file).then(
    () => true,
    () => false,
  );
}

// slug → the project's .portfolio/ folder
export async function findProjects(root: string): Promise<Map<string, string>> {
  const folders = new Map<string, string>();
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const folder = join(root, entry.name, ".portfolio");
    if (entry.isDirectory() && (await exists(folder))) {
      const manifest = projectManifest.parse(
        await readJson(join(folder, "project.json")),
      );
      folders.set(manifest.slug, folder);
    }
  }
  return folders;
}

export function fixtureCatalog(root: string): CatalogSource {
  return {
    async load() {
      const sources: SourceProject[] = [];
      const fingerprint: string[] = [];
      for (const [slug, folder] of await findProjects(root)) {
        const rawManifest = await readJson(join(folder, "project.json"));
        const manifest = projectManifest.parse(rawManifest);
        fingerprint.push(JSON.stringify(rawManifest));
        const contents: Partial<Record<Locale, ProjectContent>> = {};
        for (const locale of LOCALES) {
          const file = join(folder, `content.${locale}.json`);
          if (!(await exists(file))) continue;
          const raw = await readJson(file);
          fingerprint.push(JSON.stringify(raw));
          const result = projectContent.safeParse(raw);
          if (!result.success) {
            throw new Error(
              `${slug} content.${locale}.json: ${result.error.issues
                .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
                .join("; ")}`,
            );
          }
          contents[locale] = result.data;
        }
        if (!contents.en)
          throw new Error(`${slug}: content.en.json is missing`);
        sources.push({
          manifest,
          contents: { ...contents, en: contents.en },
          resolve: (path) => ({
            src: `/media/${slug}/${path.replace(/^images\//, "")}`,
          }),
        });
      }
      const digest = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(fingerprint.join("\n")),
      );
      const version = [...new Uint8Array(digest).slice(0, 6)]
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      return buildCatalog(sources, version);
    },
  };
}
