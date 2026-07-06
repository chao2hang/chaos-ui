"use client";
import * as React from "react";
import { ShieldOffIcon } from "lucide-react";

interface AuthGuardProps {
  permission?: string | string[];
  permissions?: string[];
  mode?: "all" | "any";
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const defaultContext = React.createContext<string[]>([]);

function usePermissions() {
  return React.useContext(defaultContext);
}

function AuthGuardProvider({
  children,
  permissions = [],
}: {
  children: React.ReactNode;
  permissions?: string[];
}) {
  return (
    <defaultContext.Provider value={permissions}>
      {children}
    </defaultContext.Provider>
  );
}

function AuthGuard({
  permission,
  permissions: requiredPermissions,
  mode = "any",
  fallback,
  children,
}: AuthGuardProps) {
  const userPermissions = usePermissions();
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
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <ShieldOffIcon className="text-muted-foreground/40 size-12" />
        <p className="text-muted-foreground mt-3 text-sm">暂无访问权限</p>
      </div>
    );
  }

  return <>{children}</>;
}

export { AuthGuard, AuthGuardProvider, usePermissions };
export type { AuthGuardProps };
