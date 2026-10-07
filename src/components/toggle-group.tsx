import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { cn, type Styled } from "../utils";
import { Highlight } from "../utils/highlight";

/** Joins `Toggle`s into one segmented control; pass `multiple` to allow several. */
export const ToggleGroup = ({
  className,
  children,
  ...props
}: ToggleGroup.Props) => (
  <ToggleGroupPrimitive
    className={cn(
      "relative isolate inline-flex w-fit items-center gap-1 rounded-control bg-accent p-1 *:h-8 *:min-w-8 *:rounded-item *:hover:bg-transparent",
      // with one choice a single pill glides between the toggles; with
      // several, each pressed toggle fills in on its own
      props.multiple
        ? "*:data-pressed:bg-background dark:*:data-pressed:bg-white/20"
        : "*:data-pressed:bg-transparent",
      className,
    )}
    {...props}
  >
    {!props.multiple && (
      <Highlight
        attribute="data-pressed"
        className="bg-background dark:bg-white/20"
      />
    )}
    {children}
  </ToggleGroupPrimitive>
);
export namespace ToggleGroup {
  export type Props = Styled<ToggleGroupPrimitive.Props>;
}
