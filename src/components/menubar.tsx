import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import { cn, type Styled } from "../utils";
import { Highlight } from "../utils/highlight";
import { focusRing } from "../utils/styles";

/** A row of menus, like an app's File / Edit / View bar. Put `Menu`s inside. */
export const Menubar = ({ className, children, ...props }: Menubar.Props) => (
  <MenubarPrimitive
    className={cn(
      "relative isolate inline-flex w-fit items-center gap-1 rounded-control bg-accent p-1",
      className,
    )}
    {...props}
  >
    {/* one pill that glides to whichever menu is open */}
    <Highlight
      attribute="data-popup-open"
      className="bg-background dark:bg-white/20"
    />
    {children}
  </MenubarPrimitive>
);
export namespace Menubar {
  export type Props = Styled<MenubarPrimitive.Props>;
}

/** The trigger for a `Menu` that sits in a `Menubar`. */
export const MenubarTrigger = ({
  className,
  ...props
}: MenubarTrigger.Props) => (
  <MenuPrimitive.Trigger
    className={cn(
      "flex h-8 cursor-pointer select-none items-center rounded-item px-3 font-medium text-foreground-dimmed text-sm transition-colors hover:text-foreground data-popup-open:text-foreground",
      focusRing,
      className,
    )}
    {...props}
  />
);
export namespace MenubarTrigger {
  export type Props = Styled<MenuPrimitive.Trigger.Props>;
}
