import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn, type Styled } from "../utils";

export const Separator = ({
  orientation = "horizontal",
  className,
  ...props
}: Separator.Props) => (
  <SeparatorPrimitive
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch",
      className,
    )}
    {...props}
  />
);
export namespace Separator {
  export type Props = Styled<SeparatorPrimitive.Props>;
}
