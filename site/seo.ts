/**
 * Every page's title, description and address, in one place: the build
 * writes a real HTML file per page from these (with the right <head>, and the
 * page's text and links for crawlers that don't run JavaScript), plus the
 * sitemap; the app sets the same title and description as people move around.
 * Plain data on purpose, so the build can read it outside Vite.
 */
import { components, groups } from "./catalog";

export const origin = "https://daybreaker.epika.ad";
export const repository = "https://github.com/epika-ad/epika-daybreaker";

export type Meta = {
  title: string;
  description: string;
  /** the main heading and lines of text for the static page */
  heading: string;
  text?: string[];
  /** left out of the sitemap and search results */
  hidden?: boolean;
};

const home: Meta = {
  title: "daybreaker: accessible React components by Epika",
  description: `${components.length} accessible React components built on Base UI and Tailwind CSS v4. Free, MIT licensed, made by Epika, a creative studio in Tirana.`,
  heading: "The kit we build client work on. Now it's yours.",
  text: [
    `${components.length} accessible React components from Epika, a creative studio in Tirana. Built on Base UI, styled with Tailwind CSS v4, MIT licensed. Free, and no, there's no catch.`,
    "npm install daybreaker",
  ],
};

const figma: Meta = {
  title: "daybreaker Figma file: every component, free",
  description:
    "The daybreaker components as a Figma file you can duplicate: every component with its variants, the tokens as variables, and a foundations page.",
  heading: "Prefer to start in Figma?",
  text: [
    "The same components as a Figma file you can duplicate and make your own. Leave your email and we'll send you the link.",
  ],
};

const pages: Record<string, Meta> = {
  "/": home,
  "/components": {
    title: `${components.length} React components | daybreaker`,
    description: `Browse all ${components.length} daybreaker components: buttons, forms, overlays, navigation, data display and charts. Accessible, built on Base UI and Tailwind CSS v4.`,
    heading: `${components.length} components, ready to use`,
    text: groups.map(
      (group) =>
        `${group.name}: ${group.components.map((entry) => entry.name).join(", ")}.`,
    ),
  },
  "/docs": {
    title: "Get started with daybreaker | Install and theme",
    description:
      "Install daybreaker, add the styles and providers, use your first component, then make it yours with tokens and dark mode.",
    heading: "Get started",
    text: [
      "Install: npm install daybreaker.",
      "Add the styles, add the providers, use a component, make it yours, dark mode.",
    ],
  },
  "/figma": figma,
  "/brief": {
    ...home,
    title: "Start a project with Epika | daybreaker",
    description:
      "Epika designs product UI, websites, brand identities and design systems. Tell us about your project.",
    heading: "Start a project with Epika",
  },
  "/figma-confirmed": { ...figma, hidden: true },
  "/figma-expired": { ...figma, hidden: true },
  "/figma-error": { ...figma, hidden: true },
};

for (const entry of components) {
  pages[`/components/${entry.slug}`] = {
    title: `${entry.name}: accessible React component | daybreaker`,
    description: `${entry.description} An accessible ${entry.name} React component built on Base UI and Tailwind CSS v4. Copy the code or install daybreaker.`,
    heading: entry.name,
    text: [entry.description],
  };
}

export const routes = Object.keys(pages);

export const notFound: Meta = {
  title: "Page not found | daybreaker",
  description: "There's nothing at this address.",
  heading: "Page not found",
  hidden: true,
};

export const metaFor = (route: string): Meta => pages[route] ?? notFound;
