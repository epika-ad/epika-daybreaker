import type { ComponentProps } from "react";
import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "../icons";
import { cn, cva, type VariantProps } from "../utils";

const alertVariants = cva(
  "flex w-full items-start gap-3 rounded-control border p-4 text-foreground text-sm [&>svg]:mt-0.5",
  {
    variants: {
      variant: {
        info: "border-border bg-background-dimmed [&>svg]:text-primary",
        success: "border-success/30 bg-success/10 [&>svg]:text-success",
        warning: "border-warning/30 bg-warning/10 [&>svg]:text-warning",
        error: "border-error/30 bg-error/10 [&>svg]:text-error",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

const icons = {
  info: InfoIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
  error: CircleXIcon,
} as const;

export const Alert = ({
  variant,
  className,
  children,
  ...props
}: Alert.Props) => {
  const Icon = icons[variant ?? "info"];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon />
      <div className="grid flex-1 gap-1">{children}</div>
    </div>
  );
};
export namespace Alert {
  export type Props = ComponentProps<"div"> &
    VariantProps<typeof alertVariants>;
}

export const AlertTitle = ({ className, ...props }: AlertTitle.Props) => (
  <p className={cn("font-medium leading-tight", className)} {...props} />
);
export namespace AlertTitle {
  export type Props = ComponentProps<"p">;
}

export const AlertDescription = ({
  className,
  ...props
}: AlertDescription.Props) => (
  <p className={cn("text-foreground-dimmed", className)} {...props} />
);
export namespace AlertDescription {
  export type Props = ComponentProps<"p">;
}
