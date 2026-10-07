import { OTPField as OtpFieldPrimitive } from "@base-ui/react/otp-field";
import { useEffect, useImperativeHandle, useRef } from "react";
import { type ClassList, cn, type Styled } from "../utils";

// ms between one box starting its animation and the next
const stagger = 55;

const Badge = ({
  status,
  delay,
}: {
  status: "success" | "error";
  delay: number;
}) => (
  <span
    aria-hidden="true"
    className={cn(
      "absolute top-1/2 left-full ml-3 flex size-7 -translate-y-1/2 animate-pop-in items-center justify-center rounded-full text-background motion-reduce:animate-none",
      status === "success" ? "bg-success" : "bg-error",
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      {/* each stroke is drawn in after the badge lands */}
      {(status === "success"
        ? ["M20 6 9 17l-5-5"]
        : ["M18 6 6 18", "m6 6 12 12"]
      ).map((path, index) => (
        <path
          key={path}
          d={path}
          pathLength={1}
          className="animate-draw [stroke-dasharray:1] motion-reduce:animate-none"
          style={{ animationDelay: `${delay + 180 + index * 140}ms` }}
        />
      ))}
    </svg>
  </span>
);

/**
 * One box per character of a one-time code; pasting fills them all. Set
 * `status` once the code has been checked: "success" sends a wave through the
 * boxes, "error" shakes them.
 */
export const OtpField = ({
  length = 6,
  status = "idle",
  className,
  classList,
  ref,
  ...props
}: OtpField.Props) => {
  const root = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => root.current as HTMLDivElement);

  // a verdict takes focus off the boxes so nothing competes with its colours;
  // going back to idle hands focus to the first box for another try
  const settled = useRef(false);
  useEffect(() => {
    const boxes = root.current?.querySelectorAll("input");
    if (status !== "idle") {
      settled.current = true;
      for (const box of boxes ?? []) box.blur();
    } else if (settled.current) {
      settled.current = false;
      boxes?.[0]?.focus();
    }
  }, [status]);

  return (
    <OtpFieldPrimitive.Root
      ref={root}
      length={length}
      data-status={status}
      className={cn(
        "group relative flex w-fit gap-2 data-[status=error]:animate-otp-shake motion-reduce:animate-none",
        className,
        classList?.root,
      )}
      {...props}
    >
      {Array.from({ length }, (_, index) => (
        <OtpFieldPrimitive.Input
          // biome-ignore lint/suspicious/noArrayIndexKey: the boxes are positional and never reorder
          key={index}
          // the first box takes the field's own label
          aria-label={
            index === 0 ? undefined : `Character ${index + 1} of ${length}`
          }
          className={cn(
            "size-11 rounded-control border border-transparent bg-accent text-center font-semibold text-foreground text-lg caret-primary outline-none transition-[scale,color,background-color,border-color,box-shadow] duration-400 ease-spring focus:scale-105 focus:border-ring focus:ring-2 focus:ring-ring/30 data-disabled:opacity-50 data-invalid:border-error",
            "group-data-[status=success]:animate-otp-success group-data-[status=success]:border-success group-data-[status=success]:bg-success/15 group-data-[status=success]:text-success group-data-[status=success]:ring-0 group-data-[status=success]:selection:bg-transparent",
            "group-data-[status=error]:animate-otp-reject group-data-[status=error]:border-error group-data-[status=error]:bg-error/15 group-data-[status=error]:text-error group-data-[status=error]:ring-0 group-data-[status=error]:selection:bg-transparent",
            "motion-reduce:animate-none",
            classList?.input,
          )}
          // the colour change and the jump travel along the row together
          style={
            status === "idle"
              ? undefined
              : {
                  animationDelay: `${index * stagger}ms`,
                  transitionDelay: `${index * stagger}ms`,
                }
          }
        />
      ))}
      {status !== "idle" && (
        <Badge key={status} status={status} delay={length * stagger + 120} />
      )}
    </OtpFieldPrimitive.Root>
  );
};
export namespace OtpField {
  export type Props = Omit<Styled<OtpFieldPrimitive.Root.Props>, "length"> & {
    /** How many characters the code has. */
    length?: number;
    /** The result of checking the code; plays the matching animation. */
    status?: "idle" | "success" | "error";
    classList?: ClassList<"root" | "input">;
  };
}
