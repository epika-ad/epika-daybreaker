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
      <SliderPrimitive.Control className="flex h-5 w-full touch-none select-none items-center data-disabled:pointer-events-none">
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
                "size-4 rounded-full border-2 border-primary bg-background shadow-sm has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background",
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
