---
name: daybreaker
description: Build React interfaces with daybreaker, Epika's library of 76 accessible React components (Base UI underneath, styled with Tailwind CSS v4, light and dark themes from one set of tokens). Use this skill whenever the user mentions daybreaker, imports from "daybreaker" or "daybreaker/charts", or asks for a screen, form, dialog, menu, table, dashboard, chart, settings page or any other React UI in a project that has daybreaker installed, even if they don't name the library. Also use it to install daybreaker, theme or rebrand it, set it up in Next.js, or pick the right component for a job.
---

# daybreaker

daybreaker (v1.0.0) is a React 19 component library made by [Epika](https://epika.ad): 76 components, each a thin, accessible layer over [Base UI](https://base-ui.com) or plain HTML, styled with Tailwind CSS and driven by a few design tokens. It is MIT licensed.

Use the components the library already has instead of hand-rolling markup. They carry keyboard support, focus management and screen reader semantics that are easy to get wrong by hand, and they stay on brand in both themes.

## Before writing code

1. **Pick components from the list below.** For the exact API of a component (its parts, props, variants and a working example), read its entry in [references/components.md](references/components.md). Search that file for the component's name instead of reading it all; it is long.
2. **Copy the example's shape.** Every entry's example is the code the docs site renders, so it is known to work. Adapt it rather than inventing a structure.
3. **Check the setup once** (next section) if the project may not have daybreaker installed yet.

## Setup

```sh
npm install daybreaker
```

Requires React 19. Charts additionally need `npm install recharts`.

Styles, one of the two:

```css
/* with Tailwind CSS v4: import the theme after Tailwind */
@import "tailwindcss";
@import "daybreaker/theme.css";
```

```ts
// without Tailwind: the precompiled stylesheet, once at the root
import "daybreaker/styles.css";
```

Toasts and tooltips need their providers once, near the root. `ThemeProvider` is optional; it manages the `dark` class and remembers the choice.

```tsx
import { ThemeProvider, ToastProvider, TooltipProvider } from "daybreaker";

export const Providers = ({ children }) => (
  <ThemeProvider defaultTheme="system">
    <TooltipProvider>
      <ToastProvider>{children}</ToastProvider>
    </TooltipProvider>
  </ThemeProvider>
);
```

## Components

| Group | Components |
| --- | --- |
| Actions | Button, Toggle, Toggle Group, Button Group, Toolbar |
| Forms | Field, Form, Label, Input, Input Group, Textarea, Select, Native Select, Combobox, Checkbox, Radio, Switch, Slider, Number Field, OTP Field, Fieldset, Calendar, Date Picker |
| Overlays | Dialog, Alert Dialog, Drawer, Command, Popover, Tooltip, Preview Card, Menu, Context Menu, Toast |
| Navigation | Navbar, Navigation Menu, Menubar, Sidebar, Tabs, Accordion, Collapsible, Breadcrumb, Pagination |
| Conversation | Message, Bubble, Marker, Attachment, Message Scroller, Questionnaire |
| Charts | Area Charts, Bar Charts, Line Charts, Pie Charts, Radar Charts, Radial Charts, Chart Tooltips |
| Display | Card, Item, Empty, Carousel, Aspect Ratio, Resizable, Typography, Direction, Badge, Avatar, Alert, Table, Data Table, Chart, Separator, Scroll Area, Kbd, Progress, Meter, Skeleton, Spinner |

Charts (Area, Bar, Line, Pie, Radar, Radial, Chart Tooltip) come from `"daybreaker/charts"` and wrap Recharts. The small `Chart` in Display is built in and needs no Recharts; prefer it for a single simple series.

Also exported from `"daybreaker"`: `ThemeProvider`, `useTheme`, `useToast`, `DirectionProvider`, `cn` (class merging), `cva` and `VariantProps`, and 23 icons (`CheckIcon`, `PlusIcon`, `SearchIcon` and so on; see the end of the components reference).

## How the components work

These patterns cover most of what goes wrong when the library is used from memory.

- **Compound components.** Overlays and complex controls are exported as parts you assemble, such as `Dialog` → `DialogTrigger` → `DialogPopup` → `DialogTitle`. Don't look for a single `<Dialog title=… />`.
- **`render` instead of `asChild`.** To make a trigger render as another element, pass it in `render`: `<DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>`.
- **Links styled as buttons.** `<Button nativeButton={false} render={<a href="/docs" />}>Docs</Button>`. Without `nativeButton={false}`, Base UI warns because an anchor is not a button.
- **Styling.** Every component takes `className`, merged with `cn` so later Tailwind classes win. Components with inner parts also take `classList` to reach them: `<Checkbox classList={{ root: "size-6", indicator: "text-white" }} />`.
- **Variants.** Button, Badge, Avatar, Alert, Bubble and Marker take a `variant` and/or `size` prop; the reference lists the values. `buttonVariants()` gives a Button's classes for elements that can't be a Button.
- **Names for controls.** Icon-only buttons, sliders, switches and checkboxes without a visible label need `aria-label`. Wrap a control and its text in `Field` + `FieldLabel` (library inputs) or a plain `<label>` (checkbox rows) so clicking the text works.
- **Toasts.** `const toast = useToast(); toast.add({ type: "success", title, description })`. `type` is `"success" | "error" | "warning" | "info"`. `useToast` throws outside a `ToastProvider`, so make sure the app root has one (see Setup).
- **Controlled or not.** Stateful parts follow Base UI: pass `defaultValue` / `defaultOpen` to let the component hold its state, or `value` + `onValueChange` / `open` + `onOpenChange` to hold it yourself. To close a dialog after a form inside it submits, control it: `const [open, setOpen] = useState(false)` with `<Dialog open={open} onOpenChange={setOpen}>`, then `setOpen(false)` in the submit handler.

## Forms

- `Field` + `FieldLabel` (+ `FieldDescription`, `FieldError`) label the library's own inputs: `Input`, `Select`, `Combobox`, `NumberField`, `Checkbox`, `Switch`, `Slider`, `RadioGroup`. Clicking the label focuses the control, and the label names it for screen readers, so no extra `aria-label` is needed inside a `Field`.
- Every form control takes `name` and submits through a normal `<form>` and `FormData`, `Select` and `Combobox` included (put `name` on the root: `<Select name="role">`).
- `Select` and `Combobox` take `items`: an array of `{ value, label }`, so the trigger can show the label of the chosen value. Render one `SelectItem` per item with the same `value`.
- `Form` is a `<form>` that collects each `Field`'s validation and shows `FieldError` messages on submit; a plain `<form>` is fine when you validate yourself.
- `Textarea` is a styled native `<textarea>`; wrap it in a plain `<label>` for its name.

## Layout and navigation

- The library has no page shell. Lay pages out with Tailwind: a settings page is typically `<div className="flex gap-6">` with `<Sidebar className="w-60 shrink-0">` and `<main className="min-w-0 flex-1">`.
- `SidebarItem` and `NavbarLink` render a link when given `href`, and a keyboard-accessible button when given only `onClick`. Use `href` to change pages, `onClick` to switch sections in place. Mark the current one with `current`.
- For headings and body text inside your own layout, use plain elements with token classes (`text-foreground`, `text-foreground-dimmed`, `font-semibold tracking-tight`). `Prose` (Typography) is for long-form content such as rendered Markdown.
- `Tabs` switch panels within one view; `Sidebar` and `Navbar` move between views.

## Icons

The library ships 23 icons it uses itself (listed at the end of the components reference). They are plain SVG components, and every component that shows an icon takes any SVG as a child, so for anything missing (settings, billing, users) use an icon set the project already has, such as `lucide-react`, sized `size-4`.

## Theming

Colours and radii are CSS variables. Components read only these, so overriding them rebrands everything, in both themes:

```css
:root {
  --wz-primary: oklch(0.6 0.2 150);
  --wz-radius: 0.75rem;
}
.dark {
  --wz-primary: oklch(0.7 0.18 150);
}
```

In Tailwind they are available as `bg-primary`, `text-foreground-dimmed`, `border-border`, `rounded-control` and so on. Use these token classes rather than raw colours, so custom UI also follows the theme and dark mode. The full list is in [references/tokens.md](references/tokens.md).

Dark mode is the `dark` class on `<html>`: set it yourself, or let `ThemeProvider` do it and read or change it with `const [theme, setTheme] = useTheme()`.

## Next.js and Server Components

The bundle is marked `"use client"`, so components can be imported straight into a Server Component in the App Router and render on the server. Two rules from React Server Components still apply:

- Helpers (`cn`, `cva`, `buttonVariants`) can't be called inside a Server Component. Call them in a file that starts with `"use client"`.
- Function props (`onClick`, `onValueChange`, a DataTable's `rowKey` or `cell`) must be passed from a Client Component. Put interactive pieces in their own `"use client"` file.

Put the providers in `app/layout.tsx`. For a dark default without a flash, also put `className="dark"` on `<html>`.

## Quick example

```tsx
import {
  Button,
  Field,
  FieldLabel,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  useToast,
} from "daybreaker";

export const Invite = () => {
  const toast = useToast();
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Invite a teammate</CardTitle>
        <CardDescription>They get an email with a link to join.</CardDescription>
      </CardHeader>
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          toast.add({ type: "success", title: "Invite sent" });
        }}
      >
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input name="email" type="email" required placeholder="ada@company.com" />
        </Field>
        <Button type="submit">Send invite</Button>
      </form>
    </Card>
  );
};
```
