import { type RefObject, useEffect } from "react";

// input types whose rendered text matches their value, so it can be measured
const textual = new Set(["text", "search", "email", "url", "tel"]);
// how quickly the caret catches up with the end of the text, in ms
const lag = 35;
// caret height relative to the font size, matching the native caret
const tall = 1.2;

const properties = [
  "background-image",
  "background-size",
  "background-position",
  "background-repeat",
  "caret-color",
];

/**
 * Makes the caret glide to the end of the text instead of jumping. While it
 * moves, the native caret is hidden and a stand-in is painted as a background
 * layer; once it settles every inline style is removed. The text itself is
 * never touched: repainting it any other way changes its weight.
 */
export const useInk = (ref: RefObject<HTMLInputElement | null>) => {
  useEffect(() => {
    const input = ref.current;
    if (!input) return;

    let context: CanvasRenderingContext2D | null | undefined;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let previous = 0;
    // where the gliding caret is and where it is heading, in text px
    let edge = 0;
    let target = 0;
    let caretColor = "";
    let width = input.value.length ? Number.NaN : 0;

    const measure = (style: CSSStyleDeclaration) => {
      // created on first use, so nothing is set up for inputs never typed in
      context ??= document.createElement("canvas").getContext("2d");
      if (!context) return Number.NaN;
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
      set("background-image", `linear-gradient(${caretColor}, ${caretColor})`);
      set("background-size", `1px ${height}px`);
      set("background-position", `${x}px 50%`);
      set("background-repeat", "no-repeat");
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
        // drawn before the browser paints, so the caret never jumps ahead
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
