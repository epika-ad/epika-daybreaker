import type { ComponentProps, ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { cn } from "../utils";
import { buttonVariants } from "./button";

// first, last and the pages around the current one, with gaps collapsed
const pages = (page: number, count: number) => {
  const shown = new Set([1, count, page - 1, page, page + 1]);
  const list: (number | "gap")[] = [];
  for (let number = 1; number <= count; number++) {
    if (shown.has(number)) list.push(number);
    else if (list.at(-1) !== "gap") list.push("gap");
  }
  return list;
};

export const Pagination = ({
  page,
  count,
  onPageChange,
  className,
  ...props
}: Pagination.Props) => {
  const control = (target: number, label: string, icon: ReactNode) => (
    <button
      type="button"
      aria-label={label}
      disabled={target < 1 || target > count}
      onClick={() => onPageChange(target)}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "rounded-full disabled:pointer-events-none disabled:opacity-40",
      )}
    >
      {icon}
    </button>
  );

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {control(page - 1, "Previous page", <ChevronLeftIcon />)}
      {pages(page, count).map((entry, index) =>
        entry === "gap" ? (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: a gap has no identity of its own
            key={`gap-${index}`}
            aria-hidden="true"
            className="w-6 text-center text-foreground-dimmed text-sm"
          >
            …
          </span>
        ) : (
          <button
            key={entry}
            type="button"
            aria-label={`Page ${entry}`}
            aria-current={entry === page ? "page" : undefined}
            onClick={() => onPageChange(entry)}
            className={cn(
              buttonVariants({
                variant: entry === page ? "primary" : "ghost",
                size: "icon",
              }),
              "rounded-full tabular-nums",
            )}
          >
            {entry}
          </button>
        ),
      )}
      {control(page + 1, "Next page", <ChevronRightIcon />)}
    </nav>
  );
};
export namespace Pagination {
  export type Props = Omit<ComponentProps<"nav">, "children"> & {
    /** The current page, starting at 1. */
    page: number;
    /** How many pages there are. */
    count: number;
    onPageChange: (page: number) => void;
  };
}
