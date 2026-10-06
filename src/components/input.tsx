import { Input as InputPrimitive } from "@base-ui/react/input";
import { type ComponentProps, useImperativeHandle, useRef } from "react";
import { cn, type Styled } from "../utils";
import { useInk } from "../utils/ink";

const control =
  "w-full rounded-control border border-transparent bg-accent px-3 text-foreground text-sm caret-primary outline-none transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-foreground-dimmed focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error data-invalid:border-error";

export const Input = ({ className, ref, ...props }: Input.Props) => {
  const input = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => input.current as HTMLInputElement);
  useInk(input);

  return (
    <InputPrimitive
      ref={input}
      className={cn(control, "h-9", className)}
      {...props}
    />
  );
};
export namespace Input {
  export type Props = Styled<InputPrimitive.Props>;
}

export const Textarea = ({ className, ...props }: Textarea.Props) => (
  <textarea className={cn(control, "min-h-20 py-2", className)} {...props} />
);
export namespace Textarea {
  export type Props = ComponentProps<"textarea">;
}
