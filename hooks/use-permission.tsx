"use client";

import * as React from "react";

/**
 * @hook usePermission
 * @category hooks/auth
 * @since 0.7.0
 * @description 权限校验 Hook，配合 PermissionProvider 使用。
 * 提供当前用户权限列表和校验函数。
 *
 * 支持两种调用方式：
 * - `usePermission()` → 返回完整上下文（hasPermission/hasAny/hasAll/permissions）
 * - `usePermission(action)` → 返回 boolean，便捷校验单个权限
 * / Permission hook — works with PermissionProvider to check user permissions.
 * @keywords permission, auth, role, access, guard
 * @example
 * // 方式一：返回完整上下文
 * const { hasPermission, hasAny, hasAll } = usePermission();
 * if (hasPermission("order:create")) { ... }
 *
 * // 方式二：便捷校验单个权限
 * const canCreate = usePermission("order:create");
 * if (canCreate) { ... }
 */

type PermissionCheck = (permission: string) => boolean;

interface PermissionContextValue {
  /** All permissions the current user holds / 当前用户拥有的权限列表 */
  permissions: string[];
  /** Check a single permission / 校验单个权限 */
  hasPermission: PermissionCheck;
  /** Check if user has ANY of the given permissions / 满足任一权限 */
  hasAny: (permissions: string[]) => boolean;
  /** Check if user has ALL of the given permissions / 满足全部权限 */
  hasAll: (permissions: string[]) => boolean;
}

const PermissionContext = React.createContext<PermissionContextValue>({
  permissions: [],
  hasPermission: () => true,
  hasAny: () => true,
  hasAll: () => true,
});

interface PermissionProviderProps {
  /** Permission codes granted to the current user / 当前用户的权限码列表 */
  permissions: string[];
  children: React.ReactNode;
}

function PermissionProvider({
  permissions,
  children,
}: PermissionProviderProps) {
  const value = React.useMemo<PermissionContextValue>(() => {
    const set = new Set(permissions);
    return {
      permissions,
      hasPermission: (p: string) => set.has(p),
      hasAny: (ps: string[]) => ps.some((p) => set.has(p)),
      hasAll: (ps: string[]) => ps.every((p) => set.has(p)),
    };
  }, [permissions]);

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}

function usePermission(): PermissionContextValue;
function usePermission(action: string): boolean;
function usePermission(action?: string): PermissionContextValue | boolean {
  const ctx = React.useContext(PermissionContext);
  if (action !== undefined) return ctx.hasPermission(action);
  return ctx;
}

export { PermissionProvider, usePermission, PermissionContext };
export type { PermissionProviderProps, PermissionContextValue };
