import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type { ComponentProps } from "react";
import { XIcon } from "../icons";
import { type ClassList, cn, type Styled } from "../utils";
import { backdrop, focusRing, modal } from "../utils/styles";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export const DialogPopup = ({
  className,
  classList,
  closable = true,
  children,
  ...props
}: DialogPopup.Props) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Backdrop className={cn(backdrop, classList?.backdrop)} />
    <DialogPrimitive.Popup
      className={cn(modal, className, classList?.popup)}
      {...props}
    >
      {children}
      {closable && (
        <DialogPrimitive.Close
          aria-label="Close"
          className={cn(
            "absolute top-4 right-4 cursor-pointer rounded-full bg-accent p-1 text-foreground-dimmed transition-colors hover:bg-border hover:text-foreground",
            focusRing,
            classList?.close,
          )}
        >
          <XIcon />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Popup>
  </DialogPrimitive.Portal>
);
export namespace DialogPopup {
  export type Props = Styled<DialogPrimitive.Popup.Props> & {
    /** Renders the corner close button. */
    closable?: boolean;
    classList?: ClassList<"backdrop" | "popup" | "close">;
  };
}

export const DialogTitle = ({ className, ...props }: DialogTitle.Props) => (
  <DialogPrimitive.Title
    className={cn("pr-8 font-semibold text-lg leading-tight", className)}
    {...props}
  />
);
export namespace DialogTitle {
  export type Props = Styled<DialogPrimitive.Title.Props>;
}

export const DialogDescription = ({
  className,
  ...props
}: DialogDescription.Props) => (
  <DialogPrimitive.Description
    className={cn("text-foreground-dimmed text-sm", className)}
    {...props}
  />
);
export namespace DialogDescription {
  export type Props = Styled<DialogPrimitive.Description.Props>;
}

export const DialogFooter = ({ className, ...props }: DialogFooter.Props) => (
  <div
    className={cn("flex flex-wrap justify-end gap-2", className)}
    {...props}
  />
);
export namespace DialogFooter {
  export type Props = ComponentProps<"div">;
}
