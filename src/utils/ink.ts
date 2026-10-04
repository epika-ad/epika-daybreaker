import { type RefObject, useEffect } from "react";

// input types whose rendered text matches their value, so it can be measured
const textual = new Set(["text", "search", "email", "url", "tel"]);
// how quickly the caret catches up with the end of the text, in ms
const lag = 80;
// caret height relative to the font size, matching the native caret
const tall = 1.2;

const properties = [
  "background-image",
  "background-clip",
  "-webkit-background-clip",
  "background-size",
  "background-position",
  "background-repeat",
  "-webkit-text-fill-color",
  "caret-color",
];

/**
 * Makes the caret glide instead of jump, writing text out as it passes. While
 * it moves, the native caret is hidden, a stand-in is painted as a background
 * layer, and the text is clipped to what the caret has reached; once it
 * settles every inline style is removed and the input is native again.
 */
export const useInk = (ref: RefObject<HTMLInputElement | null>) => {
  useEffect(() => {
    const input = ref.current;
    if (!input || typeof CSS === "undefined") return;
    if (!CSS.supports?.("background-clip", "text")) return;

    const context = document.createElement("canvas").getContext("2d");
    if (!context) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let previous = 0;
    // where the gliding caret is and where it is heading, in text px
    let edge = 0;
    let target = 0;
    let caretColor = "";
    let width = input.value.length ? Number.NaN : 0;

    const measure = (style: CSSStyleDeclaration) => {
      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      if ("letterSpacing" in context) {
        context.letterSpacing = style.letterSpacing;
      }
      return context.measureText(input.value).width;
    };

    const settle = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      for (const property of properties) input.style.removeProperty(property);
    };

    const draw = (style: CSSStyleDeclaration) => {
      const x = Number.parseFloat(style.paddingLeft) - input.scrollLeft + edge;
      const height = Number.parseFloat(style.fontSize) * tall;
      const set = (property: string, value: string) =>
        input.style.setProperty(property, value);
      // layers: the caret, the text written so far, and a blank one that keeps
      // the field's own fill clipped to its box
      set(
        "background-image",
        `linear-gradient(${caretColor}, ${caretColor}), linear-gradient(to right, currentColor ${x}px, transparent ${x + 1}px), linear-gradient(transparent, transparent)`,
      );
      set("-webkit-background-clip", "border-box, text, border-box");
      set("background-clip", "border-box, text, border-box");
      set("background-size", `1px ${height}px, auto, auto`);
      set("background-position", `${x}px 50%, 0 0, 0 0`);
      set("background-repeat", "no-repeat, repeat, repeat");
      set("-webkit-text-fill-color", "transparent");
      set("caret-color", "transparent");
    };

    const step = (now: number) => {
      edge += (target - edge) * (1 - Math.exp(-(now - previous) / lag));
      previous = now;
      if (Math.abs(target - edge) < 0.5) return settle();

      draw(getComputedStyle(input));
      frame = requestAnimationFrame(step);
    };

    const onInput = (event: Event) => {
      const style = getComputedStyle(input);
      const before = width;
      width = measure(style);

      const { inputType } = event as InputEvent;
      const caret = input.selectionStart ?? input.value.length;
      const glides =
        textual.has(input.type) &&
        !still.matches &&
        (inputType?.startsWith("insert") || inputType?.startsWith("delete")) &&
        caret === input.value.length &&
        style.direction === "ltr" &&
        (style.textAlign === "start" || style.textAlign === "left") &&
        width !== before;
      if (!glides) return settle();

      if (!frame) {
        edge = before;
        previous = performance.now();
        caretColor = style.caretColor;
        // drawn before the browser paints, so the new text never flashes in
        draw(style);
        frame = requestAnimationFrame(step);
      }
      target = width;
    };

    input.addEventListener("input", onInput);
    return () => {
      input.removeEventListener("input", onInput);
      settle();
    };
  }, [ref]);
};
