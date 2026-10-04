import { Separator } from "woozui";

export const Example = () => (
  <div className="grid w-56 gap-3 text-sm">
    <span className="font-medium">woozui</span>
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
