import type { ComponentProps } from "react";
import { cn } from "../utils";
import { Highlight } from "../utils/highlight";
import { focusRing } from "../utils/styles";

/** A vertical navigation panel; a pill glides to the item marked `current`. */
export const Sidebar = ({ className, children, ...props }: Sidebar.Props) => (
  <aside
    className={cn(
      "relative isolate flex w-60 flex-col gap-4 rounded-surface bg-background-dimmed p-2",
      className,
    )}
    {...props}
  >
    <Highlight attribute="aria-current" />
    {children}
  </aside>
);
export namespace Sidebar {
  export type Props = ComponentProps<"aside">;
}

export const SidebarGroup = ({ className, ...props }: SidebarGroup.Props) => (
  <div className={cn("flex flex-col gap-0.5", className)} {...props} />
);
export namespace SidebarGroup {
  export type Props = ComponentProps<"div">;
}

export const SidebarGroupLabel = ({
  className,
  ...props
}: SidebarGroupLabel.Props) => (
  <p
    className={cn(
      "px-3 py-1.5 font-medium text-foreground-dimmed text-xs",
      className,
    )}
    {...props}
  />
);
export namespace SidebarGroupLabel {
  export type Props = ComponentProps<"p">;
}

export const SidebarItem = ({
  current = false,
  className,
  ...props
}: SidebarItem.Props) => {
  // an anchor without an href cannot be reached by keyboard, so an item that
  // only has a click handler is exposed as a button
  const action = props.href === undefined;
  return (
    <a
      {...(action && {
        role: "button",
        tabIndex: 0,
        onKeyDown: (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          event.currentTarget.click();
        },
      })}
      aria-current={current ? "page" : undefined}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-item px-3 py-2 font-medium text-foreground-dimmed text-sm transition-colors hover:text-foreground aria-[current]:text-foreground [&>svg]:size-4.5",
        focusRing,
        className,
      )}
      {...props}
    />
  );
};
export namespace SidebarItem {
  export type Props = ComponentProps<"a"> & {
    /** Marks the item for the page being viewed. */
    current?: boolean;
  };
}
