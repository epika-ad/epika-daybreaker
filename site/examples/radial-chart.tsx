import type { ComponentProps, ReactNode } from "react";
import {
  LabelList,
  PolarAngleAxis,
  PolarGrid,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "woozui/charts";

const data = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

// one bar, for the charts that show a single figure
const single = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
];
// a score out of 100, for the gauge
const score = [
  { browser: "chrome", visitors: 72, fill: "var(--color-chrome)" },
];
// two figures to compare, for the half rings
const split = [
  { browser: "desktop", visitors: 1260, fill: "var(--color-desktop)" },
  { browser: "mobile", visitors: 570, fill: "var(--color-mobile)" },
];

const config = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--color-chart-1)" },
  safari: { label: "Safari", color: "var(--color-chart-2)" },
  firefox: { label: "Firefox", color: "var(--color-chart-3)" },
  edge: { label: "Edge", color: "var(--color-chart-4)" },
  other: { label: "Other", color: "var(--color-chart-5)" },
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
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
  ...chart
}: ComponentProps<typeof RadialBarChart> & {
  children: ReactNode;
  /** Text drawn in the middle of the rings. */
  center?: ReactNode;
}) => (
  <div className="relative">
    <ChartContainer config={config} className="aspect-square">
      <RadialBarChart
        data={data}
        innerRadius="25%"
        outerRadius="100%"
        {...chart}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="browser" />}
        />
        {children}
      </RadialBarChart>
    </ChartContainer>
    {center && (
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        {center}
      </div>
    )}
  </div>
);

const Figure = ({ value, label }: { value: string; label: string }) => (
  <>
    <span className="font-bold text-2xl tabular-nums">{value}</span>
    <span className="text-foreground-dimmed text-xs">{label}</span>
  </>
);

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot>
        <RadialBar dataKey="visitors" background />
      </Plot>
    </Tile>
    <Tile title="Rounded">
      <Plot>
        <RadialBar dataKey="visitors" background cornerRadius={10} />
      </Plot>
    </Tile>
    <Tile title="Labels">
      <Plot startAngle={-90} endAngle={380}>
        <RadialBar dataKey="visitors" background>
          <LabelList
            dataKey="browser"
            position="insideStart"
            fill="white"
            fontSize={10}
            className="capitalize"
          />
        </RadialBar>
      </Plot>
    </Tile>
    <Tile title="Grid">
      <Plot>
        <PolarGrid gridType="circle" radialLines={false} />
        <RadialBar dataKey="visitors" />
      </Plot>
    </Tile>
    <Tile title="Legend">
      <Plot outerRadius="85%">
        <RadialBar dataKey="visitors" background cornerRadius={10} />
        <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
      </Plot>
    </Tile>
    <Tile title="A single figure">
      <Plot
        data={single}
        startAngle={90}
        endAngle={-180}
        innerRadius="72%"
        outerRadius="100%"
        center={<Figure value="1,260" label="Visitors" />}
      >
        <RadialBar dataKey="visitors" background cornerRadius={10} />
      </Plot>
    </Tile>
    <Tile title="Progress ring">
      <Plot
        data={single}
        startAngle={90}
        endAngle={-270}
        innerRadius="72%"
        outerRadius="100%"
        center={<Figure value="100%" label="Complete" />}
      >
        <RadialBar dataKey="visitors" cornerRadius={10} />
      </Plot>
    </Tile>
    <Tile title="Gauge">
      <Plot
        data={score}
        startAngle={210}
        endAngle={-30}
        innerRadius="72%"
        outerRadius="100%"
        center={<Figure value="72" label="Score" />}
      >
        {/* fixes the scale at 0 to 100, so 72 fills 72% of the arc */}
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar dataKey="visitors" background cornerRadius={10} />
      </Plot>
    </Tile>
    <Tile title="Half rings">
      <Plot
        data={split}
        startAngle={180}
        endAngle={0}
        innerRadius="55%"
        outerRadius="100%"
        center={<Figure value="1,830" label="Visitors" />}
      >
        <RadialBar dataKey="visitors" background cornerRadius={8} />
      </Plot>
    </Tile>
  </div>
);
