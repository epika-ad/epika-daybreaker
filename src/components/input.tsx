import { Input as InputPrimitive } from "@base-ui/react/input";
import type { ComponentProps } from "react";
import { cn, type Styled } from "../utils";

const control =
  "w-full rounded-control border border-transparent bg-accent px-3 text-foreground text-sm outline-none transition-colors placeholder:text-foreground-dimmed focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error data-invalid:border-error";

export const Input = ({ className, ...props }: Input.Props) => (
  <InputPrimitive className={cn(control, "h-9", className)} {...props} />
);
export namespace Input {
  export type Props = Styled<InputPrimitive.Props>;
}

export const Textarea = ({ className, ...props }: Textarea.Props) => (
  <textarea className={cn(control, "min-h-20 py-2", className)} {...props} />
);
export namespace Textarea {
  export type Props = ComponentProps<"textarea">;
}
