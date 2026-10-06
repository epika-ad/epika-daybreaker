import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn, cva, type Styled, type VariantProps } from "../utils";
import { disabled, focusRing } from "../utils/styles";
import { Spinner } from "./spinner";

// glossy top highlight that presses in on click; inset only, no drop shadows
const bubble =
  "shadow-[inset_0_1.5px_0_rgb(255_255_255/0.3),inset_0_-2px_0_rgb(0_0_0/0.12)] active:shadow-[inset_0_2px_4px_rgb(0_0_0/0.25)]";

export const buttonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-[14px] font-semibold text-sm",
    // springy squish: overshoots on hover, presses in on click
    "transition-[scale,background-color,box-shadow] duration-400 ease-spring hover:scale-105 active:scale-90 motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
    focusRing,
    disabled,
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground hover:bg-primary-dimmed",
          bubble,
        ],
        secondary: ["bg-accent text-foreground hover:bg-border", bubble],
        outline:
          "border border-border bg-background-dimmed/60 text-foreground backdrop-blur-xl hover:bg-accent",
        ghost: "text-foreground hover:bg-accent",
        destructive: [
          "bg-error text-error-foreground hover:bg-error/90",
          bubble,
        ],
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-9 px-5",
        lg: "h-10 px-7",
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
