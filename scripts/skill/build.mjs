// Builds the daybreaker agent skill from the library itself, so it never
// drifts from the code:
//   skill/daybreaker/                 the skill folder (Claude, Claude Code)
//   skill/daybreaker.zip              the same, zipped for upload to claude.ai
//   skill/daybreaker-single-file.md   everything in one file, for ChatGPT
//                                     projects, custom GPTs and other agents
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const read = (path) => readFileSync(path, "utf8");
const out = "skill/daybreaker";
const version = JSON.parse(read("package.json")).version;

// ---- the registry: groups, names and one-line descriptions ----
const registry = read("site/registry.ts");
const groups = [];
for (const block of registry
  .slice(0, registry.indexOf("];"))
  .split(/\n {2}\{\n {4}name: /)
  .slice(1)) {
  const name = block.match(/^"([^"]+)"/)[1];
  const entries = [
    ...block.matchAll(
      /slug: "([^"]+)",\s+name: "([^"]+)",\s+description:\s*"([^"]+)"/g,
    ),
  ].map(([, slug, title, description]) => ({ slug, title, description }));
  groups.push({ name, entries });
}
const count = groups.reduce((sum, group) => sum + group.entries.length, 0);

// ---- the public API: which file exports each name, and its Props type ----
const sources = [
  ...readdirSync("src/components").map((file) => `src/components/${file}`),
  "src/charts.tsx",
];
const owner = new Map();
const props = new Map();
for (const path of sources) {
  const code = read(path);
  for (const [, name] of code.matchAll(
    /^export (?:const|type|function) ([A-Za-z]\w*)/gm,
  ))
    owner.set(name, path);
  // `export namespace Button { export type Props = …; }`
  for (const match of code.matchAll(
    /^export namespace (\w+) \{\n([\s\S]*?)^\}/gm,
  ))
    props.set(match[1], match[2].replace(/^ {2}/gm, "").trim());
}
// defaults written in a component's parameters, e.g. `pageSize = 5`
const defaults = new Map();
for (const path of sources) {
  const code = read(path);
  for (const match of code.matchAll(
    /^export const (\w+) = (?:<[^(]*>)?\(\{([\s\S]*?)\}: \1\.Props/gm,
  )) {
    const found = [
      ...match[2].matchAll(/^\s+([\w"-]+)(?:: \w+)? = ([^,\n]+),?$/gm),
    ].map(
      ([, name, value]) => `\`${name.replaceAll('"', "")} = ${value.trim()}\``,
    );
    if (found.length) defaults.set(match[1], found.join(", "));
  }
}

// variant values written with cva, keyed by the component that uses them
const variants = new Map();
for (const path of sources) {
  const code = read(path);
  for (const match of code.matchAll(
    /const (\w+)Variants = cva\([\s\S]*?variants: \{([\s\S]*?)\n {4}\},\n {4}defaultVariants: (\{[^}]*\})/g,
  )) {
    const axes = [
      ...match[2].matchAll(/^ {6}(\w+): \{([\s\S]*?)^ {6}\}/gm),
    ].map(
      ([, axis, body]) =>
        `${axis}: ${[...body.matchAll(/^ {8}(?:"([^"]+)"|(\w+)):/gm)]
          .map((m) => `"${m[1] ?? m[2]}"`)
          .join(" | ")}`,
    );
    const component = match[1][0].toUpperCase() + match[1].slice(1);
    variants.set(component, `${axes.join("; ")} (defaults ${match[3]})`);
  }
}

const imports = (source) =>
  [
    ...source.matchAll(
      /import\s*\{([^}]*)\}\s*from\s*"(daybreaker(?:\/charts)?)"/g,
    ),
  ].flatMap(([, names, from]) =>
    names
      .split(",")
      .map((name) => name.replace(/^\s*type\s+/, "").trim())
      .filter(Boolean)
      .map((name) => ({ name, from })),
  );

// ---- references/components.md ----
const icons = [
  ...read("src/icons.tsx").matchAll(/^export const (\w+Icon)/gm),
].map((m) => m[1]);
// each part's API is printed once: under the entry named after its source
// file when there is one (Avatar under Avatar), else where it first appears
const examples = new Map(
  groups.flatMap((group) =>
    group.entries.map((entry) => {
      const source = read(`site/examples/${entry.slug}.tsx`).trim();
      return [entry.slug, { source, used: imports(source) }];
    }),
  ),
);
const home = new Map();
const base = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.tsx$/, "");
for (const [slug, { used }] of examples)
  for (const { name } of used)
    if (owner.has(name) && base(owner.get(name)) === slug) home.set(name, slug);
for (const [slug, { used }] of examples)
  for (const { name } of used) if (!home.has(name)) home.set(name, slug);

let components = `# daybreaker components

Every component in daybreaker v${version}, by group. Each entry has what the component is for, what to import, the Props of each part, and the working example from the docs site. Search for a component's name to jump to it.

`;
for (const group of groups) {
  components += `## ${group.name}\n\n`;
  for (const entry of group.entries) {
    const { source, used: all } = examples.get(entry.slug);
    const used = all.filter(({ name }) => !name.endsWith("Icon"));
    const from = [...new Set(used.map((item) => item.from))];
    components += `### ${entry.title}\n\n${entry.description}\n\n`;
    if (used.length)
      components += `Import from ${from.map((f) => `\`"${f}"\``).join(" and ")}: ${used.map((item) => `\`${item.name}\``).join(", ")}.\n\n`;
    const own = used.filter(
      (item) => props.has(item.name) && home.get(item.name) === entry.slug,
    );
    const variantLines = own
      .filter((item) => variants.has(item.name))
      .map((item) => `- \`${item.name}\`: ${variants.get(item.name)}`);
    if (variantLines.length)
      components += `Variants:\n\n${variantLines.join("\n")}\n\n`;
    const defaultLines = own
      .filter((item) => defaults.has(item.name))
      .map((item) => `- \`${item.name}\`: ${defaults.get(item.name)}`);
    if (defaultLines.length)
      components += `Defaults:\n\n${defaultLines.join("\n")}\n\n`;
    if (own.length) {
      components += "Props:\n\n```ts\n";
      components += own
        .map((item) => `// ${item.name}\n${props.get(item.name)}`)
        .join("\n\n");
      components += "\n```\n\n";
    }
    components += `Example:\n\n\`\`\`tsx\n${source}\n\`\`\`\n\n`;
  }
}
components += `## Icons\n\nAll from \`"daybreaker"\`, 16px by default (\`size-4\`), drawn in \`currentColor\`. Size them with a class: \`<PlusIcon className="size-5" />\`.\n\n${icons.map((icon) => `\`${icon}\``).join(", ")}.\n`;

// Props types refer to Base UI's own; say where to look them up
components = components.replace(
  "Search for a component's name to jump to it.",
  "Search for a component's name to jump to it. Each part's Props appear once, under the component it belongs to. Props written as `Styled<XPrimitive.Part.Props>` are Base UI's props for that part (see base-ui.com), with `className` narrowed to a string.",
);

// ---- references/tokens.md ----
const theme = read("src/styles/theme.css");
const block = (selector) =>
  theme.slice(theme.indexOf(`${selector} {`)).split("\n}")[0];
const values = (text) =>
  Object.fromEntries(
    [...text.matchAll(/^\s+--wz-([\w-]+):\s*([^;]+);/gm)].map(([, k, v]) => [
      k,
      v.replace(/\s+/g, " ").trim(),
    ]),
  );
const light = values(block(":root"));
const dark = values(block(".dark"));
const rows = Object.keys(light)
  .filter((key) => !["spring", "glide", "smooth"].includes(key))
  .map(
    (key) =>
      `| \`--wz-${key}\` | ${key === "radius" ? "`rounded-control`" : `\`*-${key}\``} | \`${light[key]}\` | \`${dark[key] ?? "same"}\` |`,
  )
  .join("\n");
