import { Checkbox } from "daybreaker";

export const Example = () => (
  <div className="grid gap-3 text-sm">
    {/* biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control */}
    <label className="flex items-center gap-2">
      <Checkbox defaultChecked />
      Email me product updates
    </label>
    {/* biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control */}
    <label className="flex items-center gap-2">
      <Checkbox indeterminate />
      Select all
    </label>
    {/* biome-ignore lint/a11y/noLabelWithoutControl: Checkbox renders the control */}
    <label className="flex items-center gap-2">
      <Checkbox />
      Remember this device
    </label>
  </div>
);
