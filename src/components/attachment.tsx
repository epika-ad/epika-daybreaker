import type { ComponentProps } from "react";
import { cn } from "../utils";
import { focusRing } from "../utils/styles";
import { Spinner } from "./spinner";

/** Several attachments in a row that scrolls sideways when it runs out of room. */
export const AttachmentGroup = ({
  className,
  ...props
}: AttachmentGroup.Props) => (
  <div
    className={cn(
      "flex w-full gap-2 overflow-x-auto [scrollbar-width:none] *:shrink-0",
      className,
    )}
    {...props}
  />
);
export namespace AttachmentGroup {
  export type Props = ComponentProps<"div">;
}

/**
 * A file or image with its name, details and actions. `state` shows where an
 * upload has got to.
 */
export const Attachment = ({
  state = "idle",
  orientation = "horizontal",
  className,
  ...props
}: Attachment.Props) => (
  <div
    data-state={state}
    data-orientation={orientation}
    className={cn(
      "group relative flex w-64 max-w-full animate-pop-in items-center gap-3 rounded-control bg-accent p-2 text-sm transition-colors data-[orientation=vertical]:w-36 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[state=error]:bg-error/15 motion-reduce:animate-none",
      className,
    )}
    {...props}
  />
);
export namespace Attachment {
  export type Props = ComponentProps<"div"> & {
    state?: "idle" | "uploading" | "processing" | "error" | "done";
    /** Vertical stacks the preview above the text, for image tiles. */
    orientation?: "horizontal" | "vertical";
  };
}

/** The icon or image preview; shows a spinner over itself while uploading. */
export const AttachmentMedia = ({
  className,
  children,
  ...props
}: AttachmentMedia.Props) => (
  <div
    className={cn(
      "relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-item bg-background text-foreground-dimmed group-data-[orientation=vertical]:aspect-square group-data-[orientation=vertical]:size-auto group-data-[state=error]:text-error dark:bg-white/10 [&>img]:size-full [&>img]:object-cover [&>svg]:size-5",
      className,
    )}
    {...props}
  >
    {children}
    <span className="absolute inset-0 hidden items-center justify-center bg-background/70 text-foreground group-data-[state=processing]:flex group-data-[state=uploading]:flex">
      <Spinner className="size-4" />
    </span>
  </div>
);
export namespace AttachmentMedia {
  export type Props = ComponentProps<"div">;
}

export const AttachmentContent = ({
  className,
  ...props
}: AttachmentContent.Props) => (
  <div className={cn("grid min-w-0 flex-1", className)} {...props} />
);
export namespace AttachmentContent {
  export type Props = ComponentProps<"div">;
}

export const AttachmentTitle = ({
  className,
  ...props
}: AttachmentTitle.Props) => (
  <p className={cn("truncate font-medium", className)} {...props} />
);
export namespace AttachmentTitle {
  export type Props = ComponentProps<"p">;
}

export const AttachmentDescription = ({
  className,
  ...props
}: AttachmentDescription.Props) => (
  <p
    className={cn(
      "truncate text-foreground-dimmed text-xs group-data-[state=error]:text-error",
      className,
    )}
    {...props}
  />
);
export namespace AttachmentDescription {
  export type Props = ComponentProps<"p">;
}

export const AttachmentActions = ({
  className,
  ...props
}: AttachmentActions.Props) => (
  <div
    className={cn(
      "flex shrink-0 items-center gap-1 group-data-[orientation=vertical]:absolute group-data-[orientation=vertical]:top-3 group-data-[orientation=vertical]:right-3",
      className,
    )}
    {...props}
  />
);
export namespace AttachmentActions {
  export type Props = ComponentProps<"div">;
}

export const AttachmentAction = ({
  className,
  ...props
}: AttachmentAction.Props) => (
  <button
    type="button"
    className={cn(
      "flex size-7 cursor-pointer items-center justify-center rounded-full text-foreground-dimmed transition-[scale,background-color,color] duration-400 ease-spring hover:bg-border hover:text-foreground active:scale-85 group-data-[orientation=vertical]:bg-background/80 [&>svg]:size-3.5",
      focusRing,
      className,
    )}
    {...props}
  />
);
export namespace AttachmentAction {
  export type Props = ComponentProps<"button">;
}
