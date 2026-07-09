"use client";
import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { LockIcon } from "@chaos_team/chaos-ui/ui";

/**
 * @component PermissionButton
 * @category Business
 * @since 1.0.0-beta.0
 * @description 按钮级权限封装 — 依据权限码控制按钮的可见/可用状态，无权限时禁用并提示。
 * @param permission 所需权限码
 * @param permissions 当前用户拥有的权限码集合（默认全部放行）
 * @param mode 无权限时的处理方式：disable(禁用，默认) 或 hide(隐藏)
 * @param children 按钮文本
 * @param onClick 点击回调
 * @param variant 按钮样式（透传 Button）
 * @example
 * ```tsx
 * <PermissionButton
 *   permission="bill:approve"
 *   permissions={["bill:approve"]}
 *   onClick={() => approve()}
 * >
 *   审批
 * </PermissionButton>
 * ```
 */
interface PermissionButtonProps {
  /** 所需权限码 */
  permission?: string;
  /** 当前用户拥有的权限码集合 */
  permissions?: string[];
  /** 无权限时的处理方式 */
  mode?: "disable" | "hide";
  /** 按钮文本 */
  children?: React.ReactNode;
  /** 点击回调 */
  onClick?: () => void;
  /** 按钮样式 */
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  /** 禁用状态（外部控制，与权限叠加） */
  disabled?: boolean;
  className?: string;
}

function PermissionButton({
  permission,
  permissions,
  mode = "disable",
  children = "操作",
  onClick,
  variant = "default",
  disabled = false,
  className,
}: PermissionButtonProps) {
  // 无 permissions 集合时默认放行（未接入权限系统）
  const hasPermission =
    permissions === undefined || permission === undefined
      ? true
      : permissions.includes(permission);

  if (!hasPermission && mode === "hide") {
    return null;
  }

  const isDisabled = disabled || !hasPermission;

  return (
    <div
      data-slot="permission-button"
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      <Button
        type="button"
        variant={variant}
        onClick={onClick}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        icon={isDisabled ? <LockIcon /> : undefined}
      >
        {children}
      </Button>
      {!hasPermission && mode === "disable" && (
        <span className="text-xs text-muted-foreground">无权限</span>
      )}
    </div>
  );
}

export { PermissionButton };
export type { PermissionButtonProps };
