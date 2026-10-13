import { Switch } from "daybreaker";

export const Example = () => (
  <div className="grid w-56 gap-4 text-sm">
    {/* biome-ignore lint/a11y/noLabelWithoutControl: Switch renders the control */}
    <label className="flex items-center justify-between">
      Notifications
      <Switch defaultChecked />
    </label>
    {/* biome-ignore lint/a11y/noLabelWithoutControl: Switch renders the control */}
    <label className="flex items-center justify-between">
      Airplane mode
      <Switch />
    </label>
    {/* biome-ignore lint/a11y/noLabelWithoutControl: Switch renders the control */}
    <label className="flex items-center justify-between text-foreground-dimmed">
      Location (managed)
      <Switch defaultChecked disabled />
    </label>
  </div>
);
