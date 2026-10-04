import type { ComponentProps } from "react";
import { cn } from "../utils";

/** A placeholder block; size it with `className` to match the loading content. */
export const Skeleton = ({ className, ...props }: Skeleton.Props) => (
  <div
    aria-hidden="true"
    className={cn("animate-pulse rounded-control bg-accent", className)}
    {...props}
  />
);
export namespace Skeleton {
  export type Props = ComponentProps<"div">;
}
