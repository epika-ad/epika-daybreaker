import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToastProvider, TooltipProvider } from "woozui";
import { App } from "./app";
import { components, example } from "./registry";

// every documented example must exist and render without throwing
describe("examples", () => {
  it.each(components.map((entry) => entry.slug))("renders %s", (slug) => {
    const found = example(slug);
    if (!found) throw new Error(`No example file for ${slug}`);

    const { container } = render(
      <TooltipProvider>
        <ToastProvider>
          <found.Example />
        </ToastProvider>
      </TooltipProvider>,
    );

    expect(container).not.toBeEmptyDOMElement();
  });
});

describe("site", () => {
  it.each([
    ["#/", "Solid components, styled your way."],
    ["#/components", `${components.length} components, ready to use`],
    ["#/components/dialog", "Dialog"],
    ["#/docs", "Get started"],
  ])("shows the right page for %s", (hash, heading) => {
    window.location.hash = hash;
    window.scrollTo = () => {};

    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: heading }),
    ).toBeVisible();
  });
});
