import {
  Button,
  DirectionProvider,
  Slider,
  Switch,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
} from "daybreaker";
import { useState } from "react";

export const Example = () => {
  const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");

  return (
    <div className="grid w-64 gap-5">
      <Button
        variant="outline"
        onClick={() => setDirection(direction === "rtl" ? "ltr" : "rtl")}
      >
        Switch to {direction === "rtl" ? "left-to-right" : "right-to-left"}
      </Button>
      {/* the provider tells components which way arrow keys and sliders run;
          `dir` lays the content out that way */}
      <DirectionProvider direction={direction}>
        <div dir={direction} className="grid gap-5">
          <Tabs defaultValue="one">
            <TabsList>
              <Tab value="one">الأول</Tab>
              <Tab value="two">الثاني</Tab>
              <Tab value="three">الثالث</Tab>
            </TabsList>
            <TabsPanel value="one">
              Arrow keys follow the reading direction.
            </TabsPanel>
            <TabsPanel value="two">Second panel.</TabsPanel>
            <TabsPanel value="three">Third panel.</TabsPanel>
          </Tabs>
          <Slider defaultValue={30} aria-label="Volume" />
          {/* biome-ignore lint/a11y/noLabelWithoutControl: Switch renders the control */}
          <label className="flex items-center justify-between text-sm">
            الإشعارات
            <Switch defaultChecked />
          </label>
        </div>
      </DirectionProvider>
    </div>
  );
};
