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
