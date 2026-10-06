import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { type ClassList, cn, type Styled } from "../utils";

/** A scrolling region with a thin overlay scrollbar; give it a height. */
export const ScrollArea = ({
  className,
  classList,
  children,
  ...props
}: ScrollArea.Props) => (
  <ScrollAreaPrimitive.Root
    className={cn("relative", className, classList?.root)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      className={cn(
        "size-full rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring",
        classList?.viewport,
      )}
    >
      <ScrollAreaPrimitive.Content className={classList?.content}>
        {children}
      </ScrollAreaPrimitive.Content>
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        "pointer-events-none m-1 flex w-1.5 justify-center rounded-full opacity-0 transition-opacity duration-300 data-hovering:pointer-events-auto data-scrolling:pointer-events-auto data-hovering:opacity-100 data-scrolling:opacity-100 data-scrolling:duration-0",
        classList?.scrollbar,
      )}
    >
      <ScrollAreaPrimitive.Thumb
        className={cn(
          "w-full rounded-full bg-foreground-dimmed/60",
          classList?.thumb,
        )}
      />
    </ScrollAreaPrimitive.Scrollbar>
  </ScrollAreaPrimitive.Root>
);
export namespace ScrollArea {
  export type Props = Styled<ScrollAreaPrimitive.Root.Props> & {
    classList?: ClassList<
      "root" | "viewport" | "content" | "scrollbar" | "thumb"
    >;
  };
}
