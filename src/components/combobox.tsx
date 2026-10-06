import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import type { ReactNode } from "react";
import { CheckIcon, ChevronDownIcon, XIcon } from "../icons";
import { type ClassList, cn, type Styled } from "../utils";
import { Highlight } from "../utils/highlight";
import { item, popup } from "../utils/styles";

/** A select you can type in to filter; pass the options as `items`. */
export const Combobox = ComboboxPrimitive.Root;

const action =
  "flex size-6 cursor-pointer items-center justify-center rounded-full text-foreground-dimmed transition-colors hover:bg-border hover:text-foreground";

export const ComboboxInput = ({
  className,
  classList,
  ...props
}: ComboboxInput.Props) => (
  <ComboboxPrimitive.InputGroup
    className={cn(
      "flex h-9 w-full items-center gap-1 rounded-control border border-transparent bg-accent pr-1.5 pl-3 transition-[background-color,border-color,box-shadow] duration-200 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30 data-disabled:opacity-50",
      className,
      classList?.group,
    )}
  >
    <ComboboxPrimitive.Input
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent text-foreground text-sm caret-primary outline-none placeholder:text-foreground-dimmed",
        classList?.input,
      )}
      {...props}
    />
    <ComboboxPrimitive.Clear
      aria-label="Clear"
      className={cn(action, classList?.clear)}
    >
      <XIcon className="size-3.5" />
    </ComboboxPrimitive.Clear>
    <ComboboxPrimitive.Trigger
      aria-label="Show options"
      className={cn(action, classList?.trigger)}
    >
      <ChevronDownIcon />
    </ComboboxPrimitive.Trigger>
  </ComboboxPrimitive.InputGroup>
);
export namespace ComboboxInput {
  export type Props = Styled<ComboboxPrimitive.Input.Props> & {
    classList?: ClassList<"group" | "input" | "clear" | "trigger">;
  };
}

export const ComboboxPopup = ({
  className,
  classList,
  empty = "No results",
  sideOffset = 6,
  children,
  ...props
}: ComboboxPopup.Props) => (
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Positioner
      sideOffset={sideOffset}
      className={cn("z-50 outline-none", classList?.positioner)}
    >
      <ComboboxPrimitive.Popup
        className={cn(
          popup,
          "relative max-h-[min(var(--available-height),18rem)] w-(--anchor-width) overflow-y-auto p-1.5 [scrollbar-color:var(--wz-border)_transparent] [scrollbar-width:thin]",
          className,
          classList?.popup,
        )}
        {...props}
      >
        <Highlight />
        <ComboboxPrimitive.Empty
          className={cn(
            "px-3 py-2 text-foreground-dimmed text-sm empty:hidden",
            classList?.empty,
          )}
        >
          {empty}
        </ComboboxPrimitive.Empty>
        <ComboboxPrimitive.List className={classList?.list}>
          {children}
        </ComboboxPrimitive.List>
      </ComboboxPrimitive.Popup>
    </ComboboxPrimitive.Positioner>
  </ComboboxPrimitive.Portal>
);
export namespace ComboboxPopup {
  export type Props = Omit<Styled<ComboboxPrimitive.Popup.Props>, "children"> &
    Pick<ComboboxPrimitive.Positioner.Props, "sideOffset"> & {
      /** Shown when nothing matches what was typed. */
      empty?: ReactNode;
      /** Items, or a function that renders one item. */
      children?: ComboboxPrimitive.List.Props["children"];
      classList?: ClassList<"positioner" | "popup" | "empty" | "list">;
    };
}

export const ComboboxItem = ({
  className,
  classList,
  children,
  ...props
}: ComboboxItem.Props) => (
  <ComboboxPrimitive.Item
    className={cn(item, "relative pr-8", className, classList?.item)}
    {...props}
  >
    {children}
    <ComboboxPrimitive.ItemIndicator
      className={cn("absolute right-3 text-primary", classList?.indicator)}
    >
      <CheckIcon />
    </ComboboxPrimitive.ItemIndicator>
  </ComboboxPrimitive.Item>
);
export namespace ComboboxItem {
  export type Props = Styled<ComboboxPrimitive.Item.Props> & {
    classList?: ClassList<"item" | "indicator">;
  };
}
