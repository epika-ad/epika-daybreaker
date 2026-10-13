import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "daybreaker/charts";
import type { ComponentProps, ReactNode } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
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

// the frame every chart here shares: grid, month axis and tooltip
const Plot = ({
  children,
  ...chart
}: ComponentProps<typeof AreaChart> & { children: ReactNode }) => (
  <ChartContainer config={config}>
    <AreaChart data={data} margin={{ top: 8, right: 20, left: 20 }} {...chart}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      {children}
    </AreaChart>
  </ChartContainer>
);

const desktop = {
  dataKey: "desktop",
  stroke: "var(--color-desktop)",
  fill: "var(--color-desktop)",
  fillOpacity: 0.3,
  strokeWidth: 2,
} as const;
const mobile = {
  dataKey: "mobile",
  stroke: "var(--color-mobile)",
  fill: "var(--color-mobile)",
  fillOpacity: 0.3,
  strokeWidth: 2,
} as const;

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot>
        <Area type="natural" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Linear">
      <Plot>
        <Area type="linear" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Step">
      <Plot>
        <Area type="step" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Stacked">
      <Plot>
        <Area type="natural" stackId="a" {...mobile} />
        <Area type="natural" stackId="a" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Stacked to 100%">
      <Plot stackOffset="expand">
        <Area type="natural" stackId="a" {...mobile} />
        <Area type="natural" stackId="a" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Gradient">
      <Plot>
        <defs>
          <linearGradient id="area-fade" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.7}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <Area
          type="natural"
          {...desktop}
          fill="url(#area-fade)"
          fillOpacity={1}
        />
      </Plot>
    </Tile>
    <Tile title="Legend">
      <Plot>
        <Area type="natural" stackId="a" {...mobile} />
        <Area type="natural" stackId="a" {...desktop} />
        <ChartLegend content={<ChartLegendContent />} />
      </Plot>
    </Tile>
    <Tile title="Value axis">
      <Plot margin={{ top: 8, right: 20, left: -16 }}>
        <YAxis tickLine={false} axisLine={false} tickCount={4} />
        <Area type="natural" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Dots">
      <Plot>
        <Area
          type="linear"
          {...desktop}
          fillOpacity={0.15}
          dot={{ r: 3, fill: "var(--color-desktop)", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </Plot>
    </Tile>
  </div>
);
