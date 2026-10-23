import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@shared": fileURLToPath(new URL("../shared", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    // client/src and shared/ (run from client/)
    dir: fileURLToPath(new URL("..", import.meta.url)),
    include: [
      "client/src/**/*.test.{ts,tsx}",
      "shared/**/*.test.ts",
      "server/**/*.test.ts",
      "ingest/**/*.test.ts",
    ],
    setupFiles: "./src/test/setup.ts",
  },
});
