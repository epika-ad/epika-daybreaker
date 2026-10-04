import type { ComponentProps } from "react";
import { ChevronRightIcon } from "../icons";
import { cn } from "../utils";
import { focusRing } from "../utils/styles";

export const Breadcrumb = ({
  className,
  children,
  ...props
}: Breadcrumb.Props) => (
  <nav aria-label="Breadcrumb" {...props}>
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-foreground-dimmed text-sm",
        className,
      )}
    >
      {children}
    </ol>
  </nav>
);
export namespace Breadcrumb {
  export type Props = ComponentProps<"nav">;
}

export const BreadcrumbItem = ({
  className,
  ...props
}: BreadcrumbItem.Props) => (
  <li
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
);
export namespace BreadcrumbItem {
  export type Props = ComponentProps<"li">;
}

export const BreadcrumbLink = ({
  className,
  ...props
}: BreadcrumbLink.Props) => (
  <a
    className={cn(
      "rounded-item transition-colors hover:text-foreground",
      focusRing,
      className,
    )}
    {...props}
  />
);
export namespace BreadcrumbLink {
  export type Props = ComponentProps<"a">;
}

/** The current page: the last item, not a link. */
export const BreadcrumbPage = ({
  className,
  ...props
}: BreadcrumbPage.Props) => (
  <span
    aria-current="page"
    className={cn("font-medium text-foreground", className)}
    {...props}
  />
);
export namespace BreadcrumbPage {
  export type Props = ComponentProps<"span">;
}

export const BreadcrumbSeparator = ({
  className,
  children,
  ...props
}: BreadcrumbSeparator.Props) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("inline-flex items-center", className)}
    {...props}
  >
    {children ?? <ChevronRightIcon className="size-3.5" />}
  </li>
);
export namespace BreadcrumbSeparator {
  export type Props = ComponentProps<"li">;
}
