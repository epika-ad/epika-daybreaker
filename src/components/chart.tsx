import type { ComponentProps } from "react";
import { type ClassList, cn } from "../utils";

/**
 * A small bar or line chart for a single series. For multiple series, axes
 * or zooming, use a charting library.
 */
export const Chart = ({
  data,
  type = "bar",
  format = String,
  className,
  classList,
  ...props
}: Chart.Props) => {
  const top = Math.max(...data.map((point) => point.value), 0) || 1;
  // the plot starts at zero, so a value below it sits on the baseline
  const share = (value: number) => (Math.max(0, value) / top) * 100;
  // line charts map values into a 100 × 100 box that is stretched to fit
  const points = data.map((point, index) => ({
    x: data.length > 1 ? (index / (data.length - 1)) * 100 : 50,
    y: 100 - share(point.value),
  }));
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <figure
      className={cn("flex h-48 w-full flex-col gap-2", className)}
      {...props}
    >
      {type === "bar" ? (
        <div
          className={cn("flex min-h-0 flex-1 items-end gap-2", classList?.plot)}
        >
          {data.map((point, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: points are positional, and two may share a label
              key={index}
              className="group relative flex h-full flex-1 items-end"
            >
              <div
                className={cn(
                  "w-full origin-bottom animate-grow rounded-t-item bg-primary transition-[background-color] group-hover:bg-primary-dimmed motion-reduce:animate-none",
                  classList?.bar,
                )}
                // each bar starts a little after the one before it
                style={{
                  height: `${share(point.value)}%`,
                  animationDelay: `${index * 50}ms`,
                }}
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-full mb-1 text-center font-medium text-xs tabular-nums opacity-0 transition-opacity group-hover:opacity-100">
                {format(point.value)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 -4 100 108"
          preserveAspectRatio="none"
          // revealed left to right; the wipe is on the whole plot because a
          // dash-drawn stroke breaks up once the box is stretched
          className={cn(
            "min-h-0 w-full flex-1 animate-wipe overflow-visible motion-reduce:animate-none",
            classList?.plot,
          )}
        >
          <polygon
            points={`0,100 ${line} 100,100`}
            className="fill-primary/15"
          />
          <polyline
            points={line}
            fill="none"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className={cn("stroke-primary", classList?.line)}
          />
        </svg>
      )}
      <div
        className={cn(
          "flex text-foreground-dimmed text-xs",
          type === "bar" ? "gap-2" : "justify-between",
          classList?.labels,
        )}
      >
        {data.map((point, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: points are positional, and two may share a label
            key={index}
            className={cn("truncate text-center", type === "bar" && "flex-1")}
          >
            {point.label}
          </span>
        ))}
      </div>
      {/* the same numbers as text, for screen readers */}
      <figcaption className="sr-only">
        {data
          .map((point) => `${point.label}: ${format(point.value)}`)
          .join(", ")}
      </figcaption>
    </figure>
  );
};
export namespace Chart {
  export type Props = ComponentProps<"figure"> & {
    data: readonly { label: string; value: number }[];
    type?: "bar" | "line";
    /** Turns a value into the text shown for it, e.g. a currency. */
    format?: (value: number) => string;
    classList?: ClassList<"plot" | "bar" | "line" | "labels">;
  };
}
