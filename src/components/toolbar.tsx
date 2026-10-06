import { Form as FormPrimitive } from "@base-ui/react/form";
import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { cn, type Styled } from "../utils";
import { disabled, focusRing } from "../utils/styles";

/** A row of controls that arrow keys move between as one tab stop. */
export const Toolbar = ({ className, ...props }: Toolbar.Props) => (
  <ToolbarPrimitive.Root
    className={cn(
      "inline-flex w-fit items-center gap-1 rounded-control bg-accent p-1",
      className,
    )}
    {...props}
  />
);
export namespace Toolbar {
  export type Props = Styled<ToolbarPrimitive.Root.Props>;
}

export const ToolbarGroup = ({ className, ...props }: ToolbarGroup.Props) => (
  <ToolbarPrimitive.Group
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
);
export namespace ToolbarGroup {
  export type Props = Styled<ToolbarPrimitive.Group.Props>;
}

export const ToolbarButton = ({ className, ...props }: ToolbarButton.Props) => (
  <ToolbarPrimitive.Button
    className={cn(
      "inline-flex h-8 min-w-8 cursor-pointer select-none items-center justify-center gap-2 rounded-item px-2.5 font-medium text-foreground-dimmed text-sm transition-[scale,background-color,color] duration-400 ease-spring hover:text-foreground active:scale-90 data-pressed:bg-background data-pressed:text-foreground dark:data-pressed:bg-white/20",
      focusRing,
      disabled,
      className,
    )}
    {...props}
  />
);
export namespace ToolbarButton {
  export type Props = Styled<ToolbarPrimitive.Button.Props>;
}

export const ToolbarSeparator = ({
  className,
  ...props
}: ToolbarSeparator.Props) => (
  <ToolbarPrimitive.Separator
    className={cn("mx-1 h-4 w-px bg-border", className)}
    {...props}
  />
);
export namespace ToolbarSeparator {
  export type Props = Styled<ToolbarPrimitive.Separator.Props>;
}

/** A form that collects `Field` errors and shows them on submit. */
export const Form = ({ className, ...props }: Form.Props) => (
  <FormPrimitive
    className={cn("flex w-full flex-col gap-4", className)}
    {...props}
  />
);
export namespace Form {
  export type Props = Styled<FormPrimitive.Props>;
}
