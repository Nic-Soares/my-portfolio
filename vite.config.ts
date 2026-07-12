import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "jsr:@std/path@^1";
import svgr from "vite-plugin-svgr";

const rootDir = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  root: "client",
  publicDir: "public",
  build: {
    outDir: join(rootDir, "dist/client"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": join(rootDir, "client/src"),
      "@assets": join(rootDir, "client/src/assets"),
    },
  },
});
