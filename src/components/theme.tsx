import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { resultify } from "../utils";
import { createContext } from "../utils/hooks";

const themes = ["light", "dark", "system"] as const;

export type Theme = (typeof themes)[number];

const isTheme = (value: unknown): value is Theme =>
  themes.includes(value as Theme);

const [ThemeContext, useTheme] = createContext<ThemeProvider.Context>({
  name: "Theme",
});

/**
 * Applies the `dark` class to `<html>` and remembers the choice.
 * Optional: adding the `dark` class yourself works just as well.
 */
export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "woozui-theme",
}: ThemeProvider.Props) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // storage can throw in private mode or when blocked; fall back to the default
    const stored = resultify(() => window.localStorage.getItem(storageKey));
    if (stored.success && isTheme(stored.data)) setTheme(stored.data);
  }, [storageKey]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () =>
      document.documentElement.classList.toggle(
        "dark",
        theme === "dark" || (theme === "system" && media.matches),
      );

    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);

  const change = useCallback(
    (next: Theme) => {
      setTheme(next);
      resultify(() => window.localStorage.setItem(storageKey, next));
    },
    [storageKey],
  );

  const context = useMemo(
    () => [theme, change] as ThemeProvider.Context,
    [theme, change],
  );

  return <ThemeContext value={context}>{children}</ThemeContext>;
};
export namespace ThemeProvider {
  export type Context = [theme: Theme, setTheme: (theme: Theme) => void];
  export type Props = PropsWithChildren<{
    defaultTheme?: Theme;
    /** localStorage key the choice is saved under. */
    storageKey?: string;
  }>;
}

export { useTheme };
