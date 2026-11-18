import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { prerender } from "./prerender";

const path = (relative: string) =>
  fileURLToPath(new URL(relative, import.meta.url));

export default defineConfig({
  root: path("."),
  // .env.local lives at the repo root
  envDir: path(".."),
  // absolute asset paths: pages live at nested addresses like /components/x
  base: "/",
  plugins: [react(), tailwindcss(), prerender()],
  // examples import "daybreaker" exactly as a consumer would
  resolve: {
    alias: {
      "daybreaker/charts": path("../src/charts.tsx"),
      daybreaker: path("../src/index.ts"),
    },
  },
  build: { outDir: path("../site-dist"), emptyOutDir: true },
});
