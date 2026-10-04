import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn, cva, type Styled, type VariantProps } from "../utils";

const avatarVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-accent align-middle font-medium text-foreground",
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-14 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const Avatar = ({ size, className, ...props }: Avatar.Props) => (
  <AvatarPrimitive.Root
    className={cn(avatarVariants({ size }), className)}
    {...props}
  />
);
export namespace Avatar {
  export type Props = Styled<AvatarPrimitive.Root.Props> &
    VariantProps<typeof avatarVariants>;
}

export const AvatarImage = ({ className, ...props }: AvatarImage.Props) => (
  <AvatarPrimitive.Image
    className={cn("size-full object-cover", className)}
    {...props}
  />
);
export namespace AvatarImage {
  export type Props = Styled<AvatarPrimitive.Image.Props>;
}

/** Shown while the image loads or when it fails, typically initials. */
export const AvatarFallback = ({
  className,
  ...props
}: AvatarFallback.Props) => (
  <AvatarPrimitive.Fallback
    className={cn("flex size-full items-center justify-center", className)}
    {...props}
  />
);
export namespace AvatarFallback {
  export type Props = Styled<AvatarPrimitive.Fallback.Props>;
}
