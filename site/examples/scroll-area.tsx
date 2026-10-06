import { ScrollArea } from "woozui";

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
