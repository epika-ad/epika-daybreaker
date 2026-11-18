/**
 * After the build: one HTML file per page (dist/components/dialog/index.html,
 * …), each with its own title, description, canonical address and social
 * tags, and the page's heading, text and links inside #root for crawlers that
 * don't run JavaScript (React replaces it on load). Also the sitemap,
 * robots.txt, and a 404 page that search engines are told to skip.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";
import { components, groups } from "./catalog";
import {
  type Meta,
  metaFor,
  notFound,
  origin,
  repository,
  routes,
} from "./seo";

const html = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] ?? c,
  );

const structured = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      name: "daybreaker",
      description: metaFor("/").description,
      url: origin,
      codeRepository: repository,
      programmingLanguage: ["TypeScript", "React"],
      license: "https://opensource.org/licenses/MIT",
      isAccessibleForFree: true,
      author: { "@id": "https://epika.ad/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://epika.ad/#organization",
      name: "Epika",
      url: "https://epika.ad",
      email: "info@epika.ad",
      address: { "@type": "PostalAddress", addressLocality: "Tirana" },
    },
  ],
}).replace(/</g, "\\u003c");

const links = [
  ["/", "Home"],
  ["/components", "Components"],
  ["/docs", "Docs"],
  ["/figma", "Figma file"],
  [repository, "GitHub"],
];

const body = (route: string, meta: Meta) => {
  const list =
    route === "/components" || route.startsWith("/components/")
      ? groups
          .map(
            (group) =>
              `<h2>${html(group.name)}</h2><ul>${group.components
                .map(
                  (entry) =>
                    `<li><a href="/components/${entry.slug}">${html(entry.name)}</a>: ${html(entry.description)}</li>`,
                )
                .join("")}</ul>`,
          )
          .join("")
      : "";
  return [
    `<div class="prerender">`,
    `<nav>${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join(" ")}</nav>`,
    `<main><h1>${html(meta.heading)}</h1>`,
    ...(meta.text ?? []).map((line) => `<p>${html(line)}</p>`),
    list,
    `</main></div>`,
  ].join("");
};

const page = (template: string, route: string, meta: Meta) => {
  const url = route === "/" ? `${origin}/` : `${origin}${route}`;
  const head = [
    meta.hidden
      ? `<meta name="robots" content="noindex" />`
      : `<link rel="canonical" href="${url}" />
    <meta property="og:url" content="${url}" />`,
    route === "/"
      ? `<script type="application/ld+json">${structured}</script>`
      : "",
  ].join("\n    ");
  const swap = (pattern: RegExp, value: string) => (text: string) =>
    text.replace(
      pattern,
      (_, start: string, end: string) => start + value + end,
    );
  return [
    swap(/(<title>)[^<]*(<\/title>)/, html(meta.title)),
    swap(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      html(meta.description),
    ),
    swap(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, html(meta.title)),
    swap(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      html(meta.description),
    ),
    (text: string) => text.replace("</head>", `    ${head}\n  </head>`),
    (text: string) =>
      text.replace(
        '<div id="root"></div>',
        `<div id="root">${body(route, meta)}</div>`,
      ),
  ].reduce((text, step) => step(text), template);
};

export const prerender = (): Plugin => {
  let outDir = "";
  return {
    name: "daybreaker:prerender",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const template = readFileSync(join(outDir, "index.html"), "utf8");
      for (const route of routes) {
        const dir = join(outDir, route);
        mkdirSync(dir, { recursive: true });
        writeFileSync(
          join(dir, "index.html"),
          page(template, route, metaFor(route)),
        );
      }
      writeFileSync(join(outDir, "404.html"), page(template, "/404", notFound));

      const today = new Date().toISOString().slice(0, 10);
      const listed = routes.filter((route) => !metaFor(route).hidden);
      writeFileSync(
        join(outDir, "sitemap.xml"),
        [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...listed.map(
            (route) =>
              `  <url><loc>${origin}${route === "/" ? "/" : route}</loc><lastmod>${today}</lastmod></url>`,
          ),
          `</urlset>`,
          "",
        ].join("\n"),
      );
      writeFileSync(
        join(outDir, "robots.txt"),
        `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`,
      );
      console.log(
        `prerendered ${routes.length} pages (${components.length} components), sitemap with ${listed.length}`,
      );
    },
  };
};
