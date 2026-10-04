// Class strings shared across components. Internal, not part of the public API.

export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const disabled =
  "data-disabled:pointer-events-none data-disabled:opacity-50";

// Translucent blurred material for floating layers, with a specular top edge.
export const glass =
  "border border-border bg-background-dimmed/75 text-foreground backdrop-blur-2xl backdrop-saturate-200 shadow-[inset_0_1px_0_rgb(255_255_255/0.6)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]";

export const popup = `${glass} origin-(--transform-origin) rounded-2xl outline-none transition-[scale,opacity] duration-150 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0`;

// Places a popup's pointer on the edge facing the trigger, overlapping the
// border so the shape in utils/arrow.tsx can cover it.
export const arrow =
  "data-[side=bottom]:-top-2.75 data-[side=top]:-bottom-2.75 data-[side=top]:rotate-180 data-[side=right]:-left-4.25 data-[side=right]:-rotate-90 data-[side=left]:-right-4.25 data-[side=left]:rotate-90";

export const backdrop =
  "fixed inset-0 z-50 bg-black/30 transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0";

export const modal = `${glass} -translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 grid w-[calc(100vw-2rem)] max-w-md gap-4 rounded-surface p-6 outline-none transition-[scale,opacity] duration-200 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0`;

export const item =
  "flex cursor-default select-none items-center gap-2 rounded-item px-3 py-2 text-sm outline-none data-disabled:pointer-events-none data-disabled:opacity-50";
