import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "daybreaker";

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
] as const;

export const Example = () => (
  <Select items={plans} defaultValue="pro">
    <SelectTrigger aria-label="Plan" className="w-48">
      <SelectValue />
    </SelectTrigger>
    <SelectPopup>
      {plans.map((plan) => (
        <SelectItem key={plan.value} value={plan.value}>
          {plan.label}
        </SelectItem>
      ))}
    </SelectPopup>
  </Select>
);
