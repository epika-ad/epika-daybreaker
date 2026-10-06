import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CheckIcon } from "../icons";
import { type ClassList, cn, type Styled } from "../utils";
import { ArrowShape } from "../utils/arrow";
import { Highlight } from "../utils/highlight";
import { arrow, item, popup } from "../utils/styles";

export const Menu = MenuPrimitive.Root;
export const MenuTrigger = MenuPrimitive.Trigger;
export const MenuGroup = MenuPrimitive.Group;
export const MenuRadioGroup = MenuPrimitive.RadioGroup;

export const MenuPopup = ({
  className,
  classList,
  side,
  align = "center",
  sideOffset = 12,
  children,
  ...props
}: MenuPopup.Props) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.Positioner
      side={side}
      align={align}
      sideOffset={sideOffset}
      className={cn("z-50", classList?.positioner)}
    >
      <MenuPrimitive.Popup
        className={cn(
          popup,
          "relative min-w-40 p-1.5",
          className,
          classList?.popup,
        )}
        {...props}
      >
        <MenuPrimitive.Arrow className={cn(arrow, classList?.arrow)}>
          <ArrowShape />
        </MenuPrimitive.Arrow>
        <Highlight />
        {children}
      </MenuPrimitive.Popup>
    </MenuPrimitive.Positioner>
  </MenuPrimitive.Portal>
);
export namespace MenuPopup {
  export type Props = Styled<MenuPrimitive.Popup.Props> &
    Pick<MenuPrimitive.Positioner.Props, "side" | "align" | "sideOffset"> & {
      classList?: ClassList<"positioner" | "popup" | "arrow">;
    };
}

export const MenuItem = ({
  className,
  destructive = false,
  ...props
}: MenuItem.Props) => (
  <MenuPrimitive.Item
    data-destructive={destructive || undefined}
    className={cn(item, destructive && "text-error", className)}
    {...props}
  />
);
export namespace MenuItem {
  export type Props = Styled<MenuPrimitive.Item.Props> & {
    /** Marks an action that deletes or cannot be undone. */
    destructive?: boolean;
  };
}

const Indicator = () => (
  <span className="flex size-4 items-center justify-center">
    <CheckIcon className="hidden group-data-checked:block" />
  </span>
);

export const MenuCheckboxItem = ({
  className,
  children,
  ...props
}: MenuCheckboxItem.Props) => (
  <MenuPrimitive.CheckboxItem
    className={cn(item, "group", className)}
    {...props}
  >
    <Indicator />
    {children}
  </MenuPrimitive.CheckboxItem>
);
export namespace MenuCheckboxItem {
  export type Props = Styled<MenuPrimitive.CheckboxItem.Props>;
}

export const MenuRadioItem = ({
  className,
  children,
  ...props
}: MenuRadioItem.Props) => (
  <MenuPrimitive.RadioItem className={cn(item, "group", className)} {...props}>
    <Indicator />
    {children}
  </MenuPrimitive.RadioItem>
);
export namespace MenuRadioItem {
  export type Props = Styled<MenuPrimitive.RadioItem.Props>;
}

export const MenuGroupLabel = ({
  className,
  ...props
}: MenuGroupLabel.Props) => (
  <MenuPrimitive.GroupLabel
    className={cn(
      "px-3 py-1.5 font-medium text-foreground-dimmed text-xs",
      className,
    )}
    {...props}
  />
);
export namespace MenuGroupLabel {
  export type Props = Styled<MenuPrimitive.GroupLabel.Props>;
}

export const MenuSeparator = ({ className, ...props }: MenuSeparator.Props) => (
  <MenuPrimitive.Separator
    className={cn("-mx-1.5 my-1.5 h-px bg-border", className)}
    {...props}
  />
);
export namespace MenuSeparator {
  export type Props = Styled<MenuPrimitive.Separator.Props>;
}
