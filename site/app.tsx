import {
  cn,
  ThemeProvider,
  ToastProvider,
  TooltipProvider,
  useTheme,
} from "daybreaker";
import { useEffect, useSyncExternalStore } from "react";
import { Browse, Component, Components, Docs, Home } from "./pages";
import {
  ArrowUpRightIcon,
  agency,
  ContrastIcon,
  focus,
  Wordmark,
} from "./parts";

const repository = "https://github.com/epika-ad/epika-daybreaker";

const links = [
  { href: "#/", label: "Home", match: /^\/$/ },
  { href: "#/components", label: "Components", match: /^\/components/ },
  { href: "#/docs", label: "Docs", match: /^\/docs/ },
  { href: "#/figma", label: "Figma", match: /^\/figma/ },
] as const;

const footerLinks = [
  {
    title: "Library",
    links: [
      { label: "Components", href: "#/components" },
      { label: "Docs", href: "#/docs" },
      { label: "Figma file", href: "#/figma" },
      { label: "GitHub", href: repository },
    ],
  },
  {
    title: "Epika",
    links: [
      { label: "epika.ad", href: agency },
      { label: "Work with us", href: agency },
    ],
  },
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
        "flex size-9 cursor-pointer items-center justify-center rounded-full text-foreground-dimmed transition-colors hover:bg-accent hover:text-foreground",
        focus,
      )}
    >
      <ContrastIcon className="size-[18px]" />
    </button>
  );
};

const navLink = cn(
  "rounded-full px-3 py-1.5 font-medium text-foreground-dimmed text-sm transition-colors hover:text-foreground aria-[current=page]:text-foreground",
  focus,
);

// one bar across the page, on the same column as everything under it
const Header = ({ route }: { route: string }) => (
  <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
    <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
      <a
        href="#/"
        aria-label="daybreaker home"
        className={cn("rounded-md", focus)}
      >
        <Wordmark />
      </a>
      <div className="flex items-center gap-1">
        <nav aria-label="Main" className="flex items-center">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={link.match.test(route) ? "page" : undefined}
              className={cn(
                navLink,
                // the logo already leads home
                link.href === "#/" && "hidden",
                // phones keep the two main links
                link.href === "#/figma" && "max-sm:hidden",
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href={repository}
            target="_blank"
            rel="noreferrer"
            className={cn(navLink, "max-sm:hidden")}
          >
            GitHub
          </a>
          <a
            href={agency}
            target="_blank"
            rel="noreferrer"
            className={cn(navLink, "flex items-center gap-1 max-md:hidden")}
          >
            Epika
            <ArrowUpRightIcon className="size-3.5" />
          </a>
        </nav>
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

  // scroll resets whenever the route changes, except on the Figma routes,
  // which scroll to their own section on the home page
  useEffect(() => {
    if (!route.startsWith("/figma")) window.scrollTo(0, 0);
  }, [route]);

  return (
    <div className="flex min-h-svh flex-col">
      <Header route={route} />
      <main className="flex-1 overflow-x-clip">
        <Page route={route} />
      </main>
      <footer className="border-border border-t">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:grid-cols-[1fr_auto_auto] sm:gap-16 sm:px-6">
          <div className="grid content-start gap-3">
            <Wordmark />
            <p className="max-w-xs text-pretty text-foreground-dimmed text-sm">
              Accessible React components, made by Epika in Tirana and free to
              use.
            </p>
          </div>
          {footerLinks.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="grid content-start gap-2.5 text-sm"
            >
              <p className="font-medium">{group.title}</p>
              {group.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.href.startsWith("http") && {
                    target: "_blank",
                    rel: "noreferrer",
                  })}
                  className={cn(
                    "w-fit rounded-sm text-foreground-dimmed transition-colors hover:text-foreground",
                    focus,
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>
        <div className="border-border border-t">
          <p className="mx-auto w-full max-w-7xl px-4 py-6 text-foreground-dimmed text-xs sm:px-6">
            MIT licensed. © {new Date().getFullYear()} Epika.
          </p>
        </div>
      </footer>
    </div>
  );
};

export const App = () => (
  <ThemeProvider defaultTheme="light">
    <TooltipProvider>
      <ToastProvider>
        <Shell />
      </ToastProvider>
    </TooltipProvider>
  </ThemeProvider>
);
