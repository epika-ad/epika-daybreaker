import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import type { ReactNode } from "react";
import { SearchIcon } from "../icons";
import { type ClassList, cn, type Styled } from "../utils";
import { Highlight } from "../utils/highlight";
import { item } from "../utils/styles";

/**
 * A search box over an always-visible list, for command palettes. Pass the
 * commands as `items`; put it in a `Dialog` to open it with a shortcut.
 */
export const Command = <Value,>(
  props: ComboboxPrimitive.Root.Props<Value, false>,
) => <ComboboxPrimitive.Root inline open {...props} />;

export const CommandInput = ({
  className,
  classList,
  ...props
}: CommandInput.Props) => (
  <div
    className={cn(
      "flex h-12 items-center gap-2.5 border-border border-b px-4 text-foreground-dimmed",
      className,
      classList?.group,
    )}
  >
    <SearchIcon />
    <ComboboxPrimitive.Input
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent text-foreground text-sm caret-primary outline-none placeholder:text-foreground-dimmed",
        classList?.input,
      )}
      {...props}
    />
  </div>
);
export namespace CommandInput {
  export type Props = Styled<ComboboxPrimitive.Input.Props> & {
    classList?: ClassList<"group" | "input">;
  };
}

export const CommandList = ({
  className,
  classList,
  empty = "No results",
  children,
}: CommandList.Props) => (
  <div
    className={cn(
      "relative isolate max-h-72 overflow-y-auto p-1.5 [scrollbar-color:var(--wz-border)_transparent] [scrollbar-width:thin]",
      className,
      classList?.root,
    )}
  >
    <Highlight />
    <ComboboxPrimitive.Empty
      className={cn(
        "px-3 py-6 text-center text-foreground-dimmed text-sm empty:hidden",
        classList?.empty,
      )}
    >
      {empty}
    </ComboboxPrimitive.Empty>
    <ComboboxPrimitive.List className={classList?.list}>
      {children}
    </ComboboxPrimitive.List>
  </div>
);
export namespace CommandList {
  export type Props = {
    className?: string;
    /** Shown when nothing matches what was typed. */
    empty?: ReactNode;
    /** Items, or a function that renders one item. */
    children?: ComboboxPrimitive.List.Props["children"];
    classList?: ClassList<"root" | "empty" | "list">;
  };
}

export const CommandItem = ({ className, ...props }: CommandItem.Props) => (
  <ComboboxPrimitive.Item className={cn(item, className)} {...props} />
);
export namespace CommandItem {
  export type Props = Styled<ComboboxPrimitive.Item.Props>;
}
