import { useEffect, useSyncExternalStore } from "react";
import {
  cn,
  ThemeProvider,
  ToastProvider,
  TooltipProvider,
  useTheme,
} from "daybreaker";
import { Browse, Component, Components, Docs, Home } from "./pages";
import { ContrastIcon, focus, GitHubIcon, Logo, pill } from "./parts";

const repository = "https://github.com/epika-ad/epika-daybreaker";

const links = [
  { href: "#/", label: "Home", match: /^\/$/ },
  { href: "#/components", label: "Components", match: /^\/components/ },
  { href: "#/docs", label: "Docs", match: /^\/docs/ },
] as const;

const subscribe = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
};

// hash routing keeps the site a static bundle that works on any host
const useRoute = () =>
  useSyncExternalStore(
    subscribe,
    () => window.location.hash.replace(/^#/, "") || "/",
  );

const ThemeToggle = () => {
  const [, setTheme] = useTheme();

  const toggle = () =>
    setTheme(
      document.documentElement.classList.contains("dark") ? "light" : "dark",
    );

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={cn(
        pill,
        "flex size-11 cursor-pointer items-center justify-center text-foreground-dimmed transition-colors hover:text-foreground",
        focus,
      )}
    >
      <ContrastIcon className="size-5" />
    </button>
  );
};

const Header = ({ route }: { route: string }) => (
  <header className="sticky top-0 z-40 flex justify-center px-4 pt-5">
    <div className="flex w-full max-w-3xl items-center justify-between gap-2">
      <a
        href="#/"
        aria-label="Epika UI home"
        className={cn(
          pill,
          "flex h-11 items-center gap-2 px-3 font-semibold tracking-tight sm:pr-4",
          focus,
        )}
      >
        <Logo />
        <span className="hidden sm:inline">Epika UI</span>
      </a>
      <nav
        aria-label="Main"
        className={cn(pill, "flex h-11 items-center px-1.5 text-sm")}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={link.match.test(route) ? "page" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1.5 font-medium text-foreground-dimmed transition-colors hover:text-foreground aria-[current=page]:text-foreground sm:px-4",
              focus,
            )}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <a
          href={repository}
          target="_blank"
          rel="noreferrer"
          aria-label="Epika UI on GitHub"
          className={cn(
            pill,
            // dropped on phones, where the bar has no room for it
            "flex size-11 items-center justify-center text-foreground-dimmed transition-colors hover:text-foreground max-sm:hidden",
            focus,
          )}
        >
          <GitHubIcon />
        </a>
        <ThemeToggle />
      </div>
    </div>
  </header>
);

const Reference = ({ route }: { route: string }) => {
  switch (true) {
    case route.startsWith("/components/"):
      return <Component slug={route.replace("/components/", "")} />;
    case route === "/docs":
      return <Docs />;
    default:
      return <Components />;
  }
};

const Page = ({ route }: { route: string }) =>
  // the docs and every component page share one sidebar, which stays mounted
  // between them so it keeps its scroll position
  route === "/docs" || route.startsWith("/components") ? (
    <Browse route={route}>
      <Reference route={route} />
    </Browse>
  ) : (
    <Home />
  );

const Shell = () => {
  const route = useRoute();

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll resets whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <div className="flex min-h-svh flex-col">
      <Header route={route} />
      <main className="flex-1">
        <Page route={route} />
      </main>
      <footer className="border-border border-t px-4 py-8 text-center text-foreground-dimmed text-sm">
        MIT licensed. Source on{" "}
        <a
          href={repository}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "rounded-sm text-foreground underline underline-offset-4",
            focus,
          )}
        >
          GitHub
        </a>
        .
      </footer>
    </div>
  );
};

export const App = () => (
  <ThemeProvider defaultTheme="dark">
    <TooltipProvider>
      <ToastProvider>
        <Shell />
      </ToastProvider>
    </TooltipProvider>
  </ThemeProvider>
);
