"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ShieldOffIcon } from "lucide-react";

interface PermissionWrapperProps {
  permission?: string | string[];
  permissions?: string[];
  mode?: "all" | "any";
  fallback?: React.ReactNode;
  userPermissions?: string[];
  children: React.ReactNode;
}

function PermissionWrapper({
  permission,
  permissions: requiredPermissions,
  mode = "any",
  fallback,
  userPermissions = [],
  children,
}: PermissionWrapperProps) {
  const required = permission
    ? Array.isArray(permission)
      ? permission
      : [permission]
    : (requiredPermissions ?? []);

  if (required.length === 0) return <>{children}</>;

  const hasPermission =
    mode === "all"
      ? required.every((p) => userPermissions.includes(p))
      : required.some((p) => userPermissions.includes(p));

  if (!hasPermission) {
    if (fallback) return <>{fallback}</>;
    return null;
  }

  return <>{children}</>;
}

export { PermissionWrapper };
export type { PermissionWrapperProps };
