// Runs the server on your machine: the build from dist/client, the catalog
// from server/fixtures/projects. `npm run build && npm run serve`.
import { join } from "node:path";
import { serve } from "@hono/node-server";
import { aboutData } from "../client/src/features/about/data/about.data.ts";
import { en } from "../client/src/i18n/locales/en.ts";
import { createApp } from "./app.ts";
import { fileAssets } from "./local/fileAssets.ts";
import { fixtureCatalog } from "./local/fixtureCatalog.ts";
import { cachedCatalog } from "./sources.ts";

const root = join(import.meta.dirname, "..");
const port = Number(process.env.PORT ?? 3000);
const fixtures =
  process.env.PROJECTS_DIR ?? join(root, "server/fixtures/projects");

const app = createApp({
  // Short cache locally, so edits to the fixtures show up on reload
  catalog: cachedCatalog(fixtureCatalog(fixtures), 2_000),
  assets: fileAssets(join(root, "dist/client"), fixtures),
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
