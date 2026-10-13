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
  Calendar,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Chart,
  Checkbox,
  ChevronDownIcon,
  CircleCheckIcon,
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
  Meter,
  PencilIcon,
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
  Textarea,
  UserIcon,
  useToast,
} from "daybreaker";
import { type FormEvent, type ReactNode, useState } from "react";
import {
  ArrowUpRightIcon,
  agency,
  ContrastIcon,
  CopyButton,
  focus,
  Logo,
  pill,
} from "./parts";
import { components, example } from "./registry";

const install = "npm install daybreaker";

// the agency's own headline style: large, light, ending on a red full stop
const display = "font-light tracking-tighter";

const Stop = () => <span className="text-brand">.</span>;

/**
 * Set like epika.ad's: a red line over a big staggered headline that comes
 * into focus, with live components in the corners the stagger leaves empty.
 */
const Hero = () => (
  <section className="relative mx-auto w-full max-w-7xl px-4 pt-14 sm:pt-20 lg:pt-40 lg:pb-60">
    <Float className="top-4 right-4 w-72" delay={500}>
      <Cap />
    </Float>
    <Float className="bottom-0 left-4 w-80" delay={650}>
      <Analytics />
    </Float>
    <Float className="right-4 bottom-0 w-72" delay={800}>
      <Budget />
    </Float>
    <p className="text-balance text-brand text-xl tracking-tight sm:text-2xl lg:pl-[8%]">
      {components.length} accessible React components, styled with Tailwind CSS.
    </p>
    <h1
      className={cn(
        display,
        "mt-3 text-[clamp(2.75rem,6.6vw,6rem)] leading-[0.95]",
      )}
    >
      <span className="block animate-focus-in motion-reduce:animate-none lg:pl-[8%]">
        The foundation for
      </span>{" "}
      <span
        className="block animate-focus-in motion-reduce:animate-none lg:text-right"
        style={{ animationDelay: "150ms" }}
      >
        every Epika interface
        <Stop />
      </span>
    </h1>
    <div className="mt-10 flex flex-col items-start gap-5 lg:mt-14 lg:items-center">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg" nativeButton={false} render={<a href="#/docs" />}>
          Get started
        </Button>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<a href="#/components" />}
        >
          View components
        </Button>
      </div>
      <div
        className={cn(
          pill,
          "flex items-center gap-2 py-1 pr-1 pl-4 font-mono text-sm",
        )}
      >
        <span aria-hidden="true" className="text-brand">
          $
        </span>
        {install}
        <CopyButton text={install} className="rounded-full" />
      </div>
    </div>
  </section>
);

/** A live component set loose in a corner of the hero, on wide screens. */
const Float = ({ className, delay, children }: Float.Props) => (
  <div
    style={{ animationDelay: `${delay}ms` }}
    className={cn(
      "absolute hidden animate-pop-in drop-shadow-[0_24px_32px_rgb(53_10_63/0.14)] motion-reduce:animate-none lg:block [&>*]:mb-0",
      className,
    )}
  >
    {children}
  </div>
);
namespace Float {
  export type Props = {
    className?: string;
    delay: number;
    children: ReactNode;
  };
}

/** The logo's sunrise, with its horizon line carried out to both edges. */
const Horizon = () => (
  <div
    aria-hidden="true"
    className="mx-auto flex w-full max-w-7xl items-end px-4 pt-12"
  >
    <span className="mb-px h-1 flex-1 bg-linear-to-r from-transparent to-brand" />
    <Logo className="-mx-px h-14" />
    <span className="mb-px h-1 flex-1 bg-linear-to-l from-transparent to-brand" />
  </div>
);

// Every card on the wall is the real component, wired up enough to play with.

