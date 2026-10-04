import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // the docs site imports the library the way a consumer would
  resolve: {
    alias: {
      woozui: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/tests/setup.ts"],
    include: ["{src,site}/**/*.test.{ts,tsx}"],
  },
});
