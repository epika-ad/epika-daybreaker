import { type FormEvent, type ReactNode, useState } from "react";
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
import { ArrowUpRightIcon, focus, Logo, pill } from "./parts";
import { components, example } from "./registry";

const Hero = () => (
  <section className="flex flex-col items-center px-4 pt-20 text-center sm:pt-28">
    <a
      href="#/components/questionnaire"
      className={cn(
        pill,
        "flex items-center gap-1.5 px-3.5 py-1.5 font-medium text-xs transition-colors hover:border-brand",
        focus,
      )}
    >
      New: Questionnaire component
      <ArrowUpRightIcon className="size-3.5 rotate-45" />
    </a>
    <h1 className="mt-6 max-w-3xl text-balance font-semibold text-4xl tracking-tighter sm:text-6xl">
      The foundation for every Epika interface.
    </h1>
    <p className="mt-5 max-w-xl text-pretty text-foreground-dimmed text-lg">
      {components.length} accessible React components, styled with Tailwind CSS
      and on brand out of the box.
    </p>
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
  </section>
);

/** The logo's sunrise, with its horizon line carried out to both edges. */
const Horizon = () => (
  <div
    aria-hidden="true"
    className="mx-auto flex w-full max-w-7xl items-end px-4 pt-16 pb-12"
  >
    <span className="mb-px h-1 flex-1 bg-linear-to-r from-transparent to-brand" />
    <Logo className="-mx-px h-14" />
    <span className="mb-px h-1 flex-1 bg-linear-to-l from-transparent to-brand" />
  </div>
);

// Every card on the wall is the real component, wired up enough to play with.

const Panel = ({ className, children }: Panel.Props) => (
  <Card className={cn("mb-5 break-inside-avoid gap-5 p-5", className)}>
    {children}
  </Card>
);
namespace Panel {
  export type Props = { className?: string; children: ReactNode };
}

const Controls = () => (
  <Panel>
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
    <Panel className="p-2">
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
  <Panel className="items-center p-3">
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
    <Panel>
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
  <Panel>
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
    <Panel>
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
    <Panel>
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
    <Panel>
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
    <Panel>
      <found.Example />
    </Panel>
  );
};

const Start = () => (
  <Panel className="p-2">
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
  <Panel>
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
  <Panel>
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

export const Landing = () => (
  <>
    <Hero />
    <Horizon />
    <section
      aria-label="Components in use"
      className="mx-auto w-full max-w-7xl columns-1 gap-5 px-4 pb-24 sm:columns-2 lg:columns-3 xl:columns-4"
    >
      <Controls />
      <Navigation />
      <Schedule />
      <Reach />
      <Budget />
      <Brief />
      <Cap />
      <Chat />
      <Survey />
      <Start />
      <Analytics />
      <Notifications />
    </section>
  </>
);
