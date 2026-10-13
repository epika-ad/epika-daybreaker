// Emits the two stylesheets the package ships:
//   dist/theme.css  — tokens for apps that run Tailwind themselves
//   dist/styles.css — precompiled CSS for apps that do not
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const theme = readFileSync("src/styles/theme.css", "utf8");
// lets the consumer's Tailwind find the classes used inside the bundle, the
// charts entry included
writeFileSync(
  "dist/theme.css",
  `${theme}\n@source "./index.js";\n@source "./charts.js";\n`,
);

execSync(
  "npx @tailwindcss/cli -i src/styles/bundle.css -o dist/styles.css --minify",
  { stdio: "inherit" },
);
