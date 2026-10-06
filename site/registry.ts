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
        description: "Six variants, four sizes, icons, and a loading state.",
      },
      {
        slug: "toggle",
        name: "Toggle",
        description: "A button that stays pressed.",
      },
      {
        slug: "toggle-group",
        name: "Toggle Group",
        description: "Toggles joined into one segmented control.",
      },
      {
        slug: "button-group",
        name: "Button Group",
        description: "Buttons joined into one control.",
      },
      {
        slug: "toolbar",
        name: "Toolbar",
        description: "A row of controls that share one tab stop.",
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
        slug: "input-group",
        name: "Input Group",
        description: "An input with icons, units, or buttons attached.",
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
        slug: "combobox",
        name: "Combobox",
        description: "A select you can type in to filter.",
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
      {
        slug: "number-field",
        name: "Number Field",
        description: "A number with stepper buttons.",
      },
      {
        slug: "otp-field",
        name: "OTP Field",
        description: "One box per character of a one-time code.",
      },
      {
        slug: "fieldset",
        name: "Fieldset",
        description: "Related fields under one legend.",
      },
      {
        slug: "calendar",
        name: "Calendar",
        description: "A month grid for picking a date.",
      },
      {
        slug: "date-picker",
        name: "Date Picker",
        description: "A button that opens a calendar.",
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
        slug: "drawer",
        name: "Drawer",
        description: "A sheet from the bottom or a side that swipes away.",
      },
      {
        slug: "command",
        name: "Command",
        description: "A searchable palette of actions.",
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
        slug: "preview-card",
        name: "Preview Card",
        description: "A card that previews a link on hover.",
      },
      {
        slug: "menu",
        name: "Menu",
        description: "A dropdown of actions, with icons, selection, or flags.",
      },
      {
        slug: "context-menu",
        name: "Context Menu",
        description: "A menu that opens on right-click.",
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
        slug: "navbar",
        name: "Navbar",
        description: "A floating bar for brand, links, and actions.",
      },
      {
        slug: "navigation-menu",
        name: "Navigation Menu",
        description: "Links that open panels of more links.",
      },
      {
        slug: "menubar",
        name: "Menubar",
        description: "A row of menus, like File and Edit.",
      },
      {
        slug: "sidebar",
        name: "Sidebar",
        description: "A vertical panel of navigation links.",
      },
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
        slug: "collapsible",
        name: "Collapsible",
        description: "One section that expands and collapses.",
      },
      {
        slug: "breadcrumb",
        name: "Breadcrumb",
        description: "Shows where a page sits in the hierarchy.",
      },
      {
        slug: "pagination",
        name: "Pagination",
        description: "Move between pages of results.",
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
        slug: "item",
        name: "Item",
        description: "Rows with media, text, and actions.",
      },
      {
        slug: "empty",
        name: "Empty",
        description: "A placeholder for a view with nothing in it.",
      },
      {
        slug: "carousel",
        name: "Carousel",
        description: "Slides you swipe or step through.",
      },
      {
        slug: "aspect-ratio",
        name: "Aspect Ratio",
        description: "Content held at a fixed ratio.",
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
        slug: "scroll-area",
        name: "Scroll Area",
        description: "A scrolling region with a thin scrollbar.",
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
        slug: "meter",
        name: "Meter",
        description: "A measurement within a known range.",
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
