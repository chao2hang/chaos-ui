"use client";

import * as React from "react";
import { Bell, Menu, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

/**
 * @component AdminHeader
 * @category layout
 * @since 0.2.0
 * @description 后台顶栏(Logo + Breadcrumb + UserMenu + 全局操作) / Admin header with logo, breadcrumb, user menu, and global actions
 * @keywords header, topbar, admin, navigation, breadcrumb, search
 * @example
 * <AdminHeader
 *   breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]}
 *   onMenuClick={() => setSiderOpen(true)}
 *   actions={<Button>Settings</Button>}
 * />
 */

interface AdminBreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}

interface AdminHeaderProps extends React.ComponentProps<"header"> {
  /** Breadcrumb items / 面包屑项 */
  breadcrumb?: AdminBreadcrumbItem[];
  /** Logo content / Logo 内容 */
  logo?: React.ReactNode;
  /** Whether to show search / 是否显示搜索 */
  showSearch?: boolean;
  /** Search placeholder / 搜索占位文本 */
  searchPlaceholder?: string;
  /** Search callback / 搜索回调 */
  onSearch?: (value: string) => void;
  /** Menu toggle callback (mobile) / 菜单切换回调 */
  onMenuClick?: () => void;
  /** Right-side actions / 右侧操作区 */
  actions?: React.ReactNode;
  /** User menu content / 用户菜单内容 */
  userMenu?: React.ReactNode;
  /** Notification badge count / 通知徽标数 */
  notificationCount?: number;
  /** Notification click callback / 通知点击回调 */
  onNotificationClick?: () => void;
  /** Whether header is sticky / 是否吸顶 */
  sticky?: boolean;
}

function AdminHeader({
  className,
  breadcrumb,
  logo,
  showSearch = true,
  searchPlaceholder = "Search...",
  onSearch,
  onMenuClick,
  actions,
  userMenu,
  notificationCount = 0,
  onNotificationClick,
  sticky = true,
  ...props
}: AdminHeaderProps) {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <header
      data-slot="admin-header"
      className={cn(
        "z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-4",
        sticky && "sticky top-0",
        className,
      )}
      {...props}
    >
      {/* Mobile menu button */}
      {onMenuClick && (
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu className="size-5" />
        </Button>
      )}

      {/* Logo (mobile) */}
      {logo && <div className="lg:hidden">{logo}</div>}

      {/* Breadcrumb */}
      {breadcrumb && breadcrumb.length > 0 && (
        <Breadcrumb className="hidden lg:flex">
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {item.href && index < breadcrumb.length - 1 ? (
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}

      {/* Search */}
      {showSearch && (
        <div className="relative ml-auto hidden max-w-sm flex-1 md:block">
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch?.(searchValue);
            }}
            className="pl-8"
          />
        </div>
      )}

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2 md:ml-0">
        {actions}

        {/* Notifications */}
        {onNotificationClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onNotificationClick}
            aria-label="Notifications"
            className="relative"
          >
            <Bell className="size-5" />
            {notificationCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-xs font-bold text-destructive-foreground">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </Button>
        )}

        {/* User menu */}
        {userMenu}
      </div>
    </header>
  );
}

export { AdminHeader };
export type { AdminHeaderProps, AdminBreadcrumbItem };
