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
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/lib/i18n/locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  initialLocale: Locale;
  children: ReactNode;
}

/**
 * Client-side locale state synced with the request cookie.
 *
 * - Initial value is provided by the server (read from cookie) so the first
 *   paint matches SSR — no flash of wrong language, no hydration mismatch.
 * - `setLocale` writes the cookie and triggers `router.refresh()` so all
 *   server components re-read the cookie and re-render with the new locale.
 * - Also updates `document.documentElement.lang` for accessibility.
 */
export function LocaleProvider({
  initialLocale,
  children,
}: LocaleProviderProps) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (!isLocale(next)) return;
      // Persist for ~1 year (always rewrite cookie so refresh sees it)
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      setLocaleState((prev) => {
        if (prev === next) return prev;
        return next;
      });
      // Re-fetch server-rendered tree (cookie is sent automatically)
      router.refresh();
    },
    [router],
  );

  const toggleLocale = useCallback(() => {
    const next: Locale = locale === "zh" ? "en" : "zh";
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
    setLocaleState(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next === "en" ? "en" : "zh-CN";
    }
    // Soft refresh server components (guides, metadata); client chrome updates immediately
    router.refresh();
  }, [locale, router]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return ctx;
}

export function useDefaultLocale(): Locale {
  return DEFAULT_LOCALE;
}
