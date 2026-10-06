import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { type ClassList, cn, type Styled } from "../utils";
import { Highlight } from "../utils/highlight";
import { item, popup } from "../utils/styles";

/** A menu that opens where the user right-clicks or long-presses. */
export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;

export const ContextMenuPopup = ({
  className,
  classList,
  children,
  ...props
}: ContextMenuPopup.Props) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Positioner
      className={cn("z-50 outline-none", classList?.positioner)}
    >
      <ContextMenuPrimitive.Popup
        className={cn(
          popup,
          "relative min-w-44 p-1.5",
          className,
          classList?.popup,
        )}
        {...props}
      >
        <Highlight />
        {children}
      </ContextMenuPrimitive.Popup>
    </ContextMenuPrimitive.Positioner>
  </ContextMenuPrimitive.Portal>
);
export namespace ContextMenuPopup {
  export type Props = Styled<ContextMenuPrimitive.Popup.Props> & {
    classList?: ClassList<"positioner" | "popup">;
  };
}

export const ContextMenuItem = ({
  className,
  destructive = false,
  ...props
}: ContextMenuItem.Props) => (
  <ContextMenuPrimitive.Item
    data-destructive={destructive || undefined}
    className={cn(item, destructive && "text-error", className)}
    {...props}
  />
);
export namespace ContextMenuItem {
  export type Props = Styled<ContextMenuPrimitive.Item.Props> & {
    /** Marks an action that deletes or cannot be undone. */
    destructive?: boolean;
  };
}

export const ContextMenuGroupLabel = ({
  className,
  ...props
}: ContextMenuGroupLabel.Props) => (
  <ContextMenuPrimitive.GroupLabel
    className={cn(
      "px-3 py-1.5 font-medium text-foreground-dimmed text-xs",
      className,
    )}
    {...props}
  />
);
export namespace ContextMenuGroupLabel {
  export type Props = Styled<ContextMenuPrimitive.GroupLabel.Props>;
}

export const ContextMenuSeparator = ({
  className,
  ...props
}: ContextMenuSeparator.Props) => (
  <ContextMenuPrimitive.Separator
    className={cn("-mx-1.5 my-1.5 h-px bg-border", className)}
    {...props}
  />
);
export namespace ContextMenuSeparator {
  export type Props = Styled<ContextMenuPrimitive.Separator.Props>;
}
