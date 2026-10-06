import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { ChevronDownIcon } from "../icons";
import { type ClassList, cn, type Styled } from "../utils";
import { focusRing } from "../utils/styles";

/** One section that expands and collapses; use Accordion for a stack of them. */
export const Collapsible = ({ className, ...props }: Collapsible.Props) => (
  <CollapsiblePrimitive.Root
    className={cn("flex w-full flex-col", className)}
    {...props}
  />
);
export namespace Collapsible {
  export type Props = Styled<CollapsiblePrimitive.Root.Props>;
}

export const CollapsibleTrigger = ({
  className,
  classList,
  children,
  ...props
}: CollapsibleTrigger.Props) => (
  <CollapsiblePrimitive.Trigger
    className={cn(
      "group flex cursor-pointer items-center justify-between gap-4 rounded-control bg-accent px-4 py-2.5 text-left font-medium text-sm transition-colors hover:bg-border data-disabled:cursor-not-allowed data-disabled:opacity-50",
      focusRing,
      className,
      classList?.trigger,
    )}
    {...props}
  >
    {children}
    <ChevronDownIcon
      className={cn(
        "text-foreground-dimmed transition-[rotate] duration-500 ease-spring group-data-panel-open:rotate-180",
        classList?.icon,
      )}
    />
  </CollapsiblePrimitive.Trigger>
);
export namespace CollapsibleTrigger {
  export type Props = Styled<CollapsiblePrimitive.Trigger.Props> & {
    classList?: ClassList<"trigger" | "icon">;
  };
}

export const CollapsiblePanel = ({
  className,
  classList,
  children,
  ...props
}: CollapsiblePanel.Props) => (
  <CollapsiblePrimitive.Panel
    className={cn(
      "h-(--collapsible-panel-height) overflow-hidden text-foreground-dimmed text-sm transition-[height] duration-400 ease-smooth data-ending-style:h-0 data-starting-style:h-0",
      classList?.panel,
    )}
    {...props}
  >
    <div className={cn("px-4 pt-3 pb-1", className, classList?.content)}>
      {children}
    </div>
  </CollapsiblePrimitive.Panel>
);
export namespace CollapsiblePanel {
  export type Props = Styled<CollapsiblePrimitive.Panel.Props> & {
    classList?: ClassList<"panel" | "content">;
  };
}
