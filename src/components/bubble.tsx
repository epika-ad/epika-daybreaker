import type { ComponentProps } from "react";
import { cn, cva, type VariantProps } from "../utils";

const bubbleVariants = cva(
  "relative flex w-fit max-w-[min(80%,28rem)] origin-bottom-left animate-pop-in flex-col data-[align=end]:origin-bottom-right data-[align=end]:self-end motion-reduce:animate-none",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=content]:bg-primary *:data-[slot=content]:text-primary-foreground",
        secondary: "*:data-[slot=content]:bg-accent",
        muted:
          "*:data-[slot=content]:bg-background-dimmed *:data-[slot=content]:text-foreground-dimmed",
        tinted:
          "*:data-[slot=content]:bg-primary/15 *:data-[slot=content]:text-primary",
        outline:
          "*:data-[slot=content]:border *:data-[slot=content]:border-border",
        ghost: "*:data-[slot=content]:px-0",
        destructive:
          "*:data-[slot=content]:bg-error/15 *:data-[slot=content]:text-error",
      },
    },
    defaultVariants: { variant: "secondary" },
  },
);

/**
 * One message bubble. `align="end"` puts it on the sender's side; the corner
 * nearest the speaker is tightened, like a tail.
 */
export const Bubble = ({
  variant,
  align = "start",
  className,
  ...props
}: Bubble.Props) => (
  <div
    data-align={align}
    className={cn(
      bubbleVariants({ variant }),
      align === "end"
        ? "*:data-[slot=content]:rounded-br-md"
        : "*:data-[slot=content]:rounded-bl-md",
      className,
    )}
    {...props}
  />
);
export namespace Bubble {
  export type Props = ComponentProps<"div"> &
    VariantProps<typeof bubbleVariants> & {
      /** Which side of the conversation the bubble sits on. */
      align?: "start" | "end";
    };
}

export const BubbleContent = ({ className, ...props }: BubbleContent.Props) => (
  <div
    data-slot="content"
    className={cn(
      "rounded-[1.25rem] px-3.5 py-2 text-foreground text-sm leading-relaxed",
      className,
    )}
    {...props}
  />
);
export namespace BubbleContent {
  export type Props = ComponentProps<"div">;
}

/** Emoji reactions pinned to the bubble's lower edge. */
export const BubbleReactions = ({
  className,
  ...props
}: BubbleReactions.Props) => (
  <div
    className={cn(
      "-mt-2 ml-2 flex w-fit items-center gap-0.5 rounded-full border border-border bg-background px-1.5 py-0.5 text-xs",
      className,
    )}
    {...props}
  />
);
export namespace BubbleReactions {
  export type Props = ComponentProps<"div">;
}

/** Stacks consecutive bubbles from one speaker with tight spacing. */
export const BubbleGroup = ({ className, ...props }: BubbleGroup.Props) => (
  <div className={cn("flex flex-col gap-1", className)} {...props} />
);
export namespace BubbleGroup {
  export type Props = ComponentProps<"div">;
}

/** A row in a conversation: an avatar beside a header and one or more bubbles. */
export const Message = ({
  align = "start",
  className,
  ...props
}: Message.Props) => (
  <div
    data-align={align}
    className={cn(
      "group flex w-full items-end gap-2 data-[align=end]:flex-row-reverse",
      className,
    )}
    {...props}
  />
);
export namespace Message {
  export type Props = ComponentProps<"div"> & {
    /** Which side of the conversation the message sits on. */
    align?: "start" | "end";
  };
}

export const MessageContent = ({
  className,
  ...props
}: MessageContent.Props) => (
  <div
    className={cn(
      "flex min-w-0 flex-1 flex-col gap-1 group-data-[align=end]:items-end",
      className,
    )}
    {...props}
  />
);
export namespace MessageContent {
  export type Props = ComponentProps<"div">;
}

/** The author and time above a message. */
export const MessageHeader = ({ className, ...props }: MessageHeader.Props) => (
  <p
    className={cn(
      "px-1 text-foreground-dimmed text-xs [&>strong]:font-medium [&>strong]:text-foreground",
      className,
    )}
    {...props}
  />
);
export namespace MessageHeader {
  export type Props = ComponentProps<"p">;
}

const markerVariants = cva(
  "flex items-center gap-2 text-foreground-dimmed text-xs",
  {
    variants: {
      variant: {
        default: "",
        border: "border-border border-b pb-2",
        // a centred label with a rule on either side
        separator:
          "justify-center before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

/** A status line, system note or labelled divider inside a conversation. */
export const Marker = ({ variant, className, ...props }: Marker.Props) => (
  <div className={cn(markerVariants({ variant }), className)} {...props} />
);
export namespace Marker {
  export type Props = ComponentProps<"div"> &
    VariantProps<typeof markerVariants>;
}

export const MarkerIcon = ({ className, ...props }: MarkerIcon.Props) => (
  <span
    aria-hidden="true"
    className={cn("flex shrink-0 [&>svg]:size-3.5", className)}
    {...props}
  />
);
export namespace MarkerIcon {
  export type Props = ComponentProps<"span">;
}

export const MarkerContent = ({ className, ...props }: MarkerContent.Props) => (
  <span className={cn("min-w-0", className)} {...props} />
);
export namespace MarkerContent {
  export type Props = ComponentProps<"span">;
}
