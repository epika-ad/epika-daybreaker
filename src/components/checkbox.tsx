import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "../icons";
import { type ClassList, cn, type Styled } from "../utils";
import { disabled, focusRing } from "../utils/styles";

// The marks are drawn across the whole box instead of as a 14px icon centred
// in it. A separate small icon lands between device pixels at 125% and 150%
// display scaling and visibly drifts; one drawing the size of the box cannot.
// Each frame keeps the mark at its 14px-in-18px size, and the tick's also
// lowers it half a unit, because the tick's own outline sits above centre.
// Drawn this way the strokes no longer snap to the pixel grid, so they are a
// touch heavier to stay crisp.
const frames = {
  check: "-3.43 -3.93 30.86 30.86",
  minus: "-3.43 -3.43 30.86 30.86",
} as const;

export const Checkbox = ({
  className,
  classList,
  ...props
}: Checkbox.Props) => (
  <CheckboxPrimitive.Root
    className={cn(
      "group relative inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[7px] border border-border bg-background text-primary-foreground transition-[scale,background-color,border-color] duration-400 ease-spring active:scale-85 data-checked:border-primary data-indeterminate:border-primary data-checked:bg-primary data-indeterminate:bg-primary data-invalid:border-error",
      focusRing,
      disabled,
      className,
      classList?.root,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "absolute inset-0 transition-[scale,opacity] duration-400 ease-spring data-ending-style:scale-50 data-starting-style:scale-50 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-100",
        classList?.indicator,
      )}
    >
      <CheckIcon
        viewBox={frames.check}
        strokeWidth={2.5}
        className="size-full group-data-indeterminate:hidden"
      />
      <MinusIcon
        viewBox={frames.minus}
        strokeWidth={2.5}
        className="hidden size-full group-data-indeterminate:block"
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
export namespace Checkbox {
  export type Props = Styled<CheckboxPrimitive.Root.Props> & {
    classList?: ClassList<"root" | "indicator">;
  };
}
