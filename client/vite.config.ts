import { join } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { seoPages } from "./seo.plugin.ts";

const rootDir = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), seoPages()],
  css: {
    transformer: "lightningcss",
    lightningcss: {
      drafts: { customMedia: true },
    },
  },
  publicDir: "public",
  server: {
    fs: {
      allow: [join(rootDir, "..")],
    },
  },
  build: {
    outDir: join(rootDir, "../dist/client"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": join(rootDir, "src"),
      "@assets": join(rootDir, "src/assets"),
    },
  },
});
