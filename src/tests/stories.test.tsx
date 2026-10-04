import { composeStories, setProjectAnnotations } from "@storybook/react-vite";
import { render } from "@testing-library/react";
import type { ComponentType } from "react";
import { describe, expect, it } from "vitest";
import preview from "../../.storybook/preview";

setProjectAnnotations(preview);

type Stories = Parameters<typeof composeStories>[0];

const files = import.meta.glob<Stories>("../stories/*.stories.tsx", {
  eager: true,
});

// every documented example must at least render without throwing
describe.each(Object.entries(files))("%s", (_path, file) => {
  const stories = composeStories(file) as Record<string, ComponentType>;

  it.each(Object.entries(stories))("renders %s", (_name, Story) => {
    const { container } = render(<Story />);

    expect(container).not.toBeEmptyDOMElement();
  });
});
