"use client";
import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { MenuIcon, XIcon, ChevronDownIcon } from "@/components/ui/icons";
import Link from "next/link";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface TopBarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: TopBarItem[];
}

interface TopBarProps extends React.ComponentProps<"header"> {
  logo?: React.ReactNode;
  logoHref?: string;
  nav?: TopBarItem[];
  actions?: React.ReactNode;
  sticky?: boolean;
  variant?: "default" | "transparent" | "bordered";
  className?: string;
}

/**
 * @component TopBar
 * @category layout/admin
 * @since 0.2.0
 * @description Responsive top navigation bar with logo, dropdown mega-menus, mobile hamburger drawer, and action slots / 响应式顶部导航栏，包含 Logo、下拉菜单、移动端汉堡抽屉和操作区插槽
 * @keywords top-bar, navigation, header, mega-menu, responsive, mobile, admin
 * @example
 * <TopBar logo={<Brand />} nav={navItems} actions={<UserMenu />} variant="bordered" />
 */
export function TopBar({
  logo: logoProp,
  logoHref = "/",
  nav = [],
  actions,
  sticky = true,
  variant = "default",
  className,
  ...props
}: TopBarProps) {
  const { t } = useTranslation("navigation");
  const logo = logoProp ?? t("topBar.defaultLogo");
  const [open, setOpen] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState<string | null>(null);

  return (
    <header
      data-slot="top-bar"
      data-variant={variant}
      className={cn(
        "z-30 flex h-14 items-center gap-4 px-4",
        sticky && "sticky top-0",
        variant === "bordered" && "border-b",
        variant === "default" &&
          "bg-background/95 supports-[backdrop-filter]:bg-background/80 border-b backdrop-blur",
        variant === "transparent" && "bg-transparent",
        className,
      )}
      {...props}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden"
        aria-label={t("topBar.toggleMenu")}
      >
        {open ? <XIcon /> : <MenuIcon />}
      </Button>
      <Link href={logoHref} className="flex items-center gap-2 font-semibold">
        {logo}
      </Link>
      <nav className="hidden flex-1 items-center gap-1 md:flex">
        {nav.map((item) =>
          item.children?.length ? (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setMegaOpen(item.href)}
              onMouseLeave={() => setMegaOpen(null)}
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
                aria-expanded={megaOpen === item.href}
              >
                {item.icon}
                {item.label}
                <ChevronDownIcon className="size-3.5" />
              </Button>
              {megaOpen === item.href && (
                <div className="bg-popover absolute top-full left-0 z-50 min-w-48 rounded-md border p-1 shadow-md">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="hover:bg-accent hover:text-accent-foreground block rounded-sm px-2 py-1.5 text-sm"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>
      <div className="ml-auto hidden items-center gap-2 sm:flex">{actions}</div>
      {open && (
        <div className="bg-background fixed inset-x-0 top-14 z-40 border-b p-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="hover:bg-muted rounded-md px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            {actions && (
              <div className="mt-2 flex flex-col gap-2 border-t pt-2">
                {actions}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

/**
 * @component MegaMenu
 * @category layout/admin
 * @since 0.2.0
 * @description Hover-triggered mega dropdown menu with grouped items, icons, and descriptions, suitable for complex navigation / 悬停触发的超级下拉菜单，包含分组项、图标和描述，适用于复杂导航结构
 * @keywords mega-menu, dropdown, navigation, hover, grouped, admin
 * @example
 * <MegaMenu trigger="Products" groups={[{ label: "Food", items: [{ label: "Snacks", href: "#", description: "All snacks" }] }]} />
 */
export function MegaMenu({
  trigger,
  groups,
  className,
}: {
  trigger: React.ReactNode;
  groups: Array<{
    label: string;
    items: Array<{
      label: string;
      href: string;
      description?: string;
      icon?: React.ReactNode;
    }>;
  }>;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium"
        aria-expanded={open}
      >
        {trigger}
        <ChevronDownIcon className="size-3.5" />
      </Button>
      {open && (
        <div
          className={cn(
            "absolute top-full left-1/2 z-50 -translate-x-1/2 pt-2",
            className,
          )}
        >
          <div className="bg-popover grid min-w-96 gap-6 rounded-lg border p-6 shadow-lg md:grid-cols-2">
            {groups.map((g) => (
              <div key={g.label} className="space-y-2">
                <h3 className="text-muted-foreground text-xs font-semibold">
                  {g.label}
                </h3>
                <ul className="space-y-1">
                  {g.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="hover:bg-accent flex items-start gap-3 rounded-md p-2"
                      >
                        {item.icon && (
                          <span className="text-muted-foreground mt-0.5">
                            {item.icon}
                          </span>
                        )}
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-muted-foreground text-xs">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
