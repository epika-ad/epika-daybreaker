import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { useRef } from "react";
import { MinusIcon, PlusIcon } from "../icons";
import { type ClassList, cn, type Styled } from "../utils";

const step =
  "flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-background text-foreground transition-[scale,background-color] duration-400 ease-spring active:scale-85 data-disabled:pointer-events-none data-disabled:opacity-40 dark:bg-white/20";

/** A number input with stepper buttons; arrow keys and scrolling also step. */
export const NumberField = ({
  className,
  classList,
  onValueChange,
  "aria-label": label,
  ...props
}: NumberField.Props) => {
  const input = useRef<HTMLInputElement>(null);
  const previous = useRef(props.value ?? props.defaultValue ?? null);

  // the new number rolls in from below when the value rises and from above
  // when it falls; the input itself moves, so its text is never repainted
  const roll = (value: number | null, typed: boolean) => {
    // a controlled value may have been changed from outside since the last roll
    const from = props.value !== undefined ? props.value : previous.current;
    previous.current = value;
    const element = input.current;
    // typing is left alone: the digits should not jump under the caret
    if (typed || !element?.animate || value === null || from === null) return;
    if (value === from) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const offset = value > from ? 14 : -14;
    const spring = getComputedStyle(element).getPropertyValue("--wz-spring");
    const frames = [
      { translate: `0 ${offset}px`, opacity: 0 },
      { translate: "0 0", opacity: 1 },
    ];
    try {
      element.animate(frames, { duration: 450, easing: spring.trim() });
    } catch {
      // an engine that cannot parse the spring still gets the roll
      element.animate(frames, { duration: 200, easing: "ease-out" });
    }
  };

  return (
    <NumberFieldPrimitive.Root
      className={cn("w-fit", className, classList?.root)}
      onValueChange={(value, details) => {
        roll(value, details.reason.startsWith("input-"));
        onValueChange?.(value, details);
      }}
      {...props}
    >
      <NumberFieldPrimitive.Group
        className={cn(
          "flex h-9 items-center gap-1 overflow-hidden rounded-full bg-accent p-1 data-disabled:opacity-50",
          classList?.group,
        )}
      >
        <NumberFieldPrimitive.Decrement
          className={cn(step, classList?.decrement)}
        >
          <MinusIcon />
        </NumberFieldPrimitive.Decrement>
        <NumberFieldPrimitive.Input
          ref={input}
          // the name belongs on the input, the element that takes focus
          aria-label={label}
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
};
export namespace NumberField {
  export type Props = Styled<NumberFieldPrimitive.Root.Props> & {
    classList?: ClassList<
      "root" | "group" | "decrement" | "input" | "increment"
    >;
  };
}
