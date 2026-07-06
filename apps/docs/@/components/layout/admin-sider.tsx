"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AdminSiderItem {
  key: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface AdminSiderProps extends React.ComponentProps<"aside"> {
  items?: AdminSiderItem[];
  activeKey?: string;
  onSelect?: (key: string) => void;
}

export function AdminSider({
  items,
  activeKey,
  onSelect,
  className,
  children,
  ...props
}: AdminSiderProps) {
  return (
    <aside
      data-slot="admin-sider"
      className={cn(
        "bg-background flex h-full w-56 shrink-0 flex-col border-r",
        className,
      )}
      {...props}
    >
      {items && items.length > 0 && (
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="flex flex-col gap-0.5">
            {items.map((item) => {
              const isActive = activeKey === item.key;

              const linkContent = (
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    item.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  {item.icon && <span className="size-4">{item.icon}</span>}
                  {item.label}
                </span>
              );

              if (item.href && !item.disabled) {
                return (
                  <li key={item.key}>
                    <Link href={item.href} className="block">
                      {linkContent}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.key}>
                  {onSelect ? (
                    <button
                      type="button"
                      className="w-full text-left"
                      onClick={() => onSelect(item.key)}
                    >
                      {linkContent}
                    </button>
                  ) : (
                    linkContent
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      {children && <div className="p-2">{children}</div>}
    </aside>
  );
}
