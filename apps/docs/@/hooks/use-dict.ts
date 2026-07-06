"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/locale-provider";
import { dict, type DictShape } from "@/lib/i18n/dict";

/**
 * Client-side translation helpers. Server components should call the plain
 * `t(locale, key)` selector from `@/lib/i18n/dict` directly — this hook is a
 * client-side sugar that reads locale from context.
 */
export function useDict(): DictShape {
  const { locale } = useLocale();
  return useMemo(() => dict[locale], [locale]);
}

export function useT(): (path: string) => string {
  const { locale } = useLocale();
  return useMemo(() => {
    return (path: string) => {
      const parts = path.split(".");
      let cur: unknown = dict[locale];
      for (const p of parts) {
        if (cur && typeof cur === "object" && p in cur) {
          cur = (cur as Record<string, unknown>)[p];
        } else {
          return path;
        }
      }
      return typeof cur === "string" ? cur : path;
    };
  }, [locale]);
}
