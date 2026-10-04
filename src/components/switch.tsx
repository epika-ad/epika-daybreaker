import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { type ClassList, cn, type Styled } from "../utils";
import { disabled, focusRing } from "../utils/styles";

export const Switch = ({ className, classList, ...props }: Switch.Props) => (
  <SwitchPrimitive.Root
    className={cn(
      "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border bg-accent p-0.5 transition-colors data-checked:border-primary data-checked:bg-primary",
      focusRing,
      disabled,
      className,
      classList?.root,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "size-4.5 rounded-full bg-foreground-dimmed shadow-sm transition-[translate,background-color] data-checked:translate-x-5 data-checked:bg-primary-foreground",
        classList?.thumb,
      )}
    />
  </SwitchPrimitive.Root>
);
export namespace Switch {
  export type Props = Styled<SwitchPrimitive.Root.Props> & {
    classList?: ClassList<"root" | "thumb">;
  };
}
