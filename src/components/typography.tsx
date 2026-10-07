import type { ComponentProps } from "react";
import { ChevronDownIcon } from "../icons";
import { cn } from "../utils";

/**
 * Styles the plain HTML inside it (headings, paragraphs, lists, quotes,
 * code) as readable long-form text, e.g. rendered Markdown.
 */
export const Prose = ({ className, ...props }: Prose.Props) => (
  <div
    className={cn(
      "max-w-prose text-foreground text-sm leading-relaxed",
      "[&_h1]:font-bold [&_h1]:text-3xl [&_h1]:tracking-tight [&_h2]:mt-8 [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-base",
      "[&_p]:mt-3 [&_p]:text-foreground-dimmed [&_strong]:font-semibold [&_strong]:text-foreground",
      "[&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 [&_a]:hover:underline",
      "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1 [&_li]:text-foreground-dimmed",
      "[&_blockquote]:mt-4 [&_blockquote]:rounded-control [&_blockquote]:bg-accent [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:text-foreground",
      "[&_code]:rounded-md [&_code]:bg-accent [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]",
      "[&_hr]:my-6 [&_hr]:border-border",
      className,
    )}
    {...props}
  />
);
export namespace Prose {
  export type Props = ComponentProps<"div">;
}

/** The browser's own select, styled; best on phones and for long plain lists. */
export const NativeSelect = ({ className, ...props }: NativeSelect.Props) => (
  <span className="relative inline-flex w-full has-disabled:opacity-50">
    <select
      className={cn(
        "wz-native-select h-9 w-full cursor-pointer appearance-none rounded-control border border-transparent bg-accent pr-9 pl-3 text-foreground text-sm outline-none transition-[background-color,border-color,box-shadow] duration-200 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed aria-invalid:border-error",
        className,
      )}
      {...props}
    />
    <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-foreground-dimmed" />
  </span>
);
export namespace NativeSelect {
  export type Props = ComponentProps<"select">;
}
