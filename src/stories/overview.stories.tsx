import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  Progress,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Separator,
  Slider,
  Switch,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
  useToast,
} from "..";

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
] as const;

const Showcase = () => {
  const toast = useToast();

  return (
    <div className="grid w-[min(56rem,calc(100vw-2rem))] gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Form controls working together.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="you@example.com" />
            <FieldDescription>We only use it to sign you in.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Plan</FieldLabel>
            <Select items={plans} defaultValue="pro">
              <SelectTrigger>
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
          </Field>
          {/* biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control */}
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked />
            Send me product updates
          </label>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="ghost">Cancel</Button>
          <Button
            onClick={() =>
              toast.add({
                type: "success",
                title: "Account created",
                description: "Welcome aboard.",
              })
            }
          >
            Create account
          </Button>
        </CardFooter>
      </Card>

      <div className="grid content-start gap-6">
        <Card>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>WZ</AvatarFallback>
            </Avatar>
            <div className="grid flex-1">
              <span className="font-medium text-sm">woozui</span>
              <span className="text-foreground-dimmed text-sm">
                Design system
              </span>
            </div>
            <Badge variant="success">Stable</Badge>
          </div>
          <Separator />
          <Tabs defaultValue="usage">
            <TabsList>
              <Tab value="usage">Usage</Tab>
              <Tab value="settings">Settings</Tab>
            </TabsList>
            <TabsPanel value="usage" className="grid gap-3">
              <Progress value={64} aria-label="Storage used" />
              <span className="text-foreground-dimmed">
                64% of storage used
              </span>
            </TabsPanel>
            <TabsPanel value="settings" className="grid gap-4">
              {/* biome-ignore lint/a11y/noLabelWithoutControl: Switch renders the control */}
              <label className="flex items-center justify-between">
                Notifications
                <Switch defaultChecked />
              </label>
              <Slider defaultValue={40} aria-label="Volume" />
            </TabsPanel>
          </Tabs>
        </Card>
        <Alert variant="warning">
          <AlertTitle>Trial ends in 3 days</AlertTitle>
          <AlertDescription>Upgrade to keep your projects.</AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

const meta = {
  title: "Overview",
  component: Showcase,
  tags: ["!autodocs"],
} satisfies Meta<typeof Showcase>;

export default meta;

export const Overview: StoryObj<typeof meta> = {};
