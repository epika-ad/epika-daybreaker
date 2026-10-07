import { type ComponentProps, useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "../icons";
import { type ClassList, cn } from "../utils";
import { focusRing } from "../utils/styles";

// how close to the end still counts as "following the conversation"
const slack = 48;

/**
 * A chat transcript that follows new messages while the reader is at the
 * bottom, leaves them alone once they scroll up, and offers a button to jump
 * back to the latest message.
 */
export const MessageScroller = ({
  className,
  classList,
  children,
  ...props
}: MessageScroller.Props) => {
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const following = useRef(true);
  const [away, setAway] = useState(false);

  // content growing (a new message, or one still streaming) keeps the end in
  // view, but only for a reader who was already there
  useEffect(() => {
    const toEnd = (behavior: ScrollBehavior) =>
      viewport.current?.scrollTo?.({
        top: viewport.current.scrollHeight,
        behavior,
      });
    toEnd("instant");
    if (!content.current || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      if (following.current) toEnd("smooth");
    });
    observer.observe(content.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("relative", className, classList?.root)} {...props}>
      <div
        ref={viewport}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling region must be reachable by keyboard
        tabIndex={0}
        role="log"
        className={cn(
          "size-full overflow-y-auto overscroll-contain rounded-[inherit] outline-none [scrollbar-color:var(--wz-border)_transparent] [scrollbar-width:thin] focus-visible:ring-2 focus-visible:ring-ring",
          classList?.viewport,
        )}
        onScroll={(event) => {
          const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
          following.current = scrollHeight - scrollTop - clientHeight < slack;
          setAway(!following.current);
        }}
      >
        <div
          ref={content}
          className={cn("flex flex-col gap-3 p-4", classList?.content)}
        >
          {children}
        </div>
      </div>
      <button
        type="button"
        aria-label="Jump to latest message"
        // hidden from keyboard and screen readers until there is somewhere to jump
        tabIndex={away ? 0 : -1}
        aria-hidden={!away}
        className={cn(
          "absolute bottom-3 left-1/2 flex size-8 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background-dimmed/75 text-foreground backdrop-blur-xl transition-[scale,opacity] duration-400 ease-spring active:scale-85",
          !away && "pointer-events-none scale-50 opacity-0",
          focusRing,
          classList?.button,
        )}
        onClick={() =>
          viewport.current?.scrollTo?.({
            top: viewport.current.scrollHeight,
            behavior: "smooth",
          })
        }
      >
        <ArrowDownIcon />
      </button>
    </div>
  );
};
export namespace MessageScroller {
  export type Props = ComponentProps<"div"> & {
    classList?: ClassList<"root" | "viewport" | "content" | "button">;
  };
}
