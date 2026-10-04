// Class strings shared across components. Internal, not part of the public API.

export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const disabled =
  "data-disabled:pointer-events-none data-disabled:opacity-50";

export const popup =
  "origin-(--transform-origin) rounded-control border border-border bg-background text-foreground shadow-lg outline-none transition-[scale,opacity] duration-150 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0";

export const backdrop =
  "fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0";

export const modal =
  "-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 grid w-[calc(100vw-2rem)] max-w-md gap-4 rounded-surface border border-border bg-background p-6 text-foreground shadow-xl outline-none transition-[scale,opacity] duration-200 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0";

export const item =
  "flex cursor-default select-none items-center gap-2 rounded-item px-2 py-1.5 text-sm outline-none data-highlighted:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50";
