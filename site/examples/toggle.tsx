import { Toggle } from "daybreaker";

export const Example = () => (
  <div className="flex gap-1">
    <Toggle aria-label="Bold" defaultPressed className="font-bold">
      B
    </Toggle>
    <Toggle aria-label="Italic" className="italic">
      I
    </Toggle>
    <Toggle aria-label="Underline" className="underline">
      U
    </Toggle>
  </div>
);
