import {
  buttonVariants,
  cn,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarLinks,
  ThemeProvider,
  ToastProvider,
  TooltipProvider,
  useTheme,
} from "daybreaker";
import { useEffect, useSyncExternalStore } from "react";
import { version } from "../package.json";
import { Browse, Component, Components, Docs, Home } from "./pages";
import {
  ArrowUpRightIcon,
  agency,
  ContrastIcon,
  CopyButton,
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
    title: "Resources",
    links: [
      { label: "Changelog", href: `${repository}/blob/main/CHANGELOG.md` },
      {
        label: "Contributing",
        href: `${repository}/blob/main/CONTRIBUTING.md`,
      },
      { label: "Report a bug", href: `${repository}/issues/new/choose` },
      { label: "npm", href: "https://www.npmjs.com/package/daybreaker" },
    ],
  },
  {
    title: "Epika",
    links: [
      { label: "epika.ad", href: agency },
      { label: "Our work", href: `${agency}/projects` },
      { label: "Start a project", href: "#/brief" },
    ],
  },
] as const;

const install = "npm install daybreaker";

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

// the site's own header is the library's Navbar: a floating glass bar whose
// pill glides to the page being viewed
const Header = ({ route }: { route: string }) => (
  <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6">
    <Navbar aria-label="Main" className="mx-auto max-w-7xl">
      <NavbarBrand href="#/" aria-label="daybreaker home">
        <Wordmark />
      </NavbarBrand>
      <NavbarLinks>
        {links
          // the logo already leads home
          .filter((link) => link.href !== "#/")
          .map((link) => (
            <NavbarLink
              key={link.href}
              href={link.href}
              current={link.match.test(route)}
              // phones keep the two main links
              className={cn(link.href === "#/figma" && "max-sm:hidden")}
            >
              {link.label}
            </NavbarLink>
          ))}
        <NavbarLink
          href={repository}
          target="_blank"
          rel="noreferrer"
          className="max-sm:hidden"
        >
          GitHub
        </NavbarLink>
      </NavbarLinks>
      <NavbarActions>
        <a
          href={agency}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ size: "sm", variant: "outline" }),
            "max-md:hidden",
          )}
        >
          Epika
          <ArrowUpRightIcon className="size-3.5" />
        </a>
        <ThemeToggle />
      </NavbarActions>
    </Navbar>
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

  // scroll resets whenever the route changes, except on the routes that
  // stand for a section of the home page: the brief, and the Figma ones,
  // which scroll themselves
  useEffect(() => {
    if (route === "/brief") {
      document.getElementById("brief")?.scrollIntoView({ block: "start" });
    } else if (!route.startsWith("/figma")) {
      window.scrollTo(0, 0);
    }
  }, [route]);

  return (
    <div className="flex min-h-svh flex-col">
      <Header route={route} />
      <main className="flex-1 overflow-x-clip">
        <Page route={route} />
      </main>
      <footer className="mt-8 border-border border-t">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-24">
            <div className="grid content-start justify-items-start gap-5">
              <Wordmark />
              <p className="max-w-sm text-pretty text-foreground-dimmed">
                Accessible React components, made by Epika in Tirana and free to
                use.
              </p>
              <div className="flex h-10 items-center gap-2 rounded-full border border-border pr-1 pl-4 font-mono text-sm">
                <span aria-hidden="true" className="text-brand">
                  $
                </span>
                {install}
                <CopyButton text={install} className="rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3">
              {footerLinks.map((group) => (
                <nav
                  key={group.title}
                  aria-label={group.title}
                  className="grid content-start gap-3 text-sm"
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
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-border border-t py-6 text-foreground-dimmed text-xs">
            <p>MIT licensed. © {new Date().getFullYear()} Epika.</p>
            <p>v{version} · Made in Tirana</p>
          </div>
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
