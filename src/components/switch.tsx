import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { type ClassList, cn, type Styled } from "../utils";
import { disabled, focusRing } from "../utils/styles";

export const Switch = ({ className, classList, ...props }: Switch.Props) => (
  <SwitchPrimitive.Root
    className={cn(
      "group inline-flex h-7 w-16 shrink-0 cursor-pointer items-center rounded-full bg-accent p-0.5 transition-colors data-checked:bg-primary",
      focusRing,
      disabled,
      className,
      classList?.root,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "h-6 w-9.5 rounded-full border border-black/5 bg-white transition-[translate,width] duration-300 ease-glide group-active:w-11 data-checked:translate-x-5.5 data-checked:group-active:translate-x-4",
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
