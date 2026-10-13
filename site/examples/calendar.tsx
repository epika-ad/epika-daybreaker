import { Calendar } from "daybreaker";

export const Example = () => (
  <Calendar
    defaultValue={new Date()}
    className="rounded-surface bg-background-dimmed p-3"
  />
);
