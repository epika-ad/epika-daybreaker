import { Children, type ComponentProps, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { type ClassList, cn } from "../utils";
import { focusRing } from "../utils/styles";

const arrow =
  "absolute top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background-dimmed/75 text-foreground backdrop-blur-xl transition-[scale,opacity] duration-400 ease-spring active:scale-85 disabled:pointer-events-none disabled:opacity-0";

/** Slides you swipe or step through one at a time; each child is a slide. */
export const Carousel = ({
  className,
  classList,
  children,
  ...props
}: Carousel.Props) => {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);

  const go = (to: number) =>
    track.current?.scrollTo({
      left: to * track.current.clientWidth,
      behavior: "smooth",
    });

  return (
    <section
      className={cn("relative w-full", className, classList?.root)}
      {...props}
    >
      <div
        ref={track}
        className={cn(
          "flex snap-x snap-mandatory overflow-x-auto rounded-surface [scrollbar-width:none]",
          classList?.track,
        )}
        onScroll={(event) => {
          const { scrollLeft, clientWidth } = event.currentTarget;
          setIndex(Math.round(scrollLeft / clientWidth));
        }}
      >
        {Children.map(children, (slide) => (
          // biome-ignore lint/a11y/useSemanticElements: a slide is a group, not a form fieldset
          <div
            role="group"
            aria-roledescription="slide"
            className={cn("w-full shrink-0 snap-center", classList?.slide)}
          >
            {slide}
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="Previous slide"
        disabled={index === 0}
        className={cn(arrow, focusRing, "left-2")}
        onClick={() => go(index - 1)}
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        disabled={index >= count - 1}
        className={cn(arrow, focusRing, "right-2")}
        onClick={() => go(index + 1)}
      >
        <ChevronRightIcon />
      </button>
      <div
        aria-hidden="true"
        className={cn("mt-3 flex justify-center gap-1.5", classList?.dots)}
      >
        {Array.from({ length: count }, (_, dot) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: dots are positional
            key={dot}
            className={cn(
              "h-1.5 w-1.5 rounded-full bg-border transition-[width,background-color] duration-400 ease-spring",
              dot === index && "w-5 bg-primary",
            )}
          />
        ))}
      </div>
    </section>
  );
};
export namespace Carousel {
  export type Props = ComponentProps<"section"> & {
    classList?: ClassList<"root" | "track" | "slide" | "dots">;
  };
}
