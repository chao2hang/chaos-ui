"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
 *   linkComponent={Link}
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

/**
 * Router-agnostic link renderer for Next.js / React Router adapters.
 * Receives href + className + children; default is a native <a>.
 */
type AdminSiderLinkComponent = React.ComponentType<{
  href: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  "aria-current"?: "page" | undefined;
  "data-slot"?: string;
  "data-menu-key"?: string;
  "data-active-branch"?: string;
  style?: React.CSSProperties;
}>;

interface AdminSiderProps extends React.ComponentProps<"aside"> {
  /** Whether sidebar is collapsed / 是否折叠 */
  collapsed?: boolean;
  /** Collapse change callback / 折叠变更回调 */
  onCollapse?: (collapsed: boolean) => void;
  /** Menu items / 菜单项 */
  menuItems?: MenuItem[];
  /** Selected menu key / 选中的菜单 key */
  selectedKey?: string;
  /**
   * How `selectedKey` matches menu item keys (CUI-NAV-02).
   * - `"exact"`: only identical keys
   * - `"prefix"` (default): exact first, else longest path-prefix match on `key`/`href`
   *   so deep routes like `/policy/list/123` still open the `/policy/list` item.
   */
  selectedMatch?: "exact" | "prefix";
  /** Menu click callback / 菜单点击回调 */
  onItemClick?: (item: MenuItem) => void;
  /** Logo content / Logo 内容 */
  logo?: React.ReactNode;
  /**
   * Compact logo when collapsed (issue #11). Preferred over `logo` in collapsed mode.
   * / 折叠态紧凑 Logo；折叠时优先于 `logo`
   */
  logoCollapsed?: React.ReactNode;
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
  /**
   * Custom link component (e.g. next/link). When provided, items with `href`
   * render through this component instead of a native <a>.
   * / 自定义链接组件（如 Next.js Link），有 href 的菜单项走此组件
   */
  linkComponent?: AdminSiderLinkComponent;
}

