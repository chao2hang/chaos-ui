"use client";

import * as React from "react";

/**
 * @hook usePermission
 * @category hooks/auth
 * @since 0.7.0
 * @description 权限校验 Hook，配合 PermissionProvider 使用。
 * 提供当前用户权限列表和校验函数。
 * / Permission hook — works with PermissionProvider to check user permissions.
 * @keywords permission, auth, role, access, guard
 * @example
 * const { hasPermission, hasAny, hasAll } = usePermission();
 * if (hasPermission("order:create")) { ... }
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

function usePermission(): PermissionContextValue {
  return React.useContext(PermissionContext);
}

export { PermissionProvider, usePermission, PermissionContext };
export type { PermissionProviderProps, PermissionContextValue };
