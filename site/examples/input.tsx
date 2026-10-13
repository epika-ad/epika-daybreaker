import { Input } from "daybreaker";

export const Example = () => (
  <div className="grid w-64 gap-3">
    <Input aria-label="Name" placeholder="Ada Lovelace" />
    <Input aria-label="Password" type="password" defaultValue="hunter22" />
    <Input
      aria-label="Email"
      type="email"
      defaultValue="not-an-email"
      aria-invalid
    />
    <Input aria-label="Team" defaultValue="Read only" disabled />
  </div>
);
