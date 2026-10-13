import { Slider } from "daybreaker";

export const Example = () => (
  <div className="grid w-56 gap-6">
    <Slider defaultValue={40} aria-label="Volume" />
    <Slider defaultValue={[20, 70]} aria-label="Price range" />
  </div>
);
