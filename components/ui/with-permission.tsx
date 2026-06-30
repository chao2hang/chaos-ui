"use client";
import { cn } from "@/lib/utils";

/**
 * @component WithPermission
 * @category UI
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <WithPermission />
 * ```
 * 高阶组件权限
 */
export interface WithPermissionProps {
  className?: string;
}

function WithPermission({ className }: WithPermissionProps) {
  return <div data-slot="with-permission" className={cn("", className)} />;
}

export { WithPermission };
