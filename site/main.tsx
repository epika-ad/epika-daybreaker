import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { startAnalytics } from "./analytics";
import { App } from "./app";
import { startRouter } from "./router";
import "./styles.css";

// the router first, so an old "#/…" link is already a real address when
// PostHog records the first page view
startRouter();
startAnalytics();

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
