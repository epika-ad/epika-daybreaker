import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cn, type Styled } from "../utils";

/** Groups a control with its label, description and validation message. */
export const Field = ({ className, ...props }: Field.Props) => (
  <FieldPrimitive.Root
    className={cn("flex flex-col gap-1.5", className)}
    {...props}
  />
);
export namespace Field {
  export type Props = Styled<FieldPrimitive.Root.Props>;
}

export const FieldLabel = ({ className, ...props }: FieldLabel.Props) => (
  <FieldPrimitive.Label
    className={cn(
      "font-medium text-foreground text-sm data-disabled:opacity-50",
      className,
    )}
    {...props}
  />
);
export namespace FieldLabel {
  export type Props = Styled<FieldPrimitive.Label.Props>;
}

export const FieldDescription = ({
  className,
  ...props
}: FieldDescription.Props) => (
  <FieldPrimitive.Description
    className={cn("text-foreground-dimmed text-sm", className)}
    {...props}
  />
);
export namespace FieldDescription {
  export type Props = Styled<FieldPrimitive.Description.Props>;
}

export const FieldError = ({ className, ...props }: FieldError.Props) => (
  <FieldPrimitive.Error
    className={cn("text-error text-sm", className)}
    {...props}
  />
);
export namespace FieldError {
  export type Props = Styled<FieldPrimitive.Error.Props>;
}
