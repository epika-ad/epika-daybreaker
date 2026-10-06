import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ChevronDownIcon } from "../icons";
import { type ClassList, cn, type Styled } from "../utils";
import { focusRing, glass } from "../utils/styles";

const trigger =
  "flex h-9 cursor-pointer select-none items-center gap-1.5 rounded-full px-3.5 font-medium text-foreground-dimmed text-sm transition-colors hover:text-foreground data-popup-open:bg-accent data-popup-open:text-foreground";

/**
 * Site navigation whose items open panels of links. All panels share one
 * popup, which resizes and slides between them.
 */
export const NavigationMenu = ({
  className,
  classList,
  children,
  ...props
}: NavigationMenu.Props) => (
  <NavigationMenuPrimitive.Root
    className={cn("min-w-max", className, classList?.root)}
    {...props}
  >
    <NavigationMenuPrimitive.List
      className={cn("relative flex items-center gap-1", classList?.list)}
    >
      {children}
    </NavigationMenuPrimitive.List>
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        sideOffset={10}
        collisionPadding={16}
        className={cn(
          "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-400 ease-glide data-instant:transition-none",
          classList?.positioner,
        )}
      >
        <NavigationMenuPrimitive.Popup
          className={cn(
            glass,
            "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-surface outline-none transition-[opacity,scale,width,height] duration-400 ease-glide data-ending-style:scale-95 data-starting-style:scale-90 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-150",
            classList?.popup,
          )}
        >
          <NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden rounded-[inherit]" />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  </NavigationMenuPrimitive.Root>
);
export namespace NavigationMenu {
  export type Props = Styled<NavigationMenuPrimitive.Root.Props> & {
    classList?: ClassList<"root" | "list" | "positioner" | "popup">;
  };
}

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export const NavigationMenuTrigger = ({
  className,
  children,
  ...props
}: NavigationMenuTrigger.Props) => (
  <NavigationMenuPrimitive.Trigger
    className={cn(trigger, focusRing, className)}
    {...props}
  >
    {children}
    <NavigationMenuPrimitive.Icon className="transition-[rotate] duration-500 ease-spring data-popup-open:rotate-180">
      <ChevronDownIcon className="size-3.5" />
    </NavigationMenuPrimitive.Icon>
  </NavigationMenuPrimitive.Trigger>
);
export namespace NavigationMenuTrigger {
  export type Props = Styled<NavigationMenuPrimitive.Trigger.Props>;
}

/** The panel shown for an item; it slides in from the side it was reached from. */
export const NavigationMenuContent = ({
  className,
  ...props
}: NavigationMenuContent.Props) => (
  <NavigationMenuPrimitive.Content
    className={cn(
      "h-full w-max max-w-[calc(100vw-2rem)] p-2 transition-[opacity,translate] duration-400 ease-glide data-ending-style:opacity-0 data-starting-style:opacity-0 data-starting-style:data-[activation-direction=left]:-translate-x-1/2 data-starting-style:data-[activation-direction=right]:translate-x-1/2 data-ending-style:data-[activation-direction=left]:translate-x-1/2 data-ending-style:data-[activation-direction=right]:-translate-x-1/2",
      className,
    )}
    {...props}
  />
);
export namespace NavigationMenuContent {
  export type Props = Styled<NavigationMenuPrimitive.Content.Props>;
}

/** A link, either directly in the bar or inside a panel. */
export const NavigationMenuLink = ({
  bare = false,
  className,
  ...props
}: NavigationMenuLink.Props) => (
  <NavigationMenuPrimitive.Link
    className={cn(
      bare
        ? trigger
        : "block rounded-control px-3 py-2 text-sm transition-colors hover:bg-accent",
      focusRing,
      className,
    )}
    {...props}
  />
);
export namespace NavigationMenuLink {
  export type Props = Styled<NavigationMenuPrimitive.Link.Props> & {
    /** Styles the link like a trigger, for use directly in the bar. */
    bare?: boolean;
  };
}
