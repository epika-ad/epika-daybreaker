import type { ComponentProps } from "react";
import { cn } from "../utils";

export const Spinner = ({
  label = "Loading",
  className,
  ...props
}: Spinner.Props) => (
  <svg
    role="status"
    aria-label={label}
    viewBox="0 0 24 24"
    fill="none"
    className={cn("size-5 shrink-0 animate-spin", className)}
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth={3}
      className="opacity-25"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
    />
  </svg>
);
export namespace Spinner {
  export type Props = ComponentProps<"svg"> & {
    /** Accessible name announced by screen readers. */
    label?: string;
  };
}
