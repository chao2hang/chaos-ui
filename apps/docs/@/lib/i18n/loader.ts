/**
 * i18n resource lazy-loader.
 *
 * Current `config.ts` statically imports all 4 languages × 14 namespaces,
 * which inflates the initial bundle. Consumers can use this loader to
 * dynamically fetch language packs on demand (e.g. when the user switches
 * language or when a code-split boundary is crossed).
 *
 * Usage with i18next:
 * ```ts
 * i18n.on("languageChanged", async (lng) => {
 *   const ns = await loadLanguageNamespace(lng, "payment");
 *   i18n.addResourceBundle(lng, "payment", ns, true, true);
 * });
 * ```
 *
 * @since 1.1.0
 */

/** Map of language code to its dynamic import promise (cached). */
const cache = new Map<string, Promise<Record<string, unknown>>>();

/**
 * Lazily load a single i18n namespace for the given language.
 *
 * Falls back to zh-CN when the requested language has no resource file.
 * The consumer is responsible for calling `i18n.addResourceBundle()` with
 * the returned value.
 *
 * @example
 * const paymentZh = await loadLanguageNamespace("zh-CN", "payment");
 * i18n.addResourceBundle("zh-CN", "payment", paymentZh, true, true);
 */
export async function loadLanguageNamespace(
  lng: string,
  namespace: string,
): Promise<Record<string, unknown>> {
  const key = `${lng}::${namespace}`;

  if (cache.has(key)) {
    return cache.get(key)!;
  }

  const promise: Promise<Record<string, unknown>> = (async (): Promise<
    Record<string, unknown>
  > => {
    try {
      // Dynamic import with a static-ish path pattern that bundlers can
      // resolve at build time via their own glob-aware import() heuristics.
      // Fallback: when the language file does not exist, import zh-CN.
      const mod = (await import(
        `./resources/${lng}/${namespace}.json`
      )) as Record<string, unknown>;
      return (mod.default ?? mod) as Record<string, unknown>;
    } catch {
      // Graceful fallback to zh-CN for any missing locale
      try {
        const fallback = (await import(
          `./resources/zh/${namespace}.json`
        )) as Record<string, unknown>;
        return (fallback.default ?? fallback) as Record<string, unknown>;
      } catch {
        console.warn(
          `[i18n/loader] namespace "${namespace}" not found for ${lng} or zh-CN.`,
        );
        return {} as Record<string, unknown>;
      }
    }
  })();

  cache.set(key, promise);
  return promise;
}

/**
 * Preload multiple namespaces for a given language in parallel.
 * Useful during a language switch to warm the cache before re-rendering.
 */
export async function preloadLanguage(
  lng: string,
  namespaces: string[],
): Promise<Map<string, Record<string, unknown>>> {
  const results = new Map<string, Record<string, unknown>>();
  const promises = namespaces.map(async (ns) => {
    const bundle = await loadLanguageNamespace(lng, ns);
    results.set(ns, bundle);
  });
  await Promise.all(promises);
  return results;
}
