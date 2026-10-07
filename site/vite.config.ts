import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const path = (relative: string) =>
  fileURLToPath(new URL(relative, import.meta.url));

export default defineConfig({
  root: path("."),
  // relative asset paths, so the build works from any sub-path (GitHub Pages)
  base: "./",
  plugins: [react(), tailwindcss()],
  // examples import "woozui" exactly as a consumer would
  resolve: {
    alias: {
      "woozui/charts": path("../src/charts.tsx"),
      woozui: path("../src/index.ts"),
    },
  },
  build: { outDir: path("../site-dist"), emptyOutDir: true },
});
