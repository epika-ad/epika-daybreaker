import { cn } from "woozui";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CodeBlock,
  CopyButton,
  focus,
  PreviewCard,
  pill,
  SectionTitle,
  Stage,
} from "./parts";
import { components, example, featured, groups } from "./registry";

const install = "npm install woozui";

const brandButton = cn(
  "inline-flex h-12 items-center rounded-2xl bg-brand-solid px-6 font-semibold text-black text-sm transition-[filter] hover:brightness-95",
  focus,
);

export const Home = () => (
  <>
    <section className="relative flex min-h-[calc(100svh-6rem)] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <div
        aria-hidden="true"
        className="-translate-x-1/2 pointer-events-none absolute -translate-y-1/2 top-1/2 left-1/2 size-[44rem] max-w-none rounded-full bg-brand-solid/15 blur-[140px]"
      />
      <span
        className={cn(
          pill,
          "relative px-4 py-1.5 font-medium text-foreground-dimmed text-xs uppercase tracking-widest",
        )}
      >
        Free and open source
      </span>
      <h1 className="relative mt-8 max-w-4xl text-balance font-bold text-5xl leading-[0.95] tracking-tighter sm:text-7xl">
        Solid components, styled your way.
      </h1>
      <p className="relative mt-6 max-w-xl text-pretty text-foreground-dimmed text-lg">
        woozui is a React component library built on Tailwind CSS.{" "}
        {components.length} accessible components, one small set of tokens to
        make them yours.
      </p>
      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
        <div className="flex h-12 items-center gap-3 rounded-2xl border border-border bg-background-dimmed pr-2 pl-5 font-mono text-sm">
          {install}
          <CopyButton text={install} />
        </div>
        <a href="#/components" className={brandButton}>
          Browse components
        </a>
      </div>
    </section>

    <section className="mx-auto w-full max-w-6xl px-4 pb-24">
      <div className="flex items-end justify-between gap-4">
        <SectionTitle count={featured.length}>Featured</SectionTitle>
        <a
          href="#/components"
          className={cn(
            "flex items-center gap-1 rounded-md font-medium text-foreground-dimmed text-sm transition-colors hover:text-foreground",
            focus,
          )}
        >
          View all {components.length}
          <ArrowUpRightIcon />
        </a>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {components
          .filter((entry) => featured.some((slug) => slug === entry.slug))
          .map((entry) => (
            <PreviewCard key={entry.slug} entry={entry} />
          ))}
      </div>
    </section>
  </>
);

export const Components = () => (
  <div className="mx-auto w-full max-w-6xl px-4 pb-24">
    <header className="mx-auto max-w-2xl py-20 text-center">
      <h1 className="text-balance font-bold text-4xl tracking-tighter sm:text-5xl">
        {components.length} components, ready to use
      </h1>
      <p className="mt-4 text-pretty text-foreground-dimmed text-lg">
        Every preview below is live. Open one to see the code behind it.
      </p>
    </header>
    <div className="grid gap-16">
      {groups.map((group) => (
        <section key={group.name}>
          <SectionTitle count={group.components.length}>
            {group.name}
          </SectionTitle>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.components.map((entry) => (
              <PreviewCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
);

export const Component = ({ slug }: { slug: string }) => {
  const index = components.findIndex((entry) => entry.slug === slug);
  const entry = components[index];
  const found = example(slug);
  if (!entry || !found) return <Components />;

  const previous = components[index - 1];
  const next = components[index + 1];
  const link = cn(
    "flex items-center gap-2 rounded-md font-medium text-foreground-dimmed text-sm transition-colors hover:text-foreground",
    focus,
  );

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pt-14 pb-24">
      <a href="#/components" className={cn(link, "w-fit")}>
        <ArrowLeftIcon />
        Components
      </a>
      <h1 className="mt-8 font-bold text-4xl tracking-tighter sm:text-5xl">
        {entry.name}
      </h1>
      <p className="mt-3 text-foreground-dimmed text-lg">{entry.description}</p>

      <div className="mt-10">
        <Stage className="min-h-96">
          <found.Example />
        </Stage>
      </div>

      <h2 className="mt-12 font-semibold text-xl tracking-tight">Code</h2>
      <CodeBlock code={found.source} className="mt-4" />

      <nav
        aria-label="More components"
        className="mt-12 flex justify-between gap-4 border-border border-t pt-6"
      >
        {previous ? (
          <a href={`#/components/${previous.slug}`} className={link}>
            <ArrowLeftIcon />
            {previous.name}
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a href={`#/components/${next.slug}`} className={link}>
            {next.name}
            <ArrowUpRightIcon className="rotate-45" />
          </a>
        )}
      </nav>
    </article>
  );
};

const steps = [
  {
    title: "Install",
    body: "Add the package to a React 19 project.",
    code: install,
  },
  {
    title: "Add the styles",
    body: "If your app uses Tailwind CSS v4, import the theme after Tailwind. It registers the tokens and lets Tailwind find the classes the components use.",
    code: '@import "tailwindcss";\n@import "woozui/theme.css";',
  },
  {
    title: "No Tailwind?",
    body: "Import the precompiled stylesheet once, at the root of your app, instead.",
    code: 'import "woozui/styles.css";',
  },
  {
    title: "Add the providers",
    body: "Toasts and tooltips need their providers once, near the root.",
    code: 'import { ToastProvider, TooltipProvider } from "woozui";\n\nexport const Providers = ({ children }) => (\n  <TooltipProvider>\n    <ToastProvider>{children}</ToastProvider>\n  </TooltipProvider>\n);',
  },
  {
    title: "Make it yours",
    body: "Override the tokens to rebrand every component at once. Each component also accepts className, and classList for its inner parts.",
    code: ":root {\n  --wz-primary: oklch(0.6 0.2 150);\n  --wz-radius: 0.75rem;\n}",
  },
  {
    title: "Dark mode",
    body: "Add the dark class to the html element, or let ThemeProvider manage it and read the choice with useTheme.",
    code: 'import { ThemeProvider } from "woozui";\n\n<ThemeProvider defaultTheme="system">{children}</ThemeProvider>',
  },
] as const;

export const Docs = () => (
  <article className="mx-auto w-full max-w-3xl px-4 pt-20 pb-24">
    <h1 className="font-bold text-4xl tracking-tighter sm:text-5xl">
      Get started
    </h1>
    <p className="mt-3 text-foreground-dimmed text-lg">
      From install to a themed component in a few minutes.
    </p>
    <ol className="mt-12 grid gap-12">
      {steps.map((step, index) => (
        <li key={step.title}>
          <h2 className="font-semibold text-xl tracking-tight">
            <span className="text-brand">[{index + 1}]</span> {step.title}
          </h2>
          <p className="mt-2 text-foreground-dimmed">{step.body}</p>
          <CodeBlock code={step.code} className="mt-4" />
        </li>
      ))}
    </ol>
  </article>
);