function normalizePathKey(key: string): string {
  if (!key) return key;
  // Strip query/hash; collapse trailing slashes (keep root "/")
  const bare = key.split(/[?#]/, 1)[0] ?? key;
  if (bare.length > 1 && bare.endsWith("/")) return bare.replace(/\/+$/, "");
  return bare;
}

function isPathPrefix(candidate: string, active: string): boolean {
  const c = normalizePathKey(candidate);
  const a = normalizePathKey(active);
  if (!c || !a) return false;
  if (c === a) return true;
  // Path-style only: avoid treating plain ids like "sys" as prefix of "system"
  if (!c.startsWith("/") && !a.startsWith("/")) return false;
  return a.startsWith(c.endsWith("/") ? c : `${c}/`);
}

function collectAncestorKeys(
  items: MenuItem[],
  targetKey: string,
  trail: string[] = [],
): string[] | null {
  const target = normalizePathKey(targetKey);
  for (const item of items) {
    if (normalizePathKey(item.key) === target) return trail;
    if (item.children?.length) {
      const found = collectAncestorKeys(item.children, target, [
        ...trail,
        item.key,
      ]);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Resolve which menu item key is "active" for a given selectedKey.
 * Prefer exact key match; with prefix mode fall back to longest key/href prefix.
 */
function resolveActiveMenuKey(
  items: MenuItem[],
  selectedKey: string | undefined,
  match: "exact" | "prefix",
): string | undefined {
  if (!selectedKey) return undefined;
  const active = normalizePathKey(selectedKey);

  let exact: string | undefined;
  let bestPrefix: { key: string; len: number } | undefined;

  const walk = (nodes: MenuItem[]) => {
    for (const node of nodes) {
      const k = normalizePathKey(node.key);
      if (k === active) exact = node.key;
      if (match === "prefix") {
        if (isPathPrefix(node.key, active)) {
          const len = k.length;
          if (!bestPrefix || len > bestPrefix.len) {
            bestPrefix = { key: node.key, len };
          }
        }
        if (node.href && isPathPrefix(node.href, active)) {
          const h = normalizePathKey(node.href);
          const len = h.length;
          // Bind selection to the menu item key when href prefixes the route
          if (!bestPrefix || len > bestPrefix.len) {
            bestPrefix = { key: node.key, len };
          }
        }
      }
      if (node.children?.length) walk(node.children);
    }
  };
  walk(items);

  return exact ?? bestPrefix?.key;
}

function isDescendantSelected(
  item: MenuItem,
  activeMenuKey: string | undefined,
): boolean {
  if (!activeMenuKey) return false;
  if (item.key === activeMenuKey) return true;
  return (
    item.children?.some((child) =>
      isDescendantSelected(child, activeMenuKey),
    ) ?? false
  );
}

function menuLabelText(label: React.ReactNode): string | undefined {
  if (typeof label === "string" || typeof label === "number") {
    return String(label);
  }
  return undefined;
}

function AdminSider({
  className,
  collapsed = false,
  onCollapse,
  menuItems = [],
  selectedKey,
  selectedMatch = "prefix",
  onItemClick,
  logo,
  logoCollapsed,
  footer,
  width = 240,
  collapsedWidth = 64,
  mobileOpen = false,
  onMobileOpenChange,
  linkComponent: LinkComponent,
  ...props
}: AdminSiderProps) {
  const [internalSelected, setInternalSelected] = React.useState(selectedKey);
  const rawCurrent = selectedKey ?? internalSelected;
  const activeMenuKey = React.useMemo(
    () => resolveActiveMenuKey(menuItems, rawCurrent, selectedMatch),
    [menuItems, rawCurrent, selectedMatch],
  );

  // Seed expanded ancestors on first paint so deep-link / refresh does not
  // wait for a post-mount effect (CUI-NAV-02).
  const [expandedKeys, setExpandedKeys] = React.useState<Set<string>>(() => {
    if (!rawCurrent) return new Set();
    const resolved =
      resolveActiveMenuKey(menuItems, rawCurrent, selectedMatch) ?? rawCurrent;
    const ancestors = collectAncestorKeys(menuItems, resolved);
    return new Set(ancestors ?? []);
  });

  /** Collapsed parent key whose flyout is open (issue #10). */
  const [flyoutKey, setFlyoutKey] = React.useState<string | null>(null);

  // Keep ancestors expanded when selectedKey / menu tree changes
  React.useEffect(() => {
    if (!activeMenuKey && !rawCurrent) return;
    const target = activeMenuKey ?? rawCurrent;
    if (!target) return;
    const ancestors = collectAncestorKeys(menuItems, target);
    if (!ancestors?.length) return;
    setExpandedKeys((prev) => {
      let changed = false;
      const next = new Set(prev);
      for (const key of ancestors) {
        if (!next.has(key)) {
          next.add(key);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [activeMenuKey, rawCurrent, menuItems]);

  React.useEffect(() => {
    if (!collapsed) setFlyoutKey(null);
  }, [collapsed]);

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    if (selectedKey === undefined) setInternalSelected(item.key);
    onItemClick?.(item);
  };

  const renderFlyoutChild = (child: MenuItem) => {
    const isSelected = activeMenuKey === child.key;
    const childClassName = cn(
      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
      isSelected
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
      child.disabled && "pointer-events-none opacity-50",
    );
    const onChildClick = (e: React.MouseEvent<HTMLElement>) => {
      if (!child.href) {
        e.preventDefault();
      } else if (!LinkComponent && onItemClick) {
        e.preventDefault();
      }
      handleItemClick(child);
      setFlyoutKey(null);
    };
    const body = (
      <>
        {child.icon && <span className="shrink-0">{child.icon}</span>}
        <span className="flex-1 truncate">{child.label}</span>
        {child.badge && <span className="shrink-0">{child.badge}</span>}
      </>
    );
    if (child.href && LinkComponent) {
      return (
        <LinkComponent
          key={child.key}
          href={child.href}
          className={childClassName}
          onClick={onChildClick}
          data-slot="admin-sider-flyout-item"
          data-menu-key={child.key}
          {...(isSelected ? { "aria-current": "page" as const } : {})}
        >
          {body}
        </LinkComponent>
      );
    }
    return (
      <a
        key={child.key}
        href={child.href}
        className={childClassName}
        onClick={onChildClick}
        data-slot="admin-sider-flyout-item"
        data-menu-key={child.key}
        {...(isSelected ? { "aria-current": "page" as const } : {})}
      >
        {body}
      </a>
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isSelected = activeMenuKey === item.key;
    const isBranchActive =
      !isSelected && isDescendantSelected(item, activeMenuKey);
    const hasChildren = Boolean(item.children && item.children.length > 0);
    const expanded = expandedKeys.has(item.key);
    const labelText = menuLabelText(item.label);
    const toggleExpanded = () => {
      setExpandedKeys((prev) => {
        const next = new Set(prev);
        if (next.has(item.key)) next.delete(item.key);
        else next.add(item.key);
        return next;
      });
    };

    const itemClassName = cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      collapsed && "justify-center px-2",
      isSelected
        ? "bg-primary text-primary-foreground"
        : isBranchActive
          ? "bg-muted/70 text-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      item.disabled && "pointer-events-none opacity-50",
    );

    const itemStyle: React.CSSProperties | undefined = collapsed
      ? undefined
      : { paddingLeft: `${12 + level * 16}px` };

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
      // No href (SPA key-only items): never navigate.
      // With href + custom linkComponent: let the router link handle navigation.
      // With href + native <a> and onItemClick: prevent full reload so consumers can route.
      if (!item.href) {
        e.preventDefault();
      } else if (!LinkComponent && onItemClick) {
        e.preventDefault();
      }
      // Collapsed parents open flyout instead of inline expand (issue #10).
      if (hasChildren && collapsed) {
        e.preventDefault();
        setFlyoutKey((prev) => (prev === item.key ? null : item.key));
        return;
      }
      if (hasChildren && collapsed === false) {
        toggleExpanded();
      }
      handleItemClick(item);
    };

    const content = (
      <>
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
      </>
    );

    const sharedProps: {
      className: string;
      style?: React.CSSProperties;
      onClick: (e: React.MouseEvent<HTMLElement>) => void;
      "aria-current"?: "page";
      "aria-label"?: string;
      "aria-haspopup"?: "menu";
      "data-slot": string;
      "data-menu-key": string;
      "data-active-branch"?: string;
    } = {
      className: itemClassName,
      onClick,
      "data-slot": "admin-sider-item",
      "data-menu-key": item.key,
    };
    if (itemStyle) sharedProps.style = itemStyle;
    if (isSelected) sharedProps["aria-current"] = "page";
    if (isBranchActive) sharedProps["data-active-branch"] = "true";
    if (collapsed && labelText) sharedProps["aria-label"] = labelText;
    if (collapsed && hasChildren) sharedProps["aria-haspopup"] = "menu";

    // Collapsed parent: Popover flyout for children
    if (collapsed && hasChildren) {
      const open = flyoutKey === item.key;
      return (
        <Popover
          key={item.key}
          open={open}
          onOpenChange={(next) => setFlyoutKey(next ? item.key : null)}
        >
          <PopoverTrigger
            nativeButton={false}
            render={
              <a
                href={item.href ?? "#"}
                className={itemClassName}
                data-slot="admin-sider-item"
                data-menu-key={item.key}
                aria-haspopup="menu"
                {...(labelText ? { "aria-label": labelText } : {})}
                {...(isSelected ? { "aria-current": "page" as const } : {})}
                {...(isBranchActive ? { "data-active-branch": "true" } : {})}
                onClick={onClick}
              />
            }
          >
            {content}
          </PopoverTrigger>
          <PopoverContent
            side="right"
            align="start"
            sideOffset={8}
            className="w-52 p-1"
            data-slot="admin-sider-flyout"
          >
            <div className="flex flex-col gap-0.5" role="menu">
              {item.children!.map((child) => renderFlyoutChild(child))}
            </div>
          </PopoverContent>
        </Popover>
      );
    }

    return (
      <React.Fragment key={item.key}>
        {item.href && LinkComponent ? (
          <LinkComponent href={item.href} {...sharedProps}>
            {content}
          </LinkComponent>
        ) : (
          <a href={item.href} {...sharedProps}>
            {content}
          </a>
        )}
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
          // relative is required for the collapse control (absolute -right-3).
          // Never use lg:static here — it cancels relative and reintroduces CUI-LAYOUT-02.
          "border-border bg-background relative flex flex-col overflow-visible border-r transition-all duration-300",
          mobileOpen
            ? "fixed inset-y-0 left-0 z-50 lg:relative lg:inset-auto lg:z-auto"
            : "hidden lg:flex",
          className,
        )}
        style={{ width: collapsed ? collapsedWidth : width }}
        {...props}
      >
        {/* Logo */}
        {(logo || (collapsed && logoCollapsed)) && (
          <div
            data-slot="admin-sider-logo"
            className={cn(
              "border-border flex h-16 items-center border-b px-4",
              collapsed && "justify-center overflow-hidden px-2",
            )}
          >
            {collapsed ? (
              logoCollapsed ? (
                logoCollapsed
              ) : typeof logo === "string" ? (
                <span className="text-lg font-bold">{logo.charAt(0)}</span>
              ) : (
                <div className="flex max-w-full items-center justify-center overflow-hidden">
                  {logo}
                </div>
              )
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
              "border-border border-t p-2",
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
            className="border-border bg-background absolute top-20 -right-3 z-10 hidden border lg:flex"
            onClick={() => onCollapse(!collapsed)}
            aria-label={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </Button>
        )}
      </aside>
    </>
  );
}

export { AdminSider };
export type { AdminSiderProps, MenuItem, AdminSiderLinkComponent };
