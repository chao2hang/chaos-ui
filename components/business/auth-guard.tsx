"use client";

import * as React from "react";

/**
 * @component AuthGuard
 * @category business/auth
 * @since 0.5.0
 * @description Permission guard — hides or disables children when the user
 * lacks the specified permission. Works with any permission check function.
 * / 权限守卫组件，无权限时隐藏或禁用子元素
 * @keywords auth, permission, guard, role, access
 * @example
 * <AuthGuard permission="order:create">
 *   <Button>代客下单</Button>
 * </AuthGuard>
 *
 * <AuthGuard permission="order:delete" mode="disable">
 *   <Button variant="destructive">删除</Button>
 * </AuthGuard>
 */

interface AuthGuardProps {
  /** Required permission string / 所需权限标识 */
  permission: string;
  /** Behavior when unauthorized: "hide" removes from DOM, "disable" adds disabled styling
   * / 无权限时行为：hide 隐藏 / disable 禁用 */
  mode?: "hide" | "disable";
  /** Permission check function — return true to grant access
   * / 权限校验函数，返回 true 表示有权限 */
  check?: (permission: string) => boolean;
  /** Fallback content rendered when unauthorized (mode="hide" only)
   * / 无权限时的替代内容（仅 hide 模式） */
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

function AuthGuard({
  permission,
  mode = "hide",
  check,
  fallback = null,
  children,
}: AuthGuardProps) {
  const authorized = check ? check(permission) : true;

  if (!authorized) {
    if (mode === "disable") {
      return (
        <div className="pointer-events-none opacity-50" aria-disabled="true">
          {children}
        </div>
      );
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export { AuthGuard };
export type { AuthGuardProps };
