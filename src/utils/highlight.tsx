import { useEffect, useRef } from "react";
import { cn } from ".";

/**
 * A single highlight that glides between the items of a list. Render it as a
 * child of a positioned container; it follows whichever descendant carries
 * `attribute` (the keyboard/hover highlight by default).
 */
export const Highlight = ({
  attribute = "data-highlighted",
  className,
}: {
  attribute?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    const list = bar?.parentElement;
    if (!bar || !list) return;

    const sync = (instant = false) => {
      const target = list.querySelector<HTMLElement>(`[${attribute}]`);
      if (!target) {
        bar.style.opacity = "0";
        return;
      }
      // appear in place instead of sliding in from the last position
      const hidden = getComputedStyle(bar).opacity === "0";
      bar.style.transitionProperty = hidden || instant ? "opacity" : "";
      bar.style.translate = `${target.offsetLeft}px ${target.offsetTop}px`;
      bar.style.width = `${target.offsetWidth}px`;
      bar.style.height = `${target.offsetHeight}px`;
      bar.style.opacity = "1";
      // destructive items tint the highlight to match their text
      bar.toggleAttribute("data-destructive", "destructive" in target.dataset);
    };

    sync();
    const observer = new MutationObserver(() => sync());
    observer.observe(list, {
      attributes: true,
      attributeFilter: [attribute],
      subtree: true,
    });
    // the list is sized after it mounts, e.g. to match its trigger's width
    const resize =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(() => sync(true));
    resize?.observe(list);
    return () => {
      observer.disconnect();
      resize?.disconnect();
    };
  }, [attribute]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 left-0 -z-10 rounded-item bg-accent opacity-0 transition-[translate,width,height,opacity,background-color] duration-300 ease-glide data-destructive:bg-error/15 motion-reduce:transition-none",
        className,
      )}
    />
  );
};
