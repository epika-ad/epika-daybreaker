import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "..";

const variants = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const;

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button" },
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
      <Button {...args} size="lg" />
    </div>
  ),
};

export const Loading: Story = { args: { loading: true, children: "Saving" } };

export const Disabled: Story = { args: { disabled: true } };

export const AsLink: Story = {
  args: {
    // biome-ignore lint/a11y/useAnchorContent: Button supplies the content
    render: <a href="https://github.com/wooz-05/woozui" />,
    nativeButton: false,
    children: "View on GitHub",
    variant: "outline",
  },
};
