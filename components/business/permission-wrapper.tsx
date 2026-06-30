"use client";

import * as React from "react";

import { usePermission } from "@/hooks/use-permission";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * @component PermissionWrapper
 * @category business/auth
 * @since 0.7.0
 * @description 权限包裹组件 — 无权限时隐藏或禁用子元素。
 * 集成 usePermission Hook，也可通过 check prop 自定义校验。
 * / Permission wrapper — hides or disables children when unauthorized.
 * @keywords permission, auth, guard, wrapper, access control
 * @example
 * <PermissionWrapper code="order:approve">
 *   <Button>审批</Button>
 * </PermissionWrapper>
 *
 * <PermissionWrapper code="order:delete" mode="disable">
 *   <Button variant="destructive">删除</Button>
 * </PermissionWrapper>
 */

interface PermissionWrapperProps {
  /** Required permission code / 所需权限码 */
  code: string;
  /** Behavior when unauthorized: "hide" removes from DOM, "disable" dims + blocks
   * / 无权限行为：hide 隐藏 / disable 禁用 */
  mode?: "hide" | "disable";
  /** Custom check function (overrides usePermission) / 自定义校验函数 */
  check?: (permission: string) => boolean;
  /** Fallback content rendered when unauthorized (hide mode only)
   * / 无权限时的替代内容（仅 hide 模式） */
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

function PermissionWrapper({
  code,
  mode = "hide",
  check,
  fallback = null,
  children,
}: PermissionWrapperProps) {
  const { hasPermission } = usePermission();
  const authorized = check ? check(code) : hasPermission(code);

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

/**
 * @component PermissionButton
 * @category business/auth
 * @since 0.7.0
 * @description 按钮级权限封装 — 无权限时自动 disabled + tooltip 提示。
 * / Button with built-in permission check — auto-disabled when unauthorized.
 * @keywords permission, button, auth, access control
 * @example
 * <PermissionButton code="order:create" onClick={handleCreate}>
 *   新增
 * </PermissionButton>
 */

interface PermissionButtonProps extends ButtonProps {
  /** Required permission code / 所需权限码 */
  code: string;
  /** Custom check function (overrides usePermission) / 自定义校验 */
  check?: (permission: string) => boolean;
  /** Tooltip shown when unauthorized / 无权限时的提示文本 */
  unauthorizedTooltip?: string;
}

function PermissionButton({
  code,
  check,
  unauthorizedTooltip,
  disabled,
  className,
  children,
  ...props
}: PermissionButtonProps) {
  const { hasPermission } = usePermission();
  const authorized = check ? check(code) : hasPermission(code);

  if (!authorized) {
    return (
      <span title={unauthorizedTooltip} className="inline-flex">
        <Button {...props} disabled className={cn("opacity-50", className)}>
          {children}
        </Button>
      </span>
    );
  }

  return (
    <Button {...props} disabled={disabled} className={className}>
      {children}
    </Button>
  );
}

/**
 * @function withPermission
 * @category business/auth
 * @since 0.7.0
 * @description 高阶组件 — 拦截无权限的渲染。
 * / HOC that blocks rendering when the user lacks the specified permission.
 * @keywords permission, hoc, auth, higher-order component
 * @example
 * const ProtectedForm = withPermission("order:edit")(OrderForm);
 */
function withPermission<P extends object>(
  code: string,
  fallback?: React.ReactNode,
): (Component: React.ComponentType<P>) => React.ComponentType<P> {
  return (Component) => {
    const Wrapped = (props: P) => (
      <PermissionWrapper code={code} fallback={fallback}>
        <Component {...props} />
      </PermissionWrapper>
    );
    Wrapped.displayName = `withPermission(${Component.displayName ?? Component.name})`;
    return Wrapped;
  };
}

export { PermissionWrapper, PermissionButton, withPermission };
export type { PermissionWrapperProps, PermissionButtonProps };
