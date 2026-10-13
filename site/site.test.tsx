import { render, screen, within } from "@testing-library/react";
import { ToastProvider, TooltipProvider } from "daybreaker";
import { describe, expect, it } from "vitest";
import { App } from "./app";
import { components, example } from "./registry";
import { hasThumbnail } from "./thumbnails";

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

// the gallery shows a sketch per component; a new component needs one too
describe("thumbnails", () => {
  it("has a sketch for every component", () => {
    const missing = components
      .map((entry) => entry.slug)
      .filter((slug) => !hasThumbnail(slug));

    expect(missing).toEqual([]);
  });
});

describe("site", () => {
  it.each([
    ["#/", "The foundation for every Epika interface."],
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

  it("links to the agency's site from the home page", () => {
    window.location.hash = "#/";
    window.scrollTo = () => {};

    render(<App />);

    expect(
      screen.getByRole("link", { name: "Work with Epika" }),
    ).toHaveAttribute("href", "https://epika.ad");
  });

  it("lets a card on the home page hand over its component's code", () => {
    window.location.hash = "#/";
    window.scrollTo = () => {};

    render(<App />);

    expect(
      screen.getByRole("button", { name: "Copy Calendar code" }),
    ).toBeInTheDocument();
  });

  it("offers the code to copy instead of printing it", () => {
    window.location.hash = "#/components/dialog";
    window.scrollTo = () => {};

    const { container } = render(<App />);

    expect(screen.getByRole("button", { name: "Copy code" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Copy for agents" }),
    ).toBeVisible();
    expect(container.querySelector("pre")).toBeNull();
  });

  it("lists every component in the sidebar and marks the current one", () => {
    window.location.hash = "#/components/dialog";
    window.scrollTo = () => {};

    render(<App />);

    const sidebar = screen.getByRole("complementary", {
      name: "Documentation",
    });
    for (const entry of components) {
      expect(
        within(sidebar).getByRole("link", { name: entry.name }),
      ).toHaveAttribute("href", `#/components/${entry.slug}`);
    }
    expect(
      within(sidebar).getByRole("link", { current: "page" }),
    ).toHaveTextContent("Dialog");
  });
});
