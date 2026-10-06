import { Meter } from "woozui";

export const Example = () => (
  <div className="grid w-64 gap-6">
    <Meter label="Storage" value={64} />
    <Meter label="Battery" value={18} classList={{ indicator: "bg-error" }} />
  </div>
);
