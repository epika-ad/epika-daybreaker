import { Button } from "woozui";

export const Example = () => (
  <div className="flex flex-wrap items-center justify-center gap-2">
    <Button>Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive">Delete</Button>
    <Button loading>Saving</Button>
  </div>
);
