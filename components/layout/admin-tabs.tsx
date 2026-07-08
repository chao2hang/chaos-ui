"use client";

/**
 * @deprecated Use NavigationTabsBar instead.
 * AdminTabs is kept as a re-export alias for backward compatibility.
 * The `items` prop replaces the deprecated `tabs` prop.
 */
export {
  NavigationTabsBar as AdminTabs,
  type NavigationTabsBarTabItem,
  type NavigationTabsBarTabItem as TabItem,
  type NavigationTabsBarProps,
  type NavigationTabsBarProps as AdminTabsProps,
} from "./navigation-tabs-bar";
