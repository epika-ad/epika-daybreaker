import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import type { ReactNode } from "react";
import { type ClassList, cn, type Styled } from "../utils";

/** A measurement within a known range, e.g. disk usage. For task completion use Progress. */
export const Meter = ({
  label,
  className,
  classList,
  ...props
}: Meter.Props) => (
  <MeterPrimitive.Root
    className={cn(
      "grid w-full grid-cols-2 gap-y-2",
      className,
      classList?.root,
    )}
    {...props}
  >
    <MeterPrimitive.Label
      className={cn("font-medium text-foreground text-sm", classList?.label)}
    >
      {label}
    </MeterPrimitive.Label>
    <MeterPrimitive.Value
      className={cn(
        "text-right text-foreground-dimmed text-sm tabular-nums",
        classList?.value,
      )}
    />
    <MeterPrimitive.Track
      className={cn(
        "col-span-2 h-2 overflow-hidden rounded-full bg-accent",
        classList?.track,
      )}
    >
      <MeterPrimitive.Indicator
        className={cn(
          "rounded-full bg-primary transition-[width] duration-500 ease-smooth",
          classList?.indicator,
        )}
      />
    </MeterPrimitive.Track>
  </MeterPrimitive.Root>
);
export namespace Meter {
  export type Props = Styled<MeterPrimitive.Root.Props> & {
    /** Names what is being measured; shown above the bar. */
    label: ReactNode;
    classList?: ClassList<"root" | "label" | "value" | "track" | "indicator">;
  };
}
