"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { KeepAlive, useKeepAlive } from "@/components/ui/keep-alive";
import {
  NavigationTabsBar,
  type NavigationTabsBarProps,
  type NavigationTabsBarTabItem,
} from "@/components/layout/navigation-tabs-bar";

/**
 * @component KeepAliveTabs
 * @category layout/navigation
 * @since 1.6.0
 * @description Optional multi-tab shell that pairs NavigationTabsBar with KeepAlive
 * panes so inactive tab content stays mounted (state preserved). Closing a tab
 * drops its cache entry via useKeepAlive.remove.
 * / 可选多标签壳：NavigationTabsBar + KeepAlive，非激活页保持挂载；关闭标签时清理缓存。
 * @keywords keep-alive, tabs, multi-tab, navigation, cache
 * @example
 * <KeepAliveTabs
 *   panes={[
 *     { key: "home", label: "首页", closable: false, children: <Home /> },
 *     { key: "orders", label: "订单", children: <Orders /> },
 *   ]}
 *   activeKey={key}
 *   onChange={setKey}
 *   onClose={handleClose}
 * />
 */

export interface KeepAliveTabsPane {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  /** Defaults to true / 默认 true */
  closable?: boolean;
  /** Pane body (cached while key is in the open set) / 面板内容 */
  children?: React.ReactNode;
  /**
   * When true, mount the pane even before first activation.
   * Default false (lazy mount on first visit).
   * / 首次激活前是否预挂载
   */
  forceRender?: boolean;
}

export interface KeepAliveTabsProps extends Omit<
  React.ComponentProps<"div">,
  "onChange" | "children"
> {
  /** Tab panes with content / 带内容的标签页 */
  panes: KeepAliveTabsPane[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  onClose?: (key: string) => void;
  onCloseAll?: () => void;
  onCloseOthers?: (key: string) => void;
  onCloseToRight?: (key: string) => void;
  onRefresh?: (key: string) => void;
  /**
   * When true (default), remove KeepAlive cache for a closed tab key.
   * / 关闭标签时是否清理 KeepAlive 缓存（默认 true）
   */
  destroyInactiveCacheOnClose?: boolean;
  /** Class for the content region / 内容区 class */
  contentClassName?: string;
  /** Forward extra props to NavigationTabsBar / 透传标签栏 */
  tabsBarProps?: Omit<
    NavigationTabsBarProps,
    | "items"
    | "activeKey"
    | "defaultActiveKey"
    | "onChange"
    | "onClose"
    | "onCloseAll"
    | "onCloseOthers"
    | "onCloseToRight"
    | "onRefresh"
  >;
}

function KeepAliveTabs({
  className,
  panes,
  activeKey: controlledActiveKey,
  defaultActiveKey,
  onChange,
  onClose,
  onCloseAll,
  onCloseOthers,
  onCloseToRight,
  onRefresh,
  destroyInactiveCacheOnClose = true,
  contentClassName,
  tabsBarProps,
  ...props
}: KeepAliveTabsProps) {
  const { remove } = useKeepAlive();
  const [internalActive, setInternalActive] = React.useState(
    defaultActiveKey ?? panes[0]?.key ?? "",
  );
  const current = controlledActiveKey ?? internalActive;

  // Track which keys have been activated (lazy mount)
  const [visited, setVisited] = React.useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const p of panes) {
      if (p.forceRender || p.key === (defaultActiveKey ?? panes[0]?.key)) {
        initial.add(p.key);
      }
    }
    return initial;
  });

  React.useEffect(() => {
    if (!current) return;
    setVisited((prev) => {
      if (prev.has(current)) return prev;
      const next = new Set(prev);
      next.add(current);
      return next;
    });
  }, [current]);

  // Drop visited + cache for keys no longer present in panes
  const paneKeys = React.useMemo(
    () => new Set(panes.map((p) => p.key)),
    [panes],
  );

  React.useEffect(() => {
    setVisited((prev) => {
      let changed = false;
      const next = new Set<string>();
      for (const k of prev) {
        if (paneKeys.has(k)) next.add(k);
        else {
          changed = true;
          if (destroyInactiveCacheOnClose) remove(k);
        }
      }
      for (const p of panes) {
        if (p.forceRender) next.add(p.key);
      }
      return changed || next.size !== prev.size ? next : prev;
    });
  }, [paneKeys, panes, destroyInactiveCacheOnClose, remove]);

  const tabItems: NavigationTabsBarTabItem[] = panes.map((p) => ({
    key: p.key,
    label: p.label,
    ...(p.icon !== undefined ? { icon: p.icon } : {}),
    ...(p.closable !== undefined ? { closable: p.closable } : {}),
  }));

  const handleChange = (key: string) => {
    if (controlledActiveKey === undefined) setInternalActive(key);
    onChange?.(key);
  };

  const handleClose = (key: string) => {
    if (destroyInactiveCacheOnClose) remove(key);
    setVisited((prev) => {
      if (!prev.has(key)) return prev;
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
    onClose?.(key);
  };

  const handleCloseAll = () => {
    if (destroyInactiveCacheOnClose) {
      for (const p of panes) {
        if (p.closable !== false) remove(p.key);
      }
    }
    onCloseAll?.();
  };

  const handleCloseOthers = (key: string) => {
    if (destroyInactiveCacheOnClose) {
      for (const p of panes) {
        if (p.key !== key && p.closable !== false) remove(p.key);
      }
    }
    onCloseOthers?.(key);
  };

  const handleCloseToRight = (key: string) => {
    if (destroyInactiveCacheOnClose) {
      const idx = panes.findIndex((p) => p.key === key);
      if (idx >= 0) {
        for (const p of panes.slice(idx + 1)) {
          if (p.closable !== false) remove(p.key);
        }
      }
    }
    onCloseToRight?.(key);
  };

  return (
    <div
      data-slot="keep-alive-tabs"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
      {...props}
    >
      <NavigationTabsBar
        items={tabItems}
        activeKey={current}
        onChange={handleChange}
        onClose={handleClose}
        onCloseAll={handleCloseAll}
        onCloseOthers={handleCloseOthers}
        onCloseToRight={handleCloseToRight}
        {...(onRefresh !== undefined ? { onRefresh } : {})}
        {...tabsBarProps}
      />
      <div
        data-slot="keep-alive-tabs-content"
        className={cn(
          "relative min-h-0 flex-1 overflow-auto",
          contentClassName,
        )}
      >
        {panes.map((pane) => {
          if (!visited.has(pane.key) && !pane.forceRender) return null;
          return (
            <KeepAlive
              key={pane.key}
              cacheKey={pane.key}
              active={pane.key === current}
            >
              {pane.children}
            </KeepAlive>
          );
        })}
      </div>
    </div>
  );
}

export { KeepAliveTabs };
