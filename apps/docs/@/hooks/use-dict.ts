"use client";
import React from "react";
import { useLocale } from "@/components/locale-provider";
import { dict, type DictShape } from "@/lib/i18n/dict";

/**
 * @hook useDict
 * @category i18n
 * @description Returns the i18n dictionary for the active locale.
 * Usage: `const dict = useDict(); dict.header.navInstall`
 */
export function useDict(): DictShape {
  const { locale } = useLocale();
  // Return dict for the current locale, falling back to zh
  return dict[locale] ?? dict.zh;
}
