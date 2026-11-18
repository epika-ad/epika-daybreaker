/**
 * Real addresses (/components/dialog), so search engines can see every page.
 * Links stay plain <a href="/…">; one click handler turns same-site clicks
 * into history changes instead of page loads. Old "#/…" links, from before,
 * are moved to their real address on arrival.
 */
import { useSyncExternalStore } from "react";

const change = "daybreaker:route";

export const currentRoute = () =>
  window.location.pathname.replace(/\/+$/, "") || "/";

export const navigate = (href: string) => {
  window.history.pushState(null, "", href);
  window.dispatchEvent(new Event(change));
};

const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback);
  window.addEventListener(change, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(change, callback);
  };
};

export const useRoute = () =>
  useSyncExternalStore(subscribe, currentRoute, () => "/");

/** Moves "#/docs" to "/docs", then handles same-site link clicks. */
export const startRouter = () => {
  const { hash } = window.location;
  if (hash.startsWith("#/")) {
    window.history.replaceState(null, "", hash.slice(1) || "/");
  }

  document.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const link = (event.target as Element | null)?.closest?.("a[href]");
    if (!(link instanceof HTMLAnchorElement)) return;
    if (link.target && link.target !== "_self") return;
    if (
      link.hasAttribute("download") ||
      link.origin !== window.location.origin
    ) {
      return;
    }
    const { pathname, search, hash } = link;
    // files and the API are real requests; "#section" links stay in-page
    if (pathname.startsWith("/api/") || /\.[a-z0-9]+$/i.test(pathname)) return;
    if (pathname === window.location.pathname && hash) return;
    event.preventDefault();
    if (
      pathname + search ===
      window.location.pathname + window.location.search
    ) {
      window.scrollTo(0, 0);
      return;
    }
    navigate(pathname + search + hash);
  });
};
