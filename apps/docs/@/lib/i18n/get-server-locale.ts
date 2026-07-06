import { cookies } from "next/headers";
import { LOCALE_COOKIE, normalizeLocale, type Locale } from "@/lib/i18n/locale";

/**
 * Reads the current locale from the request cookie inside a Server Component,
 * Route Handler, or generateMetadata. Falls back to `DEFAULT_LOCALE`.
 */
export async function getServerLocale(): Promise<Locale> {
  const store = await cookies();
  return normalizeLocale(store.get(LOCALE_COOKIE)?.value);
}
