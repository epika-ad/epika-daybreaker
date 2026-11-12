# daybreaker components

Every component in daybreaker v1.0.0, by group. Each entry has what the component is for, what to import, the Props of each part, and the working example from the docs site. Search for a component's name to jump to it. Each part's Props appear once, under the component it belongs to. Props written as `Styled<XPrimitive.Part.Props>` are Base UI's props for that part (see base-ui.com), with `className` narrowed to a string.

## Actions

### Button

Six variants, four sizes, icons, and a loading state.

Import from `"daybreaker"`: `Button`.

Variants:

- `Button`: variant: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link"; size: "sm" | "md" | "lg" | "icon" (defaults { variant: "primary", size: "md" })

Defaults:

- `Button`: `loading = false`

Props:

```ts
// Button
export type Props = Styled<ButtonPrimitive.Props> &
  VariantProps<typeof buttonVariants> & {
    /** Shows a spinner and blocks interaction. */
    loading?: boolean;
  };
```

Example:

```tsx
import { Button, PlusIcon, ShareIcon, TrashIcon } from "daybreaker";

export const Example = () => (
  <div className="grid justify-items-center gap-4">
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Link</Button>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="sm">Small</Button>
      <Button>Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="secondary">
        <ShareIcon />
        Share
      </Button>
      <Button variant="destructive">
        <TrashIcon />
        Delete
      </Button>
      <Button loading>Saving</Button>
      <Button disabled>Disabled</Button>
    </div>
  </div>
);
```

### Toggle

A button that stays pressed.

Import from `"daybreaker"`: `Toggle`.

Props:

```ts
// Toggle
export type Props = Styled<TogglePrimitive.Props>;
```

Example:

```tsx
import { Toggle } from "daybreaker";

export const Example = () => (
  <div className="flex gap-1">
    <Toggle aria-label="Bold" defaultPressed className="font-bold">
      B
    </Toggle>
    <Toggle aria-label="Italic" className="italic">
      I
    </Toggle>
    <Toggle aria-label="Underline" className="underline">
      U
    </Toggle>
  </div>
);
```

### Toggle Group

Toggles joined into one segmented control.

Import from `"daybreaker"`: `Toggle`, `ToggleGroup`.

Props:

```ts
// ToggleGroup
export type Props = Styled<ToggleGroupPrimitive.Props>;
```

Example:

```tsx
import { Toggle, ToggleGroup } from "daybreaker";

export const Example = () => (
  <div className="grid justify-items-center gap-4">
    <ToggleGroup defaultValue={["week"]} aria-label="Calendar view">
      <Toggle value="day">Day</Toggle>
      <Toggle value="week">Week</Toggle>
      <Toggle value="month">Month</Toggle>
    </ToggleGroup>
    <ToggleGroup multiple defaultValue={["bold"]} aria-label="Text style">
      <Toggle value="bold" aria-label="Bold" className="font-bold">
        B
      </Toggle>
      <Toggle value="italic" aria-label="Italic" className="italic">
        I
      </Toggle>
      <Toggle value="underline" aria-label="Underline" className="underline">
        U
      </Toggle>
    </ToggleGroup>
  </div>
);
```

### Button Group

Buttons joined into one control.

Import from `"daybreaker"`: `Button`, `ButtonGroup`.

Props:

```ts
// ButtonGroup
export type Props = ComponentProps<"div">;
```

Example:

```tsx
import {
  Button,
  ButtonGroup,
  ChevronDownIcon,
  CopyIcon,
  PencilIcon,
  TrashIcon,
} from "daybreaker";

export const Example = () => (
  <div className="grid justify-items-center gap-4">
    <ButtonGroup aria-label="Document actions">
      <Button variant="outline">
        <PencilIcon />
        Edit
      </Button>
      <Button variant="outline">
        <CopyIcon />
        Copy
      </Button>
      <Button variant="outline">
        <TrashIcon />
        Delete
      </Button>
    </ButtonGroup>
    <ButtonGroup aria-label="Save">
      <Button>Save changes</Button>
      <Button size="icon" aria-label="More save options">
        <ChevronDownIcon />
      </Button>
    </ButtonGroup>
  </div>
);
```

### Toolbar

A row of controls that share one tab stop.

Import from `"daybreaker"`: `Toggle`, `Toolbar`, `ToolbarButton`, `ToolbarGroup`, `ToolbarSeparator`.

Props:

```ts
// Toolbar
export type Props = Styled<ToolbarPrimitive.Root.Props>;

// ToolbarButton
export type Props = Styled<ToolbarPrimitive.Button.Props>;

// ToolbarGroup
export type Props = Styled<ToolbarPrimitive.Group.Props>;

// ToolbarSeparator
export type Props = Styled<ToolbarPrimitive.Separator.Props>;
```

Example:

```tsx
import {
  CopyIcon,
  ShareIcon,
  Toggle,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  TrashIcon,
} from "daybreaker";

export const Example = () => (
  <Toolbar aria-label="Formatting">
    <ToolbarGroup aria-label="Text style">
      <ToolbarButton
        render={<Toggle defaultPressed />}
        aria-label="Bold"
        className="font-bold"
      >
        B
      </ToolbarButton>
      <ToolbarButton render={<Toggle />} aria-label="Italic" className="italic">
        I
      </ToolbarButton>
      <ToolbarButton
        render={<Toggle />}
        aria-label="Underline"
        className="underline"
      >
        U
      </ToolbarButton>
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarButton aria-label="Copy">
      <CopyIcon />
    </ToolbarButton>
    <ToolbarButton aria-label="Share">
      <ShareIcon />
    </ToolbarButton>
    <ToolbarSeparator />
    <ToolbarButton aria-label="Delete" className="hover:text-error">
      <TrashIcon />
    </ToolbarButton>
  </Toolbar>
);
```

## Forms

### Field

A control with its label, hint, and error message.

Import from `"daybreaker"`: `Field`, `FieldDescription`, `FieldLabel`, `Input`.

Props:

```ts
// Field
export type Props = Styled<FieldPrimitive.Root.Props>;

// FieldDescription
export type Props = Styled<FieldPrimitive.Description.Props>;

// FieldLabel
export type Props = Styled<FieldPrimitive.Label.Props>;
```

Example:

```tsx
import { Field, FieldDescription, FieldLabel, Input } from "daybreaker";

export const Example = () => (
  <Field className="w-64">
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="you@example.com" />
    <FieldDescription>We only use it to sign you in.</FieldDescription>
  </Field>
);
```

### Form

Fields that validate together on submit.

Import from `"daybreaker"`: `Button`, `Field`, `FieldDescription`, `FieldError`, `FieldLabel`, `Form`, `Input`.

Props:

```ts
// FieldError
export type Props = Styled<FieldPrimitive.Error.Props>;

// Form
export type Props = Styled<FormPrimitive.Props>;
```

Example:

```tsx
import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Form,
  Input,
} from "daybreaker";
import { useState } from "react";

export const Example = () => {
  const [sent, setSent] = useState<string | null>(null);

  return (
    <Form
      className="w-64"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSent(String(data.get("email")));
      }}
    >
      <Field name="name">
        <FieldLabel>Name</FieldLabel>
        <Input required placeholder="Ada Lovelace" />
        <FieldError />
      </Field>
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input required type="email" placeholder="you@example.com" />
        <FieldDescription>Submit it empty to see the errors.</FieldDescription>
        <FieldError />
      </Field>
      <Button type="submit">Create account</Button>
      {sent && (
        <p role="status" className="text-sm text-success">
          Invite sent to {sent}
        </p>
      )}
    </Form>
  );
};
```

### Label

Text that names a control.

Import from `"daybreaker"`: `Checkbox`, `Input`, `Label`.

Props:

```ts
// Label
export type Props = ComponentProps<"label">;
```

Example:

```tsx
import { Checkbox, Input, Label } from "daybreaker";

export const Example = () => (
  <div className="grid w-64 gap-4">
    <div className="grid gap-1.5">
      <Label htmlFor="label-example-name">Display name</Label>
      <Input id="label-example-name" placeholder="Ada Lovelace" />
    </div>
    <Label className="flex items-center gap-2 font-normal">
      <Checkbox defaultChecked />
      Show my name on my profile
    </Label>
  </div>
);
```

### Input

A single-line text input.

Import from `"daybreaker"`: `Input`.

Props:

```ts
// Input
export type Props = Styled<InputPrimitive.Props>;
```

Example:

```tsx
import { Input } from "daybreaker";

export const Example = () => (
  <div className="grid w-64 gap-3">
    <Input aria-label="Name" placeholder="Ada Lovelace" />
    <Input aria-label="Password" type="password" defaultValue="hunter22" />
    <Input
      aria-label="Email"
      type="email"
      defaultValue="not-an-email"
      aria-invalid
    />
    <Input aria-label="Team" defaultValue="Read only" disabled />
  </div>
);
```

### Input Group

An input with icons, units, or buttons attached.

Import from `"daybreaker"`: `Input`, `InputGroup`, `InputGroupAddon`, `Kbd`.

Props:

```ts
// InputGroup
export type Props = ComponentProps<"div">;

// InputGroupAddon
export type Props = ComponentProps<"span">;
```

Example:

```tsx
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Kbd,
  SearchIcon,
} from "daybreaker";

export const Example = () => (
  <div className="grid w-64 gap-3">
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <Input aria-label="Search" placeholder="Search" />
      <InputGroupAddon>
        <Kbd>/</Kbd>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>https://</InputGroupAddon>
      <Input aria-label="Website" placeholder="example.com" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>€</InputGroupAddon>
      <Input aria-label="Amount" inputMode="decimal" placeholder="0.00" />
      <InputGroupAddon>EUR</InputGroupAddon>
    </InputGroup>
  </div>
);
```

### Textarea

A multi-line text input.

Import from `"daybreaker"`: `Textarea`.

Props:

```ts
// Textarea
export type Props = ComponentProps<"textarea">;
```

Example:

```tsx
import { Textarea } from "daybreaker";

export const Example = () => (
  <Textarea
    aria-label="Message"
    placeholder="Write a message…"
    className="w-64"
  />
);
```

### Select

Pick one option from a list.

Import from `"daybreaker"`: `Select`, `SelectItem`, `SelectPopup`, `SelectTrigger`, `SelectValue`.

Defaults:

- `SelectPopup`: `sideOffset = 4`

Props:

```ts
// SelectItem
export type Props = Styled<SelectPrimitive.Item.Props> & {
  classList?: ClassList<"item" | "indicator">;
};

// SelectPopup
export type Props = Styled<SelectPrimitive.Popup.Props> &
  Pick<SelectPrimitive.Positioner.Props, "side" | "align" | "sideOffset"> & {
    classList?: ClassList<"positioner" | "popup">;
  };

// SelectTrigger
export type Props = Styled<SelectPrimitive.Trigger.Props> & {
  classList?: ClassList<"trigger" | "icon">;
};

// SelectValue
export type Props = Styled<SelectPrimitive.Value.Props>;
```

Example:

```tsx
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "daybreaker";

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
] as const;

export const Example = () => (
  <Select items={plans} defaultValue="pro">
    <SelectTrigger aria-label="Plan" className="w-48">
      <SelectValue />
    </SelectTrigger>
    <SelectPopup>
      {plans.map((plan) => (
        <SelectItem key={plan.value} value={plan.value}>
          {plan.label}
        </SelectItem>
      ))}
    </SelectPopup>
  </Select>
);
```

### Native Select

The browser select, styled to match.

Import from `"daybreaker"`: `NativeSelect`.

Props:

```ts
// NativeSelect
export type Props = ComponentProps<"select">;
```

Example:

```tsx
import { NativeSelect } from "daybreaker";

export const Example = () => (
  <div className="grid w-56 gap-3">
    <NativeSelect aria-label="Plan" defaultValue="pro">
      <option value="free">Free</option>
      <option value="pro">Pro</option>
      <option value="team">Team</option>
    </NativeSelect>
    <NativeSelect aria-label="Region" disabled defaultValue="eu">
      <option value="eu">Europe</option>
    </NativeSelect>
  </div>
);
```

### Combobox

A select you can type in to filter.

Import from `"daybreaker"`: `Combobox`, `ComboboxInput`, `ComboboxItem`, `ComboboxPopup`.

Defaults:

- `ComboboxPopup`: `empty = "No results"`, `sideOffset = 6`

Props:

```ts
// ComboboxInput
export type Props = Styled<ComboboxPrimitive.Input.Props> & {
  classList?: ClassList<"group" | "input" | "clear" | "trigger">;
};

// ComboboxItem
export type Props = Styled<ComboboxPrimitive.Item.Props> & {
  classList?: ClassList<"item" | "indicator">;
};

// ComboboxPopup
export type Props = Omit<Styled<ComboboxPrimitive.Popup.Props>, "children"> &
  Pick<ComboboxPrimitive.Positioner.Props, "sideOffset"> & {
    /** Shown when nothing matches what was typed. */
    empty?: ReactNode;
    /** Items, or a function that renders one item. */
    children?: ComboboxPrimitive.List.Props["children"];
    classList?: ClassList<"positioner" | "popup" | "empty" | "list">;
  };
```

Example:

