import { Radio, RadioGroup } from "woozui";

const periods = ["Monthly", "Yearly", "Lifetime"] as const;

export const Example = () => (
  <RadioGroup defaultValue="Yearly" aria-label="Billing period">
    {periods.map((period) => (
      // biome-ignore lint/a11y/noLabelWithoutControl: Radio renders the control
      <label key={period} className="flex items-center gap-2 text-sm">
        <Radio value={period} />
        {period}
      </label>
    ))}
  </RadioGroup>
);
