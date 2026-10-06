import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cn, type Styled } from "../utils";
import { disabled, focusRing } from "../utils/styles";

/** A two-state button that stays pressed, e.g. bold in a text toolbar. */
export const Toggle = ({ className, ...props }: Toggle.Props) => (
  <TogglePrimitive
    className={cn(
      "inline-flex h-9 min-w-9 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-control px-3 font-medium text-foreground-dimmed text-sm transition-[scale,background-color,color] duration-400 ease-spring hover:bg-accent active:scale-90 data-pressed:bg-accent data-pressed:text-foreground",
      focusRing,
      disabled,
      className,
    )}
    {...props}
  />
);
export namespace Toggle {
  export type Props = Styled<TogglePrimitive.Props>;
}
