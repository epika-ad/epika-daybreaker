import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "../icons";
import { type ClassList, cn, type Styled } from "../utils";

const step =
  "flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-background text-foreground transition-[scale,background-color] duration-400 ease-spring active:scale-85 data-disabled:pointer-events-none data-disabled:opacity-40 dark:bg-white/20";

/** A number input with stepper buttons; arrow keys and scrolling also step. */
export const NumberField = ({
  className,
  classList,
  ...props
}: NumberField.Props) => (
  <NumberFieldPrimitive.Root
    className={cn("w-fit", className, classList?.root)}
    {...props}
  >
    <NumberFieldPrimitive.Group
      className={cn(
        "flex h-9 items-center gap-1 rounded-full bg-accent p-1 data-disabled:opacity-50",
        classList?.group,
      )}
    >
      <NumberFieldPrimitive.Decrement
        className={cn(step, classList?.decrement)}
      >
        <MinusIcon />
      </NumberFieldPrimitive.Decrement>
      <NumberFieldPrimitive.Input
        className={cn(
          "h-full w-14 rounded-full bg-transparent text-center font-medium text-foreground text-sm tabular-nums caret-primary outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
          classList?.input,
        )}
      />
      <NumberFieldPrimitive.Increment
        className={cn(step, classList?.increment)}
      >
        <PlusIcon />
      </NumberFieldPrimitive.Increment>
    </NumberFieldPrimitive.Group>
  </NumberFieldPrimitive.Root>
);
export namespace NumberField {
  export type Props = Styled<NumberFieldPrimitive.Root.Props> & {
    classList?: ClassList<
      "root" | "group" | "decrement" | "input" | "increment"
    >;
  };
}
