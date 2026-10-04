import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { type ClassList, cn, type Styled } from "../utils";
import { disabled, focusRing } from "../utils/styles";

export const RadioGroup = ({ className, ...props }: RadioGroup.Props) => (
  <RadioGroupPrimitive
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
);
export namespace RadioGroup {
  export type Props = Styled<RadioGroupPrimitive.Props>;
}

export const Radio = ({ className, classList, ...props }: Radio.Props) => (
  <RadioPrimitive.Root
    className={cn(
      "inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-background transition-colors data-checked:border-primary data-checked:bg-primary data-invalid:border-error",
      focusRing,
      disabled,
      className,
      classList?.root,
    )}
    {...props}
  >
    <RadioPrimitive.Indicator
      className={cn(
        "size-2 rounded-full bg-primary-foreground",
        classList?.indicator,
      )}
    />
  </RadioPrimitive.Root>
);
export namespace Radio {
  export type Props = Styled<RadioPrimitive.Root.Props> & {
    classList?: ClassList<"root" | "indicator">;
  };
}
