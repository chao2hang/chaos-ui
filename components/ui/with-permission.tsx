"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component WithPermission
 * @category UI
 * @since 1.0.0-beta.0
 * @description 权限门控组件，根据当前用户权限决定渲染 children 或 fallback
 * @example
 * ```tsx
 * <WithPermission permissions={userPerms} require={["order:approve"]} mode="any">
 *   <ApproveButton />
 * </WithPermission>
 * ```
 */
export interface WithPermissionProps {
  /** 当前用户拥有的权限列表 / current user's permissions */
  permissions?: string[];
  /** 需要的权限 / required permission(s) */
  require?: string | string[];
  /** 校验模式：any=任一满足，all=全部满足 / "any" | "all" */
  mode?: "any" | "all";
  /** 不满足时渲染的兜底内容 / fallback content */
  fallback?: React.ReactNode;
  /** 受控子内容 / guarded children */
  children?: React.ReactNode;
  /** 附加类名 / extra class */
  className?: string;
}

function hasPermission(
  permissions: string[],
  require: string | string[] | undefined,
  mode: "any" | "all",
): boolean {
  if (require === undefined) return true;
  const required = Array.isArray(require) ? require : [require];
  if (required.length === 0) return true;
  if (mode === "all") {
    return required.every((perm) => permissions.includes(perm));
  }
  return required.some((perm) => permissions.includes(perm));
}

function WithPermission({
  permissions,
  require,
  mode = "any",
  fallback = null,
  children,
  className,
}: WithPermissionProps) {
  const current = permissions ?? [];
  const allowed = hasPermission(current, require, mode);

  if (!allowed) {
    return (
      <div
        data-slot="with-permission"
        data-allowed="false"
        className={cn("", className)}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div
      data-slot="with-permission"
      data-allowed="true"
      className={cn("", className)}
    >
      {children}
    </div>
  );
}

export { WithPermission };
