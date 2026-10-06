import { Input, InputGroup, InputGroupAddon, Kbd, SearchIcon } from "woozui";

export const Example = () => (
  <div className="grid w-64 gap-3">
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <Input aria-label="Search" placeholder="Search" />
      <InputGroupAddon>
        <Kbd>/</Kbd>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>https://</InputGroupAddon>
      <Input aria-label="Website" placeholder="example.com" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>€</InputGroupAddon>
      <Input aria-label="Amount" inputMode="decimal" placeholder="0.00" />
      <InputGroupAddon>EUR</InputGroupAddon>
    </InputGroup>
  </div>
);
