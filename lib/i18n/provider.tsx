"use client";

import { useEffect } from "react";
import i18n from "./config";
import type { Resource } from "i18next";

interface ChaosI18nProviderProps {
  locale?: string;
  children: React.ReactNode;
  resources?: Resource;
}

export function ChaosI18nProvider({
  locale = "zh-CN",
  children,
  resources,
}: ChaosI18nProviderProps) {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (resources) {
      for (const lng of Object.keys(resources)) {
        const nsMap = resources[lng];
        if (nsMap) {
          for (const ns of Object.keys(nsMap)) {
            i18n.addResourceBundle(lng, ns, nsMap[ns], true, true);
          }
        }
      }
    }
  }, [resources]);

  return <>{children}</>;
}
