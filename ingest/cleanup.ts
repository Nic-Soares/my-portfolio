// Keeps the bucket tidy after a new catalog is published: the newest
// KEEP_VERSIONS catalog versions stay (rolling back is pointing
// current.json at one of them), and media no kept version uses is deleted.
import type { ObjectStore } from "./types.ts";

export const KEEP_VERSIONS = 10;
const CURRENT = "catalog/current.json";
const MEDIA_URL = /\/media\/([\w./-]+)/g;

export interface Cleanup {
  versions: string[];
  media: string[];
}

export async function cleanUp(
  store: ObjectStore,
  keep = KEEP_VERSIONS,
): Promise<Cleanup> {
  const decode = (bytes: Uint8Array) => new TextDecoder().decode(bytes);
  const pointer = await store.get(CURRENT);
  if (!pointer) return { versions: [], media: [] };
  const current = `catalog/${(JSON.parse(decode(pointer)) as { version: string }).version}.json`;

  // Version names start with their UTC time, so name order is age order
  const versions = (await store.list("catalog/"))
    .filter((key) => key !== CURRENT && key.endsWith(".json"))
    .sort();
  const kept = new Set(versions.slice(-keep));
  kept.add(current);
  const stale = versions.filter((key) => !kept.has(key));

  const referenced = new Set<string>();
  for (const key of kept) {
    const bytes = await store.get(key);
    // Never delete media when a kept catalog can't be read
    if (!bytes) throw new Error(`cleanup stopped: ${key} is unreadable`);
    for (const match of decode(bytes).matchAll(MEDIA_URL)) {
      referenced.add(`media/${match[1]}`);
    }
  }
  const orphans = (await store.list("media/")).filter(
    (key) => !referenced.has(key),
  );

  for (const key of [...stale, ...orphans]) await store.delete(key);
  return { versions: stale, media: orphans };
}
