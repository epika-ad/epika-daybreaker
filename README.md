# woozui

Accessible React components styled with Tailwind CSS. Keyboard navigation, focus management and screen reader support are built in (via [Base UI](https://base-ui.com)); the look is driven by a small set of design tokens you can override.

## Install

```sh
npm install woozui
```

Requires React 19.

## Set up styles

**With Tailwind CSS v4** — import the theme after Tailwind. It registers the tokens and tells Tailwind to scan the library's classes:

```css
@import "tailwindcss";
@import "woozui/theme.css";
```

**Without Tailwind** — import the precompiled stylesheet once, at the root of your app:

```ts
import "woozui/styles.css";
```

## Use

```tsx
import { Button, Dialog, DialogPopup, DialogTitle, DialogTrigger } from "woozui";

export const Example = () => (
  <Dialog>
    <DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
    <DialogPopup>
      <DialogTitle>Hello</DialogTitle>
    </DialogPopup>
  </Dialog>
);
```

Toasts and tooltips need their providers once, near the root:

```tsx
import { ToastProvider, TooltipProvider } from "woozui";

export const Providers = ({ children }) => (
  <TooltipProvider>
    <ToastProvider>{children}</ToastProvider>
  </TooltipProvider>
);
```

## Components

| Group      | Components                                                                              |
| ---------- | --------------------------------------------------------------------------------------- |
| Actions    | Button, Toggle                                                                          |
| Forms      | Field, Input, Textarea, Select, Checkbox, Radio, Switch, Slider                         |
| Overlays   | Dialog, AlertDialog, Popover, Tooltip, Menu, Toast                                      |
| Navigation | Tabs, Accordion, Breadcrumb                                                             |
| Display    | Card, Badge, Avatar, Alert, Table, Separator, Kbd, Progress, Skeleton, Spinner          |
| Utilities  | ThemeProvider, `useTheme`, `useToast`, `cn`, `cva`, icons                                |

## Customize

Every component accepts `className`; components with inner parts also accept `classList` to target them:

```tsx
<Checkbox classList={{ root: "size-6", indicator: "text-white" }} />
```

To rebrand, override the tokens:

```css
:root {
  --wz-primary: oklch(0.6 0.2 150);
  --wz-radius: 0.75rem;
}
```

The full token list lives in [src/styles/theme.css](src/styles/theme.css).

## Dark mode

Add the `dark` class to `<html>`, or let `ThemeProvider` manage it (light, dark, or follow the system) and read it with `useTheme()`.

## Develop

```sh
npm install
npm run dev        # Storybook at http://localhost:6006
npm test           # unit tests
npm run lint       # Biome
npm run typecheck
npm run build      # dist/ (JS, types, theme.css, styles.css)
```

## Release

Releases use [Changesets](https://github.com/changesets/changesets).

1. Describe your change: `npm run changeset`
2. Merge to `main`. CI opens a "Version Packages" pull request.
3. Merge that pull request. CI publishes to npm.

Publishing from CI needs an `NPM_TOKEN` repository secret.

## License

MIT
