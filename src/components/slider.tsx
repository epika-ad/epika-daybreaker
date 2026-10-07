import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { type ClassList, cn, type Styled } from "../utils";

export const Slider = ({
  className,
  classList,
  "aria-label": label,
  ...props
}: Slider.Props) => {
  // one thumb per value, so passing a tuple renders a range slider
  const values = props.value ?? props.defaultValue;
  const thumbs = Array.isArray(values)
    ? values.map((_value, index) => index)
    : [0];

  return (
    <SliderPrimitive.Root
      className={cn(
        "relative w-full data-disabled:opacity-50",
        className,
        classList?.root,
      )}
      {...props}
    >
      <SliderPrimitive.Control className="flex h-6 w-full touch-none select-none items-center data-disabled:pointer-events-none">
        <SliderPrimitive.Track
          className={cn(
            "relative h-1.5 w-full rounded-full bg-accent",
            classList?.track,
          )}
        >
          <SliderPrimitive.Indicator
            className={cn("rounded-full bg-primary", classList?.indicator)}
          />
          {thumbs.map((index) => (
            <SliderPrimitive.Thumb
              key={index}
              index={index}
              aria-label={label}
              className={cn(
                "h-5 w-8 rounded-full border border-foreground-dimmed/40 bg-white transition-[scale] duration-400 ease-spring data-dragging:scale-125 has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background",
                classList?.thumb,
              )}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
};
export namespace Slider {
  export type Props = Styled<SliderPrimitive.Root.Props> & {
    classList?: ClassList<"root" | "track" | "indicator" | "thumb">;
  };
}