```tsx
import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxPopup,
} from "daybreaker";

type Country = { value: string; label: string };

const countries: Country[] = [
  { value: "al", label: "Albania" },
  { value: "at", label: "Austria" },
  { value: "be", label: "Belgium" },
  { value: "br", label: "Brazil" },
  { value: "ca", label: "Canada" },
  { value: "dk", label: "Denmark" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "gr", label: "Greece" },
  { value: "in", label: "India" },
  { value: "it", label: "Italy" },
  { value: "jp", label: "Japan" },
  { value: "xk", label: "Kosovo" },
  { value: "mx", label: "Mexico" },
  { value: "nl", label: "Netherlands" },
  { value: "no", label: "Norway" },
  { value: "pt", label: "Portugal" },
  { value: "es", label: "Spain" },
  { value: "se", label: "Sweden" },
  { value: "ch", label: "Switzerland" },
  { value: "gb", label: "United Kingdom" },
  { value: "us", label: "United States" },
];

export const Example = () => (
  <Combobox items={countries} defaultValue={countries[0]}>
    <ComboboxInput
      aria-label="Country"
      placeholder="Search countries"
      className="w-64"
    />
    <ComboboxPopup empty="No countries found">
      {(country: Country) => (
        <ComboboxItem key={country.value} value={country}>
          <img
            src={`https://flagcdn.com/${country.value}.svg`}
            alt=""
            className="size-5 shrink-0 rounded-full object-cover"
          />
          {country.label}
        </ComboboxItem>
      )}
    </ComboboxPopup>
  </Combobox>
);
```

### Checkbox

Checked, unchecked, or indeterminate.

Import from `"daybreaker"`: `Checkbox`.

Props:

```ts
// Checkbox
export type Props = Styled<CheckboxPrimitive.Root.Props> & {
  classList?: ClassList<"root" | "indicator">;
};
```

Example:

```tsx
import { Checkbox } from "daybreaker";

export const Example = () => (
  <div className="grid gap-3 text-sm">
    {/* biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control */}
    <label className="flex items-center gap-2">
      <Checkbox defaultChecked />
      Email me product updates
    </label>
    {/* biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control */}
    <label className="flex items-center gap-2">
      <Checkbox indeterminate />
      Select all
    </label>
    {/* biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control */}
    <label className="flex items-center gap-2">
      <Checkbox />
      Remember this device
    </label>
  </div>
);
```

### Radio

Pick exactly one of a few options.

Import from `"daybreaker"`: `Radio`, `RadioGroup`.

Props:

```ts
// Radio
export type Props = Styled<RadioPrimitive.Root.Props> & {
  classList?: ClassList<"root" | "indicator">;
};

// RadioGroup
export type Props = Styled<RadioGroupPrimitive.Props>;
```

Example:

```tsx
import { Radio, RadioGroup } from "daybreaker";

const periods = ["Monthly", "Yearly", "Lifetime"] as const;

export const Example = () => (
  <RadioGroup defaultValue="Yearly" aria-label="Billing period">
    {periods.map((period) => (
      // biome-ignore lint/a11y/noLabelWithoutControl: Radio renders the control
      <label key={period} className="flex items-center gap-2 text-sm">
        <Radio value={period} />
        {period}
      </label>
    ))}
  </RadioGroup>
);
```

### Switch

Turn a setting on or off.

Import from `"daybreaker"`: `Switch`.

Props:

```ts
// Switch
export type Props = Styled<SwitchPrimitive.Root.Props> & {
  classList?: ClassList<"root" | "thumb">;
};
```

Example:

```tsx
import { Switch } from "daybreaker";

export const Example = () => (
  <div className="grid w-56 gap-4 text-sm">
    {/* biome-ignore lint/a11y/noLabelWithoutControl: Switch renders the control */}
    <label className="flex items-center justify-between">
      Notifications
      <Switch defaultChecked />
    </label>
    {/* biome-ignore lint/a11y/noLabelWithoutControl: Switch renders the control */}
    <label className="flex items-center justify-between">
      Airplane mode
      <Switch />
    </label>
    {/* biome-ignore lint/a11y/noLabelWithoutControl: Switch renders the control */}
    <label className="flex items-center justify-between text-foreground-dimmed">
      Location (managed)
      <Switch defaultChecked disabled />
    </label>
  </div>
);
```

### Slider

Choose a value or a range by dragging.

Import from `"daybreaker"`: `Slider`.

Props:

```ts
// Slider
export type Props = Styled<SliderPrimitive.Root.Props> & {
  classList?: ClassList<"root" | "track" | "indicator" | "thumb">;
};
```

Example:

```tsx
import { Slider } from "daybreaker";

export const Example = () => (
  <div className="grid w-56 gap-6">
    <Slider defaultValue={40} aria-label="Volume" />
    <Slider defaultValue={[20, 70]} aria-label="Price range" />
  </div>
);
```

### Number Field

A number with stepper buttons.

Import from `"daybreaker"`: `NumberField`.

Props:

```ts
// NumberField
export type Props = Styled<NumberFieldPrimitive.Root.Props> & {
  classList?: ClassList<
    "root" | "group" | "decrement" | "input" | "increment"
  >;
};
```

Example:

```tsx
import { NumberField } from "daybreaker";

export const Example = () => (
  <div className="grid justify-items-center gap-4">
    <NumberField defaultValue={2} min={1} max={10} aria-label="Guests" />
    <NumberField
      defaultValue={25}
      step={5}
      min={0}
      format={{ style: "currency", currency: "EUR", maximumFractionDigits: 0 }}
      aria-label="Tip"
    />
    <NumberField defaultValue={3} disabled aria-label="Seats" />
  </div>
);
```

### OTP Field

One box per character of a one-time code.

Import from `"daybreaker"`: `Button`, `OtpField`.

Defaults:

- `OtpField`: `length = 6`, `status = "idle"`

Props:

```ts
// OtpField
export type Props = Omit<Styled<OtpFieldPrimitive.Root.Props>, "length"> & {
  /** How many characters the code has. */
  length?: number;
  /** The result of checking the code; plays the matching animation. */
  status?: "idle" | "success" | "error";
  classList?: ClassList<"root" | "input">;
};
```

Example:

```tsx
import { Button, OtpField } from "daybreaker";
import { useState } from "react";

const messages = {
  idle: "Enter 123456 to pass, anything else to fail.",
  success: "Code accepted. You're signed in.",
  error: "That code is wrong. Try again.",
} as const;

export const Example = () => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<keyof typeof messages>("idle");

  const check = (code: string) => {
    if (code === "123456") return setStatus("success");
    setStatus("error");
    // leave the rejection on screen for a moment, then clear for another try
    setTimeout(() => {
      setValue("");
      setStatus("idle");
    }, 1400);
  };

  const reset = () => {
    setValue("");
    setStatus("idle");
  };

  return (
    <div className="grid justify-items-center gap-4">
      <OtpField
        aria-label="Verification code"
        value={value}
        onValueChange={setValue}
        onValueComplete={check}
        status={status}
        readOnly={status !== "idle"}
      />
      <p role="status" className="text-foreground-dimmed text-sm">
        {messages[status]}
      </p>
      {status === "success" && (
        <Button variant="ghost" size="sm" onClick={reset}>
          Start over
        </Button>
      )}
    </div>
  );
};
```

### Fieldset

Related fields under one legend.

Import from `"daybreaker"`: `Checkbox`, `CheckboxGroup`, `Fieldset`, `FieldsetLegend`.

Props:

```ts
// CheckboxGroup
export type Props = Styled<CheckboxGroupPrimitive.Props>;

// Fieldset
export type Props = Styled<FieldsetPrimitive.Root.Props>;

// FieldsetLegend
export type Props = Styled<FieldsetPrimitive.Legend.Props>;
```

Example:

```tsx
import { Checkbox, CheckboxGroup, Fieldset, FieldsetLegend } from "daybreaker";

const channels = ["Email", "Push notifications", "SMS"] as const;

export const Example = () => (
  <Fieldset>
    <FieldsetLegend>Notify me by</FieldsetLegend>
    <CheckboxGroup defaultValue={["Email"]}>
      {channels.map((channel) => (
        // biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control
        <label key={channel} className="flex items-center gap-2 text-sm">
          <Checkbox value={channel} />
          {channel}
        </label>
      ))}
    </CheckboxGroup>
  </Fieldset>
);
```

### Calendar

A month grid for picking a date.

Import from `"daybreaker"`: `Calendar`.

Defaults:

- `Calendar`: `defaultValue = null`

Props:

```ts
// Calendar
export type Props = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange"
> & {
  /** The selected date; leave undefined to let the calendar hold it. */
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date) => void;
  /** A BCP 47 language tag for month and weekday names. */
  locale?: string;
};
```

Example:

```tsx
import { Calendar } from "daybreaker";

export const Example = () => (
  <Calendar
    defaultValue={new Date()}
    className="rounded-surface bg-background-dimmed p-3"
  />
);
```

### Date Picker

A button that opens a calendar.

Import from `"daybreaker"`: `Button`, `Calendar`, `Popover`, `PopoverPopup`, `PopoverTrigger`.

Example:

```tsx
import {
  Button,
  Calendar,
  CalendarIcon,
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "daybreaker";
import { useState } from "react";

export const Example = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" />}>
        <CalendarIcon />
        {date
          ? date.toLocaleDateString(undefined, { dateStyle: "long" })
          : "Pick a date"}
      </PopoverTrigger>
      <PopoverPopup className="w-fit p-3">
        <Calendar
          value={date}
          onValueChange={(picked) => {
            setDate(picked);
            setOpen(false);
          }}
        />
      </PopoverPopup>
    </Popover>
  );
};
```

## Overlays

### Dialog

A modal window that traps focus.

Import from `"daybreaker"`: `Button`, `Dialog`, `DialogClose`, `DialogDescription`, `DialogFooter`, `DialogPopup`, `DialogTitle`, `DialogTrigger`, `Field`, `FieldLabel`, `Input`.

Defaults:

- `DialogPopup`: `closable = true`

Props:

```ts
// DialogDescription
export type Props = Styled<DialogPrimitive.Description.Props>;

// DialogFooter
export type Props = ComponentProps<"div">;

// DialogPopup
export type Props = Styled<DialogPrimitive.Popup.Props> & {
  /** Renders the corner close button. */
  closable?: boolean;
  classList?: ClassList<"backdrop" | "popup" | "close">;
};

// DialogTitle
export type Props = Styled<DialogPrimitive.Title.Props>;
```

Example:

```tsx
import {
  Button,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldLabel,
  Input,
} from "daybreaker";

export const Example = () => (
  <Dialog>
    <DialogTrigger render={<Button variant="outline" />}>
      Edit profile
    </DialogTrigger>
    <DialogPopup>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Changes are visible to everyone on your team.
      </DialogDescription>
      <Field>
        <FieldLabel>Display name</FieldLabel>
        <Input defaultValue="Ada Lovelace" />
      </Field>
      <DialogFooter>
        <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
        <DialogClose render={<Button />}>Save</DialogClose>
      </DialogFooter>
    </DialogPopup>
  </Dialog>
);
```

### Alert Dialog

A modal that requires a decision.

Import from `"daybreaker"`: `AlertDialog`, `AlertDialogClose`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogPopup`, `AlertDialogTitle`, `AlertDialogTrigger`, `Button`.

Props:

```ts
// AlertDialogDescription
export type Props = Styled<AlertDialogPrimitive.Description.Props>;

// AlertDialogFooter
export type Props = ComponentProps<"div">;

// AlertDialogPopup
export type Props = Styled<AlertDialogPrimitive.Popup.Props> & {
  classList?: ClassList<"backdrop" | "popup">;
};

// AlertDialogTitle
export type Props = Styled<AlertDialogPrimitive.Title.Props>;
```

Example:

```tsx
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "daybreaker";

export const Example = () => (
  <AlertDialog>
    <AlertDialogTrigger render={<Button variant="destructive" />}>
      Delete project
    </AlertDialogTrigger>
    <AlertDialogPopup>
      <AlertDialogTitle>Delete this project?</AlertDialogTitle>
      <AlertDialogDescription>
        This removes the project and its files. It cannot be undone.
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogClose render={<Button variant="ghost" />}>
          Cancel
        </AlertDialogClose>
        <AlertDialogClose render={<Button variant="destructive" />}>
          Delete
        </AlertDialogClose>
      </AlertDialogFooter>
    </AlertDialogPopup>
  </AlertDialog>
);
```

### Drawer

A sheet from the bottom or a side that swipes away.

Import from `"daybreaker"`: `Button`, `Drawer`, `DrawerClose`, `DrawerDescription`, `DrawerPopup`, `DrawerTitle`, `DrawerTrigger`.

Defaults:

- `DrawerPopup`: `side = "bottom"`

Props:

```ts
// DrawerDescription
export type Props = Styled<DrawerPrimitive.Description.Props>;

// DrawerPopup
export type Props = Styled<DrawerPrimitive.Popup.Props> & {
  /**
   * The edge the sheet is attached to. For "left" or "right", also set the
   * same `swipeDirection` on `Drawer` so the dismiss gesture matches.
   */
  side?: "bottom" | "left" | "right";
  classList?: ClassList<
    "backdrop" | "viewport" | "popup" | "handle" | "content"
  >;
};

// DrawerTitle
export type Props = Styled<DrawerPrimitive.Title.Props>;
```

Example:

```tsx
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "daybreaker";

export const Example = () => (
  <div className="flex flex-wrap justify-center gap-2">
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Bottom sheet
      </DrawerTrigger>
      <DrawerPopup>
        <DrawerTitle>Share this project</DrawerTitle>
        <DrawerDescription>
          Anyone with the link can view it. Swipe down to dismiss.
        </DrawerDescription>
        <div className="grid gap-2">
          <Button>Copy link</Button>
          <DrawerClose render={<Button variant="secondary" />}>
            Cancel
          </DrawerClose>
        </div>
      </DrawerPopup>
    </Drawer>
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button variant="outline" />}>
        Side panel
      </DrawerTrigger>
      <DrawerPopup side="right">
        <DrawerTitle>Filters</DrawerTitle>
        <DrawerDescription>
          A panel attached to the right edge. Swipe right to dismiss.
        </DrawerDescription>
        <DrawerClose render={<Button variant="secondary" />}>Done</DrawerClose>
      </DrawerPopup>
    </Drawer>
  </div>
);
```

