// The client build (dist/client) and the fixtures' images from disk
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import type { AssetSource } from "../sources.ts";
import { findProjects } from "./fixtureCatalog.ts";

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

// A file under `root`, or null; never anything outside it
async function readInside(root: string, relative: string) {
  const file = normalize(join(root, relative));
  if (!file.startsWith(normalize(root) + sep)) return null;
  return readFile(file).catch(() => null);
}

export function fileAssets(distDir: string, fixturesDir: string): AssetSource {
  return {
    async get(path) {
      const decoded = decodeURIComponent(path);
      let body: Buffer | null = null;
      const media = /^\/media\/([a-z0-9-]+)\/(.+)$/.exec(decoded);
      if (media) {
        const folder = (await findProjects(fixturesDir)).get(media[1]);
        body = folder
          ? await readInside(join(folder, "images"), media[2])
          : null;
      } else {
        body = await readInside(distDir, decoded);
      }
      if (!body) return null;
      return new Response(new Uint8Array(body), {
        headers: {
          "Content-Type":
            TYPES[extname(decoded).toLowerCase()] ?? "application/octet-stream",
        },
      });
    },
    indexHtml: () => readFile(join(distDir, "index.html"), "utf8"),
  };
}
