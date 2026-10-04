import {
  Button,
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "woozui";

export const Example = () => (
  <Popover>
    <PopoverTrigger render={<Button variant="outline" />}>
      Storage
    </PopoverTrigger>
    <PopoverPopup>
      <PopoverTitle>Storage</PopoverTitle>
      <PopoverDescription>
        6.4 GB of 10 GB used across 3 projects.
      </PopoverDescription>
    </PopoverPopup>
  </Popover>
);
