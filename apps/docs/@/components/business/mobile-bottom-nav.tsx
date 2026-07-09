"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface MobileNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number | string;
  active?: boolean;
}

interface MobileBottomNavProps extends Omit<
  React.ComponentProps<"nav">,
  "onChange"
> {
  items: MobileNavItem[];
  onChange?: (href: string) => void;
  variant?: "default" | "floating";
  className?: string;
}

export function MobileBottomNav({
  items = [],
  onChange,
  variant = "default",
  className,
  ...props
}: MobileBottomNavProps) {
  return (
    <nav
      data-slot="mobile-bottom-nav"
      aria-label="底部导航"
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/80 fixed right-0 bottom-0 left-0 z-40 border-t backdrop-blur md:hidden",
        variant === "floating" && "mx-3 mb-3 rounded-2xl border shadow-lg",
        className,
      )}
      {...props}
    >
      <ul className="flex items-stretch justify-around">
        {items.map((item) => {
          const isActive = item.active;
          const content = (
            <span
              className={cn(
                "flex h-14 w-full flex-col items-center justify-center gap-0.5 text-[0.65rem] transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <span className="relative">
                {item.icon}
                {item.badge !== undefined && item.badge !== 0 && (
                  <span className="bg-destructive text-destructive-foreground absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.6rem] font-medium">
                    {item.badge}
                  </span>
                )}
              </span>
              {item.label}
            </span>
          );
          return (
            <li key={item.href} className="flex-1">
              {onChange ? (
                <button
                  type="button"
                  onClick={() => onChange(item.href)}
                  className="w-full"
                  aria-current={isActive ? "page" : undefined}
                >
                  {content}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="block"
                  aria-current={isActive ? "page" : undefined}
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
