// Runs the server on your machine: the build from dist/client, the catalog
// and images from .data/store, written by the ingestion:
// `npm run build && npm run ingest:local && npm run serve`.
import { join } from "node:path";
import { serve } from "@hono/node-server";
import { aboutData } from "../client/src/features/about/data/about.data.ts";
import { en } from "../client/src/i18n/locales/en.ts";
import { folderStore } from "../ingest/stores.ts";
import { createApp } from "./app.ts";
import { fileAssets } from "./local/fileAssets.ts";
import { cachedCatalog } from "./sources.ts";
import { storeCatalog } from "./storeCatalog.ts";

const root = join(import.meta.dirname, "..");
const port = Number(process.env.PORT ?? 3000);
const storeDir = process.env.STORE_DIR ?? join(root, ".data/store");
const store = folderStore(storeDir);

const app = createApp({
  // Short cache locally, so a new ingestion shows up on reload
  catalog: cachedCatalog(
    storeCatalog((key) => store.get(key)),
    2_000,
  ),
  assets: fileAssets(join(root, "dist/client"), join(storeDir, "media")),
  siteUrl: (process.env.SITE_URL ?? `http://localhost:${port}`).replace(
    /\/+$/,
    "",
  ),
  texts: en,
  person: aboutData,
});

serve({ fetch: app.fetch, port }, () => {
  console.log(`Portfolio server on http://localhost:${port}`);
});
