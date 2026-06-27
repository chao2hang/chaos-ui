"use client";

import * as React from "react";

/**
 * @component ConfigProvider
 * @category ui/primitives
 * @since 0.2.0
 * @description 全局配置 Provider / Global configuration provider (antd ConfigProvider equivalent)
 * @keywords config, provider, theme, locale, prefix
 * @example
 * <ConfigProvider locale="zh-CN" theme={{ primaryColor: "#1677ff" }}>
 *   <App />
 * </ConfigProvider>
 */

interface ThemeConfig {
  /** Primary color / 主色调 */
  primaryColor?: string;
  /** Border radius / 圆角 */
  borderRadius?: number;
  /** Whether to use dark mode / 是否暗黑模式 */
  darkMode?: boolean;
  /** Component size / 组件大小 */
  componentSize?: "sm" | "default" | "lg";
  /** Custom CSS variables / 自定义 CSS 变量 */
  cssVars?: Record<string, string>;
}

interface ConfigContextValue {
  /** Locale string / 语言 */
  locale?: string | undefined;
  /** Direction (ltr/rtl) / 方向 */
  direction?: "ltr" | "rtl" | undefined;
  /** Theme config / 主题配置 */
  theme?: ThemeConfig | undefined;
  /** Class name prefix / 类名前缀 */
  prefixCls?: string | undefined;
  /** Whether to disable animations / 是否禁用动画 */
  disableAnimation?: boolean | undefined;
  /** Custom render empty / 自定义空状态渲染 */
  renderEmpty?: ((componentName?: string) => React.ReactNode) | undefined;
  /** Form configuration / 表单配置 */
  form?: {
    /** Whether to validate messages are customized / 自定义校验消息 */
    validateMessages?: Record<string, string>;
  } | undefined;
}

const ConfigContext = React.createContext<ConfigContextValue>({
  locale: "zh-CN",
  direction: "ltr",
  prefixCls: "chaos",
});

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
export type { ConfigContextValue, ThemeConfig };
