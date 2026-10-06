import { useState } from "react";
import {
  Button,
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Kbd,
} from "woozui";

type Action = { value: string; label: string; shortcut: string };

const actions: Action[] = [
  { value: "new", label: "New project", shortcut: "N" },
  { value: "invite", label: "Invite teammate", shortcut: "I" },
  { value: "theme", label: "Toggle dark mode", shortcut: "D" },
  { value: "settings", label: "Open settings", shortcut: "," },
  { value: "docs", label: "Search documentation", shortcut: "/" },
  { value: "logout", label: "Sign out", shortcut: "Q" },
];

export const Example = () => {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<Action | null>(null);

  return (
    <div className="grid justify-items-center gap-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="outline" />}>
          Open command palette
        </DialogTrigger>
        <DialogPopup closable={false} className="gap-0 overflow-hidden p-0">
          <DialogTitle className="sr-only">Command palette</DialogTitle>
          <Command
            items={actions}
            onValueChange={(action: Action | null) => {
              setLast(action);
              setOpen(false);
            }}
          >
            <CommandInput placeholder="Type a command…" />
            <CommandList empty="No commands found">
              {(action: Action) => (
                <CommandItem key={action.value} value={action}>
                  {action.label}
                  <Kbd className="ml-auto">{action.shortcut}</Kbd>
                </CommandItem>
              )}
            </CommandList>
          </Command>
        </DialogPopup>
      </Dialog>
      <p className="text-foreground-dimmed text-sm">
        {last ? `Ran “${last.label}”` : "Nothing run yet"}
      </p>
    </div>
  );
};
