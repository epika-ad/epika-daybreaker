import { Resizable } from "woozui";

const Panel = ({ children }: { children: string }) => (
  <div className="flex size-full items-center justify-center p-4 font-medium text-foreground-dimmed text-sm">
    {children}
  </div>
);

export const Example = () => (
  <div className="h-64 w-full max-w-lg">
    <Resizable defaultSize={35} aria-label="Layout">
      <Panel>Sidebar</Panel>
      <Resizable direction="vertical" defaultSize={60} className="rounded-none">
        <Panel>Editor</Panel>
        <Panel>Terminal</Panel>
      </Resizable>
    </Resizable>
  </div>
);
