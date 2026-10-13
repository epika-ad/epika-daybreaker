// The charts entry point ("daybreaker/charts"). It is separate from the main entry
// because it needs Recharts, which apps that draw no charts should not install.
import {
  type ComponentProps,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
  useContext,
} from "react";
import { Legend, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "./utils";
import { createContext } from "./utils/hooks";

/** Names each series: its label, its colour, and optionally an icon. */
export type ChartConfig = Record<
  string,
  { label: ReactNode; color?: string; icon?: ComponentType }
>;

const [ChartContext, useChart] = createContext<ChartConfig>({ name: "Chart" });

/**
 * Sizes a Recharts chart to its box, themes its grid, axes and cursor, and
 * exposes each series colour as `var(--color-<key>)`.
 */
export const ChartContainer = ({
  config,
  className,
  style,
  children,
  ...props
}: ChartContainer.Props) => {
  const colors = Object.fromEntries(
    Object.entries(config)
      .filter(([, series]) => series.color)
      .map(([key, series]) => [`--color-${key}`, series.color]),
  );

  return (
    <ChartContext value={config}>
      <div
        className={cn(
          "aspect-video w-full text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-foreground-dimmed [&_.recharts-polar-angle-axis-tick_text]:fill-foreground-dimmed",
          "[&_.recharts-cartesian-grid_line]:stroke-border [&_.recharts-polar-grid_circle]:stroke-border [&_.recharts-polar-grid_line]:stroke-border [&_.recharts-polar-grid_polygon]:stroke-border",
          "[&_.recharts-radial-bar-background-sector]:fill-accent [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-accent [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
          "[&_.recharts-layer]:outline-none [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        style={{ ...colors, ...style } as CSSProperties}
        {...props}
      >
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext>
  );
};
export namespace ChartContainer {
  export type Props = Omit<ComponentProps<"div">, "children"> & {
    config: ChartConfig;
    /** One Recharts chart, e.g. `<BarChart>`. */
    children: ComponentProps<typeof ResponsiveContainer>["children"];
  };
}

/** Recharts' tooltip; give it `content={<ChartTooltipContent />}`. */
export const ChartTooltip = Tooltip;
/** Recharts' legend; give it `content={<ChartLegendContent />}`. */
export const ChartLegend = Legend;

type Entry = {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown>;
};

const marks = {
  dot: "size-2.5 rounded-full bg-(--mark)",
  line: "w-1 self-stretch rounded-full bg-(--mark)",
  dashed: "w-0 self-stretch border-(--mark) border-l-2 border-dashed",
} as const;

/** The glass panel shown while hovering a chart. */
export const ChartTooltipContent = ({
  active,
  payload,
  label,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  nameKey,
  labelFormatter,
  valueFormatter = (value) => value.toLocaleString(),
  footer,
  className,
}: ChartTooltipContent.Props) => {
  const config = useContext(ChartContext) ?? {};
  if (!active || !payload?.length) return null;

  return (
    <div
      className={cn(
        "grid min-w-32 gap-1.5 rounded-control border border-border bg-background-dimmed/80 px-3 py-2 text-foreground text-xs backdrop-blur-xl",
        className,
      )}
    >
      {!hideLabel && label !== undefined && (
        <p className="font-medium">
          {labelFormatter ? labelFormatter(label) : label}
        </p>
      )}
      {payload.map((entry) => {
        // pies name their slices in the data; other charts by series key
        const key = String(
          (nameKey && entry.payload?.[nameKey]) ?? entry.name ?? entry.dataKey,
        );
        const series = config[key] ?? config[String(entry.dataKey)];
        const Icon = series?.icon;
        const color = (entry.payload?.fill as string) ?? entry.color;
        return (
          <div key={key} className="flex items-center gap-2">
            {Icon ? (
              <span className="flex text-foreground-dimmed [&>svg]:size-3.5">
                <Icon />
              </span>
            ) : (
              !hideIndicator && (
                <span
                  className={cn("shrink-0", marks[indicator])}
                  style={{ "--mark": color } as CSSProperties}
                />
              )
            )}
            <span className="flex-1 text-foreground-dimmed">
              {series?.label ?? key}
            </span>
            <span className="font-medium tabular-nums">
              {typeof entry.value === "number"
                ? valueFormatter(entry.value, key)
                : entry.value}
            </span>
          </div>
        );
      })}
      {footer?.(payload)}
    </div>
  );
};
export namespace ChartTooltipContent {
  export type Props = {
    // the next three are filled in by Recharts
    active?: boolean;
    payload?: Entry[];
    label?: string | number;
    /** The mark beside each row. */
    indicator?: keyof typeof marks;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    /** The data field that names a row, for pies and radial charts. */
    nameKey?: string;
    labelFormatter?: (label: string | number) => ReactNode;
    valueFormatter?: (value: number, key: string) => ReactNode;
    /** Extra rows under the series, e.g. a total. */
    footer?: (payload: Entry[]) => ReactNode;
    className?: string;
  };
}

/** A row of colour dots and series names. */
export const ChartLegendContent = ({
  payload,
  nameKey,
  className,
}: ChartLegendContent.Props) => {
  const config = useChart();
  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-3 text-foreground-dimmed text-xs",
        className,
      )}
    >
      {payload.map((entry) => {
        const key = String(
          (nameKey && entry.payload?.[nameKey]) ?? entry.dataKey ?? entry.value,
        );
        return (
          <span key={key} className="flex items-center gap-1.5">
            <span
              className="size-2 rounded-full"
              style={{ background: entry.color }}
            />
            {config[key]?.label ?? key}
          </span>
        );
      })}
    </div>
  );
};
export namespace ChartLegendContent {
  export type Props = {
    // filled in by Recharts
    payload?: (Entry & { value?: string | number })[];
    /** The data field that names an entry, for pies and radial charts. */
    nameKey?: string;
    className?: string;
  };
}
