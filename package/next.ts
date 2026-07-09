"use client";
// 跨 ui/business/layout 的聚合入口,无法收敛到单一 barrel,单独维护
// 历史说明: 曾作为 package/* 薄壳的同代文件;tsup 已切换到源码 barrel,只剩此文件保留在 package/

// P0-B1: ThemeProvider 必须与 Toaster 一起导出，否则消费方无法提供 theme context
// Toaster 内部调用 useTheme()，缺少 ThemeProvider 会导致页面 500
export { ThemeProvider, useTheme } from "../components/ui/theme-provider";
export type {
  Theme,
  ThemeContextValue,
  ThemeProviderProps,
} from "../components/ui/theme-provider";

// Toaster (sonner) — 依赖 ThemeProvider
export * from "../components/ui/sonner";

// MessageProvider — 全局消息 Provider
export { MessageProvider } from "../components/ui/message-provider";
export type { MessageProviderProps } from "../components/ui/message-provider";

// P1: 常用组件从 next 入口可直接导入，提升可发现性
export {
  PasswordInput,
  PasswordStrengthMeter,
} from "../components/ui/password-input";
export type { PasswordInputProps } from "../components/ui/password-input";
export { NavigationTabsBar } from "../components/layout/navigation-tabs-bar";
export type {
  NavigationTabsBarProps,
  NavigationTabsBarTabItem,
} from "../components/layout/navigation-tabs-bar";
export { ChartCard } from "../components/business/chart-card";
export type { ChartCardProps } from "../components/business/chart-card";

// Error page / mobile nav / theme toggle / layouts
export * from "../components/business/error-page";
export * from "../components/mobile/mobile-bottom-nav";
export * from "../components/business/theme-toggle";
export * from "../components/layout/public-layout";
export * from "../components/layout/top-bar";
