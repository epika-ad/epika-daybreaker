import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { type ClassList, cn, type Styled } from "../utils";
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

export const TabsList = ({
  className,
  classList,
  children,
  ...props
}: TabsList.Props) => (
  <TabsPrimitive.List
    className={cn(
      "relative inline-flex w-fit items-center gap-1 rounded-full bg-accent p-1",
      className,
      classList?.list,
    )}
    {...props}
  >
    {children}
    {/* one pill that springs to the active tab, instead of each tab filling in */}
    <TabsPrimitive.Indicator
      className={cn(
        "absolute top-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) translate-y-(--active-tab-top) rounded-full bg-background transition-[translate,width] duration-400 ease-glide dark:bg-white/20",
        classList?.indicator,
      )}
    />
  </TabsPrimitive.List>
);
export namespace TabsList {
  export type Props = Styled<TabsPrimitive.List.Props> & {
    classList?: ClassList<"list" | "indicator">;
  };
}

export const Tab = ({ className, ...props }: Tab.Props) => (
  <TabsPrimitive.Tab
    className={cn(
      "relative z-1 inline-flex h-8 cursor-pointer items-center justify-center rounded-full px-4 font-medium text-foreground-dimmed text-sm transition-colors hover:text-foreground data-active:text-foreground",
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
