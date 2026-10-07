import {
  Children,
  type ComponentProps,
  type KeyboardEvent,
  type PointerEvent,
  useRef,
  useState,
} from "react";
import { type ClassList, cn } from "../utils";

/**
 * Two panels with a draggable divider between them. Pass exactly two
 * children; `defaultSize` is the first panel's share in percent.
 */
export const Resizable = ({
  direction = "horizontal",
  defaultSize = 50,
  min = 15,
  max = 85,
  className,
  classList,
  children,
  ...props
}: Resizable.Props) => {
  const root = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(defaultSize);
  const [dragging, setDragging] = useState(false);
  const [first, second] = Children.toArray(children);
  const horizontal = direction === "horizontal";
  const clamp = (value: number) => Math.min(max, Math.max(min, value));

  const drag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging || !root.current) return;
    const box = root.current.getBoundingClientRect();
    const share = horizontal
      ? (event.clientX - box.left) / box.width
      : (event.clientY - box.top) / box.height;
    setSize(clamp(share * 100));
  };

  const nudge = (event: KeyboardEvent<HTMLDivElement>) => {
    const back = horizontal ? "ArrowLeft" : "ArrowUp";
    const forward = horizontal ? "ArrowRight" : "ArrowDown";
    if (event.key !== back && event.key !== forward) return;
    event.preventDefault();
    setSize((current) => clamp(current + (event.key === forward ? 5 : -5)));
  };

  return (
    <div
      ref={root}
      className={cn(
        "flex size-full overflow-hidden rounded-surface bg-background-dimmed",
        !horizontal && "flex-col",
        // text would be selected by the drag otherwise
        dragging && "select-none",
        className,
        classList?.root,
      )}
      {...props}
    >
      <div
        className={cn("min-h-0 min-w-0 overflow-auto", classList?.panel)}
        style={{ flexBasis: `${size}%` }}
      >
        {first}
      </div>
      {/* biome-ignore lint/a11y/useSemanticElements: an hr cannot be focused or dragged */}
      <div
        role="separator"
        tabIndex={0}
        aria-orientation={horizontal ? "vertical" : "horizontal"}
        aria-valuenow={Math.round(size)}
        aria-valuemin={min}
        aria-valuemax={max}
        data-dragging={dragging || undefined}
        className={cn(
          "group relative flex shrink-0 touch-none items-center justify-center bg-border outline-none",
          horizontal ? "w-px cursor-col-resize" : "h-px cursor-row-resize",
          classList?.handle,
        )}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
        }}
        onPointerMove={drag}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onKeyDown={nudge}
      >
        {/* the grip: a wider hit area whose pill stretches while dragged */}
        <span
          className={cn(
            "absolute flex items-center justify-center",
            horizontal ? "inset-y-0 -inset-x-2" : "-inset-y-2 inset-x-0",
          )}
        >
          <span
            className={cn(
              "rounded-full bg-foreground-dimmed/60 transition-[width,height,background-color] duration-400 ease-spring group-focus-visible:bg-primary group-data-dragging:bg-primary",
              horizontal
                ? "h-8 w-1 group-hover:h-10 group-data-dragging:h-14"
                : "h-1 w-8 group-hover:w-10 group-data-dragging:w-14",
            )}
          />
        </span>
      </div>
      <div
        className={cn("min-h-0 min-w-0 flex-1 overflow-auto", classList?.panel)}
      >
        {second}
      </div>
    </div>
  );
};
export namespace Resizable {
  export type Props = ComponentProps<"div"> & {
    /** The axis the panels sit along. */
    direction?: "horizontal" | "vertical";
    /** The first panel's starting share, in percent. */
    defaultSize?: number;
    /** The smallest and largest share the first panel can take. */
    min?: number;
    max?: number;
    classList?: ClassList<"root" | "panel" | "handle">;
  };
}
