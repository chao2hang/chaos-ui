"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type DocsTheme = "light" | "dark" | "system";
type Resolved = "light" | "dark";

interface DocsThemeContextValue {
  theme: DocsTheme;
  resolvedTheme: Resolved;
  setTheme: (theme: DocsTheme) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = "chaos-docs-theme";
const DocsThemeContext = createContext<DocsThemeContextValue | null>(null);

function systemTheme(): Resolved {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStored(): DocsTheme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    /* ignore */
  }
  return null;
}

function applyDom(resolved: Resolved) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;
}

/**
 * Docs-site theme provider — single React context for layout + header.
 * Avoids dual-instance issues when package ThemeProvider is resolved via
 * both transpilePackages and dist link.
 */
export function DocsThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<DocsTheme>("system");
  const [system, setSystem] = useState<Resolved>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = readStored();
    setThemeState(stored ?? "system");
    setSystem(systemTheme());
    setMounted(true);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      setSystem(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const resolved: Resolved =
    theme === "system" ? system : theme === "dark" ? "dark" : "light";

  useEffect(() => {
    if (!mounted) return;
    applyDom(resolved);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme, resolved, mounted]);

  const setTheme = useCallback((next: DocsTheme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const current =
        prev === "system" ? systemTheme() : prev === "dark" ? "dark" : "light";
      const next: DocsTheme = current === "dark" ? "light" : "dark";
      // Apply immediately so user sees change even before effect flush
      applyDom(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme: resolved, setTheme, toggleTheme }),
    [theme, resolved, setTheme, toggleTheme],
  );

  return (
    <DocsThemeContext.Provider value={value}>
      {children}
    </DocsThemeContext.Provider>
  );
}

export function useDocsTheme(): DocsThemeContextValue {
  const ctx = useContext(DocsThemeContext);
  if (!ctx) {
    throw new Error("useDocsTheme must be used within DocsThemeProvider");
  }
  return ctx;
}
