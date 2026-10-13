import type { ComponentProps } from "react";
import { cn } from "../utils";
import { Highlight } from "../utils/highlight";
import { focusRing, glass } from "../utils/styles";

/** A floating glass bar for a site's brand, main links and actions. */
export const Navbar = ({ className, ...props }: Navbar.Props) => (
  <nav
    className={cn(
      glass,
      "flex h-14 w-full items-center justify-between gap-4 rounded-full px-2",
      className,
    )}
    {...props}
  />
);
export namespace Navbar {
  export type Props = ComponentProps<"nav">;
}

export const NavbarBrand = ({ className, ...props }: NavbarBrand.Props) => (
  <a
    className={cn(
      "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 font-semibold text-sm",
      focusRing,
      className,
    )}
    {...props}
  />
);
export namespace NavbarBrand {
  export type Props = ComponentProps<"a">;
}

/** Holds the links; a pill glides to the one marked `current`. */
export const NavbarLinks = ({
  className,
  children,
  ...props
}: NavbarLinks.Props) => (
  <div
    className={cn("relative isolate flex items-center gap-1", className)}
    {...props}
  >
    <Highlight attribute="aria-current" className="rounded-full" />
    {children}
  </div>
);
export namespace NavbarLinks {
  export type Props = ComponentProps<"div">;
}

export const NavbarLink = ({
  current = false,
  className,
  ...props
}: NavbarLink.Props) => {
  // an anchor without an href cannot be reached by keyboard, so a link that
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
        "cursor-pointer rounded-full px-3.5 py-1.5 font-medium text-foreground-dimmed text-sm transition-colors hover:text-foreground aria-[current]:text-foreground",
        focusRing,
        className,
      )}
      {...props}
    />
  );
};
export namespace NavbarLink {
  export type Props = ComponentProps<"a"> & {
    /** Marks the link for the page being viewed. */
    current?: boolean;
  };
}

export const NavbarActions = ({ className, ...props }: NavbarActions.Props) => (
  <div
    className={cn("flex shrink-0 items-center gap-1", className)}
    {...props}
  />
);
export namespace NavbarActions {
  export type Props = ComponentProps<"div">;
}
