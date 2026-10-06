import { Button, PlusIcon, ShareIcon, TrashIcon } from "woozui";

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
