import {
  cn,
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
} from "daybreaker";
import { type ReactNode, useEffect, useRef } from "react";
import { Landing } from "./landing";

export { Docs } from "./docs";

import {
  AgentMenu,
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CopyAction,
  focus,
  install,
  PreviewCard,
  SectionTitle,
  Stage,
} from "./parts";
import { components, type Entry, example, groups } from "./registry";

export const Home = () => <Landing />;

const sections = [
  { href: "/docs", route: "/docs", label: "Introduction" },
  { href: "/components", route: "/components", label: "Components" },
] as const;

/** The docs and component pages, beside a sidebar that lists all of them. */
export const Browse = ({ route, children }: Browse.Props) => {
  const panel = useRef<HTMLElement>(null);

  // bring the current page's item into view when it is scrolled out of sight,
  // e.g. on a direct link or after following "next"
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs again whenever the route changes
  useEffect(() => {
    const list = panel.current;
    const item = list?.querySelector<HTMLElement>("[aria-current]");
    if (!list || !item) return;
    const hidden =
      item.offsetTop < list.scrollTop ||
      item.offsetTop + item.offsetHeight > list.scrollTop + list.clientHeight;
    if (hidden) list.scrollTop = item.offsetTop - list.clientHeight / 2;
  }, [route]);

  return (
    <div className="mx-auto flex w-full max-w-[90rem] items-start gap-6 px-4">
      <Sidebar
        ref={panel}
        aria-label="Documentation"
        className="sticky top-24 mt-10 hidden max-h-[calc(100svh-7rem)] w-60 shrink-0 gap-6 overflow-y-auto overscroll-contain bg-transparent lg:flex"
      >
        <SidebarGroup>
          <SidebarGroupLabel>Sections</SidebarGroupLabel>
          {sections.map((section) => (
            <SidebarItem
              key={section.href}
              href={section.href}
              current={section.route === route}
            >
              {section.label}
            </SidebarItem>
          ))}
        </SidebarGroup>
        {groups.map((group) => (
          <SidebarGroup key={group.name}>
            <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
            {group.components.map((entry) => (
              <SidebarItem
                key={entry.slug}
                href={`/components/${entry.slug}`}
                current={route === `/components/${entry.slug}`}
              >
                {entry.name}
              </SidebarItem>
            ))}
          </SidebarGroup>
        ))}
      </Sidebar>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
};
export namespace Browse {
  export type Props = { route: string; children: ReactNode };
}

export const Components = () => (
  <div className="mx-auto w-full max-w-6xl pb-24">
    <header className="max-w-2xl py-14">
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
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {group.components.map((entry) => (
              <PreviewCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
);

// a component's page as an agent wants it: plain Markdown, code included
const markdown = (entry: Entry, source: string) =>
  [
    `# ${entry.name}`,
    entry.description,
    `Part of daybreaker, a React component library styled with Tailwind CSS. Install it with \`${install}\`.`,
    "## Example",
    `\`\`\`tsx\n${source}\n\`\`\``,
  ].join("\n\n");

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
    <article className="mx-auto w-full max-w-3xl pt-14 pb-24">
      {/* the sidebar does this job once there is room for it */}
      <a href="/components" className={cn(link, "w-fit lg:hidden")}>
        <ArrowLeftIcon />
        Components
      </a>
      <h1 className="mt-8 font-bold text-4xl tracking-tighter sm:text-5xl lg:mt-0">
        {entry.name}
      </h1>
      <p className="mt-3 text-foreground-dimmed text-lg">{entry.description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <CopyAction text={found.source}>Copy code</CopyAction>
        <AgentMenu name={entry.name} markdown={markdown(entry, found.source)} />
      </div>

      <div className="mt-10">
        <Stage className="min-h-96">
          <found.Example />
        </Stage>
      </div>

      <nav
        aria-label="More components"
        className="mt-12 flex justify-between gap-4 border-border border-t pt-6"
      >
        {previous ? (
          <a href={`/components/${previous.slug}`} className={link}>
            <ArrowLeftIcon />
            {previous.name}
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a href={`/components/${next.slug}`} className={link}>
            {next.name}
            <ArrowUpRightIcon className="rotate-45" />
          </a>
        )}
      </nav>
    </article>
  );
};
