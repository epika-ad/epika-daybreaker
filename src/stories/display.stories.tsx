import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Kbd,
  Progress,
  Separator,
  Skeleton,
  Spinner,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "..";

const meta = { title: "Components/Display" } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardSurface: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Team plan</CardTitle>
        <CardDescription>For groups shipping together.</CardDescription>
      </CardHeader>
      <CardContent>Unlimited projects and 10 seats.</CardContent>
      <CardFooter>
        <Button>Upgrade</Button>
      </CardFooter>
    </Card>
  ),
};

const badges = [
  "primary",
  "secondary",
  "outline",
  "success",
  "warning",
  "error",
] as const;

export const Badges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {badges.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const Avatars: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/wooz-05.png" alt="wooz-05" />
        <AvatarFallback>WZ</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
};

const alerts = ["info", "success", "warning", "error"] as const;

export const Alerts: Story = {
  render: () => (
    <div className="grid w-96 gap-3">
      {alerts.map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertTitle className="capitalize">{variant}</AlertTitle>
          <AlertDescription>Something worth knowing about.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
};

const invoices = [
  { id: "INV-001", status: "Paid", amount: "$250.00" },
  { id: "INV-002", status: "Pending", amount: "$150.00" },
  { id: "INV-003", status: "Overdue", amount: "$350.00" },
] as const;

export const DataTable: Story = {
  render: () => (
    <div className="w-[32rem] max-w-full">
      <Table>
        <TableCaption>Recent invoices</TableCaption>
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
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="grid w-80 gap-6">
      <Spinner />
      <Progress value={45} aria-label="Upload progress" />
      <Progress value={null} aria-label="Working" />
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="grid flex-1 gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  ),
};

export const Misc: Story = {
  render: () => (
    <div className="grid w-80 gap-4 text-sm">
      <span>
        Press <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> to search
      </span>
      <Separator />
      <div className="flex h-5 items-center gap-3">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  ),
};
