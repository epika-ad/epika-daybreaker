import type { ComponentProps, ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
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
  { month: "Jan", desktop: 186, mobile: 80, change: 186 },
  { month: "Feb", desktop: 305, mobile: 200, change: 205 },
  { month: "Mar", desktop: 237, mobile: 120, change: -207 },
  { month: "Apr", desktop: 73, mobile: 190, change: 173 },
  { month: "May", desktop: 209, mobile: 130, change: -109 },
  { month: "Jun", desktop: 214, mobile: 140, change: 214 },
];

// one colour per bar, taken from the row itself
const mixed = data.map((row, index) => ({
  ...row,
  fill: `var(--color-chart-${(index % 5) + 1})`,
}));

const config = {
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
  change: { label: "Change", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

const Tile = ({ title, children }: { title: string; children: ReactNode }) => (
  <figure className="rounded-surface bg-background-dimmed p-4">
    <figcaption className="mb-3 font-medium text-sm">{title}</figcaption>
    {children}
  </figure>
);

// upright bars over a month axis
const Plot = ({
  children,
  ...chart
}: ComponentProps<typeof BarChart> & { children: ReactNode }) => (
  <ChartContainer config={config}>
    <BarChart data={data} margin={{ top: 16, right: 8, left: 8 }} {...chart}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip content={<ChartTooltipContent />} />
      {children}
    </BarChart>
  </ChartContainer>
);

// bars lying on their side, months down the left
const Sideways = ({ children }: { children: ReactNode }) => (
  <ChartContainer config={config}>
    <BarChart data={data} layout="vertical" margin={{ right: 24, left: -16 }}>
      <XAxis type="number" hide />
      <YAxis
        dataKey="month"
        type="category"
        // every month, not every other one
        interval={0}
        tickLine={false}
        axisLine={false}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      {children}
    </BarChart>
  </ChartContainer>
);

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6} />
      </Plot>
    </Tile>
    <Tile title="Horizontal">
      <Sideways>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
      </Sideways>
    </Tile>
    <Tile title="Multiple">
      <Plot>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </Plot>
    </Tile>
    <Tile title="Stacked with legend">
      <Plot>
        <Bar
          dataKey="desktop"
          stackId="a"
          fill="var(--color-desktop)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="mobile"
          stackId="a"
          fill="var(--color-mobile)"
          radius={[4, 4, 0, 0]}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </Plot>
    </Tile>
    <Tile title="Labels">
      <Plot>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6}>
          <LabelList
            position="top"
            offset={6}
            fontSize={11}
            className="fill-foreground"
          />
        </Bar>
      </Plot>
    </Tile>
    <Tile title="Labels at the end">
      <Sideways>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5}>
          <LabelList
            position="right"
            offset={6}
            fontSize={11}
            className="fill-foreground"
          />
        </Bar>
      </Sideways>
    </Tile>
    <Tile title="Mixed colours">
      <Plot data={mixed}>
        <Bar dataKey="desktop" radius={6} />
      </Plot>
    </Tile>
    <Tile title="Negative values">
      <Plot>
        <Bar dataKey="change" radius={4}>
          {data.map((row) => (
            <Cell
              key={row.month}
              fill={
                row.change < 0 ? "var(--color-chart-5)" : "var(--color-chart-2)"
              }
            />
          ))}
        </Bar>
      </Plot>
    </Tile>
    <Tile title="One bar highlighted">
      <Plot>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6}>
          {data.map((row) => (
            <Cell key={row.month} fillOpacity={row.month === "Feb" ? 1 : 0.3} />
          ))}
        </Bar>
      </Plot>
    </Tile>
  </div>
);
