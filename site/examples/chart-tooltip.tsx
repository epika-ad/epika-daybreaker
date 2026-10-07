import type { ReactElement, ReactNode } from "react";
import { Bar, BarChart, XAxis } from "recharts";
import { BellIcon, UserIcon } from "woozui";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "woozui/charts";

const data = [
  { day: "Mon", running: 450, swimming: 300 },
  { day: "Tue", running: 380, swimming: 420 },
  { day: "Wed", running: 520, swimming: 120 },
  { day: "Thu", running: 140, swimming: 550 },
  { day: "Fri", running: 600, swimming: 350 },
  { day: "Sat", running: 480, swimming: 400 },
];

const names = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
} as const;

const config = {
  running: { label: "Running", color: "var(--color-chart-1)" },
  swimming: { label: "Swimming", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

// the same series with icons, which replace the colour mark in the tooltip
const withIcons = {
  running: { ...config.running, icon: UserIcon },
  swimming: { ...config.swimming, icon: BellIcon },
} satisfies ChartConfig;

const Tile = ({ title, children }: { title: string; children: ReactNode }) => (
  <figure className="rounded-surface bg-background-dimmed p-4">
    <figcaption className="mb-3 font-medium text-sm">{title}</figcaption>
    {children}
  </figure>
);

// one stacked chart; only the tooltip differs between tiles
const Plot = ({
  tooltip,
  chart = config,
  cursor = true,
}: {
  tooltip: ReactElement;
  chart?: ChartConfig;
  cursor?: boolean;
}) => (
  <ChartContainer config={chart}>
    <BarChart data={data} margin={{ top: 8, right: 8, left: 8 }}>
      <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
      <Bar
        dataKey="running"
        stackId="a"
        fill="var(--color-running)"
        radius={[0, 0, 4, 4]}
      />
      <Bar
        dataKey="swimming"
        stackId="a"
        fill="var(--color-swimming)"
        radius={[4, 4, 0, 0]}
      />
      {/* shown open on one bar, so the styles can be compared at a glance */}
      <ChartTooltip cursor={cursor} defaultIndex={2} content={tooltip} />
    </BarChart>
  </ChartContainer>
);

export const Example = () => (
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <Tile title="Default">
      <Plot tooltip={<ChartTooltipContent />} />
    </Tile>
    <Tile title="Line indicator">
      <Plot tooltip={<ChartTooltipContent indicator="line" />} />
    </Tile>
    <Tile title="Dashed indicator">
      <Plot tooltip={<ChartTooltipContent indicator="dashed" />} />
    </Tile>
    <Tile title="No indicator">
      <Plot tooltip={<ChartTooltipContent hideIndicator />} />
    </Tile>
    <Tile title="No label">
      <Plot tooltip={<ChartTooltipContent hideLabel />} cursor={false} />
    </Tile>
    <Tile title="Full day names">
      <Plot
        tooltip={
          <ChartTooltipContent
            labelFormatter={(day) => names[day as keyof typeof names]}
          />
        }
      />
    </Tile>
    <Tile title="Units">
      <Plot
        tooltip={
          <ChartTooltipContent valueFormatter={(value) => `${value} kcal`} />
        }
      />
    </Tile>
    <Tile title="Icons">
      <Plot chart={withIcons} tooltip={<ChartTooltipContent />} />
    </Tile>
    <Tile title="With a total">
      <Plot
        tooltip={
          <ChartTooltipContent
            footer={(rows) => (
              <div className="mt-0.5 flex justify-between border-border border-t pt-1.5 font-medium">
                Total
                <span className="tabular-nums">
                  {rows.reduce((sum, row) => sum + Number(row.value ?? 0), 0)}{" "}
                  kcal
                </span>
              </div>
            )}
          />
        }
      />
    </Tile>
  </div>
);
