import {
  Button,
  CheckIcon,
  ChevronDownIcon,
  cn,
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
  useToast,
} from "daybreaker";
import { type ComponentProps, type ReactNode, useState } from "react";
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
    <rect x="8" y="9" width="12" height="12" rx="2" />
    <path d="M4 15V5a2 2 0 0 1 2-2h10" />
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

// Epika's sunrise mark, taken from the brand's own logo
export const Logo = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="16 0 94 49"
    aria-hidden="true"
    className={cn("h-5 w-auto shrink-0 fill-brand", className)}
    {...props}
  >
    <path d="M40.5749 44.9709C40.7154 42.93 41.1262 40.9649 41.7747 39.1134C42.153 38.0198 42.6177 36.9642 43.1582 35.9518C44.0769 34.2249 45.2118 32.6387 46.5304 31.2149C47.3086 30.365 48.1571 29.58 49.0542 28.8654C50.4971 27.7123 52.086 26.7324 53.7883 25.9583C54.8259 25.4819 55.9122 25.0867 57.0254 24.7727C58.7062 24.3017 60.4733 24.0202 62.2892 23.9553C62.554 23.9444 62.8242 23.939 63.0944 23.939C63.9861 23.939 64.867 23.9932 65.7317 24.096V0H62.2838V20.5068C60.014 20.5772 57.8145 20.9399 55.723 21.5624L48.2111 2.90711L45.0172 4.20097L52.5021 22.7534C50.3836 23.7008 48.4165 24.9243 46.6439 26.3806L33.0955 12.4676L30.6311 14.8766L44.1255 28.7355C42.488 30.4787 41.0883 32.4492 39.9859 34.593L22.6815 27.2305L21.3358 30.4083L38.6078 37.7546C37.7864 40.0283 37.2784 42.4482 37.1324 44.9655H16.8125V48.414H109.484V44.9655H40.5749V44.9709Z" />
  </svg>
);

/**
 * The library's lockup: Epika's mark, a slash, and the name, the way a
 * project sits under its owner in a path.
 */
export const Wordmark = ({ className }: { className?: string }) => (
  <span className={cn("flex items-center gap-2", className)}>
    <Logo />
    <span className="hidden items-center gap-2 sm:flex">
      <span
        aria-hidden="true"
        className="h-5 w-px rotate-[20deg] rounded-full bg-foreground-dimmed/50"
      />
      <span className="font-semibold tracking-tight">
        day<span className="text-brand">breaker</span>
      </span>
    </span>
  </span>
);

// product marks, used only to label where a menu item sends you
const Mark = ({ className, d, ...props }: IconProps & { d: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={cn("size-4 shrink-0", className)}
    {...props}
  >
    <path d={d} />
  </svg>
);

export const MarkdownIcon = (props: IconProps) => (
  <Mark
    d="M22.27 19.385H1.73A1.73 1.73 0 010 17.655V6.345a1.73 1.73 0 011.73-1.73h20.54A1.73 1.73 0 0124 6.345v11.308a1.73 1.73 0 01-1.73 1.731zM5.769 15.923v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.46v7.847zM21.232 12h-2.309V8.077h-2.307V12h-2.308l3.461 4.039z"
    {...props}
  />
);

export const ClaudeIcon = (props: IconProps) => (
  <Mark
    d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"
    {...props}
  />
);

export const ChatGPTIcon = (props: IconProps) => (
  <Mark
    d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
    {...props}
  />
);

export const install = "npm install daybreaker";

// the agency behind the library
export const agency = "https://epika.ad";

export const pill =
  "rounded-full border border-border bg-background-dimmed/80 backdrop-blur-md";

export const focus =
  "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const CopyButton = ({
  text,
  label = "Copy",
  className,
}: CopyButton.Props) => {
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
      aria-label={copied ? "Copied" : label}
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
  export type Props = {
    text: string;
    /** What a screen reader calls the button; say what is copied. */
    label?: string;
    className?: string;
  };
}

/** A labelled button that copies `text`, and says so for a moment. */
export const CopyAction = ({ text, className, children }: CopyAction.Props) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button variant="outline" onClick={copy} className={className}>
      {copied ? <CheckIcon className="text-brand" /> : <CopyIcon />}
      {copied ? "Copied" : children}
    </Button>
  );
};
export namespace CopyAction {
  export type Props = { text: string; className?: string; children: ReactNode };
}

// chat apps take a prompt in the URL, but only a short one
const longest = 6000;

