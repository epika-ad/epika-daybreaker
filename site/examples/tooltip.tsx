import { Button, Tooltip, TooltipPopup, TooltipTrigger } from "daybreaker";

const sides = ["top", "right", "bottom", "left"] as const;

export const Example = () => (
  <div className="flex flex-wrap justify-center gap-2">
    {sides.map((side) => (
      <Tooltip key={side}>
        <TooltipTrigger render={<Button variant="outline" />}>
          {side}
        </TooltipTrigger>
        <TooltipPopup side={side}>Opens on the {side}</TooltipPopup>
      </Tooltip>
    ))}
  </div>
);
