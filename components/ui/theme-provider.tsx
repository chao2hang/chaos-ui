"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: ResolvedTheme;
  systemTheme: ResolvedTheme;
  themes: Theme[];
  forcedTheme: undefined;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STORAGE_KEY = "theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

function resolveTheme(theme: Theme, systemTheme: ResolvedTheme): ResolvedTheme {
  return theme === "system" ? systemTheme : theme;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface ThemeProviderProps {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
  nonce?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  storageKey,
}: ThemeProviderProps) {
  const key = storageKey ?? STORAGE_KEY;
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const stored = getStoredTheme();
    if (stored) {
      if (stored === "system" && !enableSystem) {
        setThemeState(defaultTheme);
        try {
          localStorage.setItem(key, defaultTheme);
        } catch {}
      } else {
        setThemeState(stored);
      }
    } else {
      setThemeState(defaultTheme);
    }
    setSystemTheme(getSystemTheme());
    setMounted(true);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mounted) return;
    const resolved = resolveTheme(theme, systemTheme);
    const root = document.documentElement;

    if (disableTransitionOnChange) {
      const style = document.createElement("style");
      style.appendChild(
        document.createTextNode(
          "*,*::before,*::after{transition:none!important}",
        ),
      );
      document.head.appendChild(style);
      root.classList.remove("light", "dark");
      root.classList.add(resolved);
      root.setAttribute("data-theme", resolved);
      // Force a style recomputation so the transition-disable style takes
      // effect before we remove it.
      window.getComputedStyle(style).opacity;
      document.head.removeChild(style);
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(resolved);
      root.setAttribute("data-theme", resolved);
    }

    try {
      localStorage.setItem(key, theme);
    } catch {}
  }, [theme, systemTheme, mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  const setTheme = useCallback(
    (newTheme: Theme) => {
      if (!enableSystem && newTheme === "system") newTheme = defaultTheme;
      setThemeState(newTheme);
    },
    [enableSystem, defaultTheme],
  );

  const resolvedTheme = resolveTheme(theme, systemTheme);

  const value: ThemeContextValue = {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme,
    themes: enableSystem
      ? (["light", "dark", "system"] as Theme[])
      : (["light", "dark"] as Theme[]),
    forcedTheme: undefined,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a <ThemeProvider>");
  return ctx;
}