const assistants = [
  {
    name: "Claude",
    icon: ClaudeIcon,
    tint: "text-[#d97757]",
    url: "https://claude.ai/new?q=",
  },
  {
    name: "ChatGPT",
    icon: ChatGPTIcon,
    tint: "",
    url: "https://chatgpt.com/?q=",
  },
] as const;

/** Hands a page to an AI assistant as Markdown: copied, or opened in a chat. */
export const AgentMenu = ({ name, markdown }: AgentMenu.Props) => {
  const toast = useToast();

  const copy = () => {
    void navigator.clipboard.writeText(markdown);
    toast.add({
      type: "success",
      title: "Markdown copied",
      description: `Paste the ${name} docs into any agent.`,
    });
  };

  const open = (assistant: (typeof assistants)[number]) => {
    const ask = `Help me use the daybreaker ${name} component.`;
    const full = encodeURIComponent(`${ask}\n\n${markdown}`);
    // a page too long for the URL goes on the clipboard instead
    const fits = full.length <= longest;
    if (!fits) {
      void navigator.clipboard.writeText(markdown);
      toast.add({
        type: "info",
        title: "Markdown copied",
        description: `Paste it into ${assistant.name} with your question.`,
      });
    }
    const prompt = fits
      ? full
      : encodeURIComponent(`${ask} I will paste its docs as Markdown.`);
    window.open(`${assistant.url}${prompt}`, "_blank", "noopener");
  };

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        <MarkdownIcon />
        Copy for agents
        <ChevronDownIcon />
      </MenuTrigger>
      <MenuPopup align="start">
        <MenuItem onClick={copy}>
          <MarkdownIcon />
          Copy as Markdown
        </MenuItem>
        {assistants.map((assistant) => (
          <MenuItem key={assistant.name} onClick={() => open(assistant)}>
            <assistant.icon className={assistant.tint} />
            Open in {assistant.name}
          </MenuItem>
        ))}
      </MenuPopup>
    </Menu>
  );
};
export namespace AgentMenu {
  export type Props = { name: string; markdown: string };
}

// Enough of a grammar to colour the short TSX, CSS and shell snippets in the
// docs; the first alternative that matches at a position wins.
const grammar =
  /(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(?<string>"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`[^`]*`)|(?<keyword>\b(?:import|from|export|default|const|let|function|return|type|new|as)\b|@[\w-]+)|(?<tag>(?<=<\/?)[A-Za-z][\w.]*)|(?<property>--[\w-]+|\b[\w-]+(?==)|\b[\w-]+(?=:\s))|(?<call>^(?:npm|npx|pnpm|yarn|bun)\b|\b[A-Za-z_]\w*(?=\())|(?<number>\b\d[\w.%]*)/gm;

// token colours that have a light and a dark value, so both themes stay legible
const paint = {
  comment: "text-foreground-dimmed italic",
  string: "text-success",
  keyword: "text-primary",
  tag: "text-chart-2",
  property: "text-warning",
  call: "text-error",
  number: "text-warning",
} as const;

type Token = { text: string; kind?: keyof typeof paint };

const tokenize = (code: string) => {
  const tokens: Token[] = [];
  let end = 0;
  for (const match of code.matchAll(grammar)) {
    if (match.index > end) tokens.push({ text: code.slice(end, match.index) });
    const kind = Object.entries(match.groups ?? {}).find(
      ([, value]) => value !== undefined,
    )?.[0] as keyof typeof paint;
    tokens.push({ text: match[0], kind });
    end = match.index + match[0].length;
  }
  if (end < code.length) tokens.push({ text: code.slice(end) });
  return tokens;
};

export const CodeBlock = ({ code, className }: CodeBlock.Props) => (
  <div
    className={cn(
      "relative rounded-2xl border border-border bg-background-dimmed",
      className,
    )}
  >
    <CopyButton text={code} className="absolute top-3 right-3" />
    <pre className="overflow-x-auto p-5 pr-14 font-mono text-[13px] text-foreground leading-relaxed">
      <code>
        {tokenize(code).map((token, index) =>
          token.kind ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: tokens are positional and never reorder
            <span key={index} className={paint[token.kind]}>
              {token.text}
            </span>
          ) : (
            token.text
          ),
        )}
      </code>
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
        // an example wider than a phone scrolls sideways instead of being cut off
        "flex items-center justify-center-safe overflow-x-auto rounded-[1.25rem] border border-border bg-background p-3 [scrollbar-color:var(--wz-border)_transparent] [scrollbar-width:thin] sm:p-6",
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
