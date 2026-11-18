import type { ComponentType } from "react";

export { components, type Entry, type Group, groups } from "./catalog";

const modules = import.meta.glob<{ Example: ComponentType }>(
  "./examples/*.tsx",
  { eager: true },
);

// the same files again as text, so the code shown is the code that runs
const sources = import.meta.glob<string>("./examples/*.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const example = (slug: string) => {
  const key = `./examples/${slug}.tsx`;
  const Example = modules[key]?.Example;
  const source = sources[key];
  if (!Example || !source) return null;
  // lint suppressions are noise to a reader, so they are left out of the listing
  const lines = source
    .trim()
    .split("\n")
    .filter((line) => !line.includes("biome-ignore"));
  return { Example, source: lines.join("\n") };
};
