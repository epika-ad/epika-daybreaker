import {
  Button,
  Dialog,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
} from "daybreaker";
import type { ReactNode } from "react";
import { ArrowUpRightIcon, CodeBlock, focus, install, Stage } from "./parts";
import { components } from "./registry";

const facts = [
  { value: String(components.length), label: "components" },
  { value: "React 19", label: "and nothing older" },
  { value: "Tailwind v4", label: "or one plain stylesheet" },
  { value: "Light + dark", label: "from one set of tokens" },
] as const;

const styles = {
  tailwind: '@import "tailwindcss";\n@import "daybreaker/theme.css";',
  plain: 'import "daybreaker/styles.css";',
} as const;

const providers = `import { ToastProvider, TooltipProvider } from "daybreaker";

export const Providers = ({ children }) => (
  <TooltipProvider>
    <ToastProvider>{children}</ToastProvider>
  </TooltipProvider>
);`;

const usage = `import {
  Button,
  Dialog,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "daybreaker";

export const Example = () => (
  <Dialog>
    <DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
    <DialogPopup>
      <DialogTitle>Hello</DialogTitle>
      <DialogDescription>Focus is trapped until you close me.</DialogDescription>
    </DialogPopup>
  </Dialog>
);`;

const rebrand = `:root {
  --wz-primary: oklch(0.6 0.2 150);
  --wz-radius: 0.75rem;
}`;

const classes = `<Button className="w-full">Full width</Button>

<Checkbox classList={{ root: "size-6", indicator: "text-white" }} />`;

const theme = `import { ThemeProvider } from "daybreaker";

<ThemeProvider defaultTheme="system">{children}</ThemeProvider>`;

const layout = `// app/layout.tsx
import "daybreaker/styles.css"; // or theme.css from your Tailwind entry
import { ThemeProvider, ToastProvider, TooltipProvider } from "daybreaker";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <ToastProvider>{children}</ToastProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}`;

// the tokens most worth knowing, drawn with the values in use right now
const tokens = [
  { name: "background", swatch: "bg-background" },
  { name: "background-dimmed", swatch: "bg-background-dimmed" },
  { name: "foreground", swatch: "bg-foreground" },
  { name: "primary", swatch: "bg-primary" },
  { name: "accent", swatch: "bg-accent" },
  { name: "success", swatch: "bg-success" },
  { name: "warning", swatch: "bg-warning" },
  { name: "error", swatch: "bg-error" },
] as const;

const Code = ({ children }: { children: ReactNode }) => (
  <code className="rounded-md bg-accent px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
    {children}
  </code>
);

const Section = ({ step, title, children }: Section.Props) => (
  <section className="grid grid-cols-1 gap-4">
    <h2 className="font-semibold text-2xl tracking-tight">
      {step !== undefined && <span className="text-brand">[{step}] </span>}
      {title}
    </h2>
    {children}
  </section>
);
namespace Section {
  export type Props = { step?: number; title: string; children: ReactNode };
}

const Text = ({ children }: { children: ReactNode }) => (
  <p className="max-w-prose text-pretty text-foreground-dimmed">{children}</p>
);

