import type { ComponentType } from "react";

export type Entry = { slug: string; name: string; description: string };

export type Group = { name: string; components: readonly Entry[] };

export const groups: readonly Group[] = [
  {
    name: "Actions",
    components: [
      {
        slug: "button",
        name: "Button",
        description: "Six variants, three sizes, and a loading state.",
      },
      {
        slug: "toggle",
        name: "Toggle",
        description: "A button that stays pressed.",
      },
    ],
  },
  {
    name: "Forms",
    components: [
      {
        slug: "field",
        name: "Field",
        description: "A control with its label, hint, and error message.",
      },
      {
        slug: "input",
        name: "Input",
        description: "A single-line text input.",
      },
      {
        slug: "textarea",
        name: "Textarea",
        description: "A multi-line text input.",
      },
      {
        slug: "select",
        name: "Select",
        description: "Pick one option from a list.",
      },
      {
        slug: "checkbox",
        name: "Checkbox",
        description: "Checked, unchecked, or indeterminate.",
      },
      {
        slug: "radio",
        name: "Radio",
        description: "Pick exactly one of a few options.",
      },
      {
        slug: "switch",
        name: "Switch",
        description: "Turn a setting on or off.",
      },
      {
        slug: "slider",
        name: "Slider",
        description: "Choose a value or a range by dragging.",
      },
    ],
  },
  {
    name: "Overlays",
    components: [
      {
        slug: "dialog",
        name: "Dialog",
        description: "A modal window that traps focus.",
      },
      {
        slug: "alert-dialog",
        name: "Alert Dialog",
        description: "A modal that requires a decision.",
      },
      {
        slug: "popover",
        name: "Popover",
        description: "A floating panel anchored to a trigger.",
      },
      {
        slug: "tooltip",
        name: "Tooltip",
        description: "A short hint on hover or focus.",
      },
      {
        slug: "menu",
        name: "Menu",
        description: "A dropdown list of actions.",
      },
      {
        slug: "toast",
        name: "Toast",
        description: "A brief message that dismisses itself.",
      },
    ],
  },
  {
    name: "Navigation",
    components: [
      {
        slug: "tabs",
        name: "Tabs",
        description: "Switch between panels of content.",
      },
      {
        slug: "accordion",
        name: "Accordion",
        description: "Stacked sections that expand and collapse.",
      },
      {
        slug: "breadcrumb",
        name: "Breadcrumb",
        description: "Shows where a page sits in the hierarchy.",
      },
    ],
  },
  {
    name: "Display",
    components: [
      {
        slug: "card",
        name: "Card",
        description: "A surface that groups related content.",
      },
      {
        slug: "badge",
        name: "Badge",
        description: "A small label for status or counts.",
      },
      {
        slug: "avatar",
        name: "Avatar",
        description: "A profile image with a fallback.",
      },
      {
        slug: "alert",
        name: "Alert",
        description: "An inline message in four tones.",
      },
      {
        slug: "table",
        name: "Table",
        description: "Rows and columns of data.",
      },
      {
        slug: "separator",
        name: "Separator",
        description: "A line that divides content.",
      },
      {
        slug: "kbd",
        name: "Kbd",
        description: "A keyboard key, for shortcuts.",
      },
      {
        slug: "progress",
        name: "Progress",
        description: "How far along a task is.",
      },
      {
        slug: "skeleton",
        name: "Skeleton",
        description: "A placeholder while content loads.",
      },
      {
        slug: "spinner",
        name: "Spinner",
        description: "An indicator that work is in progress.",
      },
    ],
  },
];

export const components: readonly Entry[] = groups.flatMap(
  (group) => group.components,
);

export const featured = [
  "dialog",
  "select",
  "tabs",
  "switch",
  "toast",
  "menu",
] as const;

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
