import { Children, type ComponentProps, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { type ClassList, cn } from "../utils";
import { focusRing } from "../utils/styles";

// at either end an arrow fades out but stays focusable: disabling it would
// drop the focus of someone who had just pressed it
const arrow =
  "absolute top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background-dimmed/75 text-foreground backdrop-blur-xl transition-[scale,opacity] duration-400 ease-spring active:scale-85 aria-disabled:pointer-events-none aria-disabled:opacity-0 aria-disabled:focus-visible:opacity-40 rtl:[&>svg]:rotate-180";

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

  const go = (to: number) => {
    const element = track.current;
    if (!element || to < 0 || to > count - 1) return;
    // right-to-left tracks scroll towards negative offsets
    const sign = getComputedStyle(element).direction === "rtl" ? -1 : 1;
    element.scrollTo({
      left: sign * to * element.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      className={cn("relative w-full", className, classList?.root)}
      {...props}
    >
      <div
        ref={track}
        // focusable so arrow keys can scroll it
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling region must be reachable by keyboard
        tabIndex={0}
        className={cn(
          "flex snap-x snap-mandatory overflow-x-auto rounded-surface outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ring",
          classList?.track,
        )}
        onScroll={(event) => {
          const { scrollLeft, clientWidth } = event.currentTarget;
          // the offset is negative when the track runs right to left
          setIndex(Math.round(Math.abs(scrollLeft) / clientWidth));
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
        aria-disabled={index === 0}
        className={cn(arrow, focusRing, "start-2")}
        onClick={() => go(index - 1)}
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        aria-disabled={index >= count - 1}
        className={cn(arrow, focusRing, "end-2")}
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
