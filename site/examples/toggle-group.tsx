import { Toggle, ToggleGroup } from "woozui";

export const Example = () => (
  <div className="grid justify-items-center gap-4">
    <ToggleGroup defaultValue={["week"]} aria-label="Calendar view">
      <Toggle value="day">Day</Toggle>
      <Toggle value="week">Week</Toggle>
      <Toggle value="month">Month</Toggle>
    </ToggleGroup>
    <ToggleGroup multiple defaultValue={["bold"]} aria-label="Text style">
      <Toggle value="bold" aria-label="Bold" className="font-bold">
        B
      </Toggle>
      <Toggle value="italic" aria-label="Italic" className="italic">
        I
      </Toggle>
      <Toggle value="underline" aria-label="Underline" className="underline">
        U
      </Toggle>
    </ToggleGroup>
  </div>
);
