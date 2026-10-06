import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon } from "../icons";
import { type ClassList, cn, type Styled } from "../utils";
import { Highlight } from "../utils/highlight";
import { item, popup } from "../utils/styles";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;

export const SelectTrigger = ({
  className,
  classList,
  children,
  ...props
}: SelectTrigger.Props) => (
  <SelectPrimitive.Trigger
    className={cn(
      "flex h-9 w-full cursor-pointer items-center justify-between gap-2 rounded-control border border-transparent bg-accent px-3 text-foreground text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 data-disabled:cursor-not-allowed data-invalid:border-error data-disabled:opacity-50",
      className,
      classList?.trigger,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon
      className={cn(
        "text-foreground-dimmed transition-[rotate] duration-500 ease-spring data-popup-open:rotate-180",
        classList?.icon,
      )}
    >
      <ChevronDownIcon />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);
export namespace SelectTrigger {
  export type Props = Styled<SelectPrimitive.Trigger.Props> & {
    classList?: ClassList<"trigger" | "icon">;
  };
}

export const SelectValue = ({ className, ...props }: SelectValue.Props) => (
  <SelectPrimitive.Value
    className={cn(
      "truncate data-placeholder:text-foreground-dimmed",
      className,
    )}
    {...props}
  />
);
export namespace SelectValue {
  export type Props = Styled<SelectPrimitive.Value.Props>;
}

export const SelectPopup = ({
  className,
  classList,
  side,
  align,
  sideOffset = 4,
  children,
  ...props
}: SelectPopup.Props) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Positioner
      side={side}
      align={align}
      sideOffset={sideOffset}
      alignItemWithTrigger={false}
      className={cn("z-50", classList?.positioner)}
    >
      <SelectPrimitive.Popup
        className={cn(
          popup,
          "relative max-h-(--available-height) min-w-(--anchor-width) overflow-y-auto p-1.5 [scrollbar-color:var(--wz-border)_transparent] [scrollbar-width:thin]",
          className,
          classList?.popup,
        )}
        {...props}
      >
        <Highlight />
        {children}
      </SelectPrimitive.Popup>
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>
);
export namespace SelectPopup {
  export type Props = Styled<SelectPrimitive.Popup.Props> &
    Pick<SelectPrimitive.Positioner.Props, "side" | "align" | "sideOffset"> & {
      classList?: ClassList<"positioner" | "popup">;
    };
}

export const SelectItem = ({
  className,
  classList,
  children,
  ...props
}: SelectItem.Props) => (
  <SelectPrimitive.Item
    className={cn(item, "relative pr-8", className, classList?.item)}
    {...props}
  >
    <SelectPrimitive.ItemText className="flex-1">
      {children}
    </SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator
      className={cn("absolute right-3 text-primary", classList?.indicator)}
    >
      <CheckIcon />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);
export namespace SelectItem {
  export type Props = Styled<SelectPrimitive.Item.Props> & {
    classList?: ClassList<"item" | "indicator">;
  };
}

export const SelectGroupLabel = ({
  className,
  ...props
}: SelectGroupLabel.Props) => (
  <SelectPrimitive.GroupLabel
    className={cn(
      "px-3 py-1.5 font-medium text-foreground-dimmed text-xs",
      className,
    )}
    {...props}
  />
);
export namespace SelectGroupLabel {
  export type Props = Styled<SelectPrimitive.GroupLabel.Props>;
}

export const SelectSeparator = ({
  className,
  ...props
}: SelectSeparator.Props) => (
  <SelectPrimitive.Separator
    className={cn("-mx-1.5 my-1.5 h-px bg-border", className)}
    {...props}
  />
);
export namespace SelectSeparator {
  export type Props = Styled<SelectPrimitive.Separator.Props>;
}
