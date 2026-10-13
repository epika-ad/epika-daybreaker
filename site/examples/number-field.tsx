import { NumberField } from "daybreaker";

export const Example = () => (
  <div className="grid justify-items-center gap-4">
    <NumberField defaultValue={2} min={1} max={10} aria-label="Guests" />
    <NumberField
      defaultValue={25}
      step={5}
      min={0}
      format={{ style: "currency", currency: "EUR", maximumFractionDigits: 0 }}
      aria-label="Tip"
    />
    <NumberField defaultValue={3} disabled aria-label="Seats" />
  </div>
);
