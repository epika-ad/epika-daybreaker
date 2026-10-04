import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { type ClassList, cn, type Styled } from "../utils";

/** Pass `value={null}` for an indeterminate bar. */
export const Progress = ({
  className,
  classList,
  ...props
}: Progress.Props) => (
  <ProgressPrimitive.Root
    className={cn("w-full", className, classList?.root)}
    {...props}
  >
    <ProgressPrimitive.Track
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-accent",
        classList?.track,
      )}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full rounded-full bg-primary transition-[width] duration-300 data-indeterminate:w-1/3 data-indeterminate:animate-pulse",
          classList?.indicator,
        )}
      />
    </ProgressPrimitive.Track>
  </ProgressPrimitive.Root>
);
export namespace Progress {
  export type Props = Styled<ProgressPrimitive.Root.Props> & {
    classList?: ClassList<"root" | "track" | "indicator">;
  };
}
