import { Progress } from "woozui";

export const Example = () => (
  <div className="grid w-56 gap-2">
    <Progress value={64} aria-label="Storage used" />
    <span className="text-foreground-dimmed text-sm">64% of storage used</span>
  </div>
);
