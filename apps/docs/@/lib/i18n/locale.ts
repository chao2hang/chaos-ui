/**
 * Docs-app-local locale primitives. Deliberately does **not** depend on
 * `next-intl` (there is a dead `use-translation.tsx` wrapper in this repo that
 * we intentionally leave untouched to avoid regressions). Locale is stored in
 * a cookie so it survives navigation, and the app switches via
 * `router.refresh()` — no `[locale]` URL segment.
 */

export type Locale = "zh" | "en";

export const LOCALE_COOKIE = "chaos-docs-locale";
export const DEFAULT_LOCALE: Locale = "zh";

export function isLocale(value: unknown): value is Locale {
  return value === "zh" || value === "en";
}

export function normalizeLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
