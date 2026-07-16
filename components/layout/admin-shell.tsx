"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  AdminHeader,
  type AdminHeaderProps,
} from "@/components/layout/admin-header";
import {
  AdminSider,
  type AdminCollapseTrigger,
  type AdminSiderLinkComponent,
  type MenuItem,
} from "@/components/layout/admin-sider";
import { AdminTabs, type TabItem } from "@/components/layout/admin-tabs";
import {
  UserMenu,
  type UserMenuUser,
  type UserMenuAction,
} from "@/components/business/user-menu";
import {
  NotificationCenter,
  type NotificationItem,
} from "@/components/business/notification-center";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

/**
 * @component AdminShell
 * @category layout/admin
 * @since 0.8.0
 * @description Pre-wired admin layout composing AdminHeader, AdminSider, AdminTabs, UserMenu, and NotificationCenter into a single config-driven shell. Eliminates repetitive boilerplate wiring across ERP apps. / 预集成的后台布局，将 AdminHeader、AdminSider、AdminTabs、UserMenu、NotificationCenter 组合为单次配置驱动的外壳，消除重复的样板代码。
 * @keywords admin, shell, layout, sidebar, header, tabs, notification, user-menu, composition
 * @example
 * <AdminShell
 *   menuItems={menuItems}
 *   logo={<CompanyLogo />}
 *   user={{ name: "Admin", email: "admin@example.com" }}
 *   tabs={tabs}
 *   activeTabKey="home"
 * >
 *   <DashboardContent />
 * </AdminShell>
 */

