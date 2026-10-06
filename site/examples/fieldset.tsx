import { Checkbox, CheckboxGroup, Fieldset, FieldsetLegend } from "woozui";

const channels = ["Email", "Push notifications", "SMS"] as const;

export const Example = () => (
  <Fieldset>
    <FieldsetLegend>Notify me by</FieldsetLegend>
    <CheckboxGroup defaultValue={["Email"]}>
      {channels.map((channel) => (
        // biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control
        <label key={channel} className="flex items-center gap-2 text-sm">
          <Checkbox value={channel} />
          {channel}
        </label>
      ))}
    </CheckboxGroup>
  </Fieldset>
);
