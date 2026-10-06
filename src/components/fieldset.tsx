import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import { cn, type Styled } from "../utils";

/** Groups related fields under one legend. */
export const Fieldset = ({ className, ...props }: Fieldset.Props) => (
  <FieldsetPrimitive.Root
    className={cn("flex min-w-0 flex-col gap-4", className)}
    {...props}
  />
);
export namespace Fieldset {
  export type Props = Styled<FieldsetPrimitive.Root.Props>;
}

export const FieldsetLegend = ({
  className,
  ...props
}: FieldsetLegend.Props) => (
  <FieldsetPrimitive.Legend
    className={cn("font-semibold text-base text-foreground", className)}
    {...props}
  />
);
export namespace FieldsetLegend {
  export type Props = Styled<FieldsetPrimitive.Legend.Props>;
}

/** Shares one value array between several checkboxes. */
export const CheckboxGroup = ({ className, ...props }: CheckboxGroup.Props) => (
  <CheckboxGroupPrimitive
    className={cn("flex flex-col gap-3", className)}
    {...props}
  />
);
export namespace CheckboxGroup {
  export type Props = Styled<CheckboxGroupPrimitive.Props>;
}
