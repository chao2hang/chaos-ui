"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchIcon, SettingsIcon } from "@/components/ui/icons";

/**
 * Navigation item for SettingsLayout sidebar.
 */
interface SettingsNavItem {
  /** Unique key / 唯一键 */
  key: string;
  /** Label / 标签 */
  label: React.ReactNode;
  /** Optional icon / 图标 */
  icon?: React.ReactNode;
  /** Optional description under label / 副文案 */
  description?: React.ReactNode;
  /** Disabled / 禁用 */
  disabled?: boolean;
}

interface SettingsLayoutProps extends Omit<
  React.ComponentProps<"div">,
  "title"
> {
  /** Sidebar nav items / 侧栏导航项 */
  nav: SettingsNavItem[];
  /** Controlled active key / 受控激活项 */
  activeKey?: string;
  /** Default active key (uncontrolled) / 非受控默认 */
  defaultActiveKey?: string;
  /** Nav change callback / 导航切换 */
  onNavChange?: (key: string) => void;
  /** Page title above content / 内容区标题 */
  title?: React.ReactNode;
  /** Page description / 内容区描述 */
  description?: React.ReactNode;
  /** Enable nav search / 启用导航搜索 */
  searchable?: boolean;
  /** Search placeholder / 搜索占位 */
  searchPlaceholder?: string;
  /** Sidebar width px / 侧栏宽度 */
  sidebarWidth?: number;
  /** Content / 内容 */
  children?: React.ReactNode;
}

/**
 * @component SettingsLayout
 * @category layout/admin
 * @since 1.6.0
 * @description Settings page shell: searchable sidebar sections + content pane.
 * Use inside AdminShell (or alone) for ERP preference / system config screens.
 * / 设置页布局壳：可搜索侧栏分区 + 内容区，适合后台偏好与系统配置页。
 * @keywords settings, layout, sidebar, nav, preferences, admin
 * @example
 * <SettingsLayout
 *   title="账户设置"
 *   nav={[
 *     { key: "profile", label: "个人资料" },
 *     { key: "security", label: "安全" },
 *   ]}
 *   activeKey="profile"
 *   onNavChange={setKey}
 * >
 *   <ProfileForm />
 * </SettingsLayout>
 */
function SettingsLayout({
  nav,
  activeKey: activeKeyProp,
  defaultActiveKey,
  onNavChange,
  title,
  description,
  searchable = true,
  searchPlaceholder = "搜索设置…",
  sidebarWidth = 240,
  children,
  className,
  ...props
}: SettingsLayoutProps) {
  const [query, setQuery] = React.useState("");
  const [uncontrolledKey, setUncontrolledKey] = React.useState(
    defaultActiveKey ?? nav[0]?.key ?? "",
  );
  const isControlled = activeKeyProp !== undefined;
  const activeKey = isControlled ? activeKeyProp : uncontrolledKey;

  const filteredNav = React.useMemo(() => {
    if (!query.trim()) return nav;
    const q = query.trim().toLowerCase();
    return nav.filter((item) => {
      const label =
        typeof item.label === "string" ? item.label.toLowerCase() : "";
      const desc =
        typeof item.description === "string"
          ? item.description.toLowerCase()
          : "";
      return (
        item.key.toLowerCase().includes(q) ||
        label.includes(q) ||
        desc.includes(q)
      );
    });
  }, [nav, query]);

  const handleSelect = (key: string) => {
    if (!isControlled) setUncontrolledKey(key);
    onNavChange?.(key);
  };

  return (
    <div
      data-slot="settings-layout"
      className={cn(
        "bg-background flex min-h-[320px] w-full flex-col md:flex-row md:overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Sidebar */}
      <aside
        data-slot="settings-layout-sidebar"
        className="border-border flex w-full shrink-0 flex-col border-b md:w-[var(--settings-sidebar-width)] md:border-r md:border-b-0"
        style={
          {
            ["--settings-sidebar-width" as string]: `${sidebarWidth}px`,
          } as React.CSSProperties
        }
      >
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center gap-2 border-b px-3 py-3">
            <SettingsIcon className="text-muted-foreground size-4 shrink-0" />
            <span className="text-sm font-medium">设置</span>
          </div>
          {searchable && (
            <div className="border-b p-2">
              <div className="relative">
                <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
                <Input
                  className="h-8 pl-7 text-xs"
                  placeholder={searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label={searchPlaceholder}
                />
              </div>
            </div>
          )}
          <ScrollArea className="max-h-56 flex-1 md:max-h-none">
            <nav className="flex flex-col gap-0.5 p-2" aria-label="设置导航">
              {filteredNav.length === 0 ? (
                <p className="text-muted-foreground px-2 py-4 text-center text-xs">
                  无匹配项
                </p>
              ) : (
                filteredNav.map((item) => {
                  const active = item.key === activeKey;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      disabled={item.disabled}
                      data-active={active || undefined}
                      onClick={() => handleSelect(item.key)}
                      className={cn(
                        "hover:bg-muted flex w-full items-start gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors",
                        active && "bg-muted font-medium",
                        item.disabled && "pointer-events-none opacity-50",
                      )}
                    >
                      {item.icon && (
                        <span className="text-muted-foreground mt-0.5 shrink-0">
                          {item.icon}
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{item.label}</span>
                        {item.description && (
                          <span className="text-muted-foreground mt-0.5 block truncate text-xs font-normal">
                            {item.description}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })
              )}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Content */}
      <main
        data-slot="settings-layout-content"
        className="flex min-w-0 flex-1 flex-col overflow-auto p-4 md:p-6"
      >
        {(title || description) && (
          <header className="mb-4 space-y-1 border-b pb-4">
            {title && (
              <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            )}
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
          </header>
        )}
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}

export { SettingsLayout };
export type { SettingsLayoutProps, SettingsNavItem };
