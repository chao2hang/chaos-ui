"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// Module-level cache store: cacheKey -> rendered children
const cacheStore = new Map<string, React.ReactNode>();

/**
 * @component KeepAlive
 * @category ui/utilities
 * @since 0.2.0
 * @description Page cache component that preserves component state across tab/route switches by keeping children mounted but hidden / 页面缓存组件，通过保持子组件挂载但隐藏来在标签/路由切换时保留状态
 * @keywords keep-alive, cache, preserve, state, tab, route
 * @example
 * <KeepAlive active={isActive} cacheKey="dashboard">
 *   <Dashboard />
 * </KeepAlive>
 */

interface KeepAliveProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Whether the children should be visible / 子组件是否可见 */
  active?: boolean;
  /** Unique cache key for identifying the cached content / 用于标识缓存内容的唯一键 */
  cacheKey?: string;
  /** Children to cache and optionally show / 需要缓存的子内容 */
  children?: React.ReactNode;
}

function KeepAlive({
  active = true,
  cacheKey,
  children,
  className,
  ...props
}: KeepAliveProps) {
  // Store children in cache whenever they change (so we can restore later).
  React.useEffect(() => {
    if (cacheKey && children !== undefined) {
      cacheStore.set(cacheKey, children);
    }
  }, [cacheKey, children]);

  // If we have a cacheKey but no children currently, try to restore from cache.
  const restored = React.useMemo(() => {
    if (cacheKey && children === undefined) {
      return cacheStore.get(cacheKey);
    }
    return undefined;
  }, [cacheKey, children]);

  const content = children ?? restored;

  return (
    <div
      data-slot="keep-alive"
      data-active={active}
      className={cn(!active && "hidden", className)}
      {...props}
    >
      {content}
    </div>
  );
}

/**
 * @component useKeepAlive
 * @category ui/utilities
 * @since 0.2.0
 * @description Hook to access the keep-alive cache store, allowing manual cache management / 访问 keep-alive 缓存存储的 Hook，允许手动管理缓存
 * @keywords keep-alive, hook, cache, clear, remove
 * @example
 * const { cache, clear, remove } = useKeepAlive();
 * remove("dashboard");
 */
function useKeepAlive() {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const clear = React.useCallback(() => {
    cacheStore.clear();
    forceUpdate();
  }, []);

  const remove = React.useCallback((key: string) => {
    cacheStore.delete(key);
    forceUpdate();
  }, []);

  return React.useMemo(
    () => ({ cache: cacheStore, clear, remove }),
    [clear, remove],
  );
}

export { KeepAlive, useKeepAlive };
export type { KeepAliveProps };
