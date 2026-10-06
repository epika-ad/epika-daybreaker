import type { ComponentProps } from "react";
import { cn } from "../utils";

/** A list of `Item`s drawn as one inset panel with hairlines between rows. */
export const ItemGroup = ({ className, ...props }: ItemGroup.Props) => (
  <div
    className={cn(
      "flex w-full flex-col overflow-hidden rounded-surface bg-background-dimmed *:not-last:border-border *:not-last:border-b",
      className,
    )}
    {...props}
  />
);
export namespace ItemGroup {
  export type Props = ComponentProps<"div">;
}

/** A row: media, a title with a description, and trailing actions. */
export const Item = ({ className, ...props }: Item.Props) => (
  <div
    className={cn("flex items-center gap-3 px-4 py-3 text-sm", className)}
    {...props}
  />
);
export namespace Item {
  export type Props = ComponentProps<"div">;
}

export const ItemMedia = ({ className, ...props }: ItemMedia.Props) => (
  <div
    className={cn(
      "flex size-9 shrink-0 items-center justify-center rounded-item bg-primary text-primary-foreground [&>svg]:size-4.5",
      className,
    )}
    {...props}
  />
);
export namespace ItemMedia {
  export type Props = ComponentProps<"div">;
}

export const ItemContent = ({ className, ...props }: ItemContent.Props) => (
  <div className={cn("grid min-w-0 flex-1 gap-0.5", className)} {...props} />
);
export namespace ItemContent {
  export type Props = ComponentProps<"div">;
}

export const ItemTitle = ({ className, ...props }: ItemTitle.Props) => (
  <p className={cn("truncate font-medium", className)} {...props} />
);
export namespace ItemTitle {
  export type Props = ComponentProps<"p">;
}

export const ItemDescription = ({
  className,
  ...props
}: ItemDescription.Props) => (
  <p className={cn("truncate text-foreground-dimmed", className)} {...props} />
);
export namespace ItemDescription {
  export type Props = ComponentProps<"p">;
}

export const ItemActions = ({ className, ...props }: ItemActions.Props) => (
  <div
    className={cn("flex shrink-0 items-center gap-2", className)}
    {...props}
  />
);
export namespace ItemActions {
  export type Props = ComponentProps<"div">;
}