### Command

A searchable palette of actions.

Import from `"daybreaker"`: `Button`, `Command`, `CommandInput`, `CommandItem`, `CommandList`, `Dialog`, `DialogPopup`, `DialogTitle`, `DialogTrigger`, `Kbd`.

Defaults:

- `CommandList`: `empty = "No results"`

Props:

```ts
// CommandInput
export type Props = Styled<ComboboxPrimitive.Input.Props> & {
  classList?: ClassList<"group" | "input">;
};

// CommandItem
export type Props = Styled<ComboboxPrimitive.Item.Props>;

// CommandList
export type Props = {
  className?: string;
  /** Shown when nothing matches what was typed. */
  empty?: ReactNode;
  /** Items, or a function that renders one item. */
  children?: ComboboxPrimitive.List.Props["children"];
  classList?: ClassList<"root" | "empty" | "list">;
};
```

Example:

```tsx
import {
  Button,
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Kbd,
} from "daybreaker";
import { useState } from "react";

type Action = { value: string; label: string; shortcut: string };

const actions: Action[] = [
  { value: "new", label: "New project", shortcut: "N" },
  { value: "invite", label: "Invite teammate", shortcut: "I" },
  { value: "theme", label: "Toggle dark mode", shortcut: "D" },
  { value: "settings", label: "Open settings", shortcut: "," },
  { value: "docs", label: "Search documentation", shortcut: "/" },
  { value: "logout", label: "Sign out", shortcut: "Q" },
];

export const Example = () => {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<Action | null>(null);

  return (
    <div className="grid justify-items-center gap-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="outline" />}>
          Open command palette
        </DialogTrigger>
        <DialogPopup closable={false} className="gap-0 overflow-hidden p-0">
          <DialogTitle className="sr-only">Command palette</DialogTitle>
          <Command
            items={actions}
            onValueChange={(action: Action | null) => {
              setLast(action);
              setOpen(false);
            }}
          >
            <CommandInput placeholder="Type a command…" />
            <CommandList empty="No commands found">
              {(action: Action) => (
                <CommandItem key={action.value} value={action}>
                  {action.label}
                  <Kbd className="ml-auto">{action.shortcut}</Kbd>
                </CommandItem>
              )}
            </CommandList>
          </Command>
        </DialogPopup>
      </Dialog>
      <p className="text-foreground-dimmed text-sm">
        {last ? `Ran “${last.label}”` : "Nothing run yet"}
      </p>
    </div>
  );
};
```

### Popover

A floating panel anchored to a trigger.

Import from `"daybreaker"`: `Button`, `Popover`, `PopoverDescription`, `PopoverPopup`, `PopoverTitle`, `PopoverTrigger`.

Defaults:

- `PopoverPopup`: `sideOffset = 12`

Props:

```ts
// PopoverDescription
export type Props = Styled<PopoverPrimitive.Description.Props>;

// PopoverPopup
export type Props = Styled<PopoverPrimitive.Popup.Props> &
  Pick<PopoverPrimitive.Positioner.Props, "side" | "align" | "sideOffset"> & {
    classList?: ClassList<"positioner" | "popup" | "arrow">;
  };

// PopoverTitle
export type Props = Styled<PopoverPrimitive.Title.Props>;
```

Example:

```tsx
import {
  Button,
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "daybreaker";

export const Example = () => (
  <Popover>
    <PopoverTrigger render={<Button variant="outline" />}>
      Storage
    </PopoverTrigger>
    <PopoverPopup>
      <PopoverTitle>Storage</PopoverTitle>
      <PopoverDescription>
        6.4 GB of 10 GB used across 3 projects.
      </PopoverDescription>
    </PopoverPopup>
  </Popover>
);
```

### Tooltip

A short hint on hover or focus.

Import from `"daybreaker"`: `Button`, `Tooltip`, `TooltipPopup`, `TooltipTrigger`.

Defaults:

- `TooltipPopup`: `sideOffset = 6`

Props:

```ts
// TooltipPopup
export type Props = Styled<TooltipPrimitive.Popup.Props> &
  Pick<TooltipPrimitive.Positioner.Props, "side" | "align" | "sideOffset"> & {
    classList?: ClassList<"positioner" | "popup">;
  };
```

Example:

```tsx
import { Button, Tooltip, TooltipPopup, TooltipTrigger } from "daybreaker";

const sides = ["top", "right", "bottom", "left"] as const;

export const Example = () => (
  <div className="flex flex-wrap justify-center gap-2">
    {sides.map((side) => (
      <Tooltip key={side}>
        <TooltipTrigger render={<Button variant="outline" />}>
          {side}
        </TooltipTrigger>
        <TooltipPopup side={side}>Opens on the {side}</TooltipPopup>
      </Tooltip>
    ))}
  </div>
);
```

### Preview Card

A card that previews a link on hover.

Import from `"daybreaker"`: `Avatar`, `AvatarFallback`, `AvatarImage`, `PreviewCard`, `PreviewCardPopup`, `PreviewCardTrigger`.

Defaults:

- `PreviewCardPopup`: `sideOffset = 12`

Props:

```ts
// PreviewCardPopup
export type Props = Styled<PreviewCardPrimitive.Popup.Props> &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset"
  > & {
    classList?: ClassList<"positioner" | "popup" | "arrow">;
  };

// PreviewCardTrigger
export type Props = Styled<PreviewCardPrimitive.Trigger.Props>;
```

Example:

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "daybreaker";

export const Example = () => (
  <p className="text-sm">
    Built by{" "}
    <PreviewCard>
      <PreviewCardTrigger href="https://github.com/wooz-05">
        @wooz-05
      </PreviewCardTrigger>
      <PreviewCardPopup>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/wooz-05.png" alt="" />
            <AvatarFallback>WZ</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">wooz-05</p>
            <p className="text-foreground-dimmed">github.com/wooz-05</p>
          </div>
        </div>
        <p className="text-foreground-dimmed">
          Maintains daybreaker, a set of accessible React components.
        </p>
      </PreviewCardPopup>
    </PreviewCard>
    .
  </p>
);
```

### Menu

A dropdown of actions, with icons, selection, or flags.

Import from `"daybreaker"`: `Button`, `Menu`, `MenuCheckboxItem`, `MenuGroup`, `MenuGroupLabel`, `MenuItem`, `MenuPopup`, `MenuRadioGroup`, `MenuRadioItem`, `MenuSeparator`, `MenuTrigger`.

Defaults:

- `MenuItem`: `destructive = false`
- `MenuPopup`: `align = "center"`, `sideOffset = 12`

Props:

```ts
// MenuCheckboxItem
export type Props = Styled<MenuPrimitive.CheckboxItem.Props>;

// MenuGroupLabel
export type Props = Styled<MenuPrimitive.GroupLabel.Props>;

// MenuItem
export type Props = Styled<MenuPrimitive.Item.Props> & {
  /** Marks an action that deletes or cannot be undone. */
  destructive?: boolean;
};

// MenuPopup
export type Props = Styled<MenuPrimitive.Popup.Props> &
  Pick<MenuPrimitive.Positioner.Props, "side" | "align" | "sideOffset"> & {
    classList?: ClassList<"positioner" | "popup" | "arrow">;
  };

// MenuRadioItem
export type Props = Styled<MenuPrimitive.RadioItem.Props>;

// MenuSeparator
export type Props = Styled<MenuPrimitive.Separator.Props>;
```

Example:

```tsx
import {
  Button,
  CopyIcon,
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "daybreaker";
import { useState } from "react";

const countries = [
  { code: "al", name: "Albania" },
  { code: "de", name: "Germany" },
  { code: "it", name: "Italy" },
  { code: "jp", name: "Japan" },
  { code: "gb", name: "United Kingdom" },
  { code: "us", name: "United States" },
] as const;

const Flag = ({ code }: { code: string }) => (
  <img
    src={`https://flagcdn.com/${code}.svg`}
    alt=""
    className="size-5 shrink-0 rounded-full object-cover"
  />
);

const Basic = () => (
  <Menu>
    <MenuTrigger render={<Button variant="outline" />}>Options</MenuTrigger>
    <MenuPopup>
      <MenuItem>Rename</MenuItem>
      <MenuItem>Duplicate</MenuItem>
      <MenuSeparator />
      <MenuItem destructive>Delete</MenuItem>
    </MenuPopup>
  </Menu>
);

const WithIcons = () => (
  <Menu>
    <MenuTrigger render={<Button variant="outline" />}>Actions</MenuTrigger>
    <MenuPopup>
      <MenuItem>
        <PencilIcon />
        Rename
      </MenuItem>
      <MenuItem>
        <CopyIcon />
        Duplicate
      </MenuItem>
      <MenuItem>
        <ShareIcon />
        Share
      </MenuItem>
      <MenuSeparator />
      <MenuItem destructive>
        <TrashIcon />
        Delete
      </MenuItem>
    </MenuPopup>
  </Menu>
);

const Selectable = () => (
  <Menu>
    <MenuTrigger render={<Button variant="outline" />}>View</MenuTrigger>
    <MenuPopup>
      <MenuGroup>
        <MenuGroupLabel>Show</MenuGroupLabel>
        <MenuCheckboxItem defaultChecked>Sidebar</MenuCheckboxItem>
        <MenuCheckboxItem>Status bar</MenuCheckboxItem>
      </MenuGroup>
      <MenuSeparator />
      <MenuGroup>
        <MenuGroupLabel>Sort by</MenuGroupLabel>
        <MenuRadioGroup defaultValue="name">
          <MenuRadioItem value="name">Name</MenuRadioItem>
          <MenuRadioItem value="date">Date modified</MenuRadioItem>
          <MenuRadioItem value="size">Size</MenuRadioItem>
        </MenuRadioGroup>
      </MenuGroup>
    </MenuPopup>
  </Menu>
);

const Countries = () => {
  const [code, setCode] = useState<string>("al");
  const selected = countries.find((country) => country.code === code);

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        <Flag code={code} />
        {selected?.name}
      </MenuTrigger>
      <MenuPopup>
        <MenuRadioGroup value={code} onValueChange={setCode}>
          {countries.map((country) => (
            <MenuRadioItem key={country.code} value={country.code} closeOnClick>
              <Flag code={country.code} />
              {country.name}
            </MenuRadioItem>
          ))}
        </MenuRadioGroup>
      </MenuPopup>
    </Menu>
  );
};

export const Example = () => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <Basic />
    <WithIcons />
    <Selectable />
    <Countries />
  </div>
);
```

### Context Menu

A menu that opens on right-click.

Import from `"daybreaker"`: `ContextMenu`, `ContextMenuItem`, `ContextMenuPopup`, `ContextMenuSeparator`, `ContextMenuTrigger`.

Defaults:

- `ContextMenuItem`: `destructive = false`

Props:

```ts
// ContextMenuItem
export type Props = Styled<ContextMenuPrimitive.Item.Props> & {
  /** Marks an action that deletes or cannot be undone. */
  destructive?: boolean;
};

// ContextMenuPopup
export type Props = Styled<ContextMenuPrimitive.Popup.Props> & {
  classList?: ClassList<"positioner" | "popup">;
};

// ContextMenuSeparator
export type Props = Styled<ContextMenuPrimitive.Separator.Props>;
```

Example:

```tsx
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuTrigger,
  CopyIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "daybreaker";

export const Example = () => (
  <ContextMenu>
    <ContextMenuTrigger className="flex h-32 w-64 select-none items-center justify-center rounded-surface border border-border border-dashed text-foreground-dimmed text-sm">
      Right-click here
    </ContextMenuTrigger>
    <ContextMenuPopup>
      <ContextMenuItem>
        <PencilIcon />
        Rename
      </ContextMenuItem>
      <ContextMenuItem>
        <CopyIcon />
        Duplicate
      </ContextMenuItem>
      <ContextMenuItem>
        <ShareIcon />
        Share
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem destructive>
        <TrashIcon />
        Delete
      </ContextMenuItem>
    </ContextMenuPopup>
  </ContextMenu>
);
```

### Toast

A brief message that dismisses itself.

Import from `"daybreaker"`: `Button`, `useToast`.

Example:

```tsx
import { Button, useToast } from "daybreaker";

const toasts = [
  {
    type: "success",
    title: "Changes saved",
    description: "Your profile is up to date.",
  },
  {
    type: "info",
    title: "Update available",
    description: "Restart to install version 2.4.",
  },
  {
    type: "warning",
    title: "Storage almost full",
    description: "You have used 9.4 of 10 GB.",
  },
  {
    type: "error",
    title: "Upload failed",
    description: "Check your connection and try again.",
  },
] as const;

export const Example = () => {
  const toast = useToast();

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {toasts.map((entry) => (
        <Button
          key={entry.type}
          variant="outline"
          className="capitalize"
          onClick={() => toast.add(entry)}
        >
          {entry.type}
        </Button>
      ))}
    </div>
  );
};
```

## Navigation

### Navbar

A floating bar for brand, links, and actions.

Import from `"daybreaker"`: `Button`, `Navbar`, `NavbarActions`, `NavbarBrand`, `NavbarLink`, `NavbarLinks`.

Defaults:

- `NavbarLink`: `current = false`

Props:

```ts
// Navbar
export type Props = ComponentProps<"nav">;

// NavbarActions
export type Props = ComponentProps<"div">;

// NavbarBrand
export type Props = ComponentProps<"a">;

