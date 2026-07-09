"use client";

import * as React from "react";

/**
 * @component ConfigProvider
 * @category ui/primitives
 * @since 0.2.0
 * @description 全局配置 Provider / Global configuration provider (antd ConfigProvider equivalent)
 * Supports scrollbar theme and CSS variable injection.
 * @keywords config, provider, theme, locale, prefix, scrollbar
 * @example
 * <ConfigProvider locale="zh-CN" theme={{ scrollbar: "thin" }}>
 *   <App />
 * </ConfigProvider>
 */

interface ScrollbarConfig {
  /** Scrollbar style: "thin" (narrow track), "default", or "none" (hidden) / 滚动条样式 */
  variant?: "thin" | "default" | "none";
  /** Custom thumb color override (CSS color) / 自定义滑块颜色 */
  thumbColor?: string;
  /** Custom thumb hover color / 自定义滑块 hover 颜色 */
  thumbHoverColor?: string;
}

interface ThemeConfig {
  primaryColor?: string;
  borderRadius?: number;
  darkMode?: boolean;
  componentSize?: "sm" | "default" | "lg";
  /** Scrollbar theme / 滚动条主题 */
  scrollbar?: ScrollbarConfig | "thin" | "default" | "none";
  cssVars?: Record<string, string>;
}

interface ConfigContextValue {
  locale?: string | undefined;
  direction?: "ltr" | "rtl" | undefined;
  theme?: ThemeConfig | undefined;
  prefixCls?: string | undefined;
  disableAnimation?: boolean | undefined;
  renderEmpty?: ((componentName?: string) => React.ReactNode) | undefined;
  form?:
    | {
        validateMessages?: Record<string, string>;
      }
    | undefined;
}

const ConfigContext = React.createContext<ConfigContextValue>({
  locale: "zh-CN",
  direction: "ltr",
  prefixCls: "chaos",
});

/** Resolve shorthand scrollbar config */
function resolveScrollbarConfig(
  sb: ScrollbarConfig | "thin" | "default" | "none" | undefined,
): ScrollbarConfig | undefined {
  if (!sb) return undefined;
  if (typeof sb === "string") return { variant: sb };
  return sb;
}

function ConfigProvider({
  locale = "zh-CN",
  direction = "ltr",
  theme,
  prefixCls = "chaos",
  disableAnimation = false,
  renderEmpty,
  form,
  children,
}: ConfigContextValue & { children: React.ReactNode }) {
  const value = React.useMemo<ConfigContextValue>(
    () => ({
      locale,
      direction,
      theme,
      prefixCls,
      disableAnimation,
      renderEmpty,
      form,
    }),
    [locale, direction, theme, prefixCls, disableAnimation, renderEmpty, form],
  );

  // Apply CSS variables when theme is provided
  const style = React.useMemo<React.CSSProperties>(() => {
    if (!theme) return {};
    const vars: Record<string, string> = {};
    if (theme.primaryColor) {
      vars["--primary"] = theme.primaryColor;
    }
    if (theme.borderRadius !== undefined) {
      vars["--radius"] = `${theme.borderRadius}px`;
    }

    // Scrollbar theme CSS variables
    const scrollbarConfig = resolveScrollbarConfig(theme.scrollbar);
    if (scrollbarConfig) {
      if (scrollbarConfig.variant === "none") {
        vars["--scrollbar-width"] = "none";
      } else if (scrollbarConfig.variant === "thin") {
        vars["--scrollbar-width"] = "thin";
      }
      if (scrollbarConfig.thumbColor) {
        vars["--scrollbar-thumb"] = scrollbarConfig.thumbColor;
      } else {
        // Defaults that work in both light and dark modes.
        // Format matches styles/scrollbar.css (audit P0 #4): space-separated
        // rgb() with slash alpha, not legacy comma rgba().
        vars["--scrollbar-thumb"] = "rgb(15 23 42 / 0.18)";
        vars["--scrollbar-thumb-hover"] = "rgb(15 23 42 / 0.3)";
      }
      if (scrollbarConfig.thumbHoverColor) {
        vars["--scrollbar-thumb-hover"] = scrollbarConfig.thumbHoverColor;
      }
    }

    if (theme.cssVars) {
      Object.assign(vars, theme.cssVars);
    }
    return vars as React.CSSProperties;
  }, [theme]);

  return (
    <ConfigContext.Provider value={value}>
      <div
        data-slot="config-provider"
        dir={direction}
        style={style}
        className={theme?.darkMode ? "dark" : undefined}
      >
        {children}
      </div>
    </ConfigContext.Provider>
  );
}

function useConfig(): ConfigContextValue {
  return React.useContext(ConfigContext);
}

export { ConfigProvider, useConfig, ConfigContext };
export type { ConfigContextValue, ThemeConfig, ScrollbarConfig };
