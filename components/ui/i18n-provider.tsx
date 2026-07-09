"use client";

import * as React from "react";

/**
 * @component I18nProvider
 * @category ui/utilities
 * @since 0.2.0
 * @description Internationalization provider with simple key-based dot-notation translation lookup / 国际化 Provider，支持基于键的点号路径翻译查找
 * @keywords i18n, internationalization, locale, translation, provider
 * @example
 * <I18nProvider locale="zh-CN" messages={{ "common.save": { "zh-CN": "保存", "en-US": "Save" } }}>
 *   <App />
 * </I18nProvider>
 */

interface I18nProviderProps {
  /** Current locale / 当前语言 */
  locale?: string;
  /** Default locale fallback / 默认语言回退 */
  defaultLocale?: string;
  /** Message dictionary: key -> locale -> text / 消息字典：键 -> 语言 -> 文本 */
  messages?: Record<string, Record<string, string>>;
  children?: React.ReactNode;
  /** Locale change callback / 语言切换回调 */
  onChange?: (locale: string) => void;
}

interface I18nContextValue {
  locale: string;
  setLocale: (locale: string) => void;
  messages: Record<string, Record<string, string>>;
  t: (key: string) => string;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

function lookup(
  key: string,
  locale: string,
  defaultLocale: string,
  messages: Record<string, Record<string, string>>,
): string {
  const entry = messages[key];
  if (entry) {
    if (entry[locale]) return entry[locale];
    if (entry[defaultLocale]) return entry[defaultLocale];
  }
  return key;
}

function I18nProvider({
  locale = "zh-CN",
  defaultLocale = "zh-CN",
  messages = {},
  children,
  onChange,
}: I18nProviderProps) {
  const [currentLocale, setCurrentLocale] = React.useState(locale);

  React.useEffect(() => {
    setCurrentLocale(locale);
  }, [locale]);

  const setLocale = React.useCallback(
    (next: string) => {
      setCurrentLocale(next);
      onChange?.(next);
    },
    [onChange],
  );

  const t = React.useCallback(
    (key: string) => lookup(key, currentLocale, defaultLocale, messages),
    [currentLocale, defaultLocale, messages],
  );

  const value = React.useMemo<I18nContextValue>(
    () => ({ locale: currentLocale, setLocale, messages, t }),
    [currentLocale, setLocale, messages, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * @component useI18n
 * @category ui/utilities
 * @since 0.2.0
 * @description Hook to access the i18n context (locale, setLocale, t, messages) / 访问 i18n 上下文的 Hook
 * @keywords i18n, hook, locale, translation
 * @example
 * const { t, locale, setLocale } = useI18n();
 * t("common.save");
 */
function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}

export { I18nProvider, I18nContext, useI18n };
export type { I18nProviderProps, I18nContextValue };
