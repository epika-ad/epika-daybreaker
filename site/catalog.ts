// The component list as plain data, readable outside Vite (the build reads it
// to write a page and a sitemap entry per component).
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
        slug: "form",
        name: "Form",
        description: "Fields that validate together on submit.",
      },
      {
        slug: "label",
        name: "Label",
        description: "Text that names a control.",
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
        slug: "native-select",
        name: "Native Select",
        description: "The browser select, styled to match.",
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
    name: "Conversation",
    components: [
      {
        slug: "message",
        name: "Message",
        description: "A row in a conversation, with avatar and header.",
      },
      {
        slug: "bubble",
        name: "Bubble",
        description: "A chat bubble in seven styles, with reactions.",
      },
      {
        slug: "marker",
        name: "Marker",
        description: "A status line or labelled divider in a thread.",
      },
      {
        slug: "attachment",
        name: "Attachment",
        description: "A file or image with upload state and actions.",
      },
      {
        slug: "message-scroller",
        name: "Message Scroller",
        description: "A transcript that follows new messages.",
      },
      {
        slug: "questionnaire",
        name: "Questionnaire",
        description: "Questions asked one at a time.",
      },
    ],
  },
  {
    name: "Charts",
    components: [
      {
        slug: "area-chart",
        name: "Area Charts",
        description: "Nine area charts: stacked, stepped, gradient and more.",
      },
      {
        slug: "bar-chart",
        name: "Bar Charts",
        description: "Nine bar charts: grouped, stacked, horizontal and more.",
      },
      {
        slug: "line-chart",
        name: "Line Charts",
        description:
          "Nine line charts: multiple series, dots, labels and more.",
      },
      {
        slug: "pie-chart",
        name: "Pie Charts",
        description: "Nine pie and donut charts.",
      },
      {
        slug: "radar-chart",
        name: "Radar Charts",
        description: "Nine radar charts.",
      },
      {
        slug: "radial-chart",
        name: "Radial Charts",
        description: "Nine radial bar charts.",
      },
      {
        slug: "chart-tooltip",
        name: "Chart Tooltips",
        description: "Nine ways to style a chart's tooltip.",
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
        slug: "resizable",
        name: "Resizable",
        description: "Panels with a draggable divider.",
      },
      {
        slug: "typography",
        name: "Typography",
        description: "Readable styles for long-form text.",
      },
      {
        slug: "direction",
        name: "Direction",
        description: "Right-to-left support for everything inside it.",
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
        slug: "data-table",
        name: "Data Table",
        description: "A table that sorts, filters, and paginates.",
      },
      {
        slug: "chart",
        name: "Chart",
        description: "A small bar or line chart.",
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
