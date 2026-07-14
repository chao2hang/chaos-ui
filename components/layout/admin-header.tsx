"use client";

import * as React from "react";
import { Bell, ChevronLeft, ChevronRight, Menu, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

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
  /**
   * Custom render for this crumb's BreadcrumbLink (e.g. Next.js Link).
   * Uses Base UI `useRender` prop on BreadcrumbLink (CUI-NAV-03).
   * / 自定义面包屑链接渲染（如 Next.js Link）
   */
  render?: React.ComponentProps<typeof BreadcrumbLink>["render"];
}

interface AdminHeaderProps extends React.ComponentProps<"header"> {
  /** Breadcrumb items / 面包屑项 */
  breadcrumb?: AdminBreadcrumbItem[];
  /**
   * Default render for all breadcrumb links with href (overridden per-item by item.render).
   * / 默认面包屑链接渲染，可被单项 render 覆盖
   */
  breadcrumbLinkRender?: React.ComponentProps<typeof BreadcrumbLink>["render"];
  /** Logo content / Logo 内容 */
  logo?: React.ReactNode;
  /** Whether to show search / 是否显示搜索 */
  showSearch?: boolean;
  /**
   * Search position relative to breadcrumb (issue #12).
   * - `"before-breadcrumb"` (default): compact search left of crumbs
   * - `"after-breadcrumb"`: legacy middle flex-1 search after crumbs
   */
  searchPlacement?: "before-breadcrumb" | "after-breadcrumb";
  /** Search placeholder / 搜索占位文本 */
  searchPlaceholder?: string;
  /** Search callback / 搜索回调 */
  onSearch?: (value: string) => void;
  /** Menu toggle callback (mobile) / 菜单切换回调 */
  onMenuClick?: () => void;
  /**
   * Desktop sider collapse toggle (issue #17). Renders at the far left on `lg+`.
   * Distinct from mobile `onMenuClick` (drawer).
   * / 桌面侧栏折叠（顶栏最左，lg+）；与移动端汉堡语义分离
   */
  onCollapseClick?: () => void;
  /** Current collapsed state for desktop collapse icon / 当前折叠态（控制顶栏折叠图标） */
  collapsed?: boolean;
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
  breadcrumbLinkRender,
  logo,
  showSearch = true,
  searchPlacement = "before-breadcrumb",
  searchPlaceholder = "Search...",
  onSearch,
  onMenuClick,
  onCollapseClick,
  collapsed = false,
  actions,
  userMenu,
  notificationCount = 0,
  onNotificationClick,
  sticky = true,
  ...props
}: AdminHeaderProps) {
  const [searchValue, setSearchValue] = React.useState("");
  const searchBefore = searchPlacement === "before-breadcrumb";

  const breadcrumbNode =
    breadcrumb && breadcrumb.length > 0 ? (
      <Breadcrumb
        className={cn(
          "hidden min-w-0 lg:flex",
          searchBefore && showSearch && "flex-1",
        )}
      >
        <BreadcrumbList>
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {item.href && index < breadcrumb.length - 1 ? (
                  <BreadcrumbLink
                    href={item.href}
                    {...(item.render !== undefined
                      ? { render: item.render }
                      : breadcrumbLinkRender !== undefined
                        ? { render: breadcrumbLinkRender }
                        : {})}
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    ) : null;

  // before: compact width so crumbs are not crushed; after: flex-1 middle fill.
  // Never put ml-auto on search — trailing actions stay the single right pin (CUI-LAYOUT-01).
  const searchNode = showSearch ? (
    <div
      data-slot="admin-header-search"
      className={cn(
        "relative hidden min-w-0 md:block",
        searchBefore ? "mx-2 w-56 max-w-xs shrink-0" : "mx-4 max-w-sm flex-1",
      )}
    >
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2" />
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
  ) : null;

  return (
    <header
      data-slot="admin-header"
      className={cn(
        "border-border bg-background z-30 flex h-16 items-center gap-4 border-b px-4",
        sticky && "sticky top-0",
        className,
      )}
      {...props}
    >
      {/* Desktop sider collapse (lg+) — issue #17 */}
      {onCollapseClick && (
        <Button
          variant="ghost"
          size="icon"
          data-slot="admin-header-collapse"
          className="hidden shrink-0 lg:inline-flex"
          onClick={onCollapseClick}
          aria-label={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? (
            <ChevronRight className="size-5" />
          ) : (
            <ChevronLeft className="size-5" />
          )}
        </Button>
      )}

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

      {searchBefore ? (
        <>
          {searchNode}
          {breadcrumbNode}
        </>
      ) : (
        <>
          {breadcrumbNode}
          {searchNode}
        </>
      )}

      {/* Right actions — always pin to the trailing edge (CUI-LAYOUT-01).
          Do not use md:ml-0: when search is hidden there is no other spacer,
          and cancelling ml-auto on desktop leaves the user menu stuck next
          to the breadcrumb. */}
      <div
        data-slot="admin-header-actions"
        className="ml-auto flex shrink-0 items-center gap-2"
      >
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
              <span className="bg-destructive text-destructive-foreground absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-xs font-bold">
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
