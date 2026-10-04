import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import type { ComponentProps } from "react";
import { type ClassList, cn, type Styled } from "../utils";
import { backdrop, modal } from "../utils/styles";

/** A modal that interrupts for a decision; it cannot be dismissed by clicking outside. */
export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogClose = AlertDialogPrimitive.Close;

export const AlertDialogPopup = ({
  className,
  classList,
  ...props
}: AlertDialogPopup.Props) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Backdrop
      className={cn(backdrop, classList?.backdrop)}
    />
    <AlertDialogPrimitive.Popup
      className={cn(modal, className, classList?.popup)}
      {...props}
    />
  </AlertDialogPrimitive.Portal>
);
export namespace AlertDialogPopup {
  export type Props = Styled<AlertDialogPrimitive.Popup.Props> & {
    classList?: ClassList<"backdrop" | "popup">;
  };
}

export const AlertDialogTitle = ({
  className,
  ...props
}: AlertDialogTitle.Props) => (
  <AlertDialogPrimitive.Title
    className={cn("font-semibold text-lg leading-tight", className)}
    {...props}
  />
);
export namespace AlertDialogTitle {
  export type Props = Styled<AlertDialogPrimitive.Title.Props>;
}

export const AlertDialogDescription = ({
  className,
  ...props
}: AlertDialogDescription.Props) => (
  <AlertDialogPrimitive.Description
    className={cn("text-foreground-dimmed text-sm", className)}
    {...props}
  />
);
export namespace AlertDialogDescription {
  export type Props = Styled<AlertDialogPrimitive.Description.Props>;
}

export const AlertDialogFooter = ({
  className,
  ...props
}: AlertDialogFooter.Props) => (
  <div
    className={cn("flex flex-wrap justify-end gap-2", className)}
    {...props}
  />
);
export namespace AlertDialogFooter {
  export type Props = ComponentProps<"div">;
}
