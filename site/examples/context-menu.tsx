import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuTrigger,
  CopyIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "woozui";

export const Example = () => (
  <ContextMenu>
    <ContextMenuTrigger className="flex h-32 w-64 select-none items-center justify-center rounded-surface border border-border border-dashed text-foreground-dimmed text-sm">
      Right-click here
    </ContextMenuTrigger>
    <ContextMenuPopup>
      <ContextMenuItem>
        <PencilIcon />
        Rename
      </ContextMenuItem>
      <ContextMenuItem>
        <CopyIcon />
        Duplicate
      </ContextMenuItem>
      <ContextMenuItem>
        <ShareIcon />
        Share
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem destructive>
        <TrashIcon />
        Delete
      </ContextMenuItem>
    </ContextMenuPopup>
  </ContextMenu>
);