const tokens = `# daybreaker tokens

Override any \`--wz-*\` variable to rebrand. Components read only these, so light and dark follow for free. In Tailwind, colours are available as \`bg-*\`, \`text-*\`, \`border-*\` and so on (for example \`bg-primary\`, \`text-foreground-dimmed\`, \`border-border\`).

| Variable | Tailwind | Light | Dark |
| --- | --- | --- | --- |
${rows}

Radii from \`--wz-radius\`: \`rounded-control\` (the radius), \`rounded-item\` (radius − 4px, for items inside a surface) and \`rounded-surface\` (radius × 1.75, for cards and panels).

Easings: \`ease-spring\` (quick rise with overshoot), \`ease-glide\` (damped spring, for things that travel) and \`ease-smooth\` (no overshoot, for sizes).

\`accent\` and \`border\` are translucent on purpose, so they sit on any background.
`;

// ---- SKILL.md ----
const groupTable = `| Group | Components |\n| --- | --- |\n${groups
  .map((g) => `| ${g.name} | ${g.entries.map((e) => e.title).join(", ")} |`)
  .join("\n")}`;
const skill = read("scripts/skill/SKILL.template.md")
  .replaceAll("{{count}}", String(count))
  .replaceAll("{{version}}", version)
  .replaceAll("{{icons}}", String(icons.length))
  .replace("{{groups}}", groupTable);

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "references"), { recursive: true });
writeFileSync(join(out, "SKILL.md"), skill);
writeFileSync(join(out, "references/components.md"), components);
writeFileSync(join(out, "references/tokens.md"), tokens);

// one file for agents that take a single document instead of a skill folder
const body = skill.replace(/^---[\s\S]*?---\n/, "");
writeFileSync(
  "skill/daybreaker-single-file.md",
  `${body
    .replaceAll(
      "[references/components.md](references/components.md)",
      "the components reference below",
    )
    .replaceAll(
      "[references/tokens.md](references/tokens.md)",
      "the tokens reference below",
    )}\n---\n\n${tokens}\n---\n\n${components}`,
);

// the zip claude.ai expects: the skill folder at the root of the archive
rmSync("skill/daybreaker.zip", { force: true });
// bsdtar (Windows, macOS) writes a zip when the name ends in .zip
try {
  execFileSync("tar", ["-a", "-c", "-f", "daybreaker.zip", "daybreaker"], {
    cwd: "skill",
  });
} catch {
  console.warn("skill: could not zip; zip skill/daybreaker by hand");
}

console.log(
  `skill: ${count} components, ${icons.length} icons, v${version} → ${out}`,
);