// NavbarLink
export type Props = ComponentProps<"a"> & {
  /** Marks the link for the page being viewed. */
  current?: boolean;
};

// NavbarLinks
export type Props = ComponentProps<"div">;
```

Example:

```tsx
import {
  BellIcon,
  Button,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarLinks,
  SearchIcon,
} from "daybreaker";
import { useState } from "react";

const links = ["Home", "Products", "Pricing", "Docs"] as const;

export const Example = () => {
  const [current, setCurrent] = useState<string>("Home");

  return (
    <Navbar className="max-w-2xl">
      <NavbarBrand href="#/components/navbar">
        <span className="size-5 rounded-full bg-primary" />
        Acme
      </NavbarBrand>
      <NavbarLinks className="max-sm:hidden">
        {links.map((link) => (
          <NavbarLink
            key={link}
            href="#/components/navbar"
            current={link === current}
            onClick={() => setCurrent(link)}
          >
            {link}
          </NavbarLink>
        ))}
      </NavbarLinks>
      <NavbarActions>
        <Button variant="ghost" size="icon" aria-label="Search">
          <SearchIcon />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <BellIcon />
        </Button>
        <Button size="sm">Sign in</Button>
      </NavbarActions>
    </Navbar>
  );
};
```

### Navigation Menu

Links that open panels of more links.

Import from `"daybreaker"`: `NavigationMenu`, `NavigationMenuContent`, `NavigationMenuItem`, `NavigationMenuLink`, `NavigationMenuTrigger`.

Defaults:

- `NavigationMenuLink`: `bare = false`

Props:

```ts
// NavigationMenu
export type Props = Styled<NavigationMenuPrimitive.Root.Props> & {
  classList?: ClassList<"root" | "list" | "positioner" | "popup">;
};

// NavigationMenuContent
export type Props = Styled<NavigationMenuPrimitive.Content.Props>;

// NavigationMenuLink
export type Props = Styled<NavigationMenuPrimitive.Link.Props> & {
  /** Styles the link like a trigger, for use directly in the bar. */
  bare?: boolean;
};

// NavigationMenuTrigger
export type Props = Styled<NavigationMenuPrimitive.Trigger.Props>;
```

Example:

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "daybreaker";

const products = [
  { title: "Analytics", description: "See how people use your app." },
  { title: "Automations", description: "Run tasks on a schedule." },
  { title: "Messaging", description: "Email, push and in-app." },
  { title: "Storage", description: "Files, backed up for you." },
] as const;

const resources = [
  { title: "Documentation", description: "Guides and API reference." },
  { title: "Changelog", description: "What shipped this week." },
] as const;

export const Example = () => (
  <NavigationMenu>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent className="grid w-96 grid-cols-2">
        {products.map((product) => (
          <NavigationMenuLink key={product.title} href="#/components">
            <p className="font-medium">{product.title}</p>
            <p className="text-foreground-dimmed">{product.description}</p>
          </NavigationMenuLink>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent className="grid w-60">
        {resources.map((resource) => (
          <NavigationMenuLink key={resource.title} href="#/docs">
            <p className="font-medium">{resource.title}</p>
            <p className="text-foreground-dimmed">{resource.description}</p>
          </NavigationMenuLink>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink bare href="#/docs">
        Pricing
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenu>
);
```

### Menubar

A row of menus, like File and Edit.

Import from `"daybreaker"`: `Menu`, `Menubar`, `MenubarTrigger`, `MenuCheckboxItem`, `MenuItem`, `MenuPopup`, `MenuSeparator`.

Props:

```ts
// Menubar
export type Props = Styled<MenubarPrimitive.Props>;

// MenubarTrigger
export type Props = Styled<MenuPrimitive.Trigger.Props>;
```

Example:

```tsx
import {
  Menu,
  Menubar,
  MenubarTrigger,
  MenuCheckboxItem,
  MenuItem,
  MenuPopup,
  MenuSeparator,
} from "daybreaker";

export const Example = () => (
  <Menubar>
    <Menu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenuPopup align="start">
        <MenuItem>New file</MenuItem>
        <MenuItem>Open…</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuSeparator />
        <MenuItem>Print…</MenuItem>
      </MenuPopup>
    </Menu>
    <Menu>
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenuPopup align="start">
        <MenuItem>Undo</MenuItem>
        <MenuItem>Redo</MenuItem>
        <MenuSeparator />
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </MenuPopup>
    </Menu>
    <Menu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenuPopup align="start">
        <MenuCheckboxItem defaultChecked>Sidebar</MenuCheckboxItem>
        <MenuCheckboxItem>Status bar</MenuCheckboxItem>
        <MenuSeparator />
        <MenuItem>Enter full screen</MenuItem>
      </MenuPopup>
    </Menu>
  </Menubar>
);
```

### Sidebar

A vertical panel of navigation links.

Import from `"daybreaker"`: `Sidebar`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarItem`.

Defaults:

- `SidebarItem`: `current = false`

Props:

```ts
// Sidebar
export type Props = ComponentProps<"aside">;

// SidebarGroup
export type Props = ComponentProps<"div">;

// SidebarGroupLabel
export type Props = ComponentProps<"p">;

// SidebarItem
export type Props = ComponentProps<"a"> & {
  /** Marks the item for the page being viewed. */
  current?: boolean;
};
```

Example:

```tsx
import {
  BellIcon,
  HomeIcon,
  InboxIcon,
  SearchIcon,
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  UserIcon,
} from "daybreaker";
import { useState } from "react";

const workspace = [
  { name: "Home", icon: HomeIcon },
  { name: "Inbox", icon: InboxIcon },
  { name: "Search", icon: SearchIcon },
] as const;

const account = [
  { name: "Profile", icon: UserIcon },
  { name: "Notifications", icon: BellIcon },
] as const;

export const Example = () => {
  const [current, setCurrent] = useState<string>("Home");

  const items = (list: typeof workspace | typeof account) =>
    list.map(({ name, icon: Icon }) => (
      <SidebarItem
        key={name}
        current={name === current}
        onClick={() => setCurrent(name)}
      >
        <Icon />
        {name}
      </SidebarItem>
    ));

  return (
    <Sidebar>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        {items(workspace)}
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        {items(account)}
      </SidebarGroup>
    </Sidebar>
  );
};
```

### Tabs

Switch between panels of content.

Import from `"daybreaker"`: `Tab`, `Tabs`, `TabsList`, `TabsPanel`.

Defaults:

- `TabsList`: `activateOnFocus = true`

Props:

```ts
// Tab
export type Props = Styled<TabsPrimitive.Tab.Props>;

// Tabs
export type Props = Styled<TabsPrimitive.Root.Props>;

// TabsList
export type Props = Styled<TabsPrimitive.List.Props> & {
  classList?: ClassList<"list" | "indicator">;
};

// TabsPanel
export type Props = Styled<TabsPrimitive.Panel.Props>;
```

Example:

```tsx
import { Tab, Tabs, TabsList, TabsPanel } from "daybreaker";

export const Example = () => (
  <Tabs defaultValue="account" className="w-64">
    <TabsList>
      <Tab value="account">Account</Tab>
      <Tab value="billing">Billing</Tab>
      <Tab value="team">Team</Tab>
    </TabsList>
    <TabsPanel value="account">Manage your account details.</TabsPanel>
    <TabsPanel value="billing">Update your payment method.</TabsPanel>
    <TabsPanel value="team">Invite and remove teammates.</TabsPanel>
  </Tabs>
);
```

### Accordion

Stacked sections that expand and collapse.

Import from `"daybreaker"`: `Accordion`, `AccordionItem`, `AccordionPanel`, `AccordionTrigger`.

Props:

```ts
// Accordion
export type Props = Styled<AccordionPrimitive.Root.Props>;

// AccordionItem
export type Props = Styled<AccordionPrimitive.Item.Props>;

// AccordionPanel
export type Props = Styled<AccordionPrimitive.Panel.Props> & {
  classList?: ClassList<"panel" | "content">;
};

// AccordionTrigger
export type Props = Styled<AccordionPrimitive.Trigger.Props> & {
  classList?: ClassList<"header" | "trigger" | "icon">;
};
```

Example:

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "daybreaker";

const questions = [
  {
    question: "Is it accessible?",
    answer: "Yes. Keyboard and screen reader support are built in.",
  },
  {
    question: "Can I restyle it?",
    answer: "Override the tokens, or pass className and classList.",
  },
  {
    question: "Is there a dark mode?",
    answer: "Add the dark class to the html element.",
  },
] as const;

export const Example = () => (
  <Accordion className="w-64">
    {questions.map(({ question, answer }) => (
      <AccordionItem key={question}>
        <AccordionTrigger>{question}</AccordionTrigger>
        <AccordionPanel>{answer}</AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
);
```

### Collapsible

One section that expands and collapses.

Import from `"daybreaker"`: `Collapsible`, `CollapsiblePanel`, `CollapsibleTrigger`.

Props:

```ts
// Collapsible
export type Props = Styled<CollapsiblePrimitive.Root.Props>;

// CollapsiblePanel
export type Props = Styled<CollapsiblePrimitive.Panel.Props> & {
  classList?: ClassList<"panel" | "content">;
};

// CollapsibleTrigger
export type Props = Styled<CollapsiblePrimitive.Trigger.Props> & {
  classList?: ClassList<"trigger" | "icon">;
};
```

Example:

```tsx
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "daybreaker";

export const Example = () => (
  <Collapsible className="w-64">
    <CollapsibleTrigger>Recovery keys</CollapsibleTrigger>
    <CollapsiblePanel className="grid gap-1 font-mono">
      <span>alien-bean-pasta</span>
      <span>wild-irish-burrito</span>
      <span>horse-battery-staple</span>
    </CollapsiblePanel>
  </Collapsible>
);
```

### Breadcrumb

Shows where a page sits in the hierarchy.

Import from `"daybreaker"`: `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`.

Props:

```ts
// Breadcrumb
export type Props = ComponentProps<"nav">;

// BreadcrumbItem
export type Props = ComponentProps<"li">;

// BreadcrumbLink
export type Props = ComponentProps<"a">;

// BreadcrumbPage
export type Props = ComponentProps<"span">;

// BreadcrumbSeparator
export type Props = ComponentProps<"li">;
```

Example:

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "daybreaker";

export const Example = () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <BreadcrumbLink href="#/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </Breadcrumb>
);
```

### Pagination

Move between pages of results.

Import from `"daybreaker"`: `Pagination`.

Props:

```ts
// Pagination
export type Props = Omit<ComponentProps<"nav">, "children"> & {
  /** The current page, starting at 1. */
  page: number;
  /** How many pages there are. */
  count: number;
  onPageChange: (page: number) => void;
};
```

Example:

```tsx
import { Pagination } from "daybreaker";
import { useState } from "react";

export const Example = () => {
  const [page, setPage] = useState(4);

  return <Pagination page={page} count={12} onPageChange={setPage} />;
};
```

## Conversation

### Message

A row in a conversation, with avatar and header.

Import from `"daybreaker"`: `Avatar`, `AvatarFallback`, `Bubble`, `BubbleContent`, `Message`, `MessageContent`, `MessageHeader`.

Defaults:

- `Message`: `align = "start"`

Props:

```ts
// Message
export type Props = ComponentProps<"div"> & {
  /** Which side of the conversation the message sits on. */
  align?: "start" | "end";
};

// MessageContent
export type Props = ComponentProps<"div">;

// MessageHeader
export type Props = ComponentProps<"p">;
```

Example:

```tsx
import {
  Avatar,
  AvatarFallback,
  Bubble,
  BubbleContent,
  Message,
  MessageContent,
  MessageHeader,
} from "daybreaker";

export const Example = () => (
  <div className="flex w-full max-w-md flex-col gap-4">
    <Message>
      <Avatar size="sm">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <MessageContent>
        <MessageHeader>
          <strong>Ada</strong> · 9:41
        </MessageHeader>
        <Bubble>
          <BubbleContent>The build is green. Ready to ship?</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message align="end">
      <Avatar size="sm">
        <AvatarFallback>WZ</AvatarFallback>
      </Avatar>
      <MessageContent>
        <MessageHeader>
          <strong>You</strong> · 9:42
        </MessageHeader>
        <Bubble variant="default" align="end">
          <BubbleContent>Shipping now.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  </div>
);
```

### Bubble

A chat bubble in seven styles, with reactions.

Import from `"daybreaker"`: `Bubble`, `BubbleContent`, `BubbleGroup`, `BubbleReactions`.

Variants:

- `Bubble`: variant: "default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive" (defaults { variant: "secondary" })

Defaults:

- `Bubble`: `align = "start"`

Props:

```ts
// Bubble
export type Props = ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    /** Which side of the conversation the bubble sits on. */
    align?: "start" | "end";
  };

// BubbleContent
export type Props = ComponentProps<"div">;

// BubbleGroup
export type Props = ComponentProps<"div">;

// BubbleReactions
export type Props = ComponentProps<"div">;
```

Example:

```tsx
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "daybreaker";

const variants = [
  "default",
  "secondary",
  "muted",
  "tinted",
  "outline",
  "ghost",
  "destructive",
] as const;

export const Example = () => (
  <div className="grid w-full max-w-md gap-6">
    <div className="flex flex-col gap-3">
      <Bubble>
        <BubbleContent>Are we still on for the design review?</BubbleContent>
        <BubbleReactions>
          <span>👍</span>
          <span>2</span>
        </BubbleReactions>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="default" align="end">
          <BubbleContent>Yes, 3pm works.</BubbleContent>
        </Bubble>
        <Bubble variant="default" align="end">
          <BubbleContent>I'll bring the new menu animations.</BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <Bubble key={variant} variant={variant} className="max-w-none">
          <BubbleContent className="capitalize">{variant}</BubbleContent>
        </Bubble>
      ))}
    </div>
  </div>
);
```

### Marker

A status line or labelled divider in a thread.

Import from `"daybreaker"`: `Marker`, `MarkerContent`.

Variants:

- `Marker`: variant: "default" | "border" | "separator" (defaults { variant: "default" })

Props:

```ts
// Marker
export type Props = ComponentProps<"div"> &
  VariantProps<typeof markerVariants>;

