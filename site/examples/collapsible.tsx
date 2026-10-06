import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "woozui";

export const Example = () => (
  <Collapsible className="w-64">
    <CollapsibleTrigger>Recovery keys</CollapsibleTrigger>
    <CollapsiblePanel className="grid gap-1 font-mono">
      <span>alien-bean-pasta</span>
      <span>wild-irish-burrito</span>
      <span>horse-battery-staple</span>
    </CollapsiblePanel>
  </Collapsible>
);
