"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { AppShell, type AppShellProps } from "@/components/layout/app-shell";
import {
  AdminHeader,
  type AdminHeaderProps,
} from "@/components/layout/admin-header";
import { AdminSider, type MenuItem } from "@/components/layout/admin-sider";
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

/**
 * @component AdminShell
 * @category layout/admin
 * @since 0.8.0
 * @description Pre-wired admin layout composing AppShell, AdminHeader, AdminSider, AdminTabs, UserMenu, and NotificationCenter into a single config-driven shell. Eliminates repetitive boilerplate wiring across ERP apps. / 预集成的后台布局，将 AppShell、AdminHeader、AdminSider、AdminTabs、UserMenu、NotificationCenter 组合为单次配置驱动的外壳，消除重复的样板代码。
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
  /** Menu item click callback / 菜单项点击回调 */
  onMenuItemClick?: (item: MenuItem) => void;
  /** Logo displayed in header and sider / 头部和侧栏的 Logo */
  logo?: React.ReactNode;
  /** Footer content in sidebar / 侧栏底部内容 */
  siderFooter?: React.ReactNode;
  /** Whether sidebar is collapsible / 侧栏是否可折叠 */
  sidebarCollapsible?: boolean;
  /** Default collapsed state / 默认折叠状态 */
  defaultCollapsed?: boolean;
  /** Sidebar expanded width / 展开宽度 */
  sidebarWidth?: number;
  /** Sidebar collapsed width / 折叠宽度 */
  collapsedWidth?: number;

  // ── Header ──
  /** Breadcrumb items / 面包屑项 */
  breadcrumb?: AdminHeaderProps["breadcrumb"];
  /** Whether to show search in header / 是否在头部显示搜索 */
  showSearch?: boolean;
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
  /** Notification badge count / 通知徽标数 */
  notificationCount?: number;
  /** Notification items / 通知列表 */
  notifications?: NotificationItem[];
  /** Notification bell click callback (opens NotificationCenter popover) / 通知铃铛点击回调 */
  onNotificationClick?: () => void;
  /** Mark notification as read / 标记通知已读 */
  onNotificationMarkRead?: (id: string) => void;
  /** Mark all notifications as read / 全部标为已读 */
  onNotificationMarkAllRead?: () => void;
  /** Clear all notifications / 清空通知 */
  onNotificationClear?: () => void;
  /** Notification item click callback / 通知项点击回调 */
  onNotificationItemClick?: (item: NotificationItem) => void;

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
  /** Layout variant / 布局变体 */
  variant?: AppShellProps["variant"];
  /** Aside content (detail panel) / 右侧面板内容 */
  aside?: React.ReactNode;
  /** Aside panel width / 右侧面板宽度 */
  asideWidth?: number;
  /** Footer content / 底部内容 */
  footer?: React.ReactNode;

  /** Page content / 页面内容 */
  children?: React.ReactNode;
  /** Additional class names / 额外样式类 */
  className?: string;
}

export function AdminShell({
  // Sidebar
  menuItems = [],
  selectedMenuKey,
  onMenuItemClick,
  logo,
  siderFooter,
  sidebarCollapsible = true,
  defaultCollapsed = false,
  sidebarWidth = 240,
  collapsedWidth = 64,

  // Header
  breadcrumb,
  showSearch = true,
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
  notificationCount = 0,
  notifications = [],
  onNotificationClick,
  onNotificationMarkRead,
  onNotificationMarkAllRead,
  onNotificationClear,
  onNotificationItemClick,

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
  variant = "sticky",
  aside,
  asideWidth = 280,
  footer,
  children,
  className,
}: AdminShellProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div data-slot="admin-shell" className={cn("contents", className)}>
      <AppShell
        variant={variant}
        sidebarWidth={sidebarWidth}
        collapsedWidth={collapsedWidth}
        asideWidth={asideWidth}
        sidebarCollapsible={sidebarCollapsible}
        defaultCollapsed={defaultCollapsed}
        header={
          <AdminHeader
            {...(breadcrumb !== undefined ? { breadcrumb } : {})}
            logo={logo}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            {...(onSearch !== undefined ? { onSearch } : {})}
            onMenuClick={() => setMobileOpen((v) => !v)}
            {...(headerActions !== undefined ? { actions: headerActions } : {})}
            {...(user
              ? {
                  userMenu: (
                    <UserMenu
                      user={user}
                      {...(userMenuActions !== undefined
                        ? { actions: userMenuActions }
                        : {})}
                      {...(onProfile !== undefined ? { onProfile } : {})}
                      {...(onSettings !== undefined ? { onSettings } : {})}
                      {...(onSignOut !== undefined ? { onSignOut } : {})}
                    />
                  ),
                }
              : {})}
            notificationCount={notificationCount}
            {...(onNotificationClick !== undefined
              ? { onNotificationClick }
              : {})}
          />
        }
        sidebar={
          <AdminSider
            collapsed={collapsed}
            onCollapse={setCollapsed}
            menuItems={menuItems}
            {...(selectedMenuKey !== undefined
              ? { selectedKey: selectedMenuKey }
              : {})}
            {...(onMenuItemClick !== undefined
              ? { onItemClick: onMenuItemClick }
              : {})}
            logo={logo}
            {...(siderFooter !== undefined ? { footer: siderFooter } : {})}
            width={sidebarWidth}
            collapsedWidth={collapsedWidth}
            mobileOpen={mobileOpen}
            onMobileOpenChange={setMobileOpen}
          />
        }
        aside={aside}
        footer={footer}
      >
        {/* Tabs bar */}
        {tabs.length > 0 && (
          <AdminTabs
            items={tabs}
            {...(activeTabKey !== undefined ? { activeKey: activeTabKey } : {})}
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
            {...(onTabRefresh !== undefined ? { onRefresh: onTabRefresh } : {})}
          />
        )}

        {/* Notification center — hidden, consumer wires via onNotificationClick */}
        {notifications.length > 0 && (
          <div className="hidden">
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
            />
          </div>
        )}

        {/* Page content */}
        <div className="flex-1">{children}</div>
      </AppShell>
    </div>
  );
}

export type { AdminShellProps };
