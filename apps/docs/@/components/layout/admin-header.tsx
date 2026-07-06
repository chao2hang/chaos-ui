import * as React from "react";
import { cn } from "@/lib/utils";

interface AdminHeaderProps extends React.ComponentProps<"div"> {
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  userMenu?: React.ReactNode;
}

export function AdminHeader({
  logo,
  actions,
  userMenu,
  className,
  children,
  ...props
}: AdminHeaderProps) {
  return (
    <header
      data-slot="admin-header"
      className={cn(
        "bg-background flex h-14 items-center gap-4 border-b px-4",
        className,
      )}
      {...props}
    >
      {logo && <div className="flex items-center">{logo}</div>}
      {children}
      <div className="ml-auto flex items-center gap-2">
        {actions}
        {userMenu}
      </div>
    </header>
  );
}
