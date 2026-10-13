import { Checkbox, Input, Label } from "daybreaker";

export const Example = () => (
  <div className="grid w-64 gap-4">
    <div className="grid gap-1.5">
      <Label htmlFor="label-example-name">Display name</Label>
      <Input id="label-example-name" placeholder="Ada Lovelace" />
    </div>
    <Label className="flex items-center gap-2 font-normal">
      <Checkbox defaultChecked />
      Show my name on my profile
    </Label>
  </div>
);
