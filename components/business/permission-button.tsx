"use client";
import { cn } from "@/lib/utils";

/**
 * @component PermissionButton
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <PermissionButton />
 * ```
 * 按钮级权限封装
 */
export interface PermissionButtonProps {
  className?: string;
}

function PermissionButton({ className }: PermissionButtonProps) {
  return <div data-slot="permission-button" className={cn("", className)} />;
}

export { PermissionButton };
