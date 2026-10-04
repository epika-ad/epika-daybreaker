import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Textarea,
  Toggle,
} from "..";

const meta = {
  title: "Components/Forms",
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  render: () => (
    <Field>
      <FieldLabel>Name</FieldLabel>
      <Input placeholder="Ada Lovelace" />
      <FieldDescription>Shown on your public profile.</FieldDescription>
    </Field>
  ),
};

export const Validation: Story = {
  render: () => (
    <Field invalid>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" defaultValue="not-an-email" />
      <FieldError match>Enter a valid email address.</FieldError>
    </Field>
  ),
};

export const TextArea: Story = {
  render: () => (
    <Textarea aria-label="Message" placeholder="Write a message…" />
  ),
};

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "carrot", label: "Carrot" },
] as const;

export const SelectMenu: Story = {
  render: () => (
    <Select items={fruits}>
      <SelectTrigger aria-label="Food">
        <SelectValue placeholder="Pick a food" />
      </SelectTrigger>
      <SelectPopup>
        <SelectGroup>
          <SelectGroupLabel>Fruit</SelectGroupLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Vegetables</SelectGroupLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
        </SelectGroup>
      </SelectPopup>
    </Select>
  ),
};

export const Checkboxes: Story = {
  render: () => (
    <div className="grid gap-3 text-sm">
      {/* biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control */}
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked />
        Checked
      </label>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control */}
      <label className="flex items-center gap-2">
        <Checkbox indeterminate />
        Indeterminate
      </label>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control */}
      <label className="flex items-center gap-2">
        <Checkbox disabled />
        Disabled
      </label>
    </div>
  ),
};

export const Radios: Story = {
  render: () => (
    <RadioGroup defaultValue="monthly" aria-label="Billing period">
      {(["monthly", "yearly"] as const).map((period) => (
        // biome-ignore lint/a11y/noLabelWithoutControl: Radio renders the control
        <label key={period} className="flex items-center gap-2 text-sm">
          <Radio value={period} />
          <span className="capitalize">{period}</span>
        </label>
      ))}
    </RadioGroup>
  ),
};

export const SwitchControl: Story = {
  render: () => (
    // biome-ignore lint/a11y/noLabelWithoutControl: Switch renders the control
    <label className="flex items-center justify-between text-sm">
      Airplane mode
      <Switch />
    </label>
  ),
};

export const Sliders: Story = {
  render: () => (
    <div className="grid gap-6">
      <Slider defaultValue={30} aria-label="Volume" />
      <Slider defaultValue={[20, 70]} aria-label="Price range" />
    </div>
  ),
};

export const ToggleButton: Story = {
  render: () => (
    <Toggle aria-label="Bold" className="font-bold">
      B
    </Toggle>
  ),
};
