"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface AppShellProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarWidth?: number;
  /** Width when sidebar is collapsed (desktop). / 折叠时侧栏宽度 */
  collapsedWidth?: number;
  asideWidth?: number;
  sidebarCollapsible?: boolean;
  defaultCollapsed?: boolean;
  variant?: "default" | "floating" | "sticky";
}

export function AppShell({
  header,
  sidebar,
  aside,
  footer,
  sidebarWidth = 240,
  collapsedWidth = 0,
  asideWidth = 280,
  sidebarCollapsible = true,
  defaultCollapsed = false,
  variant = "default",
  className,
  children,
  ...props
}: AppShellProps) {
  const { t } = useTranslation("navigation");
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const currentWidth = collapsed ? collapsedWidth : sidebarWidth;

  return (
    <div
      data-slot="app-shell"
      data-variant={variant}
      data-sidebar-collapsed={collapsed}
      className={cn("flex min-h-screen flex-col bg-background", className)}
      {...props}
    >
      {header && (
        <header
          className={cn(
            "z-30 flex h-14 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
            variant === "sticky" && "sticky top-0",
          )}
        >
          {sidebar && sidebarCollapsible && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setMobileOpen((v) => !v)}
              className="ml-2 md:hidden"
              aria-label={t("appShell.toggleSidebar")}
            >
              <span className="i-lucide-menu" aria-hidden>
                ≡
              </span>
            </Button>
          )}
          {header}
        </header>
      )}
      <div className="flex flex-1 overflow-hidden">
        {sidebar && (
          <>
            {mobileOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/50 md:hidden"
                onClick={() => setMobileOpen(false)}
              />
            )}
            <aside
              className={cn(
                "z-40 flex shrink-0 flex-col border-r bg-background",
                "fixed inset-y-0 left-0 top-14 transition-transform md:static md:translate-x-0",
                mobileOpen ? "translate-x-0" : "-translate-x-full",
                variant === "floating" &&
                  "md:m-2 md:rounded-lg md:border md:shadow-sm",
              )}
              style={{ width: currentWidth }}
              aria-hidden={collapsed && collapsedWidth === 0}
            >
              <div className="flex-1 overflow-y-auto">{sidebar}</div>
              {sidebarCollapsible && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setCollapsed((v) => !v)}
                  className="m-2 hidden h-8 text-xs text-muted-foreground md:inline-flex"
                  aria-label={
                    collapsed
                      ? t("appShell.expandSidebar")
                      : t("appShell.collapseSidebar")
                  }
                >
                  {collapsed ? "→" : "←"}
                </Button>
              )}
            </aside>
          </>
        )}
        <main className="flex-1 overflow-y-auto">{children}</main>
        {aside && (
          <aside
            className="hidden shrink-0 overflow-y-auto border-l bg-background lg:block"
            style={{ width: asideWidth }}
          >
            {aside}
          </aside>
        )}
      </div>
      {footer && (
        <footer className="border-t bg-background/95 px-4 py-3 text-xs text-muted-foreground">
          {footer}
        </footer>
      )}
    </div>
  );
}