// MarkerContent
export type Props = ComponentProps<"span">;
```

Example:

```tsx
import {
  CircleCheckIcon,
  Marker,
  MarkerContent,
  MarkerIcon,
  SearchIcon,
} from "daybreaker";

export const Example = () => (
  <div className="grid w-full max-w-sm gap-4">
    <Marker variant="separator">
      <MarkerContent>Today</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <SearchIcon />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
    <Marker variant="border">
      <MarkerIcon className="text-success">
        <CircleCheckIcon />
      </MarkerIcon>
      <MarkerContent>Ada joined the conversation</MarkerContent>
    </Marker>
    <Marker variant="separator" className="text-primary">
      <MarkerContent>New messages</MarkerContent>
    </Marker>
  </div>
);
```

### Attachment

A file or image with upload state and actions.

Import from `"daybreaker"`: `Attachment`, `AttachmentAction`, `AttachmentActions`, `AttachmentContent`, `AttachmentDescription`, `AttachmentGroup`, `AttachmentMedia`, `AttachmentTitle`.

Defaults:

- `Attachment`: `state = "idle"`, `orientation = "horizontal"`

Props:

```ts
// Attachment
export type Props = ComponentProps<"div"> & {
  state?: "idle" | "uploading" | "processing" | "error" | "done";
  /** Vertical stacks the preview above the text, for image tiles. */
  orientation?: "horizontal" | "vertical";
};

// AttachmentAction
export type Props = ComponentProps<"button">;

// AttachmentActions
export type Props = ComponentProps<"div">;

// AttachmentContent
export type Props = ComponentProps<"div">;

// AttachmentDescription
export type Props = ComponentProps<"p">;

// AttachmentGroup
export type Props = ComponentProps<"div">;

// AttachmentMedia
export type Props = ComponentProps<"div">;

// AttachmentTitle
export type Props = ComponentProps<"p">;
```

Example:

```tsx
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  FileIcon,
  XIcon,
} from "daybreaker";

const files = [
  { name: "sales-dashboard.pdf", detail: "PDF · 2.4 MB", state: "done" },
  { name: "q3-forecast.xlsx", detail: "Uploading… 62%", state: "uploading" },
  { name: "raw-export.csv", detail: "Too large to upload", state: "error" },
] as const;

