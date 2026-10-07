import type { ComponentProps, ReactNode } from "react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
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

const Plot = ({
  children,
  ...chart
}: ComponentProps<typeof LineChart> & { children: ReactNode }) => (
  <ChartContainer config={config}>
    <LineChart data={data} margin={{ top: 16, right: 20, left: 20 }} {...chart}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      {children}
    </LineChart>
  </ChartContainer>
);

const desktop = {
  dataKey: "desktop",
  stroke: "var(--color-desktop)",
  strokeWidth: 2,
  dot: false,
} as const;
const mobile = {
  dataKey: "mobile",
  stroke: "var(--color-mobile)",
  strokeWidth: 2,
  dot: false,
} as const;

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot>
        <Line type="natural" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Linear">
      <Plot>
        <Line type="linear" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Step">
      <Plot>
        <Line type="step" {...desktop} />
      </Plot>
    </Tile>
    <Tile title="Multiple">
      <Plot>
        <Line type="monotone" {...desktop} />
        <Line type="monotone" {...mobile} />
      </Plot>
    </Tile>
    <Tile title="Dots">
      <Plot>
        <Line
          type="natural"
          {...desktop}
          dot={{ r: 3, fill: "var(--color-desktop)", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </Plot>
    </Tile>
    <Tile title="Hollow dots">
      <Plot>
        <Line
          type="linear"
          {...desktop}
          dot={{ r: 4, fill: "var(--wz-background-dimmed)", strokeWidth: 2 }}
        />
      </Plot>
    </Tile>
    <Tile title="Labels">
      <Plot>
        <Line
          type="natural"
          {...desktop}
          dot={{ r: 3, fill: "var(--color-desktop)", strokeWidth: 0 }}
        >
          <LabelList
            position="top"
            offset={8}
            fontSize={11}
            className="fill-foreground"
          />
        </Line>
      </Plot>
    </Tile>
    <Tile title="Dashed comparison">
      <Plot>
        <Line type="monotone" {...desktop} />
        <Line type="monotone" {...mobile} strokeDasharray="5 5" />
      </Plot>
    </Tile>
    <Tile title="Axis and legend">
      <Plot margin={{ top: 8, right: 20, left: -16 }}>
        <YAxis tickLine={false} axisLine={false} tickCount={4} />
        <Line type="monotone" {...desktop} />
        <Line type="monotone" {...mobile} />
        <ChartLegend content={<ChartLegendContent />} />
      </Plot>
    </Tile>
  </div>
);
