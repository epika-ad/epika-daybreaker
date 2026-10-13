import {
  Button,
  Calendar,
  CalendarIcon,
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "daybreaker";
import { useState } from "react";

export const Example = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" />}>
        <CalendarIcon />
        {date
          ? date.toLocaleDateString(undefined, { dateStyle: "long" })
          : "Pick a date"}
      </PopoverTrigger>
      <PopoverPopup className="w-fit p-3">
        <Calendar
          value={date}
          onValueChange={(picked) => {
            setDate(picked);
            setOpen(false);
          }}
        />
      </PopoverPopup>
    </Popover>
  );
};