export const Docs = () => (
  <article className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-16 pt-14 pb-24">
    <header>
      <p className="font-medium text-brand text-sm">Introduction</p>
      <h1 className="mt-2 font-bold text-4xl tracking-tighter sm:text-5xl">
        Get started
      </h1>
      <p className="mt-4 max-w-prose text-pretty text-foreground-dimmed text-lg">
        daybreaker is Epika's React component library. Keyboard navigation,
        focus management and screen reader support come from Base UI; the look
        comes from a small set of tokens you can override.
      </p>
      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-control border border-border bg-background-dimmed p-4"
          >
            <dt className="sr-only">{fact.label}</dt>
            <dd className="font-semibold text-lg tracking-tight">
              {fact.value}
            </dd>
            <dd className="mt-0.5 text-foreground-dimmed text-xs">
              {fact.label}
            </dd>
          </div>
        ))}
      </dl>
    </header>

    <Section step={1} title="Install">
      <Text>Add the package to a React 19 project.</Text>
      <CodeBlock code={install} />
    </Section>

    <Section step={2} title="Add the styles">
      <Text>
        Pick the one that matches your app. With Tailwind CSS v4 the theme
        registers the tokens and lets Tailwind find the classes the components
        use. Without Tailwind, one precompiled stylesheet covers everything.
      </Text>
      <Tabs defaultValue="tailwind">
        <TabsList>
          <Tab value="tailwind">Tailwind CSS v4</Tab>
          <Tab value="plain">No Tailwind</Tab>
        </TabsList>
        <TabsPanel value="tailwind">
          <CodeBlock code={styles.tailwind} />
        </TabsPanel>
        <TabsPanel value="plain">
          <CodeBlock code={styles.plain} />
        </TabsPanel>
      </Tabs>
    </Section>

    <Section step={3} title="Add the providers">
      <Text>Toasts and tooltips need their providers once, near the root.</Text>
      <CodeBlock code={providers} />
    </Section>

    <Section step={4} title="Use a component">
      <Text>
        Import what you need. Components made of several parts are exported as
        separate pieces you put together, like this dialog.
      </Text>
      <Stage className="min-h-40">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Open
          </DialogTrigger>
          <DialogPopup>
            <DialogTitle>Hello</DialogTitle>
            <DialogDescription>
              Focus is trapped until you close me.
            </DialogDescription>
          </DialogPopup>
        </Dialog>
      </Stage>
      <CodeBlock code={usage} />
    </Section>

    <Section title="Make it yours">
      <Text>
        Every colour and radius is a token. Override a token and every component
        follows, in light and dark.
      </Text>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tokens.map((token) => (
          <li key={token.name} className="grid gap-2">
            <span
              className={`h-12 rounded-item border border-border ${token.swatch}`}
            />
            <span className="truncate font-mono text-foreground-dimmed text-xs">
              --wz-{token.name}
            </span>
          </li>
        ))}
      </ul>
      <CodeBlock code={rebrand} />
      <Text>
        For one-off changes every component takes <Code>className</Code>, and
        components with inner parts take <Code>classList</Code> to reach them.
      </Text>
      <CodeBlock code={classes} />
    </Section>

    <Section title="Dark mode">
      <Text>
        Add the <Code>dark</Code> class to the <Code>html</Code> element
        yourself, or let <Code>ThemeProvider</Code> manage it (light, dark, or
        follow the system) and read the choice with <Code>useTheme</Code>.
      </Text>
      <CodeBlock code={theme} />
    </Section>

    <Section title="Next.js and other frameworks">
      <Text>
        daybreaker is a plain ESM React package, checked in Vite and in the
        Next.js App Router. The whole bundle is marked <Code>"use client"</Code>
        , so you can import a component straight into a Server Component and it
        renders on the server and hydrates in the browser.
      </Text>
      <CodeBlock code={layout} />
      <Text>Two rules from React Server Components still apply:</Text>
      <ul className="grid max-w-prose list-disc gap-2 pl-5 text-foreground-dimmed">
        <li>
          Helpers such as <Code>cn</Code>, <Code>cva</Code> and{" "}
          <Code>buttonVariants</Code> cannot be called inside a Server
          Component. Call them from a file that starts with{" "}
          <Code>"use client"</Code>.
        </li>
        <li>
          Props that are functions, such as <Code>onClick</Code> or a
          DataTable's <Code>rowKey</Code>, have to be passed from a Client
          Component.
        </li>
      </ul>
    </Section>

    <a
      href="/components"
      className={`group flex items-center justify-between rounded-surface border border-border bg-background-dimmed p-6 transition-colors hover:border-brand ${focus}`}
    >
      <span>
        <span className="block font-semibold text-lg tracking-tight">
          Browse the components
        </span>
        <span className="text-foreground-dimmed text-sm">
          {components.length} live previews, each with the code behind it.
        </span>
      </span>
      <ArrowUpRightIcon className="group-hover:-translate-y-0.5 size-5 text-brand transition-transform group-hover:translate-x-0.5" />
    </a>
  </article>
);
