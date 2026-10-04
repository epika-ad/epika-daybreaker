import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { type ClassList, cn, type Styled } from "../utils";

/** Wrap the app once so neighbouring tooltips share their open delay. */
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipPopup = ({
  className,
  classList,
  side,
  align,
  sideOffset = 6,
  ...props
}: TooltipPopup.Props) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Positioner
      side={side}
      align={align}
      sideOffset={sideOffset}
      className={cn("z-50", classList?.positioner)}
    >
      <TooltipPrimitive.Popup
        className={cn(
          "origin-(--transform-origin) rounded-item bg-foreground px-2 py-1 text-background text-xs shadow-md transition-[scale,opacity] duration-100 data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0",
          className,
          classList?.popup,
        )}
        {...props}
      />
    </TooltipPrimitive.Positioner>
  </TooltipPrimitive.Portal>
);
export namespace TooltipPopup {
  export type Props = Styled<TooltipPrimitive.Popup.Props> &
    Pick<TooltipPrimitive.Positioner.Props, "side" | "align" | "sideOffset"> & {
      classList?: ClassList<"positioner" | "popup">;
    };
}
