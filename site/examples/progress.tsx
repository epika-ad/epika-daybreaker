import { Progress } from "daybreaker";
import { useEffect, useState } from "react";

export const Example = () => {
  const [value, setValue] = useState(20);

  // climbs and starts over, to show the bar easing between values
  useEffect(() => {
    const timer = setInterval(
      () => setValue((current) => (current >= 100 ? 0 : current + 20)),
      1200,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid w-56 gap-6">
      <div className="grid gap-2">
        <Progress value={value} aria-label="Upload" />
        <span className="text-foreground-dimmed text-sm">
          {value}% uploaded
        </span>
      </div>
      <div className="grid gap-2">
        <Progress value={null} aria-label="Connecting" />
        <span className="text-foreground-dimmed text-sm">Connecting…</span>
      </div>
    </div>
  );
};
