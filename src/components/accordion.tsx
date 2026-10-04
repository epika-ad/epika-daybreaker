import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "../icons";
import { type ClassList, cn, type Styled } from "../utils";
import { focusRing } from "../utils/styles";

export const Accordion = ({ className, ...props }: Accordion.Props) => (
  <AccordionPrimitive.Root
    className={cn("flex w-full flex-col", className)}
    {...props}
  />
);
export namespace Accordion {
  export type Props = Styled<AccordionPrimitive.Root.Props>;
}

export const AccordionItem = ({ className, ...props }: AccordionItem.Props) => (
  <AccordionPrimitive.Item
    className={cn("border-border border-b", className)}
    {...props}
  />
);
export namespace AccordionItem {
  export type Props = Styled<AccordionPrimitive.Item.Props>;
}

export const AccordionTrigger = ({
  className,
  classList,
  children,
  ...props
}: AccordionTrigger.Props) => (
  <AccordionPrimitive.Header className={cn("flex", classList?.header)}>
    <AccordionPrimitive.Trigger
      className={cn(
        "group flex flex-1 cursor-pointer items-center justify-between gap-4 rounded-item py-4 text-left font-medium text-sm data-disabled:cursor-not-allowed data-disabled:opacity-50",
        focusRing,
        className,
        classList?.trigger,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          "text-foreground-dimmed transition-transform group-data-panel-open:rotate-180",
          classList?.icon,
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
export namespace AccordionTrigger {
  export type Props = Styled<AccordionPrimitive.Trigger.Props> & {
    classList?: ClassList<"header" | "trigger" | "icon">;
  };
}

export const AccordionPanel = ({
  className,
  classList,
  children,
  ...props
}: AccordionPanel.Props) => (
  <AccordionPrimitive.Panel
    className={cn(
      "h-(--accordion-panel-height) overflow-hidden text-foreground-dimmed text-sm transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0",
      classList?.panel,
    )}
    {...props}
  >
    <div className={cn("pb-4", className, classList?.content)}>{children}</div>
  </AccordionPrimitive.Panel>
);
export namespace AccordionPanel {
  export type Props = Styled<AccordionPrimitive.Panel.Props> & {
    classList?: ClassList<"panel" | "content">;
  };
}
