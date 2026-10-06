import type { ComponentProps } from "react";
import { cn } from "../utils";

/** A placeholder for a view with nothing in it yet. */
export const Empty = ({ className, ...props }: Empty.Props) => (
  <div
    className={cn(
      "flex w-full flex-col items-center gap-2 rounded-surface border border-border border-dashed px-6 py-10 text-center",
      className,
    )}
    {...props}
  />
);
export namespace Empty {
  export type Props = ComponentProps<"div">;
}

export const EmptyMedia = ({ className, ...props }: EmptyMedia.Props) => (
  <div
    className={cn(
      "mb-2 flex size-12 items-center justify-center rounded-full bg-accent text-foreground-dimmed [&>svg]:size-6",
      className,
    )}
    {...props}
  />
);
export namespace EmptyMedia {
  export type Props = ComponentProps<"div">;
}

export const EmptyTitle = ({ className, ...props }: EmptyTitle.Props) => (
  <h3 className={cn("font-semibold text-base", className)} {...props} />
);
export namespace EmptyTitle {
  export type Props = ComponentProps<"h3">;
}

export const EmptyDescription = ({
  className,
  ...props
}: EmptyDescription.Props) => (
  <p
    className={cn("max-w-xs text-foreground-dimmed text-sm", className)}
    {...props}
  />
);
export namespace EmptyDescription {
  export type Props = ComponentProps<"p">;
}

export const EmptyActions = ({ className, ...props }: EmptyActions.Props) => (
  <div
    className={cn("mt-3 flex flex-wrap justify-center gap-2", className)}
    {...props}
  />
);
export namespace EmptyActions {
  export type Props = ComponentProps<"div">;
}
