import { Chart } from "woozui";

const revenue = [
  { label: "Jan", value: 12 },
  { label: "Feb", value: 19 },
  { label: "Mar", value: 15 },
  { label: "Apr", value: 27 },
  { label: "May", value: 22 },
  { label: "Jun", value: 34 },
] as const;

const euros = (value: number) => `€${value}k`;

export const Example = () => (
  <div className="grid w-full max-w-md gap-8">
    <Chart data={revenue} format={euros} aria-label="Revenue by month" />
    <Chart
      type="line"
      data={revenue}
      format={euros}
      aria-label="Revenue trend"
      className="h-32"
    />
  </div>
);
