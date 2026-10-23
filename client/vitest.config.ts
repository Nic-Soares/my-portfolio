import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import svgr from "vite-plugin-svgr";

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
    include: ["client/src/**/*.test.{ts,tsx}", "shared/**/*.test.ts"],
    setupFiles: "./src/test/setup.ts",
  },
});
