import type { ComponentProps } from "react";
import { cn } from "../utils";

export const Card = ({ className, ...props }: Card.Props) => (
  <div
    className={cn(
      "flex flex-col gap-4 rounded-surface border border-border bg-background p-6 text-foreground shadow-sm",
      className,
    )}
    {...props}
  />
);
export namespace Card {
  export type Props = ComponentProps<"div">;
}

export const CardHeader = ({ className, ...props }: CardHeader.Props) => (
  <div className={cn("flex flex-col gap-1", className)} {...props} />
);
export namespace CardHeader {
  export type Props = ComponentProps<"div">;
}

export const CardTitle = ({ className, ...props }: CardTitle.Props) => (
  <h3
    className={cn("font-semibold text-lg leading-tight", className)}
    {...props}
  />
);
export namespace CardTitle {
  export type Props = ComponentProps<"h3">;
}

export const CardDescription = ({
  className,
  ...props
}: CardDescription.Props) => (
  <p className={cn("text-foreground-dimmed text-sm", className)} {...props} />
);
export namespace CardDescription {
  export type Props = ComponentProps<"p">;
}

export const CardContent = ({ className, ...props }: CardContent.Props) => (
  <div className={cn("text-sm", className)} {...props} />
);
export namespace CardContent {
  export type Props = ComponentProps<"div">;
}

export const CardFooter = ({ className, ...props }: CardFooter.Props) => (
  <div className={cn("flex items-center gap-2", className)} {...props} />
);
export namespace CardFooter {
  export type Props = ComponentProps<"div">;
}
