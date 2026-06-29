"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const supportedLocales = ["zh-CN", "en-US"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

const STORAGE_KEY = "chaos-ui-locale";

export function getStoredLocale(): string {
  if (typeof window === "undefined") return "zh-CN";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && (supportedLocales as readonly string[]).includes(stored)) {
    return stored as SupportedLocale;
  }
  return "zh-CN";
}

interface LocaleContextValue {
  locale: string;
  setLocale: (locale: string) => void;
  supportedLocales: readonly string[];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  initialLocale?: string;
  children: React.ReactNode;
}

export function LocaleProvider({
  initialLocale = "zh-CN",
  children,
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<string>(() => {
    if (typeof window === "undefined") return initialLocale;
    return getStoredLocale();
  });

  const setLocale = useCallback((next: string) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, supportedLocales: [...supportedLocales] }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
