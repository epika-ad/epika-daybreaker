import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn, cva, type Styled, type VariantProps } from "../utils";
import { disabled, focusRing } from "../utils/styles";
import { Spinner } from "./spinner";

export const buttonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium text-sm transition-colors",
    focusRing,
    disabled,
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-dimmed",
        secondary: "bg-accent text-foreground hover:bg-border",
        outline:
          "border border-border bg-background text-foreground hover:bg-accent",
        ghost: "text-foreground hover:bg-accent",
        destructive: "bg-error text-error-foreground hover:bg-error/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4",
        lg: "h-10 px-6",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export const Button = ({
  variant,
  size,
  loading = false,
  className,
  children,
  ...props
}: Button.Props) => (
  <ButtonPrimitive
    aria-busy={loading || undefined}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
    // stays focusable while loading so keyboard users keep their place
    disabled={loading || props.disabled}
    focusableWhenDisabled={loading || props.focusableWhenDisabled}
  >
    {loading && <Spinner className="size-4" />}
    {children}
  </ButtonPrimitive>
);
export namespace Button {
  export type Props = Styled<ButtonPrimitive.Props> &
    VariantProps<typeof buttonVariants> & {
      /** Shows a spinner and blocks interaction. */
      loading?: boolean;
    };
}
