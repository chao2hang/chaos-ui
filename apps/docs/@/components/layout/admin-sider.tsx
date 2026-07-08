"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * @component AdminSider
 * @category layout
 * @since 0.2.0
 * @description 后台侧边栏(支持折叠/展开/路由联动/多级) / Admin sidebar with collapse/expand/multi-level navigation
 * @keywords sider, sidebar, navigation, admin, menu, collapse
 * @example
 * <AdminSider
 *   collapsed={collapsed}
 *   onCollapse={setCollapsed}
 *   menuItems={[{ key: 'home', label: 'Home', icon: <HomeIcon />, href: '/' }]}
 * />
 */

interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItem[];
  badge?: React.ReactNode;
  disabled?: boolean;
}

interface AdminSiderProps extends React.ComponentProps<"aside"> {
  /** Whether sidebar is collapsed / 是否折叠 */
  collapsed?: boolean;
  /** Collapse change callback / 折叠变更回调 */
  onCollapse?: (collapsed: boolean) => void;
  /** Menu items / 菜单项 */
  menuItems?: MenuItem[];
  /** Selected menu key / 选中的菜单 key */
  selectedKey?: string;
  /** Menu click callback / 菜单点击回调 */
  onItemClick?: (item: MenuItem) => void;
  /** Logo content / Logo 内容 */
  logo?: React.ReactNode;
  /** Footer content / 底部内容 */
  footer?: React.ReactNode;
  /** Sidebar width when expanded / 展开宽度 */
  width?: number;
  /** Sidebar width when collapsed / 折叠宽度 */
  collapsedWidth?: number;
  /** Whether sidebar is mobile open / 移动端是否打开 */
  mobileOpen?: boolean;
  /** Mobile open change callback / 移动端打开变更回调 */
  onMobileOpenChange?: (open: boolean) => void;
}

function AdminSider({
  className,
  collapsed = false,
  onCollapse,
  menuItems = [],
  selectedKey,
  onItemClick,
  logo,
  footer,
  width = 240,
  collapsedWidth = 64,
  mobileOpen = false,
  onMobileOpenChange,
  ...props
}: AdminSiderProps) {
  const [internalSelected, setInternalSelected] = React.useState(selectedKey);
  const [expandedKeys, setExpandedKeys] = React.useState<Set<string>>(new Set());
  const current = selectedKey ?? internalSelected;

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    if (selectedKey === undefined) setInternalSelected(item.key);
    onItemClick?.(item);
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isSelected = current === item.key;
    const hasChildren = item.children && item.children.length > 0;
    const expanded = expandedKeys.has(item.key);
    const toggleExpanded = () => {
      setExpandedKeys((prev) => {
        const next = new Set(prev);
        if (next.has(item.key)) next.delete(item.key);
        else next.add(item.key);
        return next;
      });
    };

    return (
      <React.Fragment key={item.key}>
        <a
          href={item.href}
          onClick={(e) => {
            if (!item.href) e.preventDefault();
            if (hasChildren && collapsed === false) {
              toggleExpanded();
            }
            handleItemClick(item);
          }}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            collapsed && "justify-center px-2",
            isSelected
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
            item.disabled && "pointer-events-none opacity-50",
          )}
          style={{ paddingLeft: collapsed ? undefined : `${12 + level * 16}px` }}
          aria-current={isSelected ? "page" : undefined}
        >
          {item.icon && <span className="shrink-0">{item.icon}</span>}
          {!collapsed && (
            <>
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && <span className="shrink-0">{item.badge}</span>}
              {hasChildren && (
                <ChevronRight
                  className={cn(
                    "size-4 shrink-0 transition-transform",
                    expanded && "rotate-90",
                  )}
                />
              )}
            </>
          )}
        </a>
        {hasChildren && expanded && !collapsed && (
          <div className="mt-0.5 space-y-0.5">
            {item.children!.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => onMobileOpenChange?.(false)}
        />
      )}
      <aside
        data-slot="admin-sider"
        className={cn(
          "flex flex-col border-r border-border bg-background transition-all duration-300",
          mobileOpen ? "fixed inset-y-0 left-0 z-50 lg:static" : "hidden lg:flex",
          className,
        )}
        style={{ width: collapsed ? collapsedWidth : width }}
        {...props}
      >
        {/* Logo */}
        {logo && (
          <div
            className={cn(
              "flex h-16 items-center border-b border-border px-4",
              collapsed && "justify-center px-2",
            )}
          >
            {collapsed ? (
              <span className="text-lg font-bold">{typeof logo === "string" ? logo.charAt(0) : logo}</span>
            ) : (
              logo
            )}
          </div>
        )}

        {/* Menu */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>

        {/* Footer */}
        {footer && (
          <div
            className={cn(
              "border-t border-border p-2",
              collapsed && "flex justify-center",
            )}
          >
            {footer}
          </div>
        )}

        {/* Collapse toggle (desktop) */}
        {onCollapse && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute -right-3 top-20 z-10 hidden border border-border bg-background lg:flex"
            onClick={() => onCollapse(!collapsed)}
            aria-label={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </Button>
        )}
      </aside>
    </>
  );
}

export { AdminSider };
export type { AdminSiderProps, MenuItem };
