import { NativeSelect } from "woozui";

export const Example = () => (
  <div className="grid w-56 gap-3">
    <NativeSelect aria-label="Plan" defaultValue="pro">
      <option value="free">Free</option>
      <option value="pro">Pro</option>
      <option value="team">Team</option>
    </NativeSelect>
    <NativeSelect aria-label="Region" disabled defaultValue="eu">
      <option value="eu">Europe</option>
    </NativeSelect>
  </div>
);
