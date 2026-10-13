import type { ReactNode } from "react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "daybreaker/charts";

const data = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];
const total = data.reduce((sum, row) => sum + row.visitors, 0);

// a second ring for the stacked chart: the same browsers on phones
const phones = data.map((row, index) => ({
  ...row,
  visitors: [120, 260, 60, 40, 110][index] ?? 0,
}));

const config = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--color-chart-1)" },
  safari: { label: "Safari", color: "var(--color-chart-2)" },
  firefox: { label: "Firefox", color: "var(--color-chart-3)" },
  edge: { label: "Edge", color: "var(--color-chart-4)" },
  other: { label: "Other", color: "var(--color-chart-5)" },
} satisfies ChartConfig;

const Tile = ({ title, children }: { title: string; children: ReactNode }) => (
  <figure className="rounded-surface bg-background-dimmed p-4">
    <figcaption className="mb-3 font-medium text-sm">{title}</figcaption>
    {children}
  </figure>
);

const Plot = ({
  children,
  center,
}: {
  children: ReactNode;
  /** Text drawn in the hole of a donut. */
  center?: ReactNode;
}) => (
  <div className="relative">
    <ChartContainer config={config} className="aspect-square">
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent hideLabel nameKey="browser" />}
        />
        {children}
      </PieChart>
    </ChartContainer>
    {center && (
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        {center}
      </div>
    )}
  </div>
);

// the slice outline matches the tile, so slices look separated
const slices = {
  data,
  dataKey: "visitors",
  nameKey: "browser",
  stroke: "var(--wz-background-dimmed)",
  strokeWidth: 2,
} as const;

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot>
        <Pie {...slices} />
      </Plot>
    </Tile>
    <Tile title="No separators">
      <Plot>
        <Pie {...slices} stroke="none" />
      </Plot>
    </Tile>
    <Tile title="Labels">
      <Plot>
        <Pie {...slices} outerRadius="65%" label={{ fontSize: 11 }} />
      </Plot>
    </Tile>
    <Tile title="Labels inside">
      <Plot>
        <Pie {...slices}>
          <LabelList
            dataKey="visitors"
            fill="white"
            stroke="none"
            fontSize={11}
          />
        </Pie>
      </Plot>
    </Tile>
    <Tile title="Legend">
      <Plot>
        <Pie {...slices} outerRadius="75%" />
        <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
      </Plot>
    </Tile>
    <Tile title="Donut">
      <Plot>
        <Pie {...slices} innerRadius="55%" />
      </Plot>
    </Tile>
    <Tile title="Donut with a total">
      <Plot
        center={
          <>
            <span className="font-bold text-2xl tabular-nums">
              {total.toLocaleString()}
            </span>
            <span className="text-foreground-dimmed text-xs">Visitors</span>
          </>
        }
      >
        <Pie {...slices} innerRadius="62%" />
      </Plot>
    </Tile>
    <Tile title="Stacked rings">
      <Plot>
        <Pie {...slices} outerRadius="55%" />
        <Pie {...slices} data={phones} innerRadius="65%" outerRadius="85%" />
      </Plot>
    </Tile>
    <Tile title="Rounded, with gaps">
      <Plot>
        <Pie
          {...slices}
          stroke="none"
          innerRadius="55%"
          paddingAngle={4}
          cornerRadius={6}
        />
      </Plot>
    </Tile>
  </div>
);