const Panel = ({ slug, className, children }: Panel.Props) => {
  const found = example(slug);
  const entry = components.find((item) => item.slug === slug);

  return (
    // the button shares the card's grid cell instead of being positioned
    // over it: absolute positioning inside the wall's columns stops the
    // browser from balancing them
    <div className="group/panel mb-5 grid break-inside-avoid">
      <Card
        className={cn("col-start-1 row-start-1 min-w-0 gap-5 p-5", className)}
      >
        {children}
      </Card>
      {found && entry && (
        <CopyButton
          text={found.source}
          label={`Copy ${entry.name} code`}
          // on the corner, so it never covers the card's own controls; it
          // shows on hover or focus, and always where there is no hover
          className="-mt-2.5 -mr-2.5 z-1 col-start-1 row-start-1 self-start justify-self-end rounded-full border border-border bg-background opacity-0 transition-[opacity,color] hover:bg-background focus-visible:opacity-100 group-hover/panel:opacity-100 [@media(hover:none)]:opacity-100"
        />
      )}
    </div>
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
    <Panel slug="sidebar" className="p-2">
      <Sidebar aria-label="Example navigation" className="w-full p-0">
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
  <Panel slug="calendar" className="items-center p-3">
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
  { value: "eu", label: "EUR — Europe" },
  { value: "us", label: "USD — United States" },
  { value: "uk", label: "GBP — United Kingdom" },
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
  <Panel slug="empty" className="p-2">
    <Empty className="border-none">
      <EmptyMedia>
        <PlusIcon />
      </EmptyMedia>
      <EmptyTitle>Launch a campaign</EmptyTitle>
      <EmptyDescription>
        Upload your first creative to start reaching people on every channel.
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

const reasons = [
  {
    icon: CircleCheckIcon,
    title: "Accessible by default",
    text: "Keyboard navigation, focus management and screen reader support are built in, on top of Base UI.",
  },
  {
    icon: ContrastIcon,
    title: "On brand, light and dark",
    text: "Epika red on warm paper, with plum ink. One set of tokens drives both themes.",
  },
  {
    icon: PencilIcon,
    title: "Yours to restyle",
    text: "Override any token to rebrand. Use it with Tailwind CSS v4 or the precompiled stylesheet.",
  },
] as const;

const Reasons = () => (
  <section
    aria-label="Why daybreaker"
    className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 md:grid-cols-3"
  >
    {reasons.map(({ icon: Icon, title, text }) => (
      <div key={title} className="flex flex-col items-start gap-3">
        <span className="flex size-9 items-center justify-center rounded-control bg-accent text-brand">
          <Icon />
        </span>
        <h2 className="font-semibold tracking-tight">{title}</h2>
        <p className="max-w-sm text-pretty text-foreground-dimmed text-sm">
          {text}
        </p>
      </div>
    ))}
  </section>
);

const Wall = () => (
  <section className="mx-auto w-full max-w-7xl px-4 pb-24">
    <div className="flex flex-wrap items-end justify-between gap-4 pb-8">
      <div>
        <h2 className={cn(display, "text-4xl sm:text-5xl")}>
          Real components, not screenshots
          <Stop />
        </h2>
        <p className="mt-2 text-foreground-dimmed">
          Every card on this page is live. Hover one to copy its code.
        </p>
      </div>
      <a
        href="#/components"
        className={cn(
          "group flex items-center gap-1.5 rounded-sm font-medium text-sm",
          focus,
        )}
      >
        Browse all {components.length}
        <ArrowUpRightIcon className="group-hover:-translate-y-0.5 text-brand transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
      <Controls />
      <Navigation />
      <Schedule />
      <Reach />
      <Brief />
      <Chat />
      <Survey />
      <Start />
      <Notifications />
    </div>
  </section>
);

/** The way to the studio: who makes the kit, and how to hire them. */
const Work = () => (
  <section className="mx-auto w-full max-w-7xl px-4 pb-24">
    {/* the whole panel is the link; the sun rises on hover. It is the page
        in reverse: plum in the light theme, paper in the dark one */}
    <a
      href={agency}
      target="_blank"
      rel="noreferrer"
      aria-label="Work with Epika"
      className={cn(
        "group relative flex min-h-[26rem] flex-col justify-between gap-16 overflow-hidden rounded-surface bg-foreground p-8 text-background sm:min-h-[30rem] sm:p-14",
        focus,
      )}
    >
      <Logo className="-right-6 sm:-right-10 absolute bottom-0 h-44 origin-bottom-right scale-90 transition-[scale] duration-700 ease-spring group-hover:scale-100 motion-reduce:transition-none sm:h-72 lg:h-[26rem]" />
      <p className="relative text-brand text-xl tracking-tight sm:text-2xl">
        Need a custom UI?
      </p>
      <div className="relative">
        <h2
          className={cn(
            display,
            "text-6xl leading-[0.9] sm:text-8xl lg:text-9xl",
          )}
        >
          Work with
          <br />
          Epika
          <Stop />
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-sm text-pretty text-background/75 text-lg">
            Daybreaker is built and maintained by the team at Epika, a creative
            studio for brands and digital experiences.
          </p>
          <span className="flex h-12 items-center gap-2 rounded-full bg-background pr-2 pl-6 font-medium text-foreground transition-[gap] duration-400 ease-spring group-hover:gap-4 motion-reduce:transition-none">
            Get in touch
            <span className="flex size-8 items-center justify-center rounded-full bg-brand text-primary-foreground">
              <ArrowUpRightIcon />
            </span>
          </span>
        </div>
      </div>
    </a>
  </section>
);

export const Landing = () => (
  <>
    <Hero />
    <Horizon />
    <Reasons />
    <Wall />
    <Work />
  </>
);
