import { Button, Tooltip, TooltipPopup, TooltipTrigger } from "woozui";

export const Example = () => (
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" />}>
      Hover me
    </TooltipTrigger>
    <TooltipPopup>Saves your changes</TooltipPopup>
  </Tooltip>
);
