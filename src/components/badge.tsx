import type { ComponentProps } from "react";
import { cn, cva, type VariantProps } from "../utils";

export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-medium text-xs",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-accent text-foreground",
        outline: "border-border text-foreground",
        success: "border-success/30 bg-success/10 text-success",
        warning: "border-warning/30 bg-warning/10 text-warning",
        error: "border-error/30 bg-error/10 text-error",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export const Badge = ({ variant, className, ...props }: Badge.Props) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
);
export namespace Badge {
  export type Props = ComponentProps<"span"> &
    VariantProps<typeof badgeVariants>;
}
