"use client";

import * as React from "react";
import {
  NavigationTabsBar,
  type NavigationTabsBarTabItem,
} from "./navigation-tabs-bar";

/**
 * @deprecated Use {@link NavigationTabsBar} instead. `MultiTabManager` is kept
 * as a thin adapter that forwards to `NavigationTabsBar` for backward
 * compatibility. The `tabs` prop replaces `items`; the `onTab*` callbacks map
 * 1:1 to `NavigationTabsBar`'s `onChange` / `onClose` / `onCloseOthers` /
 * `onCloseToRight` / `onRefresh` / `onCloseAll`.
 */
export type TabInfo = NavigationTabsBarTabItem;

/** @deprecated Use {@link NavigationTabsBar} props instead. */
export interface MultiTabManagerProps extends Omit<
  React.ComponentProps<"div">,
  "onContextMenu" | "onChange"
> {
  /** Tab list / 标签列表 */
  tabs?: TabInfo[];
  /** Active tab key / 当前激活的标签 key */
  activeKey?: string;
  /** Tab click callback / 标签点击回调 */
  onTabClick?: (key: string) => void;
  /** Tab close callback / 关闭标签回调 */
  onTabClose?: (key: string) => void;
  /** Close other tabs callback / 关闭其他标签回调 */
  onTabCloseOthers?: (key: string) => void;
  /** Close tabs to the right callback / 关闭右侧标签回调 */
  onTabCloseRight?: (key: string) => void;
  /** Refresh tab callback / 刷新标签回调 */
  onTabRefresh?: (key: string) => void;
  /** Close all tabs callback / 关闭所有标签回调 */
  onTabCloseAll?: () => void;
}

/**
 * @component MultiTabManager
 * @category layout/navigation
 * @since 0.2.0
 * @deprecated Use `NavigationTabsBar` (or `AdminShell.tabs`) instead. This
 *   component is now a thin adapter over `NavigationTabsBar` and will be
 *   removed in a future major release.
 * @description Backward-compatible adapter forwarding to NavigationTabsBar
 *   with the legacy `tabs` / `onTab*` API surface / 兼容层：将旧的
 *   `tabs` / `onTab*` API 转发到 `NavigationTabsBar`。
 * @keywords tabs, multi-tab, context-menu, navigation, scroll, deprecated
 * @example
 * <MultiTabManager
 *   tabs={[{ key: "home", label: "Home" }]}
 *   activeKey="home"
 *   onTabClick={(k) => console.log(k)}
 * />
 */
function MultiTabManager({
  tabs,
  activeKey,
  onTabClick,
  onTabClose,
  onTabCloseOthers,
  onTabCloseRight,
  onTabRefresh,
  onTabCloseAll,
  ...rest
}: MultiTabManagerProps) {
  // Forward the legacy `tabs` / `onTab*` API to the unified
  // `NavigationTabsBar` surface. Props are assigned conditionally to avoid
  // passing `undefined` (forbidden under `exactOptionalPropertyTypes`).
  type NTBProps = React.ComponentProps<typeof NavigationTabsBar>;
  const forwarded: Partial<NTBProps> = { ...rest };
  if (tabs !== undefined) forwarded.items = tabs;
  if (activeKey !== undefined) forwarded.activeKey = activeKey;
  if (onTabClick !== undefined) forwarded.onChange = onTabClick;
  if (onTabClose !== undefined) forwarded.onClose = onTabClose;
  if (onTabCloseOthers !== undefined)
    forwarded.onCloseOthers = onTabCloseOthers;
  if (onTabCloseRight !== undefined) forwarded.onCloseToRight = onTabCloseRight;
  if (onTabRefresh !== undefined) forwarded.onRefresh = onTabRefresh;
  if (onTabCloseAll !== undefined) forwarded.onCloseAll = onTabCloseAll;
  return <NavigationTabsBar {...(forwarded as NTBProps)} />;
}

export { MultiTabManager };
