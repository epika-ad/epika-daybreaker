const outline =
  "M0 10.5C5 10.5 7 8.5 9.5 5C10.8 3.1 11.2 2.5 12 2.5C12.8 2.5 13.2 3.1 14.5 5C17 8.5 19 10.5 24 10.5";

// the outline moved one pixel inward, continuing the glass's specular edge
const highlight =
  "M0 11.5C5.4 11.5 7.8 9.2 10.3 5.6C11.3 4.1 11.5 3.5 12 3.5C12.5 3.5 12.7 4.1 13.7 5.6C16.2 9.2 18.6 11.5 24 11.5";

/**
 * The pointer drawn inside a popup's arrow. It flares into the popup's edge
 * and repaints the border and highlight rows beneath it, so the two read as
 * one shape.
 */
export const ArrowShape = () => (
  <svg
    aria-hidden="true"
    width="24"
    height="12"
    viewBox="0 0 24 12"
    fill="none"
    // mixed in sRGB, the space the browser composites the popup's glass in
    className="block text-[color-mix(in_srgb,var(--wz-background-dimmed)_75%,var(--wz-background))]"
  >
    {/* stroked as well as filled, so the fill reaches the border's outer edge */}
    <path d={`${outline}V12H0Z`} className="fill-current stroke-current" />
    <path d={highlight} className="stroke-white/60 dark:stroke-white/12" />
    <path d={outline} className="stroke-border" />
  </svg>
);
