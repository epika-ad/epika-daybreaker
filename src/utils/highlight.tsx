import { useEffect, useRef } from "react";

/**
 * A single highlight that glides between the items of a list popup. Render it
 * as the first child of a positioned popup whose items set `data-highlighted`.
 */
export const Highlight = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    const list = bar?.parentElement;
    if (!bar || !list) return;

    const sync = () => {
      const target = list.querySelector<HTMLElement>("[data-highlighted]");
      if (!target) {
        bar.style.opacity = "0";
        return;
      }
      // appear in place instead of sliding in from the last position
      const hidden = getComputedStyle(bar).opacity === "0";
      bar.style.transitionProperty = hidden ? "opacity" : "";
      bar.style.translate = `${target.offsetLeft}px ${target.offsetTop}px`;
      bar.style.width = `${target.offsetWidth}px`;
      bar.style.height = `${target.offsetHeight}px`;
      bar.style.opacity = "1";
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(list, {
      attributes: true,
      attributeFilter: ["data-highlighted"],
      subtree: true,
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 -z-10 rounded-item bg-accent opacity-0 transition-[translate,width,height,opacity] duration-200 ease-out motion-reduce:transition-none"
    />
  );
};
