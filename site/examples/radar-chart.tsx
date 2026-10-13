import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "daybreaker/charts";
import type { ReactNode } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

const data = [
  { month: "Jan", desktop: 186, mobile: 160 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 273, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const config = {
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
  grid = <PolarGrid />,
  radius,
}: {
  children: ReactNode;
  /** Shrinks the web to leave room, e.g. for a legend. */
  radius?: string;
  /** The web behind the shape; pass `null` for none. */
  grid?: ReactNode;
}) => (
  <ChartContainer config={config} className="aspect-square">
    <RadarChart
      data={data}
      outerRadius={radius}
      margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
    >
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      {grid}
      <PolarAngleAxis dataKey="month" />
      {children}
    </RadarChart>
  </ChartContainer>
);

const desktop = {
  dataKey: "desktop",
  stroke: "var(--color-desktop)",
  fill: "var(--color-desktop)",
  fillOpacity: 0.4,
  strokeWidth: 2,
} as const;
const mobile = {
  dataKey: "mobile",
  stroke: "var(--color-mobile)",
  fill: "var(--color-mobile)",
  fillOpacity: 0.4,
  strokeWidth: 2,
} as const;

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot>
        <Radar {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Dots">
      <Plot>
        <Radar {...desktop} dot={{ r: 3, fillOpacity: 1, strokeWidth: 0 }} />
      </Plot>
    </Tile>
    <Tile title="Lines only">
      <Plot>
        <Radar {...desktop} fillOpacity={0} />
        <Radar {...mobile} fillOpacity={0} />
      </Plot>
    </Tile>
    <Tile title="Multiple">
      <Plot>
        <Radar {...desktop} />
        <Radar {...mobile} />
      </Plot>
    </Tile>
    <Tile title="Legend">
      <Plot radius="58%">
        <Radar {...desktop} />
        <Radar {...mobile} />
        <ChartLegend content={<ChartLegendContent />} />
      </Plot>
    </Tile>
    <Tile title="Circular grid">
      <Plot grid={<PolarGrid gridType="circle" />}>
        <Radar {...desktop} />
      </Plot>
    </Tile>
    <Tile title="No grid">
      <Plot grid={null}>
        <Radar {...desktop} dot={{ r: 3, fillOpacity: 1, strokeWidth: 0 }} />
      </Plot>
    </Tile>
    <Tile title="Rings without spokes">
      <Plot grid={<PolarGrid radialLines={false} />}>
        <Radar {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Value axis">
      <Plot>
        <PolarRadiusAxis
          angle={90}
          tickCount={4}
          axisLine={false}
          fontSize={10}
        />
        <Radar {...desktop} />
      </Plot>
    </Tile>
  </div>
);