interface AdminShellProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  // ── Sidebar ──
  /** Menu items for the sidebar / 侧栏菜单项 */
  menuItems?: MenuItem[];
  /** Selected menu key / 选中菜单 key */
  selectedMenuKey?: string;
  /**
   * How selectedMenuKey matches AdminSider items (CUI-NAV-02).
   * Default `"prefix"` so deep routes still expand/highlight the menu item.
   */
  selectedMatch?: "exact" | "prefix";
  /** Menu item click callback / 菜单项点击回调 */
  onMenuItemClick?: (item: MenuItem) => void;
  /** Logo displayed in header and sider / 头部和侧栏的 Logo */
  logo?: React.ReactNode;
  /**
   * Compact sider logo when collapsed (issue #11).
   * / 折叠侧栏紧凑 Logo
   */
  logoCollapsed?: React.ReactNode;
  /** Footer content in sidebar / 侧栏底部内容 */
  siderFooter?: React.ReactNode;
  /** Default collapsed state / 默认折叠状态 */
  defaultCollapsed?: boolean;
  /** Sidebar expanded width / 展开宽度 */
  sidebarWidth?: number;
  /** Sidebar collapsed width / 折叠宽度 */
  collapsedWidth?: number;
  /**
   * Desktop collapse control placement (issue #17).
   * Default `"header"`: topbar far-left (beside breadcrumb); sider edge handle off.
   * Use `"sider-edge"` for legacy mid-sider absolute handle.
   * / 桌面折叠钮位置；默认顶栏最左
   */
  collapseTrigger?: AdminCollapseTrigger;
  /**
   * Top-level menu expand mode for AdminSider (issue #43).
   * Default `"multiple"`. Pass `"accordion"` for single top-level group open.
   * / 顶层菜单展开模式；透传 AdminSider
   */
  menuExpandMode?: "multiple" | "accordion";

  // ── Header ──
  /** Breadcrumb items / 面包屑项 */
  breadcrumb?: AdminHeaderProps["breadcrumb"];
  /** Whether to show search in header / 是否在头部显示搜索 */
  showSearch?: boolean;
  /**
   * Search position relative to breadcrumb (issue #12).
   * Default `"before-breadcrumb"`.
   */
  searchPlacement?: AdminHeaderProps["searchPlacement"];
  /** Search placeholder / 搜索占位文本 */
  searchPlaceholder?: string;
  /** Search callback / 搜索回调 */
  onSearch?: (value: string) => void;
  /** Extra actions in header / 头部额外操作 */
  headerActions?: React.ReactNode;

  // ── User ──
  /** Current user info / 当前用户信息 */
  user?: UserMenuUser;
  /** Custom user menu actions / 自定义用户菜单操作 */
  userMenuActions?: UserMenuAction[];
  /** Profile click callback / 个人信息点击回调 */
  onProfile?: () => void;
  /** Settings click callback / 设置点击回调 */
  onSettings?: () => void;
  /** Sign out callback / 退出登录回调 */
  onSignOut?: () => void;

  // ── Notifications ──
  /** Notification items for NotificationCenter / 通知列表 */
  notifications?: NotificationItem[];
  /** Mark notification as read / 标记通知已读 */
  onNotificationMarkRead?: (id: string) => void;
  /** Mark all notifications as read / 全部标为已读 */
  onNotificationMarkAllRead?: () => void;
  /** Clear all notifications / 清空通知 */
  onNotificationClear?: () => void;
  /** Notification item click callback / 通知项点击回调 */
  onNotificationItemClick?: (item: NotificationItem) => void;
  /** NotificationCenter alignment / 通知中心对齐方式 */
  notificationAlign?: "start" | "center" | "end";

  // ── Tabs ──
  /** Tab items / Tab 项 */
  tabs?: TabItem[];
  /** Active tab key / 当前激活的 tab key */
  activeTabKey?: string;
  /** Tab change callback / Tab 切换回调 */
  onTabChange?: (key: string) => void;
  /** Tab close callback / Tab 关闭回调 */
  onTabClose?: (key: string) => void;
  /** Close all tabs / 关闭全部 */
  onTabCloseAll?: () => void;
  /** Close other tabs / 关闭其他 */
  onTabCloseOthers?: (key: string) => void;
  /** Close tabs to the right / 关闭右侧 */
  onTabCloseToRight?: (key: string) => void;
  /** Refresh tab / 刷新标签页 */
  onTabRefresh?: (key: string) => void;

  // ── Shell ──
  /** Aside content (detail panel) / 右侧面板内容 */
  aside?: React.ReactNode;
  /** Aside panel width / 右侧面板宽度 */
  asideWidth?: number;
  /**
   * Controlled open state for the **content** aside Sheet on viewports &lt; lg.
   * Sider mobile uses AdminSider `mobileOpen` separately.
   */
  asideOpen?: boolean;
  /** Uncontrolled default for content aside Sheet */
  defaultAsideOpen?: boolean;
  /** Content aside Sheet open change */
  onAsideOpenChange?: (open: boolean) => void;
  /** Label for mobile aside toggle */
  asideToggleLabel?: string;
  /** Footer content / 底部内容 */
  footer?: React.ReactNode;

  /**
   * Content area padding (CUI-LAYOUT-03).
   * - `true` (default): `p-4` for backward compatibility
   * - `false`: no padding — app layout owns gutter (preferred when nesting FE-10 `p-4 lg:p-6`)
   * - string: custom Tailwind classes, e.g. `"p-4 lg:p-6"`
   * / 内容区内边距。应用自管 gutter 时请传 false，且不要再包一层 main。
   */
  contentPadding?: boolean | string;
  /** Extra class names on the content main / 内容 main 额外类名 */
  contentClassName?: string;
  /**
   * Router link component for sider menu items (CUI-NAV-01).
   * Pass Next.js `Link` (or similar) to avoid full-page reloads.
   * / 侧栏菜单自定义链接组件
   */
  linkComponent?: AdminSiderLinkComponent;
  /**
   * Default render for AdminHeader breadcrumb links (CUI-NAV-03).
   * / 顶栏面包屑默认自定义链接渲染
   */
  breadcrumbLinkRender?: React.ComponentProps<
    typeof import("@/components/ui/breadcrumb").BreadcrumbLink
  >["render"];

  /** Page content / 页面内容 */
  children?: React.ReactNode;
  /** Additional class names / 额外样式类 */
  className?: string;
}

