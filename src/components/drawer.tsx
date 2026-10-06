import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { type ClassList, cn, type Styled } from "../utils";
import { glass } from "../utils/styles";

/** A sheet that slides up from the bottom; swipe it down to dismiss. */
export const Drawer = DrawerPrimitive.Root;
export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerClose = DrawerPrimitive.Close;

const viewports = {
  bottom: "items-end justify-center",
  left: "items-stretch justify-start",
  right: "items-stretch justify-end",
} as const;

// each side slides in along its own axis and follows the swipe on it
const sides = {
  bottom:
    "max-h-[80vh] w-full max-w-lg translate-y-(--drawer-swipe-movement-y) pt-3 data-ending-style:translate-y-[calc(100%+0.5rem)] data-starting-style:translate-y-[calc(100%+0.5rem)]",
  left: "w-80 max-w-[calc(100vw-1rem)] translate-x-(--drawer-swipe-movement-x) pt-6 data-ending-style:translate-x-[calc(-100%-0.5rem)] data-starting-style:translate-x-[calc(-100%-0.5rem)]",
  right:
    "w-80 max-w-[calc(100vw-1rem)] translate-x-(--drawer-swipe-movement-x) pt-6 data-ending-style:translate-x-[calc(100%+0.5rem)] data-starting-style:translate-x-[calc(100%+0.5rem)]",
} as const;

export const DrawerPopup = ({
  side = "bottom",
  className,
  classList,
  children,
  ...props
}: DrawerPopup.Props) => (
  <DrawerPrimitive.Portal>
    {/* dims less the further the sheet has been swiped away */}
    <DrawerPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black opacity-[calc(0.3*(1-var(--drawer-swipe-progress)))] transition-opacity duration-400 ease-smooth data-swiping:duration-0 data-ending-style:opacity-0 data-starting-style:opacity-0",
        classList?.backdrop,
      )}
    />
    <DrawerPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-50 flex p-2",
        viewports[side],
        classList?.viewport,
      )}
    >
      <DrawerPrimitive.Popup
        className={cn(
          glass,
          "touch-auto overflow-y-auto overscroll-contain rounded-[2rem] px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] outline-none transition-[translate] duration-500 ease-glide data-swiping:select-none data-ending-style:duration-300 data-swiping:duration-0 data-ending-style:ease-smooth",
          sides[side],
          className,
          classList?.popup,
        )}
        {...props}
      >
        {side === "bottom" && (
          <div
            aria-hidden="true"
            className={cn(
              "mx-auto mb-4 h-1 w-10 rounded-full bg-border",
              classList?.handle,
            )}
          />
        )}
        <DrawerPrimitive.Content
          className={cn("grid gap-4", classList?.content)}
        >
          {children}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Popup>
    </DrawerPrimitive.Viewport>
  </DrawerPrimitive.Portal>
);
export namespace DrawerPopup {
  export type Props = Styled<DrawerPrimitive.Popup.Props> & {
    /**
     * The edge the sheet is attached to. For "left" or "right", also set the
     * same `swipeDirection` on `Drawer` so the dismiss gesture matches.
     */
    side?: "bottom" | "left" | "right";
    classList?: ClassList<
      "backdrop" | "viewport" | "popup" | "handle" | "content"
    >;
  };
}

export const DrawerTitle = ({ className, ...props }: DrawerTitle.Props) => (
  <DrawerPrimitive.Title
    className={cn("font-semibold text-lg leading-tight", className)}
    {...props}
  />
);
export namespace DrawerTitle {
  export type Props = Styled<DrawerPrimitive.Title.Props>;
}

export const DrawerDescription = ({
  className,
  ...props
}: DrawerDescription.Props) => (
  <DrawerPrimitive.Description
    className={cn("text-foreground-dimmed text-sm", className)}
    {...props}
  />
);
export namespace DrawerDescription {
  export type Props = Styled<DrawerPrimitive.Description.Props>;
}
