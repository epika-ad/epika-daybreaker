import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  BellIcon,
  Bubble,
  BubbleContent,
  Button,
  ButtonGroup,
  buttonVariants,
  Calendar,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Chart,
  Checkbox,
  CheckIcon,
  ChevronDownIcon,
  cn,
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
  Field,
  FieldLabel,
  HomeIcon,
  InboxIcon,
  Input,
  InputGroup,
  InputGroupAddon,
  Kbd,
  Meter,
  PlusIcon,
  Radio,
  RadioGroup,
  SearchIcon,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  Slider,
  Switch,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
  Textarea,
  UserIcon,
  useTheme,
  useToast,
} from "daybreaker";
import {
  type ComponentType,
  type CSSProperties,
  type FormEvent,
  Fragment,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { version } from "../package.json";
import {
  ArrowUpRightIcon,
  agency,
  ChatGPTIcon,
  ClaudeIcon,
  CodeBlock,
  CopyButton,
  focus,
  Logo,
  MarkdownIcon,
  pill,
} from "./parts";
import { components, example } from "./registry";

const install = "npm install daybreaker";

// headings across the page: bold and tight, ending on a red full stop
const display = "font-semibold tracking-tighter";

const Stop = () => <span className="text-brand">.</span>;

// every section shares one column, so everything lines up on the same edges
const column = "mx-auto w-full max-w-7xl px-4 sm:px-6";

/**
 * Set like epika.ad's: a red line over a big two-line headline that comes into
 * focus, then a ruled line with the pitch on one side and the way in on the
 * other.
 */
/** A line of the headline whose words come into focus one after another. */
const Words = ({ text, from, last }: Words.Props) =>
  text.split(" ").map((word, index, all) => (
    <Fragment key={word}>
      <span
        className="inline-block animate-focus-in motion-reduce:animate-none"
        style={{ animationDelay: `${from + index * 70}ms` }}
      >
        {word}
        {index === all.length - 1 && last}
      </span>
      {index < all.length - 1 && " "}
    </Fragment>
  ));
namespace Words {
  export type Props = { text: string; from: number; last?: ReactNode };
}

const facts = [
  `v${version}`,
  "React 19",
  "Tailwind CSS v4",
  "Base UI",
  "MIT",
] as const;

/**
 * Like the strongest kit sites (Untitled UI, Aceternity, HeroUI): a short bold
 * pitch on the left, and the product itself on the right, as a tilted wall of
 * the real components drifting past.
 */
const Hero = () => (
  <section className="relative isolate overflow-hidden">
    <div
      className={cn(
        column,
        "relative z-10 flex flex-col justify-center pt-12 pb-4 sm:pt-16 lg:min-h-[min(calc(100svh-4rem),54rem)] lg:py-24",
      )}
    >
      <div className="flex max-w-xl flex-col items-start">
        <a
          href="#/components/questionnaire"
          className={cn(
            pill,
            "flex animate-focus-in items-center gap-2 py-1 pr-3 pl-1 text-sm transition-colors hover:border-brand motion-reduce:animate-none",
            focus,
          )}
        >
          <span className="rounded-full bg-brand px-2 py-0.5 font-medium text-primary-foreground text-xs">
            New
          </span>
          Questionnaire component
          <ArrowUpRightIcon className="size-3.5 rotate-45 text-foreground-dimmed" />
        </a>
        {/* on wide screens each sentence keeps to one line, running out over
            the faded edge of the wall */}
        <h1 className="mt-7 text-balance font-semibold text-5xl leading-[1.02] tracking-tighter sm:text-6xl xl:w-max xl:text-[4rem]">
          <Words text="The kit we build client work on." from={120} />{" "}
          <br className="max-xl:hidden" />
          <Words text="Now it's yours" from={540} last={<Stop />} />
        </h1>
        <p className="mt-6 max-w-lg animate-focus-in text-pretty text-foreground-dimmed text-lg motion-reduce:animate-none [animation-delay:500ms] sm:text-xl">
          {components.length} accessible React components from Epika, a creative
          studio in Tirana. Built on Base UI, styled with Tailwind CSS v4, MIT
          licensed. Free, and no, there's no catch.
        </p>
        <div className="mt-9 flex animate-focus-in flex-wrap items-center gap-3 motion-reduce:animate-none [animation-delay:620ms]">
          <a href="#/docs" className={buttonVariants({ size: "lg" })}>
            Get started
            <ArrowUpRightIcon className="rotate-45" />
          </a>
          <a
            href="#/components"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Browse components
          </a>
        </div>
        <a
          href="#/figma"
          className={cn(
            "group mt-4 flex animate-focus-in items-center gap-1 rounded-sm text-foreground-dimmed text-sm transition-colors hover:text-foreground motion-reduce:animate-none [animation-delay:680ms]",
            focus,
          )}
        >
          Working in Figma? Get the file
          <ArrowUpRightIcon className="size-3.5 rotate-45 text-brand transition-transform group-hover:translate-x-0.5" />
        </a>
        <div
          className={cn(
            pill,
            "mt-4 flex h-10 animate-focus-in items-center gap-2 pr-1 pl-4 font-mono text-sm motion-reduce:animate-none [animation-delay:720ms]",
          )}
        >
          <span aria-hidden="true" className="text-brand">
            $
          </span>
          {install}
          <CopyButton text={install} className="rounded-full" />
        </div>
        <ul className="mt-10 flex animate-focus-in flex-wrap items-center gap-x-3 gap-y-1 text-foreground-dimmed text-sm motion-reduce:animate-none [animation-delay:820ms]">
          {facts.map((fact, index) => (
            <li key={fact} className="flex items-center gap-3">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="size-1 rounded-full bg-border"
                />
              )}
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Isometric
      stacks={[
        [Budget, Controls, Reach],
        [Schedule, Notifications, Chat],
        [Analytics, Brief, Start],
        [Cap, Survey, Navigation],
      ]}
      className="relative h-[30rem] lg:absolute lg:inset-y-0 lg:right-0 lg:left-[44%] lg:h-auto"
    />
  </section>
);

/**
 * The tilted wall beside the headline. The cards are the real components but
 * only a picture here, so the wall is hidden from assistive technology and
 * cannot be focused; the same components are usable further down the page.
 */
// how many times each column repeats: one copy always sits above the view,
// so the loop never shows a column's start or end
const copies = ["first", "second", "third"] as const;

const Isometric = ({ stacks, className }: Isometric.Props) => {
  // an extra column on each side, so the tilted wall never shows its edges
  const columns = [stacks.at(-1), ...stacks, stacks[0]].filter(
    (stack) => stack !== undefined,
  );
  return (
    <div
      aria-hidden="true"
      inert
      className={cn("pointer-events-none select-none", className)}
    >
      {/* masked rather than covered, so it fades into any background */}
      <div className="wall-fade absolute inset-0 overflow-hidden">
        <div
          // items-start: a stretched column would no longer be exactly three
          // copies tall, and its loop would jump
          className="absolute top-1/2 left-1/2 flex w-max items-start gap-6"
          style={{
            transform:
              "translate(-44.7%, -50%) rotateX(50deg) rotateZ(-36deg) scale(0.92)",
          }}
        >
          {columns.map((stack, column) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: the side columns repeat a stack, so its place is what tells them apart
              key={column}
              // the bottom padding matches the gap, so every copy is exactly
              // one third of the column and the loop lands without a jump
              className={cn(
                "flex w-80 animate-drift flex-col gap-6 pb-6 motion-reduce:animate-none",
                column % 2 === 1 && "[animation-direction:reverse]",
              )}
              style={{ "--copies": copies.length } as CSSProperties}
            >
              {copies.flatMap((copy) =>
                stack.map((Card) => (
                  <div
                    key={`${copy}-${Card.name}`}
                    className="drop-shadow-[0_24px_40px_rgb(53_10_63/0.10)]"
                  >
                    <Card />
                  </div>
                )),
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
namespace Isometric {
  export type Props = {
    /** Columns of live cards. */
    stacks: readonly (readonly ComponentType[])[];
    className?: string;
  };
}

// Every card on the wall is the real component, wired up enough to play with.

const Panel = ({ slug, className, children }: Panel.Props) => {
  const found = example(slug);
  const entry = components.find((item) => item.slug === slug);

  return (
    <Card className="gap-0 border border-border bg-background p-0">
      {entry && (
        <header className="flex items-center justify-between gap-3 px-5 py-2">
          <a
            href={`#/components/${slug}`}
            className={cn(
              "rounded-sm font-medium text-foreground-dimmed text-xs transition-colors hover:text-foreground",
              focus,
            )}
          >
            {entry.name}
          </a>
          {found && (
            <CopyButton
              text={found.source}
              label={`Copy ${entry.name} code`}
              className="-mr-1.5"
            />
          )}
        </header>
      )}
      <div
        className={cn("flex flex-1 flex-col gap-5 px-5 pt-1 pb-5", className)}
      >
        {children}
      </div>
    </Card>
  );
};
namespace Panel {
  export type Props = {
    /** The component whose example the card's copy button hands over. */
    slug: string;
    className?: string;
    children: ReactNode;
  };
}

const Controls = () => (
  <Panel slug="button">
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm">
        Button
        <ArrowUpRightIcon />
      </Button>
      <Button size="sm" variant="secondary">
        Secondary
      </Button>
      <Button size="sm" variant="outline">
        Outline
      </Button>
    </div>
    <InputGroup>
      <Input aria-label="Name" placeholder="Name" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
    <Textarea aria-label="Message" placeholder="Message" />
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
    <div className="flex items-center justify-between gap-3">
      <RadioGroup
        defaultValue="one"
        aria-label="Option"
        className="flex flex-row gap-2"
      >
        <Radio value="one" aria-label="One" />
        <Radio value="two" aria-label="Two" />
      </RadioGroup>
      <div className="flex items-center gap-2">
        <Checkbox defaultChecked aria-label="Checked" />
        <Checkbox aria-label="Unchecked" />
      </div>
      <Switch defaultChecked aria-label="Switch" />
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <AlertDialog>
        <AlertDialogTrigger render={<Button size="sm" variant="outline" />}>
          Alert Dialog
        </AlertDialogTrigger>
        <AlertDialogPopup>
          <AlertDialogTitle>Archive this campaign?</AlertDialogTitle>
          <AlertDialogDescription>
            It stops running today. You can restore it from the archive.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="ghost" />}>
              Cancel
            </AlertDialogClose>
            <AlertDialogClose render={<Button />}>Archive</AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
      <ButtonGroup aria-label="Button group">
        <Button size="sm" variant="outline">
          Button Group
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="px-2.5"
          aria-label="More"
        >
          <ChevronDownIcon />
        </Button>
      </ButtonGroup>
    </div>
  </Panel>
);

const navigation = [
  {
    label: "Studio",
    items: [
      { name: "Overview", icon: HomeIcon },
      { name: "Briefs", icon: InboxIcon },
      { name: "Search", icon: SearchIcon },
    ],
  },
  {
    label: "Account",
    items: [
      { name: "Profile", icon: UserIcon },
      { name: "Notifications", icon: BellIcon },
    ],
  },
] as const;

const Navigation = () => {
  const [current, setCurrent] = useState("Overview");

  return (
    <Panel slug="sidebar">
      <Sidebar
        aria-label="Example navigation"
        className="-mx-3 w-auto bg-transparent p-0"
      >
        {navigation.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            {group.items.map(({ name, icon: Icon }) => (
              <SidebarItem
                key={name}
                current={name === current}
                onClick={() => setCurrent(name)}
              >
                <Icon />
                {name}
              </SidebarItem>
            ))}
          </SidebarGroup>
        ))}
      </Sidebar>
    </Panel>
  );
};

const Schedule = () => (
  <Panel slug="calendar" className="items-center">
    <Calendar defaultValue={new Date()} />
  </Panel>
);

const reach = [
  { label: "Dec", value: 31 },
  { label: "Jan", value: 46 },
  { label: "Feb", value: 38 },
  { label: "Mar", value: 52 },
  { label: "Apr", value: 27 },
] as const;

const thousands = (value: number) => `${value}k`;

const Reach = () => {
  const toast = useToast();

  return (
    <Panel slug="chart">
      <CardHeader>
        <CardTitle className="text-base">Campaign reach</CardTitle>
        <CardDescription>The last five months</CardDescription>
      </CardHeader>
      <Chart
        data={reach}
        format={thousands}
        aria-label="Reach by month"
        className="h-44 pt-5"
      />
      <Button
        variant="secondary"
        onClick={() =>
          toast.add({
            type: "info",
            title: "Report on its way",
            description: "We will email the full report in a minute.",
          })
        }
      >
        View full report
      </Button>
    </Panel>
  );
};

const Budget = () => (
  <Panel slug="meter">
    <div>
      <p className="text-foreground-dimmed text-sm">Remaining budget</p>
      <p className="mt-1 font-semibold text-4xl tabular-nums tracking-tight">
        €12,112.90
      </p>
      <Badge variant="warning" className="mt-3">
        Pending approval
      </Badge>
    </div>
    <dl className="grid gap-3 rounded-control bg-accent p-4 text-sm">
      {[
        ["Media spend", "€12,487.50"],
        ["Production", "-€374.60"],
      ].map(([term, amount]) => (
        <div key={term} className="flex justify-between gap-3">
          <dt className="text-foreground-dimmed">{term}</dt>
          <dd className="font-semibold tabular-nums">{amount}</dd>
        </div>
      ))}
    </dl>
    <Meter label="Budget used" value={62} />
  </Panel>
);

const Brief = () => {
  const toast = useToast();

  const create = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = new FormData(event.currentTarget).get("name");
    toast.add({
      type: "success",
      title: "Brief created",
      description: `${name || "Untitled brief"} is ready for the team.`,
    });
    event.currentTarget.reset();
  };

  return (
    <Panel slug="form">
      <CardHeader>
        <CardTitle className="text-base">Start a new brief</CardTitle>
        <CardDescription>
          Tell us the goal and we will shape the campaign around it.
        </CardDescription>
      </CardHeader>
      <form onSubmit={create} className="grid gap-4">
        <Field>
          <FieldLabel>Brief name</FieldLabel>
          <Input name="name" placeholder="e.g. Spring launch" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel>Budget</FieldLabel>
            <Input name="budget" defaultValue="€15,000" />
          </Field>
          <Field>
            <FieldLabel>Launch</FieldLabel>
            <Input name="launch" defaultValue="Dec 2026" />
          </Field>
        </div>
        <div className="grid gap-2">
          <Button type="submit">Create brief</Button>
          <Button type="reset" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </Panel>
  );
};

const markets = [
  { value: "eu", label: "EUR, Europe" },
  { value: "us", label: "USD, United States" },
  { value: "uk", label: "GBP, United Kingdom" },
] as const;

const Cap = () => {
  const [amount, setAmount] = useState(2500);

  return (
    <Panel slug="slider">
      <CardHeader>
        <CardTitle className="text-base">Daily spend cap</CardTitle>
        <CardDescription>
          The most a campaign may spend before it pauses for the day.
        </CardDescription>
      </CardHeader>
      <Select items={markets} defaultValue="eu">
        <SelectTrigger aria-label="Market" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {markets.map((market) => (
            <SelectItem key={market.value} value={market.value}>
              {market.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <div className="grid gap-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-medium text-sm">Cap</p>
          <p className="font-semibold text-xl tabular-nums">
            €{amount.toLocaleString("en")}
          </p>
        </div>
        <Slider
          value={amount}
          onValueChange={(value) => setAmount(Number(value))}
          min={50}
          max={10000}
          step={50}
          aria-label="Daily spend cap"
        />
        <div className="flex justify-between text-foreground-dimmed text-xs">
          <span>€50 (min)</span>
          <span>€10,000 (max)</span>
        </div>
      </div>
    </Panel>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState<readonly string[]>([
    "Can we move the launch to Thursday?",
  ]);

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = String(new FormData(event.currentTarget).get("message") ?? "");
    if (!text.trim()) return;
    setMessages((current) => [...current, text.trim()]);
    event.currentTarget.reset();
  };

  return (
    <Panel slug="bubble">
      <CardHeader>
        <CardTitle className="text-base">New chat</CardTitle>
        <CardDescription>How can we help today?</CardDescription>
      </CardHeader>
      <div className="flex flex-col gap-2" aria-live="polite">
        <Bubble>
          <BubbleContent>Morning! What are we working on?</BubbleContent>
        </Bubble>
        {messages.map((message, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: messages are only ever appended
          <Bubble key={index} variant="default" align="end">
            <BubbleContent>{message}</BubbleContent>
          </Bubble>
        ))}
      </div>
      <form onSubmit={send} className="flex gap-2">
        <Input
          name="message"
          aria-label="Message"
          placeholder="Write a message…"
          autoComplete="off"
        />
        <Button type="submit" size="icon" aria-label="Send">
          <ArrowUpRightIcon />
        </Button>
      </form>
    </Panel>
  );
};

const Survey = () => {
  const found = example("questionnaire");
  if (!found) return null;

  return (
    <Panel slug="questionnaire">
      <found.Example />
    </Panel>
  );
};

const Start = () => (
  <Panel slug="empty">
    <Empty className="border-none">
      <EmptyMedia>
        <PlusIcon />
      </EmptyMedia>
      <EmptyTitle>Nothing here yet</EmptyTitle>
      <EmptyDescription>
        Which is the best time to start a campaign.
      </EmptyDescription>
      <EmptyActions>
        <Button size="sm">New campaign</Button>
      </EmptyActions>
    </Empty>
  </Panel>
);

const visitors = [
  { label: "Mon", value: 24 },
  { label: "Tue", value: 31 },
  { label: "Wed", value: 28 },
  { label: "Thu", value: 16 },
  { label: "Fri", value: 26 },
  { label: "Sat", value: 27 },
] as const;

const Analytics = () => (
  <Panel slug="chart">
    <div>
      <CardTitle className="text-base">Analytics</CardTitle>
      <p className="mt-1 flex items-center gap-2 text-foreground-dimmed text-sm">
        418.2K visitors <Badge variant="success">+10%</Badge>
      </p>
    </div>
    <Chart
      type="line"
      data={visitors}
      format={thousands}
      aria-label="Visitors this week"
      className="h-28"
    />
  </Panel>
);

const alerts = [
  {
    name: "Campaign alerts",
    note: "Launches, pauses, and budget changes.",
    on: true,
  },
  {
    name: "Approval requests",
    note: "When a creative needs your sign-off.",
    on: true,
  },
  {
    name: "Weekly digest",
    note: "A summary every Monday morning.",
    on: false,
  },
] as const;

const Notifications = () => (
  <Panel slug="checkbox">
    <CardHeader>
      <CardTitle className="text-base">Notifications</CardTitle>
      <CardDescription>
        Choose which email and push alerts you want to receive.
      </CardDescription>
    </CardHeader>
    <div className="grid gap-4">
      {alerts.map((alert) => (
        // biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control
        <label key={alert.name} className="flex items-start gap-3 text-sm">
          <Checkbox defaultChecked={alert.on} className="mt-0.5" />
          <span className="grid">
            <span className="font-medium">{alert.name}</span>
            <span className="text-foreground-dimmed text-xs">{alert.note}</span>
          </span>
        </label>
      ))}
    </div>
  </Panel>
);

/** The heading every section after the hero opens with. */
const Intro = ({ eyebrow, title, children }: Intro.Props) => (
  <div className="max-w-3xl">
    <p className="font-medium text-brand">{eyebrow}</p>
    <h2
      className={cn(
        display,
        "mt-3 text-balance text-4xl leading-[1.05] sm:text-5xl",
      )}
    >
      {title}
      {/* a question keeps its own mark */}
      {!title.endsWith("?") && <Stop />}
    </h2>
    {children && (
      <p className="mt-4 text-pretty text-foreground-dimmed text-lg">
        {children}
      </p>
    )}
  </div>
);
namespace Intro {
  export type Props = { eyebrow: string; title: string; children?: ReactNode };
}

/** One tile of the feature grid: what it is on top, a live demo under it. */
const Tile = ({ title, text, className, children }: Tile.Props) => (
  <article
    className={cn(
      "flex min-w-0 flex-col gap-8 rounded-[2rem] border border-border bg-background-dimmed p-5 sm:p-8",
      className,
    )}
  >
    <div>
      <h3 className="font-semibold text-xl tracking-tight">{title}</h3>
      <p className="mt-2 max-w-md text-pretty text-foreground-dimmed">{text}</p>
    </div>
    <div className="mt-auto">{children}</div>
  </article>
);
namespace Tile {
  export type Props = {
    title: string;
    text: string;
    className?: string;
    children: ReactNode;
  };
}

// colours to rebrand the demo with; Epika keeps the theme's own red
const brands = [
  { name: "Epika", color: undefined },
  { name: "Ocean", color: "oklch(0.56 0.19 255)" },
  { name: "Forest", color: "oklch(0.55 0.14 155)" },
  { name: "Violet", color: "oklch(0.55 0.22 295)" },
  { name: "Amber", color: "oklch(0.68 0.16 60)" },
] as const;

/** Rebrands a handful of live components by overriding one token on them. */
const Restyle = () => {
  const [pick, setPick] = useState(0);
  const color = brands[pick]?.color;
  // the components only read tokens, so setting them on a wrapper is enough
  const tokens = color
    ? ({
        "--wz-primary": color,
        "--wz-ring": color,
        "--wz-primary-dimmed": `color-mix(in oklab, ${color} 82%, black)`,
      } as CSSProperties)
    : undefined;

  return (
    <Tile
      title="Rebrand it with one token"
      text="Every component reads the same handful of tokens. Change the primary colour and all of them follow, no class names touched."
      className="lg:col-span-2"
    >
      <div className="grid gap-6 rounded-surface border border-border bg-background p-5 sm:grid-cols-[auto_1fr] sm:gap-8">
        <div
          role="radiogroup"
          aria-label="Brand colour"
          className="flex gap-2 sm:flex-col"
        >
          {brands.map((brand, index) => (
            // biome-ignore lint/a11y/useSemanticElements: a swatch button reads better than a native radio here
            <button
              key={brand.name}
              type="button"
              role="radio"
              aria-checked={pick === index}
              onClick={() => setPick(index)}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-full py-1 pr-3 pl-1 text-sm transition-colors hover:bg-accent aria-checked:bg-accent aria-checked:font-medium",
                focus,
              )}
            >
              <span
                className="size-5 rounded-full border border-border"
                style={{ background: brand.color ?? "var(--wz-primary)" }}
              />
              <span className="max-sm:sr-only">{brand.name}</span>
            </button>
          ))}
        </div>
        <div style={tokens} className="grid content-center gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Publish</Button>
            <Button size="sm" variant="outline">
              Preview
            </Button>
            <Badge>New</Badge>
            <Badge variant="outline">Draft</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Switch defaultChecked aria-label="Notifications" />
            <Checkbox defaultChecked aria-label="Remember me" />
            <Slider defaultValue={64} aria-label="Volume" className="flex-1" />
          </div>
          <Meter label="Storage used" value={72} />
        </div>
      </div>
    </Tile>
  );
};

// the tokens a theme is mostly made of, drawn with whatever they are right now
const palette = [
  { name: "Background", swatch: "bg-background" },
  { name: "Ink", swatch: "bg-foreground" },
  { name: "Primary", swatch: "bg-primary" },
  { name: "Accent", swatch: "bg-accent" },
] as const;

/** Flips the whole page between light and dark, to show one set of tokens. */
const Themes = () => {
  const [theme, setTheme] = useTheme();
  const dark =
    theme === "dark" ||
    (theme === "system" &&
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"));

  return (
    <Tile
      title="Light and dark, built in"
      text="One set of tokens drives both themes. Flip this and the whole page follows."
    >
      <ul
        aria-label="Theme colours in use"
        className="mb-3 grid grid-cols-4 gap-2"
      >
        {palette.map((token) => (
          <li key={token.name} className="grid gap-1.5">
            <span
              className={cn(
                "h-14 rounded-item border border-border",
                token.swatch,
              )}
            />
            <span className="truncate text-foreground-dimmed text-xs">
              {token.name}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-4 rounded-surface border border-border bg-background p-5">
        <div>
          <p className="font-medium">{dark ? "Dark" : "Light"} mode</p>
          <p className="text-foreground-dimmed text-sm">
            {dark ? "Plum night, paper ink" : "Warm paper, plum ink"}
          </p>
        </div>
        <Switch
          checked={dark}
          onCheckedChange={(on) => setTheme(on ? "dark" : "light")}
          aria-label="Dark mode"
        />
      </div>
    </Tile>
  );
};

/** Keyboard support you can try right in the tile. */
const Access = () => (
  <Tile
    title="Accessible by default"
    text="Focus, keyboard and screen reader support come from Base UI. Tab into the tabs, then use the arrow keys."
  >
    <div className="grid gap-4 rounded-surface border border-border bg-background p-5">
      <Tabs defaultValue="week">
        <TabsList>
          <Tab value="day">Day</Tab>
          <Tab value="week">Week</Tab>
          <Tab value="month">Month</Tab>
        </TabsList>
        <TabsPanel value="day" className="text-foreground-dimmed">
          Today at a glance.
        </TabsPanel>
        <TabsPanel value="week" className="text-foreground-dimmed">
          The next seven days.
        </TabsPanel>
        <TabsPanel value="month" className="text-foreground-dimmed">
          The month ahead.
        </TabsPanel>
      </Tabs>
      <p className="flex flex-wrap items-center gap-1.5">
        <Kbd>Tab</Kbd>
        <Kbd>←</Kbd>
        <Kbd>→</Kbd>
        <Kbd>Enter</Kbd>
      </p>
    </div>
  </Tile>
);

/** The docs pages hand any component to an AI assistant. */
const Agents = () => (
  <Tile
    title="Made for agents too"
    text="Every component page copies its docs as Markdown, or opens them straight in Claude or ChatGPT."
  >
    <div className="rounded-surface border border-border bg-background p-2">
      {[
        { icon: MarkdownIcon, label: "Copy as Markdown", tint: "" },
        { icon: ClaudeIcon, label: "Open in Claude", tint: "text-[#d97757]" },
        { icon: ChatGPTIcon, label: "Open in ChatGPT", tint: "" },
      ].map(({ icon: Icon, label, tint }) => (
        <p
          key={label}
          className="flex items-center gap-3 rounded-item px-3 py-2.5 text-sm first:bg-accent"
        >
          <Icon className={tint} />
          {label}
        </p>
      ))}
    </div>
  </Tile>
);

// where the library runs, each checked rather than promised
const runs = [
  "React 19",
  "Next.js App Router",
  "Vite and any React setup",
  "Tailwind CSS v4 or plain CSS",
  "Typed for TypeScript",
] as const;

const Runs = () => (
  <Tile
    title="Runs where React does"
    text="The bundle is marked “use client”, so it drops into Server Components as well as single-page apps."
  >
    <ul className="grid gap-2.5 rounded-surface border border-border bg-background p-5 text-sm">
      {runs.map((item) => (
        <li key={item} className="flex items-center gap-2.5">
          <span className="flex size-5 items-center justify-center rounded-full bg-brand text-primary-foreground">
            <CheckIcon className="size-3" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  </Tile>
);

const Features = () => (
  <section className={cn(column, "py-24 sm:py-32")}>
    <Intro
      eyebrow="Why daybreaker"
      title="Everything you need, nothing to fight"
    >
      The parts teams usually build three times over, done once and done
      carefully.
    </Intro>
    <div className="mt-14 grid gap-4 lg:grid-cols-3">
      <Restyle />
      <Themes />
      <Access />
      <Agents />
      <Runs />
    </div>
  </section>
);

const Wall = () => (
  <section className="border-border border-y bg-background-dimmed">
    <div className={cn(column, "py-24 sm:py-32")}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Intro
          eyebrow="The components"
          title="Real components, not screenshots"
        >
          Every card below is live. Copy the code behind any of them.
        </Intro>
        <a
          href="#/components"
          className={cn(
            "group flex shrink-0 items-center gap-1.5 rounded-sm font-medium",
            focus,
          )}
        >
          Browse all {components.length}
          <ArrowUpRightIcon className="group-hover:-translate-y-0.5 text-brand transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
      {/* rows of cards with matching heights, so the grid ends on one line */}
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Controls />
        <Schedule />
        <Brief />
        <Chat />
        <Survey />
        <Reach />
        <Navigation />
        <Start />
        <Notifications />
      </div>
    </div>
  </section>
);

const steps = [
  {
    title: "Install the package",
    code: install,
  },
  {
    title: "Add the styles",
    code: '@import "tailwindcss";\n@import "daybreaker/theme.css";',
  },
  {
    title: "Use a component",
    code: 'import { Button } from "daybreaker";\n\n<Button>Ship it</Button>',
  },
] as const;

const Steps = () => (
  <section className={cn(column, "py-24 sm:py-32")}>
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <Intro
        eyebrow="Get started"
        title="From install to on screen in a minute"
      >
        No Tailwind? Import{" "}
        <code className="font-mono text-base">daybreaker/styles.css</code>{" "}
        instead and skip the second step.
      </Intro>
      <a
        href="#/docs"
        className={cn(
          "group flex shrink-0 items-center gap-1.5 rounded-sm font-medium",
          focus,
        )}
      >
        Read the docs
        <ArrowUpRightIcon className="group-hover:-translate-y-0.5 text-brand transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
    <ol className="mt-14 grid gap-4 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="flex min-w-0 flex-col gap-4">
          <p className="flex items-center gap-3 font-medium">
            <span className="flex size-7 items-center justify-center rounded-full bg-brand font-mono text-primary-foreground text-xs">
              {index + 1}
            </span>
            {step.title}
          </p>
          <CodeBlock code={step.code} className="flex-1" />
        </li>
      ))}
    </ol>
  </section>
);

// the routes the Figma section answers to: its link in the nav, and where
// api/confirm sends people back to after they click the email's link
const useFigmaRoute = () =>
  useSyncExternalStore(
    (callback) => {
      window.addEventListener("hashchange", callback);
      return () => window.removeEventListener("hashchange", callback);
    },
    () => window.location.hash.replace(/^#\/?/, ""),
    () => "",
  );

const inbox = "info@epika.ad";

type FigmaState =
  | "idle"
  | "sending"
  | "sent"
  | "confirmed"
  | "expired"
  | "invalid"
  | "broken";

const fromRoute = (route: string): FigmaState =>
  route === "figma-confirmed"
    ? "confirmed"
    : route === "figma-expired"
      ? "expired"
      : route === "figma-error"
        ? "broken"
        : "idle";

/**
 * The Figma file, by email with a double opt-in: api/subscribe emails a
 * confirmation link, and api/confirm sends the file once it is clicked. The
 * hidden "company" field is a trap for bots.
 */
const FigmaKit = () => {
  const route = useFigmaRoute();
  const [state, setState] = useState<FigmaState>(() => fromRoute(route));
  const section = useRef<HTMLElement>(null);

  // the nav link and the way back from the email both land on this section
  useEffect(() => {
    if (!route.startsWith("figma")) return;
    setState(fromRoute(route));
    section.current?.scrollIntoView({ block: "start" });
  }, [route]);

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          pro: form.get("pro") === "on",
          company: form.get("company"),
        }),
      });
      if (response.ok) return setState("sent");
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      setState(result.error === "invalid_email" ? "invalid" : "broken");
    } catch {
      setState("broken");
    }
  };

  const done = {
    sent: {
      title: "Check your inbox",
      text: "We've sent a confirmation link, and the file comes right after you click it.",
    },
    confirmed: {
      title: "You're in",
      text: "The file is on its way to your inbox.",
    },
  } as const;
  const message =
    state === "invalid"
      ? "That email doesn't look right. One more try?"
      : state === "broken"
        ? `Something broke on our side. Try again in a minute, or write to ${inbox}.`
        : state === "expired"
          ? "That link has expired. Leave your email again and we'll send a fresh one."
          : undefined;

  return (
    <section
      id="figma"
      ref={section}
      // Get started underneath brings its own top spacing
      className={cn(column, "scroll-mt-20 pt-24 sm:pt-32")}
    >
      <div className="grid gap-10 rounded-[2rem] border border-border bg-background-dimmed p-6 sm:p-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end lg:gap-16">
        <Intro eyebrow="Figma" title="Prefer to start in Figma?">
          The same components as a Figma file you can duplicate and make your
          own: every component with its variants, the tokens as variables, and a
          foundations page. Leave your email and we'll send you the link.
        </Intro>
        {state === "sent" || state === "confirmed" ? (
          <div role="status" className="flex flex-col gap-2">
            <p className="flex items-center gap-2 font-medium text-lg">
              <CheckIcon className="text-brand" />
              {done[state].title}.
            </p>
            <p className="text-foreground-dimmed text-sm">
              {done[state].text} Nothing after a few minutes? Look in spam, or{" "}
              <button
                type="button"
                onClick={() => setState("idle")}
                className={cn("rounded-sm underline", focus)}
              >
                try another address
              </button>
              .
            </p>
          </div>
        ) : (
          <form
            onSubmit={send}
            aria-label="Get the Figma file"
            noValidate
            className="grid gap-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                name="email"
                type="email"
                required
                autoComplete="email"
                aria-label="Email"
                aria-invalid={state === "invalid" || undefined}
                aria-describedby={message ? "figma-message" : undefined}
                placeholder="you@studio.com"
                className="sm:flex-1"
              />
              <Button type="submit" loading={state === "sending"}>
                Send me the file
              </Button>
            </div>
            {message && (
              <p id="figma-message" role="alert" className="text-error text-sm">
                {message}
              </p>
            )}
            {/* a trap for bots: people never see or fill it */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            {/* biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control */}
            <label className="flex items-center gap-2.5 text-sm">
              <Checkbox name="pro" />
              Tell me when daybreaker Pro is out.
            </label>
            <p className="text-foreground-dimmed text-xs">
              One email with the file. Anything else only if you tick the box.
              Unsubscribe any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

const needs = ["Product UI", "Website", "Brand", "Design system"] as const;

/**
 * A short project brief, made of the library's own form components. It goes
 * to the studio's inbox through api/brief, with Reply-To set to the sender.
 */
const ProjectBrief = () => {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "broken">(
    "idle",
  );

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState("sending");
    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          needs: needs.filter((need) => form.get(need) === "on"),
          about: form.get("about"),
          company: form.get("company"),
        }),
      });
      setState(response.ok ? "sent" : "broken");
    } catch {
      setState("broken");
    }
  };

  if (state === "sent") {
    return (
      <div role="status" className="grid content-start gap-3">
        <p className={cn(display, "flex items-center gap-3 text-3xl")}>
          <CheckIcon className="size-6 text-brand" />
          <span>
            Got it
            <Stop />
          </span>
        </p>
        <p className="max-w-sm text-foreground-dimmed">
          We read every brief ourselves and reply within 2 working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={send} aria-label="Start a project" className="grid gap-6">
      <div>
        <h3 className="font-semibold text-xl tracking-tight">
          Start a project
        </h3>
        <p className="mt-1 text-foreground-dimmed text-sm">
          A few lines is plenty. We'll take it from there.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input
            name="name"
            required
            autoComplete="name"
            placeholder="Ada Lovelace"
          />
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ada@company.com"
          />
        </Field>
      </div>
      <fieldset>
        <legend className="mb-2.5 font-medium text-sm">
          What do you need?
        </legend>
        <div className="flex flex-wrap gap-2">
          {needs.map((need) => (
            <label
              key={need}
              className="cursor-pointer select-none rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-foreground-dimmed has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground has-focus-visible:ring-2 has-focus-visible:ring-ring"
            >
              <input type="checkbox" name={need} className="sr-only" />
              {need}
            </label>
          ))}
        </div>
      </fieldset>
      {/* a plain label: Field only names the library's own inputs, and the
          textarea is a native element */}
      {/* biome-ignore lint/a11y/noLabelWithoutControl: Textarea renders the control */}
      <label className="flex flex-col gap-1.5">
        <span className="font-medium text-sm">About the project</span>
        <Textarea
          name="about"
          rows={3}
          placeholder="What you're building, and by when."
          className="resize-none"
        />
      </label>
      {/* the same trap for bots as the Figma form */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      {state === "broken" && (
        <p role="alert" className="text-error text-sm">
          Something broke on our side. Try again in a minute, or write to{" "}
          {inbox}.
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button type="submit" size="lg" loading={state === "sending"}>
          Send brief
          <ArrowUpRightIcon />
        </Button>
        <p className="text-foreground-dimmed text-sm">
          We reply within 2 working days.
        </p>
      </div>
    </form>
  );
};

/**
 * The page ends here: who makes the kit, and a brief to hire them with. The
 * block runs in the library's own dark theme, so the form is the real
 * components in dark mode. One hairline divides the pitch from the brief.
 */
const Work = () => (
  <section id="brief" className={cn(column, "scroll-mt-20 pb-24 sm:pb-32")}>
    <div className="dark grid rounded-[2rem] bg-background-dimmed p-6 text-foreground sm:p-12 lg:grid-cols-2 lg:p-16">
      <div className="flex flex-col items-start border-border max-lg:border-b max-lg:pb-12 lg:border-r lg:pr-16">
        <p className="flex items-center gap-3 font-medium text-brand">
          <Logo className="h-4" />
          Need a custom UI?
        </p>
        <h2 className={cn(display, "mt-5 text-5xl leading-[0.95] sm:text-7xl")}>
          Work with Epika
          <Stop />
        </h2>
        <p className="mt-6 max-w-md text-pretty text-foreground-dimmed text-lg">
          daybreaker is the part we could give away. The rest is judgement: what
          your product should say, and how it should feel when someone uses it
          on a Tuesday morning. Bring us the product, we'll bring the interface.
        </p>
        <p className="mt-6 max-w-md text-foreground">
          We design product UI, websites, brand identities and design systems.
        </p>
        <a
          href={`${agency}/projects`}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "group mt-auto flex items-center gap-1.5 rounded-sm pt-10 font-medium",
            focus,
          )}
        >
          See our work
          <ArrowUpRightIcon className="group-hover:-translate-y-0.5 text-brand transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
      <div className="max-lg:pt-12 lg:pl-16">
        <ProjectBrief />
      </div>
    </div>
  </section>
);

export const Landing = () => (
  <>
    <Hero />
    <Features />
    <Wall />
    <FigmaKit />
    <Steps />
    <Work />
  </>
);
