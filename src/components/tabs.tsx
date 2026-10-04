import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn, type Styled } from "../utils";
import { disabled, focusRing } from "../utils/styles";

export const Tabs = ({ className, ...props }: Tabs.Props) => (
  <TabsPrimitive.Root
    className={cn("flex flex-col gap-3", className)}
    {...props}
  />
);
export namespace Tabs {
  export type Props = Styled<TabsPrimitive.Root.Props>;
}

export const TabsList = ({ className, ...props }: TabsList.Props) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex w-fit items-center gap-1 rounded-control bg-background-dimmed p-1",
      className,
    )}
    {...props}
  />
);
export namespace TabsList {
  export type Props = Styled<TabsPrimitive.List.Props>;
}

export const Tab = ({ className, ...props }: Tab.Props) => (
  <TabsPrimitive.Tab
    className={cn(
      "inline-flex h-8 cursor-pointer items-center justify-center rounded-item px-3 font-medium text-foreground-dimmed text-sm transition-colors hover:text-foreground data-active:bg-background data-active:text-foreground data-active:shadow-sm",
      focusRing,
      disabled,
      className,
    )}
    {...props}
  />
);
export namespace Tab {
  export type Props = Styled<TabsPrimitive.Tab.Props>;
}

export const TabsPanel = ({ className, ...props }: TabsPanel.Props) => (
  <TabsPrimitive.Panel
    className={cn("rounded-control text-sm", focusRing, className)}
    {...props}
  />
);
export namespace TabsPanel {
  export type Props = Styled<TabsPrimitive.Panel.Props>;
}
