import type { ComponentProps } from "react";
import { cn } from "../utils";

/**
 * Wraps an `Input` with addons before or after it (an icon, a unit, a
 * button), drawn as one field.
 */
export const InputGroup = ({ className, ...props }: InputGroup.Props) => (
  <div
    className={cn(
      "flex h-9 w-full items-center gap-2 rounded-control border border-transparent bg-accent px-3 transition-[background-color,border-color,box-shadow] duration-200 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30 has-disabled:opacity-50 has-aria-invalid:border-error",
      // the input inside gives up its own chrome to the group
      "[&_input]:h-full [&_input]:min-w-0 [&_input]:flex-1 [&_input]:rounded-none [&_input]:border-0 [&_input]:bg-transparent [&_input]:px-0 [&_input]:ring-0 [&_input]:disabled:opacity-100",
      className,
    )}
    {...props}
  />
);
export namespace InputGroup {
  export type Props = ComponentProps<"div">;
}

export const InputGroupAddon = ({
  className,
  ...props
}: InputGroupAddon.Props) => (
  <span
    className={cn(
      "flex shrink-0 select-none items-center text-foreground-dimmed text-sm",
      className,
    )}
    {...props}
  />
);
export namespace InputGroupAddon {
  export type Props = ComponentProps<"span">;
}
