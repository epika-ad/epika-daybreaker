import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "es2022",
  // tsup sets baseUrl internally, which TypeScript 6 flags as deprecated
  dts: { compilerOptions: { ignoreDeprecations: "6.0" } },
  sourcemap: true,
  clean: true,
  // every component is interactive, so the whole bundle is a client module
  banner: { js: '"use client";' },
});
