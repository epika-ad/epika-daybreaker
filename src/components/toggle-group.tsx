import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { cn, type Styled } from "../utils";

/** Joins `Toggle`s into one segmented control; pass `multiple` to allow several. */
export const ToggleGroup = ({ className, ...props }: ToggleGroup.Props) => (
  <ToggleGroupPrimitive
    className={cn(
      "inline-flex w-fit items-center gap-1 rounded-control bg-accent p-1 *:h-8 *:min-w-8 *:rounded-item *:hover:bg-transparent *:data-pressed:bg-background dark:*:data-pressed:bg-white/20",
      className,
    )}
    {...props}
  />
);
export namespace ToggleGroup {
  export type Props = Styled<ToggleGroupPrimitive.Props>;
}
