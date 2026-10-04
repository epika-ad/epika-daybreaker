import type { ComponentProps } from "react";
import { cn } from "../utils";

/** A keyboard key, for documenting shortcuts. */
export const Kbd = ({ className, ...props }: Kbd.Props) => (
  <kbd
    className={cn(
      "inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-border bg-background-dimmed px-1.5 font-medium font-sans text-foreground-dimmed text-xs",
      className,
    )}
    {...props}
  />
);
export namespace Kbd {
  export type Props = ComponentProps<"kbd">;
}
