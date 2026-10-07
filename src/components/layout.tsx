import type { ComponentProps } from "react";

/** Tells components inside it whether the interface reads left-to-right or right-to-left. */
export { DirectionProvider } from "@base-ui/react/direction-provider";

import { cn } from "../utils";

/** Keeps its content at a fixed width-to-height ratio, e.g. `16 / 9`. */
export const AspectRatio = ({
  ratio = 1,
  className,
  style,
  ...props
}: AspectRatio.Props) => (
  <div
    className={cn(
      "relative w-full overflow-hidden rounded-surface [&>img]:size-full [&>img]:object-cover [&>video]:size-full [&>video]:object-cover",
      className,
    )}
    style={{ aspectRatio: ratio, ...style }}
    {...props}
  />
);
export namespace AspectRatio {
  export type Props = ComponentProps<"div"> & {
    /** Width divided by height. */
    ratio?: number;
  };
}

/** Joins buttons into one control with shared edges. */
export const ButtonGroup = ({ className, ...props }: ButtonGroup.Props) => (
  // biome-ignore lint/a11y/useSemanticElements: a fieldset would add a form grouping this is not
  <div
    role="group"
    className={cn(
      "inline-flex w-fit *:not-first:-ml-px *:not-first:rounded-l-none *:not-last:rounded-r-none *:hover:scale-100 *:focus-visible:z-1 *:active:scale-100",
      className,
    )}
    {...props}
  />
);
export namespace ButtonGroup {
  export type Props = ComponentProps<"div">;
}

/** Text that names a control; pair it with the control's `id` via `htmlFor`. */
export const Label = ({ className, ...props }: Label.Props) => (
  // biome-ignore lint/a11y/noLabelWithoutControl: the caller supplies htmlFor or wraps the control
  <label
    className={cn(
      "font-medium text-foreground text-sm has-disabled:opacity-50",
      className,
    )}
    {...props}
  />
);
export namespace Label {
  export type Props = ComponentProps<"label">;
}
