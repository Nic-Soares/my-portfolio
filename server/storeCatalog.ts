import type { Catalog } from "../shared/catalog.ts";
import type { CatalogSource } from "./sources.ts";

// Reads only: get one key, or null when it doesn't exist
export type ReadObject = (key: string) => Promise<Uint8Array | null>;

// The catalog ingestion published: catalog/current.json points at a version
export function storeCatalog(read: ReadObject): CatalogSource {
  const json = async (key: string) => {
    const bytes = await read(key);
    if (!bytes) throw new Error(`${key} not found; run the ingestion first`);
    return JSON.parse(new TextDecoder().decode(bytes));
  };
  return {
    async load() {
      const { version } = (await json("catalog/current.json")) as {
        version: string;
      };
      return (await json(`catalog/${version}.json`)) as Catalog;
    },
  };
}