export function AdminShell({
  // Sidebar
  menuItems = [],
  selectedMenuKey,
  selectedMatch,
  onMenuItemClick,
  logo,
  logoCollapsed,
  siderFooter,
  defaultCollapsed = false,
  sidebarWidth = 240,
  collapsedWidth = 64,
  collapseTrigger = "header",
  menuExpandMode,

  // Header
  breadcrumb,
  showSearch = true,
  searchPlacement,
  searchPlaceholder = "Search...",
  onSearch,
  headerActions,

  // User
  user,
  userMenuActions,
  onProfile,
  onSettings,
  onSignOut,

  // Notifications
  notifications = [],
  onNotificationMarkRead,
  onNotificationMarkAllRead,
  onNotificationClear,
  onNotificationItemClick,
  notificationAlign = "end",

  // Tabs
  tabs = [],
  activeTabKey,
  onTabChange,
  onTabClose,
  onTabCloseAll,
  onTabCloseOthers,
  onTabCloseToRight,
  onTabRefresh,

  // Shell
  aside,
  asideWidth = 280,
  asideOpen: asideOpenProp,
  defaultAsideOpen = false,
  onAsideOpenChange,
  asideToggleLabel = "Details",
  footer,
  contentPadding = true,
  contentClassName,
  linkComponent,
  breadcrumbLinkRender,
  children,
  className,
}: AdminShellProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [asideOpenUncontrolled, setAsideOpenUncontrolled] =
    React.useState(defaultAsideOpen);
  const asideOpen = asideOpenProp ?? asideOpenUncontrolled;
  const setAsideOpen = onAsideOpenChange ?? setAsideOpenUncontrolled;

  // Build user menu element
  const userMenuElement = user ? (
    <UserMenu
      user={user}
      {...(userMenuActions !== undefined ? { actions: userMenuActions } : {})}
      {...(onProfile !== undefined ? { onProfile } : {})}
      {...(onSettings !== undefined ? { onSettings } : {})}
      {...(onSignOut !== undefined ? { onSignOut } : {})}
    />
  ) : undefined;

  // Build notification center element (shown in header area).
  // Prefer NotificationCenter over AdminHeader.notificationCount for full UX.
  const notificationCenterElement =
    notifications.length > 0 ? (
      <NotificationCenter
        notifications={notifications}
        {...(onNotificationMarkRead !== undefined
          ? { onMarkRead: onNotificationMarkRead }
          : {})}
        {...(onNotificationMarkAllRead !== undefined
          ? { onMarkAllRead: onNotificationMarkAllRead }
          : {})}
        {...(onNotificationClear !== undefined
          ? { onClear: onNotificationClear }
          : {})}
        {...(onNotificationItemClick !== undefined
          ? { onItemClick: onNotificationItemClick }
          : {})}
        align={notificationAlign}
      />
    ) : undefined;

  return (
    <div
      data-slot="admin-shell"
      // Fill host (h-full); app roots should set min-h-svh / h-svh on html/body or via className.
      className={cn("bg-background flex h-full min-h-0", className)}
    >
      {/* Sidebar */}
      <AdminSider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        collapseTrigger={collapseTrigger}
        menuItems={menuItems}
        {...(selectedMenuKey !== undefined
          ? { selectedKey: selectedMenuKey }
          : {})}
        {...(selectedMatch !== undefined ? { selectedMatch } : {})}
        {...(onMenuItemClick !== undefined
          ? { onItemClick: onMenuItemClick }
          : {})}
        logo={logo}
        {...(logoCollapsed !== undefined ? { logoCollapsed } : {})}
        {...(siderFooter !== undefined ? { footer: siderFooter } : {})}
        width={sidebarWidth}
        collapsedWidth={collapsedWidth}
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
        {...(linkComponent !== undefined ? { linkComponent } : {})}
        {...(menuExpandMode !== undefined ? { menuExpandMode } : {})}
      />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader
          {...(breadcrumb !== undefined ? { breadcrumb } : {})}
          {...(breadcrumbLinkRender !== undefined
            ? { breadcrumbLinkRender }
            : {})}
          logo={logo}
          showSearch={showSearch}
          {...(searchPlacement !== undefined ? { searchPlacement } : {})}
          searchPlaceholder={searchPlaceholder}
          {...(onSearch !== undefined ? { onSearch } : {})}
          onMenuClick={() => setMobileOpen((v) => !v)}
          {...(collapseTrigger === "header" || collapseTrigger === "both"
            ? {
                onCollapseClick: () => setCollapsed((v) => !v),
                collapsed,
              }
            : {})}
          {...(headerActions !== undefined ? { actions: headerActions } : {})}
          {...(userMenuElement !== undefined
            ? { userMenu: userMenuElement }
            : {})}
          {...(notificationCenterElement !== undefined
            ? {
                actions: (
                  <>
                    {notificationCenterElement}
                    {headerActions}
                  </>
                ),
              }
            : {})}
        />

        {/* Tabs bar */}
        {tabs.length > 0 && (
          <div className="border-border bg-background border-b">
            <AdminTabs
              items={tabs}
              {...(activeTabKey !== undefined
                ? { activeKey: activeTabKey }
                : {})}
              {...(onTabChange !== undefined ? { onChange: onTabChange } : {})}
              {...(onTabClose !== undefined ? { onClose: onTabClose } : {})}
              {...(onTabCloseAll !== undefined
                ? { onCloseAll: onTabCloseAll }
                : {})}
              {...(onTabCloseOthers !== undefined
                ? { onCloseOthers: onTabCloseOthers }
                : {})}
              {...(onTabCloseToRight !== undefined
                ? { onCloseToRight: onTabCloseToRight }
                : {})}
              {...(onTabRefresh !== undefined
                ? { onRefresh: onTabRefresh }
                : {})}
            />
          </div>
        )}

        {/* Content area with optional aside */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            {aside ? (
              <div className="border-border flex items-center justify-end border-b px-4 py-2 lg:hidden">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAsideOpen(true)}
                >
                  {asideToggleLabel}
                </Button>
              </div>
            ) : null}
            {/*
              Single document <main> landmark (CUI-LAYOUT-03).
              Do not nest another <main> in children. If the app owns gutter
              (e.g. FE-10 p-4 lg:p-6), pass contentPadding={false}.
              Height chain (CUI-LAYOUT-04): shell is h-full; host should set
              min-h-svh / h-svh on html/body or a full-height ancestor.
            */}
            <main
              data-slot="admin-shell-content"
              className={cn(
                "flex-1 overflow-y-auto",
                contentPadding === false
                  ? undefined
                  : contentPadding === true
                    ? "p-4"
                    : contentPadding,
                contentClassName,
              )}
            >
              {children}
            </main>
          </div>

          {/* Desktop content aside */}
          {aside ? (
            <aside
              data-slot="admin-shell-aside"
              className="border-border hidden shrink-0 overflow-y-auto border-l lg:block"
              style={{ width: asideWidth }}
            >
              {aside}
            </aside>
          ) : null}

          {/* Mobile content aside → Sheet (independent of Sider mobileOpen) */}
          {aside ? (
            <Sheet open={asideOpen} onOpenChange={setAsideOpen}>
              <SheetContent
                side="right"
                className="w-full sm:max-w-sm lg:hidden"
                style={{ maxWidth: asideWidth }}
              >
                <SheetTitle className="sr-only">{asideToggleLabel}</SheetTitle>
                <div className="h-full overflow-y-auto pt-2">{aside}</div>
              </SheetContent>
            </Sheet>
          ) : null}
        </div>

        {/* Footer */}
        {footer && (
          <footer className="border-border bg-background text-muted-foreground border-t px-4 py-3 text-xs">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

export type { AdminShellProps };

/** Shared shell chrome height token note: AdminHeader / AdminSider logo row use h-16 */
export const ADMIN_SHELL_HEADER_HEIGHT_CLASS = "h-16" as const;
