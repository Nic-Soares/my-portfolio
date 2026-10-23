import { join } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const rootDir = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    transformer: "lightningcss",
    lightningcss: {
      drafts: { customMedia: true },
    },
  },
  publicDir: "public",
  server: {
    // The API and the published images come from the local server
    // (npm run ingest:local && npm run serve, in another terminal)
    proxy: {
      "/api": "http://localhost:3000",
      "/media": "http://localhost:3000",
    },
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
      "@shared": join(rootDir, "../shared"),
    },
  },
});
