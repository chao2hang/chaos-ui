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
/**
 * No-op fallback returned when no I18nProvider is present.
 * This prevents crashes in consumer apps that haven't wrapped their
 * tree in <I18nProvider>.
 */
const I18N_FALLBACK: I18nContextValue = {
  locale: "zh-CN",
  setLocale: () => {},
  messages: {},
  t: (key: string) => key,
};

function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext);
  // Graceful degradation: return a no-op fallback instead of throwing.
  // This allows components to render even without an I18nProvider wrapper.
  return ctx ?? I18N_FALLBACK;
}

/**
 * @component useSafeTranslation
 * @category ui/utilities
 * @since 1.2.1
 * @description Safe wrapper around react-i18next's useTranslation that
 * gracefully degrades when no i18next instance is initialized. Returns a
 * key-as-value fallback `{ t, i18n, ready }` instead of throwing or logging
 * warnings. All chaos-ui internal components should use this instead of
 * importing useTranslation directly from react-i18next.
 * / react-i18next useTranslation 的安全包装，无 i18next 实例时优雅降级。
 * @keywords i18n, translation, safe, fallback, hook
 * @example
 * const { t } = useSafeTranslation("ui");
 * t("common.save");
 */
import { useTranslation as useTranslationOrig } from "react-i18next";
import i18next from "i18next";

const noop = () => {};

/**
 * A permissive t-function type that accepts both string defaults and
 * i18next interpolation options (e.g. `{ count: 5 }`, `{ defaultValue: "x" }`).
 * This keeps chaos-ui components type-checking even when the fallback is used.
 */

type SafeTFunction = ((
  key: string,
  defaultValueOrOptions?: string | Record<string, unknown>,
) => string) & {
  [key: string]: unknown;
};

interface SafeTranslationResult {
  t: SafeTFunction;
  i18n: {
    language: string;
    changeLanguage: typeof noop;
    isInitialized: boolean;
  };
  ready: boolean;
}

function useSafeTranslation(
  namespace?: string | string[],
): SafeTranslationResult {
  // Always call the original hook to satisfy React's rules of hooks.
  const result = useTranslationOrig(namespace);

  // If i18next hasn't been initialized, return a silent fallback.
  // This prevents the "You will need to pass in an i18next instance" warning
  // from escalating to an error in strict environments.
  if (!i18next.isInitialized) {
    return {
      t: ((
        key: string,
        defaultValueOrOptions?: string | Record<string, unknown>,
      ) => {
        if (typeof defaultValueOrOptions === "string")
          return defaultValueOrOptions;
        if (
          defaultValueOrOptions &&
          typeof defaultValueOrOptions === "object" &&
          "defaultValue" in defaultValueOrOptions
        ) {
          return (defaultValueOrOptions as { defaultValue: string })
            .defaultValue;
        }
        return key;
      }) as SafeTFunction,
      i18n: {
        language: "zh-CN",
        changeLanguage: noop,
        isInitialized: false,
      },
      ready: true,
    };
  }

  return result as unknown as SafeTranslationResult;
}

export { I18nProvider, I18nContext, useI18n, useSafeTranslation };
export type { I18nProviderProps, I18nContextValue, SafeTranslationResult };
