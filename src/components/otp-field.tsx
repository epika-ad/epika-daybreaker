import { OTPField as OtpFieldPrimitive } from "@base-ui/react/otp-field";
import { type ClassList, cn, type Styled } from "../utils";

/** One box per character of a one-time code; pasting fills them all. */
export const OtpField = ({
  length = 6,
  className,
  classList,
  ...props
}: OtpField.Props) => (
  <OtpFieldPrimitive.Root
    length={length}
    className={cn("flex w-fit gap-2", className, classList?.root)}
    {...props}
  >
    {Array.from({ length }, (_, index) => (
      <OtpFieldPrimitive.Input
        // biome-ignore lint/suspicious/noArrayIndexKey: the boxes are positional and never reorder
        key={index}
        aria-label={`Character ${index + 1} of ${length}`}
        className={cn(
          "size-11 rounded-control border border-transparent bg-accent text-center font-semibold text-foreground text-lg caret-primary outline-none transition-[scale,background-color,border-color,box-shadow] duration-400 ease-spring focus:scale-105 focus:border-ring focus:ring-2 focus:ring-ring/30 data-disabled:opacity-50 data-invalid:border-error",
          classList?.input,
        )}
      />
    ))}
  </OtpFieldPrimitive.Root>
);
export namespace OtpField {
  export type Props = Omit<Styled<OtpFieldPrimitive.Root.Props>, "length"> & {
    /** How many characters the code has. */
    length?: number;
    classList?: ClassList<"root" | "input">;
  };
}
