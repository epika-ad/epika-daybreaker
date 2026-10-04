import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { type ClassList, cn, type Styled } from "../utils";
import { ArrowShape } from "../utils/arrow";
import { arrow, popup } from "../utils/styles";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;

export const PopoverPopup = ({
  className,
  classList,
  side,
  align,
  sideOffset = 12,
  children,
  ...props
}: PopoverPopup.Props) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner
      side={side}
      align={align}
      sideOffset={sideOffset}
      className={cn("z-50", classList?.positioner)}
    >
      <PopoverPrimitive.Popup
        className={cn(
          popup,
          "grid w-72 gap-2 p-4",
          className,
          classList?.popup,
        )}
        {...props}
      >
        <PopoverPrimitive.Arrow className={cn(arrow, classList?.arrow)}>
          <ArrowShape />
        </PopoverPrimitive.Arrow>
        {children}
      </PopoverPrimitive.Popup>
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
);
export namespace PopoverPopup {
  export type Props = Styled<PopoverPrimitive.Popup.Props> &
    Pick<PopoverPrimitive.Positioner.Props, "side" | "align" | "sideOffset"> & {
      classList?: ClassList<"positioner" | "popup" | "arrow">;
    };
}

export const PopoverTitle = ({ className, ...props }: PopoverTitle.Props) => (
  <PopoverPrimitive.Title
    className={cn("font-semibold text-sm", className)}
    {...props}
  />
);
export namespace PopoverTitle {
  export type Props = Styled<PopoverPrimitive.Title.Props>;
}

export const PopoverDescription = ({
  className,
  ...props
}: PopoverDescription.Props) => (
  <PopoverPrimitive.Description
    className={cn("text-foreground-dimmed text-sm", className)}
    {...props}
  />
);
export namespace PopoverDescription {
  export type Props = Styled<PopoverPrimitive.Description.Props>;
}
