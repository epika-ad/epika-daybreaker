import { type ComponentProps, type ReactNode, useState } from "react";
import { CheckIcon, cn } from "woozui";
import { type Entry, example } from "./registry";
import { Thumbnail } from "./thumbnails";

type IconProps = ComponentProps<"svg">;

const Icon = ({ className, children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={cn("size-4 shrink-0", className)}
    {...props}
  >
    {children}
  </svg>
);

export const ArrowUpRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Icon>
);

export const ArrowLeftIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </Icon>
);

export const CopyIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </Icon>
);

export const ContrastIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18" />
    <path d="M12 8l6.5-2.5" />
    <path d="M12 13l8.5-3" />
    <path d="M12 18l7-2.5" />
  </Icon>
);

export const GitHubIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={cn("size-5 shrink-0", className)}
    {...props}
  >
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.14c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

export const Logo = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={cn("size-6 shrink-0", className)}
    {...props}
  >
    <rect width="24" height="24" rx="7" className="fill-brand-solid" />
    <path
      d="M5.5 8l3 8.5L12 10l3.5 6.5 3-8.5"
      fill="none"
      stroke="#111"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const pill =
  "rounded-full border border-border bg-background-dimmed/80 backdrop-blur-md";

export const focus =
  "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const CopyButton = ({ text, className }: CopyButton.Props) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy"}
      className={cn(
        "cursor-pointer rounded-md p-1.5 text-foreground-dimmed transition-colors hover:bg-accent hover:text-foreground",
        focus,
        className,
      )}
    >
      {copied ? <CheckIcon className="text-brand" /> : <CopyIcon />}
    </button>
  );
};
export namespace CopyButton {
  export type Props = { text: string; className?: string };
}

export const CodeBlock = ({ code, className }: CodeBlock.Props) => (
  <div
    className={cn(
      "relative rounded-2xl border border-border bg-background-dimmed",
      className,
    )}
  >
    <CopyButton text={code} className="absolute top-3 right-3" />
    <pre className="overflow-x-auto p-5 pr-14 font-mono text-[13px] text-foreground leading-relaxed">
      <code>{code}</code>
    </pre>
  </div>
);
export namespace CodeBlock {
  export type Props = { code: string; className?: string };
}

/** The double-framed stage a live example sits on. */
export const Stage = ({ className, children }: Stage.Props) => (
  <div className="rounded-[1.75rem] border border-border bg-background-dimmed p-2">
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-[1.25rem] border border-border bg-background p-6",
        className,
      )}
    >
      {children}
    </div>
  </div>
);
export namespace Stage {
  export type Props = { className?: string; children: ReactNode };
}

export const PreviewCard = ({ entry }: PreviewCard.Props) => {
  const found = example(entry.slug);
  if (!found) return null;

  return (
    <article className="flex flex-col rounded-[1.75rem] border border-border bg-background-dimmed p-2 transition-colors hover:border-foreground-dimmed/40">
      {/* a sketch, not the live component: the gallery is for scanning */}
      <div className="flex h-44 items-center justify-center overflow-hidden rounded-[1.25rem] border border-border bg-background p-4">
        <Thumbnail slug={entry.slug} />
      </div>
      <a
        href={`#/components/${entry.slug}`}
        className={cn(
          "group flex items-center justify-between rounded-2xl px-3 pt-3 pb-2",
          focus,
        )}
      >
        <span className="grid">
          <span className="font-semibold tracking-tight">{entry.name}</span>
          <span className="text-foreground-dimmed text-sm">
            {entry.description}
          </span>
        </span>
        <ArrowUpRightIcon className="group-hover:-translate-y-0.5 size-5 text-brand transition-transform group-hover:translate-x-0.5" />
      </a>
    </article>
  );
};
export namespace PreviewCard {
  export type Props = { entry: Entry };
}

export const SectionTitle = ({ children, count }: SectionTitle.Props) => (
  <h2 className="font-semibold text-xl tracking-tight">
    {children} <span className="text-brand">[{count}]</span>
  </h2>
);
export namespace SectionTitle {
  export type Props = { children: ReactNode; count: number };
}
