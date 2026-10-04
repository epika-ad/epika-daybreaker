import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import "../src/styles/index.css";
import { ToastProvider } from "../src/components/toast";
import { TooltipProvider } from "../src/components/tooltip";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        icon: "mirror",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;

      useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }, [theme]);

      return (
        <TooltipProvider>
          <ToastProvider>
            <Story />
          </ToastProvider>
        </TooltipProvider>
      );
    },
  ],
};

export default preview;
