import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { type ClassList, cn, type Styled } from "../utils";
import { ArrowShape } from "../utils/arrow";
import { arrow, focusRing, popup } from "../utils/styles";

/** A card that previews a link on hover or focus. */
export const PreviewCard = PreviewCardPrimitive.Root;

export const PreviewCardTrigger = ({
  className,
  ...props
}: PreviewCardTrigger.Props) => (
  <PreviewCardPrimitive.Trigger
    className={cn(
      "rounded-item font-medium text-primary underline-offset-4 hover:underline",
      focusRing,
      className,
    )}
    {...props}
  />
);
export namespace PreviewCardTrigger {
  export type Props = Styled<PreviewCardPrimitive.Trigger.Props>;
}

export const PreviewCardPopup = ({
  className,
  classList,
  side,
  align,
  sideOffset = 12,
  children,
  ...props
}: PreviewCardPopup.Props) => (
  <PreviewCardPrimitive.Portal>
    <PreviewCardPrimitive.Positioner
      side={side}
      align={align}
      sideOffset={sideOffset}
      className={cn("z-50", classList?.positioner)}
    >
      <PreviewCardPrimitive.Popup
        className={cn(
          popup,
          "grid w-72 gap-2 p-4 text-sm",
          className,
          classList?.popup,
        )}
        {...props}
      >
        <PreviewCardPrimitive.Arrow className={cn(arrow, classList?.arrow)}>
          <ArrowShape />
        </PreviewCardPrimitive.Arrow>
        {children}
      </PreviewCardPrimitive.Popup>
    </PreviewCardPrimitive.Positioner>
  </PreviewCardPrimitive.Portal>
);
export namespace PreviewCardPopup {
  export type Props = Styled<PreviewCardPrimitive.Popup.Props> &
    Pick<
      PreviewCardPrimitive.Positioner.Props,
      "side" | "align" | "sideOffset"
    > & {
      classList?: ClassList<"positioner" | "popup" | "arrow">;
    };
}
