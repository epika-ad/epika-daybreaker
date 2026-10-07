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

    let last: HTMLElement | null = null;
    // what was last applied, kept here because the browser rewrites the
    // values it stores in `style`
    let applied = "";

    // `resized` marks a layout change rather than a new target
    const sync = (resized = false) => {
      const target = list.querySelector<HTMLElement>(`[${attribute}]`);
      if (!target) {
        bar.style.opacity = "0";
        return;
      }
      // appear in place instead of sliding in from the last position, and
      // follow a target that only moved because the list was laid out again;
      // a resize that comes with a new target still glides
      const hidden = getComputedStyle(bar).opacity === "0";
      const snap = hidden || (resized && target === last);
      last = target;
      const translate = `${target.offsetLeft}px ${target.offsetTop}px`;
      const width = `${target.offsetWidth}px`;
      const height = `${target.offsetHeight}px`;
      // nothing moved: leave any glide that is under way alone
      const geometry = `${translate} ${width} ${height}`;
      if (resized && geometry === applied && !hidden) return;
      applied = geometry;
      if (snap) bar.style.transitionProperty = "opacity";
      else if (!resized) bar.style.transitionProperty = "";
      bar.style.translate = translate;
      bar.style.width = width;
      bar.style.height = height;
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