export const Example = () => (
  <div className="grid w-full max-w-sm gap-4">
    <div className="grid gap-2">
      {files.map((file) => (
        <Attachment key={file.name} state={file.state} className="w-full">
          <AttachmentMedia>
            <FileIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.name}</AttachmentTitle>
            <AttachmentDescription>{file.detail}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Remove ${file.name}`}>
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </div>
    <AttachmentGroup>
      {["us", "jp", "it"].map((code) => (
        <Attachment key={code} orientation="vertical">
          <AttachmentMedia>
            <img src={`https://flagcdn.com/${code}.svg`} alt="" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{code}.svg</AttachmentTitle>
            <AttachmentDescription>Image</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Remove ${code}.svg`}>
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </AttachmentGroup>
  </div>
);
```

### Message Scroller

A transcript that follows new messages.

Import from `"daybreaker"`: `Bubble`, `BubbleContent`, `Button`, `Marker`, `MarkerContent`, `MessageScroller`.

Props:

```ts
// MessageScroller
export type Props = ComponentProps<"div"> & {
  classList?: ClassList<"root" | "viewport" | "content" | "button">;
};
```

Example:

```tsx
import {
  Bubble,
  BubbleContent,
  Button,
  Marker,
  MarkerContent,
  MessageScroller,
} from "daybreaker";
import { useState } from "react";

const replies = [
  "On it.",
  "Pushed a fix for the tab pill.",
  "The spring is one token now.",
  "Docs are updated too.",
  "Anything else before we ship?",
] as const;

export const Example = () => {
  const [count, setCount] = useState(6);

  return (
    <div className="grid w-full max-w-sm gap-3">
      <MessageScroller className="h-64 rounded-surface bg-background-dimmed">
        <Marker variant="separator">
          <MarkerContent>Today</MarkerContent>
        </Marker>
        {Array.from({ length: count }, (_, index) => (
          <Bubble
            // biome-ignore lint/suspicious/noArrayIndexKey: messages are only ever appended
            key={index}
            variant={index % 2 ? "default" : "secondary"}
            align={index % 2 ? "end" : "start"}
          >
            <BubbleContent>{replies[index % replies.length]}</BubbleContent>
          </Bubble>
        ))}
      </MessageScroller>
      <Button variant="outline" onClick={() => setCount(count + 1)}>
        Receive a message
      </Button>
    </div>
  );
};
```

### Questionnaire

Questions asked one at a time.

Import from `"daybreaker"`: `Button`, `Questionnaire`.

Defaults:

- `Questionnaire`: `submitLabel = "Submit"`

Props:

```ts
// Questionnaire
export type Item = {
  /** The key this question's answer is stored under. */
  name: string;
  title: ReactNode;
  description?: ReactNode;
  /** Options to pick from; leave out for a free-text answer. */
  choices?: readonly { value: string; label: ReactNode }[];
  /** Lets several choices be picked. */
  multiple?: boolean;
  /** Blocks moving on, and hides Skip, until answered. */
  required?: boolean;
  placeholder?: string;
};
export type Props = {
  items: readonly Item[];
  onSubmit: (answers: Record<string, string | string[]>) => void;
  submitLabel?: string;
  className?: string;
};
```

Example:

```tsx
import { Button, Questionnaire } from "daybreaker";
import { useState } from "react";

const items: Questionnaire.Item[] = [
  {
    name: "role",
    title: "What best describes you?",
    required: true,
    choices: [
      { value: "designer", label: "Designer" },
      { value: "developer", label: "Developer" },
      { value: "founder", label: "Founder" },
    ],
  },
  {
    name: "platforms",
    title: "Which platforms do you build for?",
    description: "Pick as many as you like.",
    multiple: true,
    choices: [
      { value: "web", label: "Web" },
      { value: "ios", label: "iOS" },
      { value: "android", label: "Android" },
    ],
  },
  {
    name: "project",
    title: "What are you working on?",
    placeholder: "A dashboard, a shop, a side project…",
  },
];

export const Example = () => {
  const [answers, setAnswers] = useState<Record<string, unknown> | null>(null);

  if (answers) {
    return (
      <div className="grid w-full max-w-sm justify-items-start gap-3">
        <p className="font-semibold">Thanks! Here is what you told us.</p>
        <pre className="w-full overflow-x-auto rounded-control bg-accent p-3 text-xs">
          {JSON.stringify(answers, null, 2)}
        </pre>
        <Button variant="outline" onClick={() => setAnswers(null)}>
          Start over
        </Button>
      </div>
    );
  }

  return (
    <Questionnaire items={items} onSubmit={setAnswers} className="max-w-sm" />
  );
};
```

## Charts

### Area Charts

Nine area charts: stacked, stepped, gradient and more.

Import from `"daybreaker/charts"`: `ChartConfig`, `ChartContainer`, `ChartLegend`, `ChartLegendContent`, `ChartTooltip`, `ChartTooltipContent`.

Defaults:

- `ChartTooltipContent`: `indicator = "dot"`, `hideLabel = false`, `hideIndicator = false`, `valueFormatter = (value) => value.toLocaleString()`

Props:

```ts
// ChartContainer
export type Props = Omit<ComponentProps<"div">, "children"> & {
  config: ChartConfig;
  /** One Recharts chart, e.g. `<BarChart>`. */
  children: ComponentProps<typeof ResponsiveContainer>["children"];
};

// ChartLegendContent
export type Props = {
  // filled in by Recharts
  payload?: (Entry & { value?: string | number })[];
  /** The data field that names an entry, for pies and radial charts. */
  nameKey?: string;
  className?: string;
};

// ChartTooltipContent
export type Props = {
  // the next three are filled in by Recharts
  active?: boolean;
  payload?: Entry[];
  label?: string | number;
  /** The mark beside each row. */
  indicator?: keyof typeof marks;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  /** The data field that names a row, for pies and radial charts. */
  nameKey?: string;
  labelFormatter?: (label: string | number) => ReactNode;
  valueFormatter?: (value: number, key: string) => ReactNode;
  /** Extra rows under the series, e.g. a total. */
  footer?: (payload: Entry[]) => ReactNode;
  className?: string;
};
```

Example:

```tsx
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "daybreaker/charts";
import type { ComponentProps, ReactNode } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const config = {
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

const Tile = ({ title, children }: { title: string; children: ReactNode }) => (
  <figure className="rounded-surface bg-background-dimmed p-4">
    <figcaption className="mb-3 font-medium text-sm">{title}</figcaption>
    {children}
  </figure>
);

// the frame every chart here shares: grid, month axis and tooltip
const Plot = ({
  children,
  ...chart
}: ComponentProps<typeof AreaChart> & { children: ReactNode }) => (
  <ChartContainer config={config}>
    <AreaChart data={data} margin={{ top: 8, right: 20, left: 20 }} {...chart}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      {children}
    </AreaChart>
  </ChartContainer>
);

const desktop = {
  dataKey: "desktop",
  stroke: "var(--color-desktop)",
  fill: "var(--color-desktop)",
  fillOpacity: 0.3,
  strokeWidth: 2,
} as const;
const mobile = {
  dataKey: "mobile",
  stroke: "var(--color-mobile)",
  fill: "var(--color-mobile)",
  fillOpacity: 0.3,
  strokeWidth: 2,
} as const;

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot>
        <Area type="natural" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Linear">
      <Plot>
        <Area type="linear" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Step">
      <Plot>
        <Area type="step" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Stacked">
      <Plot>
        <Area type="natural" stackId="a" {...mobile} />
        <Area type="natural" stackId="a" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Stacked to 100%">
      <Plot stackOffset="expand">
        <Area type="natural" stackId="a" {...mobile} />
        <Area type="natural" stackId="a" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Gradient">
      <Plot>
        <defs>
          <linearGradient id="area-fade" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.7}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <Area
          type="natural"
          {...desktop}
          fill="url(#area-fade)"
          fillOpacity={1}
        />
      </Plot>
    </Tile>
    <Tile title="Legend">
      <Plot>
        <Area type="natural" stackId="a" {...mobile} />
        <Area type="natural" stackId="a" {...desktop} />
        <ChartLegend content={<ChartLegendContent />} />
      </Plot>
    </Tile>
    <Tile title="Value axis">
      <Plot margin={{ top: 8, right: 20, left: -16 }}>
        <YAxis tickLine={false} axisLine={false} tickCount={4} />
        <Area type="natural" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Dots">
      <Plot>
        <Area
          type="linear"
          {...desktop}
          fillOpacity={0.15}
          dot={{ r: 3, fill: "var(--color-desktop)", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </Plot>
    </Tile>
  </div>
);
```

### Bar Charts

Nine bar charts: grouped, stacked, horizontal and more.

Import from `"daybreaker/charts"`: `ChartConfig`, `ChartContainer`, `ChartLegend`, `ChartLegendContent`, `ChartTooltip`, `ChartTooltipContent`.

Example:

```tsx
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "daybreaker/charts";
import type { ComponentProps, ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", desktop: 186, mobile: 80, change: 186 },
  { month: "Feb", desktop: 305, mobile: 200, change: 205 },
  { month: "Mar", desktop: 237, mobile: 120, change: -207 },
  { month: "Apr", desktop: 73, mobile: 190, change: 173 },
  { month: "May", desktop: 209, mobile: 130, change: -109 },
  { month: "Jun", desktop: 214, mobile: 140, change: 214 },
];

// one colour per bar, taken from the row itself
const mixed = data.map((row, index) => ({
  ...row,
  fill: `var(--color-chart-${(index % 5) + 1})`,
}));

const config = {
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
  change: { label: "Change", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

const Tile = ({ title, children }: { title: string; children: ReactNode }) => (
  <figure className="rounded-surface bg-background-dimmed p-4">
    <figcaption className="mb-3 font-medium text-sm">{title}</figcaption>
    {children}
  </figure>
);

// upright bars over a month axis
const Plot = ({
  children,
  ...chart
}: ComponentProps<typeof BarChart> & { children: ReactNode }) => (
  <ChartContainer config={config}>
    <BarChart data={data} margin={{ top: 16, right: 8, left: 8 }} {...chart}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip content={<ChartTooltipContent />} />
      {children}
    </BarChart>
  </ChartContainer>
);

// bars lying on their side, months down the left
const Sideways = ({ children }: { children: ReactNode }) => (
  <ChartContainer config={config}>
    <BarChart data={data} layout="vertical" margin={{ right: 24, left: -16 }}>
      <XAxis type="number" hide />
      <YAxis
        dataKey="month"
        type="category"
        // every month, not every other one
        interval={0}
        tickLine={false}
        axisLine={false}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      {children}
    </BarChart>
  </ChartContainer>
);

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6} />
      </Plot>
    </Tile>
    <Tile title="Horizontal">
      <Sideways>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
      </Sideways>
    </Tile>
    <Tile title="Multiple">
      <Plot>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </Plot>
    </Tile>
    <Tile title="Stacked with legend">
      <Plot>
        <Bar
          dataKey="desktop"
          stackId="a"
          fill="var(--color-desktop)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="mobile"
          stackId="a"
          fill="var(--color-mobile)"
          radius={[4, 4, 0, 0]}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </Plot>
    </Tile>
    <Tile title="Labels">
      <Plot>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6}>
          <LabelList
            position="top"
            offset={6}
            fontSize={11}
            className="fill-foreground"
          />
        </Bar>
      </Plot>
    </Tile>
    <Tile title="Labels at the end">
      <Sideways>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5}>
          <LabelList
            position="right"
            offset={6}
            fontSize={11}
            className="fill-foreground"
          />
        </Bar>
      </Sideways>
    </Tile>
    <Tile title="Mixed colours">
      <Plot data={mixed}>
        <Bar dataKey="desktop" radius={6} />
      </Plot>
    </Tile>
    <Tile title="Negative values">
      <Plot>
        <Bar dataKey="change" radius={4}>
          {data.map((row) => (
            <Cell
              key={row.month}
              fill={
                row.change < 0 ? "var(--color-chart-5)" : "var(--color-chart-2)"
              }
            />
          ))}
        </Bar>
      </Plot>
    </Tile>
    <Tile title="One bar highlighted">
      <Plot>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6}>
          {data.map((row) => (
            <Cell key={row.month} fillOpacity={row.month === "Feb" ? 1 : 0.3} />
          ))}
        </Bar>
      </Plot>
    </Tile>
  </div>
);
```

### Line Charts

Nine line charts: multiple series, dots, labels and more.

Import from `"daybreaker/charts"`: `ChartConfig`, `ChartContainer`, `ChartLegend`, `ChartLegendContent`, `ChartTooltip`, `ChartTooltipContent`.

Example:

```tsx
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "daybreaker/charts";
import type { ComponentProps, ReactNode } from "react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const config = {
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

const Tile = ({ title, children }: { title: string; children: ReactNode }) => (
  <figure className="rounded-surface bg-background-dimmed p-4">
    <figcaption className="mb-3 font-medium text-sm">{title}</figcaption>
    {children}
  </figure>
);

const Plot = ({
  children,
  ...chart
}: ComponentProps<typeof LineChart> & { children: ReactNode }) => (
  <ChartContainer config={config}>
    <LineChart data={data} margin={{ top: 16, right: 20, left: 20 }} {...chart}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      {children}
    </LineChart>
  </ChartContainer>
);

const desktop = {
  dataKey: "desktop",
  stroke: "var(--color-desktop)",
  strokeWidth: 2,
  dot: false,
} as const;
const mobile = {
  dataKey: "mobile",
  stroke: "var(--color-mobile)",
  strokeWidth: 2,
  dot: false,
} as const;

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot>
        <Line type="natural" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Linear">
      <Plot>
        <Line type="linear" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Step">
      <Plot>
        <Line type="step" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Multiple">
      <Plot>
        <Line type="monotone" {...desktop} />
        <Line type="monotone" {...mobile} />
      </Plot>
    </Tile>
    <Tile title="Dots">
      <Plot>
        <Line
          type="natural"
          {...desktop}
          dot={{ r: 3, fill: "var(--color-desktop)", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </Plot>
    </Tile>
    <Tile title="Hollow dots">
      <Plot>
        <Line
          type="linear"
          {...desktop}
          dot={{ r: 4, fill: "var(--wz-background-dimmed)", strokeWidth: 2 }}
        />
      </Plot>
    </Tile>
    <Tile title="Labels">
      <Plot>
        <Line
          type="natural"
          {...desktop}
          dot={{ r: 3, fill: "var(--color-desktop)", strokeWidth: 0 }}
        >
          <LabelList
            position="top"
            offset={8}
            fontSize={11}
            className="fill-foreground"
          />
        </Line>
      </Plot>
    </Tile>
    <Tile title="Dashed comparison">
      <Plot>
        <Line type="monotone" {...desktop} />
        <Line type="monotone" {...mobile} strokeDasharray="5 5" />
      </Plot>
    </Tile>
    <Tile title="Axis and legend">
      <Plot margin={{ top: 8, right: 20, left: -16 }}>
        <YAxis tickLine={false} axisLine={false} tickCount={4} />
        <Line type="monotone" {...desktop} />
        <Line type="monotone" {...mobile} />
        <ChartLegend content={<ChartLegendContent />} />
      </Plot>
    </Tile>
  </div>
);
```

### Pie Charts

Nine pie and donut charts.

Import from `"daybreaker/charts"`: `ChartConfig`, `ChartContainer`, `ChartLegend`, `ChartLegendContent`, `ChartTooltip`, `ChartTooltipContent`.

Example:

```tsx
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "daybreaker/charts";
import type { ReactNode } from "react";
import { LabelList, Pie, PieChart } from "recharts";

const data = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];
const total = data.reduce((sum, row) => sum + row.visitors, 0);

// a second ring for the stacked chart: the same browsers on phones
const phones = data.map((row, index) => ({
  ...row,
  visitors: [120, 260, 60, 40, 110][index] ?? 0,
}));

const config = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--color-chart-1)" },
  safari: { label: "Safari", color: "var(--color-chart-2)" },
  firefox: { label: "Firefox", color: "var(--color-chart-3)" },
  edge: { label: "Edge", color: "var(--color-chart-4)" },
  other: { label: "Other", color: "var(--color-chart-5)" },
} satisfies ChartConfig;

const Tile = ({ title, children }: { title: string; children: ReactNode }) => (
  <figure className="rounded-surface bg-background-dimmed p-4">
    <figcaption className="mb-3 font-medium text-sm">{title}</figcaption>
    {children}
  </figure>
);

const Plot = ({
  children,
  center,
}: {
  children: ReactNode;
  /** Text drawn in the hole of a donut. */
  center?: ReactNode;
}) => (
  <div className="relative">
    <ChartContainer config={config} className="aspect-square">
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent hideLabel nameKey="browser" />}
        />
        {children}
      </PieChart>
    </ChartContainer>
    {center && (
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        {center}
      </div>
    )}
  </div>
);

// the slice outline matches the tile, so slices look separated
const slices = {
  data,
  dataKey: "visitors",
  nameKey: "browser",
  stroke: "var(--wz-background-dimmed)",
  strokeWidth: 2,
} as const;

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot>
        <Pie {...slices} />
      </Plot>
    </Tile>
    <Tile title="No separators">
      <Plot>
        <Pie {...slices} stroke="none" />
      </Plot>
    </Tile>
    <Tile title="Labels">
      <Plot>
        <Pie {...slices} outerRadius="65%" label={{ fontSize: 11 }} />
      </Plot>
    </Tile>
    <Tile title="Labels inside">
      <Plot>
        <Pie {...slices}>
          <LabelList
            dataKey="visitors"
            fill="white"
            stroke="none"
            fontSize={11}
          />
        </Pie>
      </Plot>
    </Tile>
    <Tile title="Legend">
      <Plot>
        <Pie {...slices} outerRadius="75%" />
        <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
      </Plot>
    </Tile>
    <Tile title="Donut">
      <Plot>
        <Pie {...slices} innerRadius="55%" />
      </Plot>
    </Tile>
    <Tile title="Donut with a total">
      <Plot
        center={
          <>
            <span className="font-bold text-2xl tabular-nums">
              {total.toLocaleString()}
            </span>
            <span className="text-foreground-dimmed text-xs">Visitors</span>
          </>
        }
      >
        <Pie {...slices} innerRadius="62%" />
      </Plot>
    </Tile>
    <Tile title="Stacked rings">
      <Plot>
        <Pie {...slices} outerRadius="55%" />
        <Pie {...slices} data={phones} innerRadius="65%" outerRadius="85%" />
      </Plot>
    </Tile>
    <Tile title="Rounded, with gaps">
      <Plot>
        <Pie
          {...slices}
          stroke="none"
          innerRadius="55%"
          paddingAngle={4}
          cornerRadius={6}
        />
      </Plot>
    </Tile>
  </div>
);
```

### Radar Charts

Nine radar charts.

Import from `"daybreaker/charts"`: `ChartConfig`, `ChartContainer`, `ChartLegend`, `ChartLegendContent`, `ChartTooltip`, `ChartTooltipContent`.

Example:

```tsx
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "daybreaker/charts";
import type { ReactNode } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

const data = [
  { month: "Jan", desktop: 186, mobile: 160 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 273, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const config = {
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

const Tile = ({ title, children }: { title: string; children: ReactNode }) => (
  <figure className="rounded-surface bg-background-dimmed p-4">
    <figcaption className="mb-3 font-medium text-sm">{title}</figcaption>
    {children}
  </figure>
);

const Plot = ({
  children,
  grid = <PolarGrid />,
  radius,
}: {
  children: ReactNode;
  /** Shrinks the web to leave room, e.g. for a legend. */
  radius?: string;
  /** The web behind the shape; pass `null` for none. */
  grid?: ReactNode;
}) => (
  <ChartContainer config={config} className="aspect-square">
    <RadarChart
      data={data}
      outerRadius={radius}
      margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
    >
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      {grid}
      <PolarAngleAxis dataKey="month" />
      {children}
    </RadarChart>
  </ChartContainer>
);

const desktop = {
  dataKey: "desktop",
  stroke: "var(--color-desktop)",
  fill: "var(--color-desktop)",
  fillOpacity: 0.4,
  strokeWidth: 2,
} as const;
const mobile = {
  dataKey: "mobile",
  stroke: "var(--color-mobile)",
  fill: "var(--color-mobile)",
  fillOpacity: 0.4,
  strokeWidth: 2,
} as const;

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot>
        <Radar {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Dots">
      <Plot>
        <Radar {...desktop} dot={{ r: 3, fillOpacity: 1, strokeWidth: 0 }} />
      </Plot>
    </Tile>
    <Tile title="Lines only">
      <Plot>
        <Radar {...desktop} fillOpacity={0} />
        <Radar {...mobile} fillOpacity={0} />
      </Plot>
    </Tile>
    <Tile title="Multiple">
      <Plot>
        <Radar {...desktop} />
        <Radar {...mobile} />
      </Plot>
    </Tile>
    <Tile title="Legend">
      <Plot radius="58%">
        <Radar {...desktop} />
        <Radar {...mobile} />
        <ChartLegend content={<ChartLegendContent />} />
      </Plot>
    </Tile>
    <Tile title="Circular grid">
      <Plot grid={<PolarGrid gridType="circle" />}>
        <Radar {...desktop} />
      </Plot>
    </Tile>
    <Tile title="No grid">
      <Plot grid={null}>
        <Radar {...desktop} dot={{ r: 3, fillOpacity: 1, strokeWidth: 0 }} />
      </Plot>
    </Tile>
    <Tile title="Rings without spokes">
      <Plot grid={<PolarGrid radialLines={false} />}>
        <Radar {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Value axis">
      <Plot>
        <PolarRadiusAxis
          angle={90}
          tickCount={4}
          axisLine={false}
          fontSize={10}
        />
        <Radar {...desktop} />
      </Plot>
    </Tile>
  </div>
);
```

### Radial Charts

Nine radial bar charts.

Import from `"daybreaker/charts"`: `ChartConfig`, `ChartContainer`, `ChartLegend`, `ChartLegendContent`, `ChartTooltip`, `ChartTooltipContent`.

Example:

```tsx
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "daybreaker/charts";
import type { ComponentProps, ReactNode } from "react";
import {
  LabelList,
  PolarAngleAxis,
  PolarGrid,
  RadialBar,
  RadialBarChart,
} from "recharts";

const data = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

// one bar, for the charts that show a single figure
const single = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
];
// a score out of 100, for the gauge
const score = [
  { browser: "chrome", visitors: 72, fill: "var(--color-chrome)" },
];
// two figures to compare, for the half rings
const split = [
  { browser: "desktop", visitors: 1260, fill: "var(--color-desktop)" },
  { browser: "mobile", visitors: 570, fill: "var(--color-mobile)" },
];

const config = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--color-chart-1)" },
  safari: { label: "Safari", color: "var(--color-chart-2)" },
  firefox: { label: "Firefox", color: "var(--color-chart-3)" },
  edge: { label: "Edge", color: "var(--color-chart-4)" },
  other: { label: "Other", color: "var(--color-chart-5)" },
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

const Tile = ({ title, children }: { title: string; children: ReactNode }) => (
  <figure className="rounded-surface bg-background-dimmed p-4">
    <figcaption className="mb-3 font-medium text-sm">{title}</figcaption>
    {children}
  </figure>
);

const Plot = ({
  children,
  center,
  ...chart
}: ComponentProps<typeof RadialBarChart> & {
  children: ReactNode;
  /** Text drawn in the middle of the rings. */
  center?: ReactNode;
}) => (
  <div className="relative">
    <ChartContainer config={config} className="aspect-square">
      <RadialBarChart
        data={data}
        innerRadius="25%"
        outerRadius="100%"
        {...chart}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="browser" />}
        />
        {children}
      </RadialBarChart>
    </ChartContainer>
    {center && (
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        {center}
      </div>
    )}
  </div>
);

const Figure = ({ value, label }: { value: string; label: string }) => (
  <>
    <span className="font-bold text-2xl tabular-nums">{value}</span>
    <span className="text-foreground-dimmed text-xs">{label}</span>
  </>
);

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot>
        <RadialBar dataKey="visitors" background />
      </Plot>
    </Tile>
    <Tile title="Rounded">
      <Plot>
        <RadialBar dataKey="visitors" background cornerRadius={10} />
      </Plot>
    </Tile>
    <Tile title="Labels">
      <Plot startAngle={-90} endAngle={380}>
        <RadialBar dataKey="visitors" background>
          <LabelList
            dataKey="browser"
            position="insideStart"
            fill="white"
            fontSize={10}
            className="capitalize"
          />
        </RadialBar>
      </Plot>
    </Tile>
    <Tile title="Grid">
      <Plot>
        <PolarGrid gridType="circle" radialLines={false} />
        <RadialBar dataKey="visitors" />
      </Plot>
    </Tile>
    <Tile title="Legend">
      <Plot outerRadius="85%">
        <RadialBar dataKey="visitors" background cornerRadius={10} />
        <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
      </Plot>
    </Tile>
    <Tile title="A single figure">
      <Plot
        data={single}
        startAngle={90}
        endAngle={-180}
        innerRadius="72%"
        outerRadius="100%"
        center={<Figure value="1,260" label="Visitors" />}
      >
        <RadialBar dataKey="visitors" background cornerRadius={10} />
      </Plot>
    </Tile>
    <Tile title="Progress ring">
      <Plot
        data={single}
        startAngle={90}
        endAngle={-270}
        innerRadius="72%"
        outerRadius="100%"
        center={<Figure value="100%" label="Complete" />}
      >
        <RadialBar dataKey="visitors" cornerRadius={10} />
      </Plot>
    </Tile>
    <Tile title="Gauge">
      <Plot
        data={score}
        startAngle={210}
        endAngle={-30}
        innerRadius="72%"
        outerRadius="100%"
        center={<Figure value="72" label="Score" />}
      >
        {/* fixes the scale at 0 to 100, so 72 fills 72% of the arc */}
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar dataKey="visitors" background cornerRadius={10} />
      </Plot>
    </Tile>
    <Tile title="Half rings">
      <Plot
        data={split}
        startAngle={180}
        endAngle={0}
        innerRadius="55%"
        outerRadius="100%"
        center={<Figure value="1,830" label="Visitors" />}
      >
        <RadialBar dataKey="visitors" background cornerRadius={8} />
      </Plot>
    </Tile>
  </div>
);
```

### Chart Tooltips

Nine ways to style a chart's tooltip.

Import from `"daybreaker/charts"`: `ChartConfig`, `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`.

Example:

```tsx
import { BellIcon, UserIcon } from "daybreaker";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "daybreaker/charts";
import type { ReactElement, ReactNode } from "react";
import { Bar, BarChart, XAxis } from "recharts";

const data = [
  { day: "Mon", running: 450, swimming: 300 },
  { day: "Tue", running: 380, swimming: 420 },
  { day: "Wed", running: 520, swimming: 120 },
  { day: "Thu", running: 140, swimming: 550 },
  { day: "Fri", running: 600, swimming: 350 },
  { day: "Sat", running: 480, swimming: 400 },
];

const names = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
} as const;

const config = {
  running: { label: "Running", color: "var(--color-chart-1)" },
  swimming: { label: "Swimming", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

// the same series with icons, which replace the colour mark in the tooltip
const withIcons = {
  running: { ...config.running, icon: UserIcon },
  swimming: { ...config.swimming, icon: BellIcon },
} satisfies ChartConfig;

const Tile = ({ title, children }: { title: string; children: ReactNode }) => (
  <figure className="rounded-surface bg-background-dimmed p-4">
    <figcaption className="mb-3 font-medium text-sm">{title}</figcaption>
    {children}
  </figure>
);

// one stacked chart; only the tooltip differs between tiles
const Plot = ({
  tooltip,
  chart = config,
  cursor = true,
}: {
  tooltip: ReactElement;
  chart?: ChartConfig;
  cursor?: boolean;
}) => (
  <ChartContainer config={chart}>
    <BarChart data={data} margin={{ top: 8, right: 8, left: 8 }}>
      <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
      <Bar
        dataKey="running"
        stackId="a"
        fill="var(--color-running)"
        radius={[0, 0, 4, 4]}
      />
      <Bar
        dataKey="swimming"
        stackId="a"
        fill="var(--color-swimming)"
        radius={[4, 4, 0, 0]}
      />
      {/* shown open on one bar, so the styles can be compared at a glance */}
      <ChartTooltip cursor={cursor} defaultIndex={2} content={tooltip} />
    </BarChart>
  </ChartContainer>
);

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot tooltip={<ChartTooltipContent />} />
    </Tile>
    <Tile title="Line indicator">
      <Plot tooltip={<ChartTooltipContent indicator="line" />} />
    </Tile>
    <Tile title="Dashed indicator">
      <Plot tooltip={<ChartTooltipContent indicator="dashed" />} />
    </Tile>
    <Tile title="No indicator">
      <Plot tooltip={<ChartTooltipContent hideIndicator />} />
    </Tile>
    <Tile title="No label">
      <Plot tooltip={<ChartTooltipContent hideLabel />} cursor={false} />
    </Tile>
    <Tile title="Full day names">
      <Plot
        tooltip={
          <ChartTooltipContent
            labelFormatter={(day) => names[day as keyof typeof names]}
          />
        }
      />
    </Tile>
    <Tile title="Units">
      <Plot
        tooltip={
          <ChartTooltipContent valueFormatter={(value) => `${value} kcal`} />
        }
      />
    </Tile>
    <Tile title="Icons">
      <Plot chart={withIcons} tooltip={<ChartTooltipContent />} />
    </Tile>
    <Tile title="With a total">
      <Plot
        tooltip={
          <ChartTooltipContent
            footer={(rows) => (
              <div className="mt-0.5 flex justify-between border-border border-t pt-1.5 font-medium">
                Total
                <span className="tabular-nums">
                  {rows.reduce((sum, row) => sum + Number(row.value ?? 0), 0)}{" "}
                  kcal
                </span>
              </div>
            )}
          />
        }
      />
    </Tile>
  </div>
);
```

## Display

### Card

A surface that groups related content.

Import from `"daybreaker"`: `Button`, `Card`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle`.

Props:

```ts
// Card
export type Props = ComponentProps<"div">;

// CardDescription
export type Props = ComponentProps<"p">;

// CardFooter
export type Props = ComponentProps<"div">;

// CardHeader
export type Props = ComponentProps<"div">;

// CardTitle
export type Props = ComponentProps<"h3">;
```

Example:

```tsx
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "daybreaker";

export const Example = () => (
  <Card className="w-64">
    <CardHeader>
      <CardTitle>Team plan</CardTitle>
      <CardDescription>Unlimited projects and 10 seats.</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button size="sm">Upgrade</Button>
      <Button size="sm" variant="ghost">
        Compare
      </Button>
    </CardFooter>
  </Card>
);
```

### Item

Rows with media, text, and actions.

Import from `"daybreaker"`: `Item`, `ItemActions`, `ItemContent`, `ItemDescription`, `ItemGroup`, `ItemMedia`, `ItemTitle`, `Switch`.

Props:

```ts
// Item
export type Props = ComponentProps<"div">;

// ItemActions
export type Props = ComponentProps<"div">;

// ItemContent
export type Props = ComponentProps<"div">;

// ItemDescription
export type Props = ComponentProps<"p">;

// ItemGroup
export type Props = ComponentProps<"div">;

// ItemMedia
export type Props = ComponentProps<"div">;

// ItemTitle
export type Props = ComponentProps<"p">;
```

Example:

```tsx
import {
  BellIcon,
  ChevronRightIcon,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Switch,
  UserIcon,
} from "daybreaker";

export const Example = () => (
  <ItemGroup className="max-w-sm">
    <Item>
      <ItemMedia>
        <UserIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Account</ItemTitle>
        <ItemDescription>Name, email and password</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ChevronRightIcon className="text-foreground-dimmed" />
      </ItemActions>
    </Item>
    <Item>
      <ItemMedia className="bg-error">
        <BellIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Notifications</ItemTitle>
        <ItemDescription>Banners, sounds and badges</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Switch defaultChecked aria-label="Notifications" />
      </ItemActions>
    </Item>
  </ItemGroup>
);
```

### Empty

A placeholder for a view with nothing in it.

Import from `"daybreaker"`: `Button`, `Empty`, `EmptyActions`, `EmptyDescription`, `EmptyMedia`, `EmptyTitle`.

Props:

```ts
// Empty
export type Props = ComponentProps<"div">;

// EmptyActions
export type Props = ComponentProps<"div">;

// EmptyDescription
export type Props = ComponentProps<"p">;

// EmptyMedia
export type Props = ComponentProps<"div">;

// EmptyTitle
export type Props = ComponentProps<"h3">;
```

Example:

```tsx
import {
  Button,
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
  InboxIcon,
} from "daybreaker";

export const Example = () => (
  <Empty className="max-w-sm">
    <EmptyMedia>
      <InboxIcon />
    </EmptyMedia>
    <EmptyTitle>No messages yet</EmptyTitle>
    <EmptyDescription>
      When someone writes to you, their message will show up here.
    </EmptyDescription>
    <EmptyActions>
      <Button>New message</Button>
      <Button variant="ghost">Import</Button>
    </EmptyActions>
  </Empty>
);
```

### Carousel

Slides you swipe or step through.

Import from `"daybreaker"`: `Carousel`.

Props:

```ts
// Carousel
export type Props = ComponentProps<"section"> & {
  classList?: ClassList<"root" | "track" | "slide" | "dots">;
};
```

Example:

```tsx
import { Carousel } from "daybreaker";

const slides = [
  { title: "Glass", tone: "bg-primary/20" },
  { title: "Springs", tone: "bg-success/20" },
  { title: "Tokens", tone: "bg-warning/20" },
  { title: "Dark mode", tone: "bg-error/20" },
] as const;

export const Example = () => (
  <Carousel aria-label="Features" className="max-w-sm">
    {slides.map((slide) => (
      <div
        key={slide.title}
        className={`flex h-48 items-center justify-center font-semibold text-2xl ${slide.tone}`}
      >
        {slide.title}
      </div>
    ))}
  </Carousel>
);
```

### Aspect Ratio

Content held at a fixed ratio.

Import from `"daybreaker"`: `AspectRatio`.

Defaults:

- `AspectRatio`: `ratio = 1`

Props:

```ts
// AspectRatio
export type Props = ComponentProps<"div"> & {
  /** Width divided by height. */
  ratio?: number;
};
```

Example:

```tsx
import { AspectRatio } from "daybreaker";

export const Example = () => (
  <div className="flex w-full max-w-md items-end gap-3">
    <AspectRatio ratio={16 / 9} className="bg-accent">
      <span className="absolute inset-0 flex items-center justify-center text-foreground-dimmed text-sm">
        16 / 9
      </span>
    </AspectRatio>
    <AspectRatio ratio={1} className="w-32 shrink-0 bg-accent">
      <span className="absolute inset-0 flex items-center justify-center text-foreground-dimmed text-sm">
        1 / 1
      </span>
    </AspectRatio>
  </div>
);
```

### Resizable

Panels with a draggable divider.

Import from `"daybreaker"`: `Resizable`.

Defaults:

- `Resizable`: `direction = "horizontal"`, `defaultSize = 50`, `min = 15`, `max = 85`

Props:

```ts
// Resizable
export type Props = ComponentProps<"div"> & {
  /** The axis the panels sit along. */
  direction?: "horizontal" | "vertical";
  /** The first panel's starting share, in percent. */
  defaultSize?: number;
  /** The smallest and largest share the first panel can take. */
  min?: number;
  max?: number;
  classList?: ClassList<"root" | "panel" | "handle">;
};
```

Example:

```tsx
import { Resizable } from "daybreaker";

const Panel = ({ children }: { children: string }) => (
  <div className="flex size-full items-center justify-center p-4 font-medium text-foreground-dimmed text-sm">
    {children}
  </div>
);

export const Example = () => (
  <div className="h-64 w-full max-w-lg">
    <Resizable defaultSize={35} aria-label="Layout">
      <Panel>Sidebar</Panel>
      <Resizable direction="vertical" defaultSize={60} className="rounded-none">
        <Panel>Editor</Panel>
        <Panel>Terminal</Panel>
      </Resizable>
    </Resizable>
  </div>
);
```

### Typography

Readable styles for long-form text.

Import from `"daybreaker"`: `Prose`.

Props:

```ts
// Prose
export type Props = ComponentProps<"div">;
```

Example:

```tsx
import { Prose } from "daybreaker";

export const Example = () => (
  <Prose className="text-left">
    <h1>Release notes</h1>
    <p>
      Version 2.4 is out. It makes <strong>every animation a spring</strong> and
      adds a dozen new components. Read the <a href="#/docs">upgrade guide</a>{" "}
      before you update.
    </p>
    <h2>What changed</h2>
    <ul>
      <li>Menus have a highlight that glides between items.</li>
      <li>
        The spring is one token, <code>--wz-spring</code>.
      </li>
    </ul>
    <blockquote>Fast, but also really, really animated.</blockquote>
  </Prose>
);
```

### Direction

Right-to-left support for everything inside it.

Import from `"daybreaker"`: `Button`, `DirectionProvider`, `Slider`, `Switch`, `Tab`, `Tabs`, `TabsList`, `TabsPanel`.

Example:

```tsx
import {
  Button,
  DirectionProvider,
  Slider,
  Switch,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
} from "daybreaker";
import { useState } from "react";

export const Example = () => {
  const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");

  return (
    <div className="grid w-64 gap-5">
      <Button
        variant="outline"
        onClick={() => setDirection(direction === "rtl" ? "ltr" : "rtl")}
      >
        Switch to {direction === "rtl" ? "left-to-right" : "right-to-left"}
      </Button>
      {/* the provider tells components which way arrow keys and sliders run;
          `dir` lays the content out that way */}
      <DirectionProvider direction={direction}>
        <div dir={direction} className="grid gap-5">
          <Tabs defaultValue="one">
            <TabsList>
              <Tab value="one">الأول</Tab>
              <Tab value="two">الثاني</Tab>
              <Tab value="three">الثالث</Tab>
            </TabsList>
            {/* English inside the right-to-left block: marked left-to-right
                so its full stop stays at the end of the sentence */}
            <TabsPanel value="one">
              <span dir="ltr">Arrow keys follow the reading direction.</span>
            </TabsPanel>
            <TabsPanel value="two">
              <span dir="ltr">Second panel.</span>
            </TabsPanel>
            <TabsPanel value="three">
              <span dir="ltr">Third panel.</span>
            </TabsPanel>
          </Tabs>
          <Slider defaultValue={30} aria-label="Volume" />
          {/* biome-ignore lint/a11y/noLabelWithoutControl: Switch renders the control */}
          <label className="flex items-center justify-between text-sm">
            الإشعارات
            <Switch defaultChecked />
          </label>
        </div>
      </DirectionProvider>
    </div>
  );
};
```

### Badge

A small label for status or counts.

Import from `"daybreaker"`: `Badge`.

Variants:

- `Badge`: variant: "primary" | "secondary" | "outline" | "success" | "warning" | "error" (defaults { variant: "primary" })

Props:

```ts
// Badge
export type Props = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;
```

Example:

```tsx
import { Badge } from "daybreaker";

export const Example = () => (
  <div className="flex max-w-64 flex-wrap justify-center gap-2">
    <Badge>Primary</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="outline">Outline</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
  </div>
);
```

### Avatar

A profile image with a fallback.

Import from `"daybreaker"`: `Avatar`, `AvatarFallback`, `AvatarImage`.

Variants:

- `Avatar`: size: "sm" | "md" | "lg" (defaults { size: "md" })

Props:

```ts
// Avatar
export type Props = Styled<AvatarPrimitive.Root.Props> &
  VariantProps<typeof avatarVariants>;

// AvatarFallback
export type Props = Styled<AvatarPrimitive.Fallback.Props>;

// AvatarImage
export type Props = Styled<AvatarPrimitive.Image.Props>;
```

Example:

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "daybreaker";

const team = ["AL", "MV", "JK", "+3"] as const;

export const Example = () => (
  <div className="grid justify-items-center gap-5">
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/wooz-05.png" alt="wooz-05" />
        <AvatarFallback>WZ</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
    </div>
    <div className="flex -space-x-2">
      {team.map((initials) => (
        <Avatar key={initials} className="ring-2 ring-background">
          <AvatarFallback className="bg-background-dimmed">
            {initials}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  </div>
);
```

### Alert

An inline message in four tones.

Import from `"daybreaker"`: `Alert`, `AlertDescription`, `AlertTitle`.

Variants:

- `Alert`: variant: "info" | "success" | "warning" | "error" (defaults { variant: "info" })

Props:

```ts
// Alert
export type Props = ComponentProps<"div"> &
  VariantProps<typeof alertVariants>;

// AlertDescription
export type Props = ComponentProps<"p">;

// AlertTitle
export type Props = ComponentProps<"p">;
```

Example:

```tsx
import { Alert, AlertDescription, AlertTitle } from "daybreaker";

export const Example = () => (
  <div className="grid w-72 gap-3">
    <Alert>
      <AlertTitle>New version available</AlertTitle>
      <AlertDescription>Restart to install version 2.4.</AlertDescription>
    </Alert>
    <Alert variant="success">
      <AlertTitle>Payment received</AlertTitle>
      <AlertDescription>Your receipt is on its way.</AlertDescription>
    </Alert>
    <Alert variant="warning">
      <AlertTitle>Trial ends in 3 days</AlertTitle>
      <AlertDescription>Upgrade to keep your projects.</AlertDescription>
    </Alert>
    <Alert variant="error">
      <AlertTitle>Card declined</AlertTitle>
      <AlertDescription>Update your payment method.</AlertDescription>
    </Alert>
  </div>
);
```

### Table

Rows and columns of data.

Import from `"daybreaker"`: `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow`.

Props:

```ts
// Table
export type Props = ComponentProps<"table"> & {
  classList?: ClassList<"container" | "table">;
};

// TableBody
export type Props = ComponentProps<"tbody">;

// TableCell
export type Props = ComponentProps<"td">;

// TableHead
export type Props = ComponentProps<"th">;

// TableHeader
export type Props = ComponentProps<"thead">;

// TableRow
export type Props = ComponentProps<"tr">;
```

Example:

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "daybreaker";

const invoices = [
  { id: "INV-001", status: "Paid", amount: "$250" },
  { id: "INV-002", status: "Pending", amount: "$150" },
  { id: "INV-003", status: "Overdue", amount: "$350" },
] as const;

export const Example = () => (
  <div className="w-72">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell className="text-right tabular-nums">
              {invoice.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
```

### Data Table

A table that sorts, filters, and paginates.

Import from `"daybreaker"`: `Badge`, `DataTable`.

Defaults:

- `DataTable`: `pageSize = 5`, `searchable = true`, `empty = "No results"`

Props:

```ts
// DataTable
export type Column<Row> = {
  /** The row field this column reads, sorts and filters by. */
  key: keyof Row & string;
  header: ReactNode;
  /** Renders the cell; defaults to the field as text. */
  cell?: (row: Row) => ReactNode;
  sortable?: boolean;
  align?: "left" | "right";
};
export type Props<Row> = {
  columns: readonly Column<Row>[];
  rows: readonly Row[];
  /** A stable, unique id for a row. */
  rowKey: (row: Row) => string;
  pageSize?: number;
  /** Shows the filter box above the table. */
  searchable?: boolean;
  /** Shown when no row matches the filter. */
  empty?: ReactNode;
  className?: string;
};
```

Example:

```tsx
import { Badge, DataTable } from "daybreaker";

type Invoice = {
  id: string;
  customer: string;
  status: "Paid" | "Pending" | "Overdue";
  amount: number;
};

const invoices: Invoice[] = [
  { id: "INV-001", customer: "Ada Lovelace", status: "Paid", amount: 250 },
  { id: "INV-002", customer: "Alan Turing", status: "Pending", amount: 150 },
  { id: "INV-003", customer: "Grace Hopper", status: "Overdue", amount: 350 },
  { id: "INV-004", customer: "Linus Torvalds", status: "Paid", amount: 90 },
  { id: "INV-005", customer: "Margaret Hamilton", status: "Paid", amount: 480 },
  { id: "INV-006", customer: "Dennis Ritchie", status: "Pending", amount: 220 },
  { id: "INV-007", customer: "Barbara Liskov", status: "Paid", amount: 310 },
  { id: "INV-008", customer: "Ken Thompson", status: "Overdue", amount: 75 },
];

const tones = {
  Paid: "success",
  Pending: "warning",
  Overdue: "error",
} as const;

const columns: DataTable.Column<Invoice>[] = [
  { key: "id", header: "Invoice" },
  { key: "customer", header: "Customer" },
  {
    key: "status",
    header: "Status",
    cell: (invoice) => (
      <Badge variant={tones[invoice.status]}>{invoice.status}</Badge>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    cell: (invoice) => `€${invoice.amount}`,
  },
];

export const Example = () => (
  <DataTable
    columns={columns}
    rows={invoices}
    rowKey={(invoice) => invoice.id}
    className="max-w-xl"
  />
);
```

### Chart

A small bar or line chart.

Import from `"daybreaker"`: `Chart`.

Defaults:

- `Chart`: `type = "bar"`, `format = String`

Props:

```ts
// Chart
export type Props = ComponentProps<"figure"> & {
  data: readonly { label: string; value: number }[];
  type?: "bar" | "line";
  /** Turns a value into the text shown for it, e.g. a currency. */
  format?: (value: number) => string;
  classList?: ClassList<"plot" | "bar" | "line" | "labels">;
};
```

Example:

```tsx
import { Chart } from "daybreaker";

const revenue = [
  { label: "Jan", value: 12 },
  { label: "Feb", value: 19 },
  { label: "Mar", value: 15 },
  { label: "Apr", value: 27 },
  { label: "May", value: 22 },
  { label: "Jun", value: 34 },
] as const;

const euros = (value: number) => `€${value}k`;

export const Example = () => (
  <div className="grid w-full max-w-md gap-8">
    <Chart data={revenue} format={euros} aria-label="Revenue by month" />
    <Chart
      type="line"
      data={revenue}
      format={euros}
      aria-label="Revenue trend"
      className="h-32"
    />
  </div>
);
```

### Separator

A line that divides content.

Import from `"daybreaker"`: `Separator`.

Defaults:

- `Separator`: `orientation = "horizontal"`

Props:

```ts
// Separator
export type Props = Styled<SeparatorPrimitive.Props>;
```

Example:

```tsx
import { Separator } from "daybreaker";

export const Example = () => (
  <div className="grid w-56 gap-3 text-sm">
    <span className="font-medium">daybreaker</span>
    <Separator />
    <div className="flex h-5 items-center gap-3 text-foreground-dimmed">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Source</span>
      <Separator orientation="vertical" />
      <span>Issues</span>
    </div>
  </div>
);
```

### Scroll Area

A scrolling region with a thin scrollbar.

Import from `"daybreaker"`: `ScrollArea`.

Props:

```ts
// ScrollArea
export type Props = Styled<ScrollAreaPrimitive.Root.Props> & {
  classList?: ClassList<
    "root" | "viewport" | "content" | "scrollbar" | "thumb"
  >;
};
```

Example:

```tsx
import { ScrollArea } from "daybreaker";

const releases = Array.from({ length: 24 }, (_, index) => `v1.${24 - index}.0`);

export const Example = () => (
  <ScrollArea className="h-56 w-56 rounded-surface bg-background-dimmed">
    <ul className="grid gap-3 p-4 text-sm">
      {releases.map((release) => (
        <li key={release} className="flex justify-between">
          {release}
          <span className="text-foreground-dimmed">Released</span>
        </li>
      ))}
    </ul>
  </ScrollArea>
);
```

### Kbd

A keyboard key, for shortcuts.

Import from `"daybreaker"`: `Kbd`.

Props:

```ts
// Kbd
export type Props = ComponentProps<"kbd">;
```

Example:

```tsx
import { Kbd } from "daybreaker";

export const Example = () => (
  <span className="flex items-center gap-1.5 text-foreground-dimmed text-sm">
    Press <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> to search
  </span>
);
```

### Progress

How far along a task is.

Import from `"daybreaker"`: `Progress`.

Props:

```ts
// Progress
export type Props = Styled<ProgressPrimitive.Root.Props> & {
  classList?: ClassList<"root" | "track" | "indicator">;
};
```

Example:

```tsx
import { Progress } from "daybreaker";
import { useEffect, useState } from "react";

export const Example = () => {
  const [value, setValue] = useState(20);

  // climbs and starts over, to show the bar easing between values
  useEffect(() => {
    const timer = setInterval(
      () => setValue((current) => (current >= 100 ? 0 : current + 20)),
      1200,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid w-56 gap-6">
      <div className="grid gap-2">
        <Progress value={value} aria-label="Upload" />
        <span className="text-foreground-dimmed text-sm">
          {value}% uploaded
        </span>
      </div>
      <div className="grid gap-2">
        <Progress value={null} aria-label="Connecting" />
        <span className="text-foreground-dimmed text-sm">Connecting…</span>
      </div>
    </div>
  );
};
```

### Meter

A measurement within a known range.

Import from `"daybreaker"`: `Meter`.

Props:

```ts
// Meter
export type Props = Styled<MeterPrimitive.Root.Props> & {
  /** Names what is being measured; shown above the bar. */
  label: ReactNode;
  classList?: ClassList<"root" | "label" | "value" | "track" | "indicator">;
};
```

Example:

```tsx
import { Meter } from "daybreaker";

export const Example = () => (
  <div className="grid w-64 gap-6">
    <Meter label="Storage" value={64} />
    <Meter label="Battery" value={18} classList={{ indicator: "bg-error" }} />
  </div>
);
```

### Skeleton

A placeholder while content loads.

Import from `"daybreaker"`: `Skeleton`.

Props:

```ts
// Skeleton
export type Props = ComponentProps<"div">;
```

Example:

```tsx
import { Skeleton } from "daybreaker";

export const Example = () => (
  <div className="flex w-56 items-center gap-3">
    <Skeleton className="size-10 rounded-full" />
    <div className="grid flex-1 gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);
```

### Spinner

An indicator that work is in progress.

Import from `"daybreaker"`: `Spinner`.

Defaults:

- `Spinner`: `label = "Loading"`

Props:

```ts
// Spinner
export type Props = ComponentProps<"svg"> & {
  /** Accessible name announced by screen readers. */
  label?: string;
};
```

Example:

```tsx
import { Spinner } from "daybreaker";

export const Example = () => (
  <div className="flex items-center gap-4">
    <Spinner className="size-4" />
    <Spinner />
    <Spinner className="size-8" />
  </div>
);
```

## Icons

All from `"daybreaker"`, 16px by default (`size-4`), drawn in `currentColor`. Size them with a class: `<PlusIcon className="size-5" />`.

`CheckIcon`, `MinusIcon`, `XIcon`, `ChevronDownIcon`, `ChevronRightIcon`, `InfoIcon`, `CircleCheckIcon`, `CircleXIcon`, `TriangleAlertIcon`, `PencilIcon`, `CopyIcon`, `ShareIcon`, `TrashIcon`, `PlusIcon`, `ChevronLeftIcon`, `SearchIcon`, `CalendarIcon`, `HomeIcon`, `UserIcon`, `BellIcon`, `InboxIcon`, `FileIcon`, `ArrowDownIcon`.
