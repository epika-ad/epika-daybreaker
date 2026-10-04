import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "../icons";
import { type ClassList, cn, type Styled } from "../utils";
import { disabled, focusRing } from "../utils/styles";

export const Checkbox = ({
  className,
  classList,
  ...props
}: Checkbox.Props) => (
  <CheckboxPrimitive.Root
    className={cn(
      "group inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-item border border-border bg-background text-primary-foreground transition-colors data-checked:border-primary data-indeterminate:border-primary data-checked:bg-primary data-indeterminate:bg-primary data-invalid:border-error",
      focusRing,
      disabled,
      className,
      classList?.root,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center", classList?.indicator)}
    >
      <CheckIcon className="size-3.5 group-data-indeterminate:hidden" />
      <MinusIcon className="hidden size-3.5 group-data-indeterminate:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
export namespace Checkbox {
  export type Props = Styled<CheckboxPrimitive.Root.Props> & {
    classList?: ClassList<"root" | "indicator">;
  };
}
