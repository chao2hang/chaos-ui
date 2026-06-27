"use client";

/**
 * @component Menu
 * @category ui/navigation
 * @since 0.3.0
 * @description 垂直导航菜单 / Vertical navigation menu (antd Menu equivalent)
 * 支持 inline / vertical / horizontal 三种模式,支持嵌套子菜单,主题 light / dark
 * @keywords menu, navigation, sidebar, submenu, vertical
 * @example
 * ```tsx
 * // items API (antd 风格)
 * <Menu
 *   mode="inline"
 *   theme="dark"
 *   selectedKeys={['user']}
 *   items={[
 *     { key: 'home', label: '首页', icon: <HomeIcon /> },
 *     {
 *       key: 'system', label: '系统管理', icon: <SettingsIcon />,
 *       children: [
 *         { key: 'user', label: '用户管理' },
 *         { key: 'role', label: '角色管理' },
 *       ]
 *     },
 *   ]}
 *   onClick={({ key }) => console.log(key)}
 * />
 *
 * // 子组件 API
 * <Menu mode="inline">
 *   <Menu.Item key="home" icon={<HomeIcon />}>首页</Menu.Item>
 *   <Menu.SubMenu key="sys" title="系统管理" icon={<SettingsIcon />}>
 *     <Menu.Item key="user">用户管理</Menu.Item>
 *   </Menu.SubMenu>
 * </Menu>
 * ```
 */

import * as React from "react";
import { ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export type MenuMode = "inline" | "vertical" | "horizontal";
export type MenuTheme = "light" | "dark";

export interface MenuItemConfig {
  key: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItemConfig[];
  disabled?: boolean;
  danger?: boolean;
  onClick?: (info: { key: string; keyPath: string[] }) => void;
  /** Render custom content. Useful for grouping / titles. */
  type?: "group";
  /** For group type: title */
  title?: React.ReactNode;
}

export interface MenuClickInfo {
  key: string;
  keyPath: string[];
  item: MenuItemConfig;
  domEvent: React.MouseEvent<HTMLElement>;
}

export interface MenuProps extends Omit<React.HTMLAttributes<HTMLElement>, "onClick" | "onSelect"> {
  /** Menu display mode / 菜单类型 */
  mode?: MenuMode;
  /** Theme / 主题 */
  theme?: MenuTheme;
  /** Currently selected keys / 当前选中的菜单项 key 数组 */
  selectedKeys?: string[];
  /** Initial selected keys / 初始选中的菜单项 */
  defaultSelectedKeys?: string[];
  /** Currently expanded submenu keys / 当前展开的子菜单 key 数组 */
  openKeys?: string[];
  /** Initial expanded submenu keys / 初始展开的子菜单 */
  defaultOpenKeys?: string[];
  /** Whether to allow multiple selection / 是否支持多选 */
  multiple?: boolean;
  /** Whether items are selectable / 是否可选择 */
  selectable?: boolean;
  /** Whether to show collapse arrow for inline submenus / inline 模式下是否显示折叠箭头 */
  inlineCollapsed?: boolean;
  /** Inline indent in pixels / inline 模式子菜单缩进宽度 */
  inlineIndent?: number;
  /** Trigger for opening submenu in inline mode (only 'click' supported) / 触发方式 */
  triggerSubMenuAction?: "click" | "hover";
  /** Menu item configs (antd style) / 菜单项配置 (antd 风格) */
  items?: MenuItemConfig[];
  /** Called on menu item click / 点击菜单项回调 */
  onClick?: (info: MenuClickInfo) => void;
  /** Called on submenu open/close / 子菜单展开/收起时触发 */
  onOpenChange?: (openKeys: string[]) => void;
  /** Called on selection change / 选中项变化时触发 */
  onSelect?: (info: { key: string; selectedKeys: string[] }) => void;
  /** Called on deselection / 取消选中时触发 */
  onDeselect?: (info: { key: string; selectedKeys: string[] }) => void;
  children?: React.ReactNode;
}

interface MenuContextValue {
  mode: MenuMode;
  theme: MenuTheme;
  selectedKeys: string[];
  openKeys: string[];
  inlineCollapsed: boolean;
  inlineIndent: number;
  triggerSubMenuAction: "click" | "hover";
  selectable: boolean;
  multiple: boolean;
  onItemClick: (info: MenuClickInfo) => void;
  onItemToggle: (key: string) => void;
  registerItem: (key: string, config: MenuItemConfig) => void;
  level: number;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

function useMenuContext(component: string) {
  const ctx = React.useContext(MenuContext);
  if (!ctx) {
    throw new Error(`<${component}> must be rendered inside <Menu>.`);
  }
  return ctx;
}

const themeClasses: Record<MenuTheme, { root: string; item: string; subTrigger: string; itemActive: string; itemHover: string; subBg: string; divider: string }> = {
  light: {
    root: "bg-card text-foreground",
    item: "text-foreground",
    subTrigger: "text-foreground",
    itemActive: "bg-primary/10 text-primary font-medium",
    itemHover: "hover:bg-muted",
    subBg: "bg-muted/40",
    divider: "bg-border",
  },
  dark: {
    root: "bg-slate-900 text-slate-100",
    item: "text-slate-200",
    subTrigger: "text-slate-200",
    itemActive: "bg-primary/20 text-primary-foreground font-medium",
    itemHover: "hover:bg-slate-800",
    subBg: "bg-slate-950/40",
    divider: "bg-slate-700",
  },
};

const Menu = React.forwardRef<HTMLElement, MenuProps>(
  (
    {
      mode = "vertical",
      theme = "light",
      selectedKeys: controlledSelected,
      defaultSelectedKeys = [],
      openKeys: controlledOpen,
      defaultOpenKeys = [],
      multiple = false,
      selectable = true,
      inlineCollapsed = false,
      inlineIndent = 24,
      triggerSubMenuAction = "click",
      items,
      onClick,
      onOpenChange,
      onSelect,
      onDeselect,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalSelected, setInternalSelected] = React.useState<string[]>(defaultSelectedKeys);
    const [internalOpen, setInternalOpen] = React.useState<string[]>(defaultOpenKeys);
    const isSelectedControlled = controlledSelected !== undefined;
    const isOpenControlled = controlledOpen !== undefined;
    const currentSelected = isSelectedControlled ? controlledSelected : internalSelected;
    const currentOpen = isOpenControlled ? controlledOpen : internalOpen;

    // Registry for items-prop-based menu (so we can fire onClick via items)
    const itemsRef = React.useRef<Map<string, MenuItemConfig>>(new Map());
    const registerItem = React.useCallback((key: string, cfg: MenuItemConfig) => {
      itemsRef.current.set(key, cfg);
    }, []);

    const updateSelected = React.useCallback(
      (next: string[]) => {
        if (!isSelectedControlled) setInternalSelected(next);
      },
      [isSelectedControlled],
    );

    const updateOpen = React.useCallback(
      (next: string[]) => {
        if (!isOpenControlled) setInternalOpen(next);
        onOpenChange?.(next);
      },
      [isOpenControlled, onOpenChange],
    );

    const onItemClick = React.useCallback(
      (info: MenuClickInfo) => {
        if (!selectable || info.item.disabled) {
          info.item.onClick?.({ key: info.key, keyPath: info.keyPath });
          onClick?.(info);
          return;
        }
        const isCurrentlySelected = currentSelected.includes(info.key);
        let nextSelected: string[];
        if (multiple) {
          nextSelected = isCurrentlySelected
            ? currentSelected.filter((k) => k !== info.key)
            : [...currentSelected, info.key];
        } else {
          nextSelected = isCurrentlySelected ? [] : [info.key];
        }
        updateSelected(nextSelected);
        if (isCurrentlySelected) {
          onDeselect?.({ key: info.key, selectedKeys: nextSelected });
        } else {
          onSelect?.({ key: info.key, selectedKeys: nextSelected });
        }
        info.item.onClick?.({ key: info.key, keyPath: info.keyPath });
        onClick?.(info);
      },
      [currentSelected, multiple, onClick, onDeselect, onSelect, selectable, updateSelected],
    );

    const onItemToggle = React.useCallback(
      (key: string) => {
        const isOpen = currentOpen.includes(key);
        const next = isOpen ? currentOpen.filter((k) => k !== key) : [...currentOpen, key];
        updateOpen(next);
      },
      [currentOpen, updateOpen],
    );

    const ctx: MenuContextValue = {
      mode,
      theme,
      selectedKeys: currentSelected,
      openKeys: currentOpen,
      inlineCollapsed,
      inlineIndent,
      triggerSubMenuAction,
      selectable,
      multiple,
      onItemClick,
      onItemToggle,
      registerItem,
      level: 0,
    };

    const tc = themeClasses[theme];

    // Items-based or children-based rendering
    let content: React.ReactNode;
    if (items && items.length > 0) {
      content = (
        <MenuList tag="ul" role="menu">
          {items.map((item) => (
            <ItemFromConfig
              key={item.key}
              config={item}
              parentPath={[]}
            />
          ))}
        </MenuList>
      );
    } else {
      content = children;
    }

    const rootClass = cn(
      "relative text-sm",
      mode === "horizontal"
        ? "flex items-center gap-1"
        : mode === "inline"
          ? cn("w-full", tc.root)
          : cn("flex flex-col gap-0.5", tc.root),
      mode === "vertical" && "min-w-[180px] py-1",
      className,
    );

    return (
      <MenuContext.Provider value={ctx}>
        {mode === "horizontal" ? (
          <nav
            ref={ref as React.Ref<HTMLElement>}
            role="menubar"
            data-slot="menu"
            data-mode={mode}
            data-theme={theme}
            className={rootClass}
            {...(props as React.HTMLAttributes<HTMLElement>)}
          >
            {content}
          </nav>
        ) : (
          <ul
            ref={ref as React.Ref<HTMLElement> as React.Ref<HTMLUListElement>}
            role="menu"
            data-slot="menu"
            data-mode={mode}
            data-theme={theme}
            className={cn(rootClass, "list-none m-0 p-0")}
          >
            {content}
          </ul>
        )}
      </MenuContext.Provider>
    );
  },
);
Menu.displayName = "Menu";

const MenuList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement> & { tag?: "ul" | "div" }
>(({ className, children, ...props }, ref) => (
  <ul
    ref={ref}
    role="menu"
    data-slot="menu-list"
    className={cn("list-none m-0 p-0", className)}
    {...props}
  >
    {children}
  </ul>
));
MenuList.displayName = "MenuList";

function ItemFromConfig({
  config,
  parentPath,
}: {
  config: MenuItemConfig;
  parentPath: string[];
}) {
  const ctx = useMenuContext("Menu.items");
  const tc = themeClasses[ctx.theme];
  const hasChildren = !!config.children && config.children.length > 0;
  const keyPath = [config.key, ...parentPath];
  const isOpen = ctx.openKeys.includes(config.key);
  const isSelected = ctx.selectedKeys.includes(config.key);
  const indentStyle =
    ctx.mode === "inline" && !ctx.inlineCollapsed
      ? { paddingLeft: `${ctx.level * ctx.inlineIndent + 8}px` }
      : undefined;

  React.useEffect(() => {
    ctx.registerItem(config.key, config);
  }, [config, ctx]);

  if (config.type === "group") {
    return (
      <li
        role="group"
        data-slot="menu-group"
        className={cn("px-2 py-1 text-xs font-semibold text-muted-foreground", tc.item)}
      >
        {config.title ?? config.label}
      </li>
    );
  }

  if (hasChildren) {
    return (
      <SubMenuContent
        config={config}
        isOpen={isOpen}
        isSelected={isSelected}
        indentStyle={indentStyle}
        tc={tc}
        keyPath={keyPath}
      />
    );
  }

  return (
    <li
      role="none"
      data-slot="menu-item"
      data-key={config.key}
      data-selected={isSelected || undefined}
      data-disabled={config.disabled || undefined}
    >
      <button
        type="button"
        role="menuitem"
        tabIndex={config.disabled ? -1 : 0}
        disabled={config.disabled}
        onClick={(e) => {
          if (config.disabled) return;
          ctx.onItemClick({
            key: config.key,
            keyPath,
            item: config,
            domEvent: e,
          });
        }}
        className={cn(
          "w-full flex items-center gap-2 rounded-md text-left outline-none transition-colors",
          ctx.mode === "horizontal" ? "h-9 px-3" : "h-8 px-2",
          tc.item,
          isSelected ? tc.itemActive : tc.itemHover,
          config.danger && "text-destructive data-[selected=true]:bg-destructive/10 data-[selected=true]:text-destructive",
          config.disabled && "pointer-events-none opacity-50",
        )}
        style={indentStyle}
        data-selected={isSelected || undefined}
      >
        {config.icon && (
          <span className="inline-flex size-4 shrink-0 items-center justify-center">
            {config.icon}
          </span>
        )}
        <span className="flex-1 truncate">{config.label}</span>
      </button>
    </li>
  );
}

function SubMenuContent({
  config,
  isOpen,
  isSelected,
  indentStyle,
  tc,
  keyPath,
}: {
  config: MenuItemConfig;
  isOpen: boolean;
  isSelected: boolean;
  indentStyle: React.CSSProperties | undefined;
  tc: typeof themeClasses.light;
  keyPath: string[];
}) {
  const ctx = useMenuContext("Menu.SubMenu");
  const inlineMode = ctx.mode === "inline";
  const childContext: MenuContextValue = { ...ctx, level: ctx.level + 1 };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (config.disabled) return;
    ctx.onItemToggle(config.key);
  };

  const handleHover = (e: React.MouseEvent) => {
    if (ctx.triggerSubMenuAction !== "hover") return;
    e.stopPropagation();
    if (config.disabled) return;
    if (!ctx.openKeys.includes(config.key)) {
      ctx.onItemToggle(config.key);
    }
  };

  const trigger = (
    <button
      type="button"
      role="menuitem"
      aria-haspopup="true"
      aria-expanded={isOpen}
      tabIndex={config.disabled ? -1 : 0}
      disabled={config.disabled}
      onClick={handleToggle}
      onMouseEnter={handleHover}
      className={cn(
        "w-full flex items-center gap-2 rounded-md text-left outline-none transition-colors",
        ctx.mode === "horizontal" ? "h-9 px-3" : "h-8 px-2",
        tc.subTrigger,
        isSelected ? tc.itemActive : tc.itemHover,
        config.danger && "text-destructive data-[selected=true]:bg-destructive/10",
        config.disabled && "pointer-events-none opacity-50",
      )}
      style={indentStyle}
      data-selected={isSelected || undefined}
    >
      {config.icon && (
        <span className="inline-flex size-4 shrink-0 items-center justify-center">
          {config.icon}
        </span>
      )}
      <span className="flex-1 truncate">{config.label}</span>
      <ChevronRightIcon
        className={cn(
          "size-4 shrink-0 transition-transform text-muted-foreground",
          inlineMode && isOpen && "rotate-90",
        )}
      />
    </button>
  );

  if (ctx.mode === "horizontal") {
    // Horizontal submenu: render as popup
    return (
      <li role="none" data-slot="menu-submenu" data-key={config.key}>
        {trigger}
        {isOpen && (
          <div
            className={cn(
              "absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            )}
          >
            <MenuContext.Provider value={childContext}>
              <ul role="menu" data-slot="menu-sub-content" className="list-none m-0 p-0">
                {config.children!.map((child) => (
                  <ItemFromConfig
                    key={child.key}
                    config={child}
                    parentPath={[config.key, ...keyPath.slice(1)]}
                  />
                ))}
              </ul>
            </MenuContext.Provider>
          </div>
        )}
      </li>
    );
  }

  return (
    <li
      role="none"
      data-slot="menu-submenu"
      data-key={config.key}
      data-open={isOpen || undefined}
    >
      {trigger}
      {inlineMode && isOpen && (
        <ul
          role="menu"
          data-slot="menu-sub-content"
          className={cn("list-none m-0 p-0", tc.subBg)}
        >
          <MenuContext.Provider value={childContext}>
            {config.children!.map((child) => (
              <ItemFromConfig
                key={child.key}
                config={child}
                parentPath={[config.key, ...keyPath.slice(1)]}
              />
            ))}
          </MenuContext.Provider>
        </ul>
      )}
      {!inlineMode && isOpen && (
        <div
          className={cn(
            "absolute left-full top-0 z-50 ml-1 min-w-[180px] rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          )}
        >
          <MenuContext.Provider value={childContext}>
            <ul role="menu" data-slot="menu-sub-content" className="list-none m-0 p-0">
              {config.children!.map((child) => (
                <ItemFromConfig
                  key={child.key}
                  config={child}
                  parentPath={[config.key, ...keyPath.slice(1)]}
                />
              ))}
            </ul>
          </MenuContext.Provider>
        </div>
      )}
    </li>
  );
}

// ---------- SubMenu child component API ----------
interface SubMenuProps {
  key: string;
  title: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  popupClassName?: string;
}

function SubMenu({ key: subKey, title, icon, disabled, children, className, style }: SubMenuProps) {
  const ctx = useMenuContext("SubMenu");
  const tc = themeClasses[ctx.theme];
  const isOpen = ctx.openKeys.includes(subKey);
  const isSelected = ctx.selectedKeys.includes(subKey);
  const inlineMode = ctx.mode === "inline";
  const indentStyle =
    inlineMode && !ctx.inlineCollapsed
      ? { paddingLeft: `${ctx.level * ctx.inlineIndent + 8}px` }
      : style;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    ctx.onItemToggle(subKey);
  };

  const childContext: MenuContextValue = { ...ctx, level: ctx.level + 1 };

  const trigger = (
    <button
      type="button"
      role="menuitem"
      aria-haspopup="true"
      aria-expanded={isOpen}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        "w-full flex items-center gap-2 rounded-md text-left outline-none transition-colors",
        ctx.mode === "horizontal" ? "h-9 px-3" : "h-8 px-2",
        tc.subTrigger,
        isSelected ? tc.itemActive : tc.itemHover,
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      style={indentStyle}
      data-selected={isSelected || undefined}
    >
      {icon && (
        <span className="inline-flex size-4 shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      <span className="flex-1 truncate">{title}</span>
      <ChevronRightIcon
        className={cn(
          "size-4 shrink-0 transition-transform text-muted-foreground",
          inlineMode && isOpen && "rotate-90",
        )}
      />
    </button>
  );

  return (
    <li role="none" data-slot="menu-submenu" data-key={subKey} data-open={isOpen || undefined}>
      {trigger}
      {inlineMode && isOpen && (
        <ul role="menu" data-slot="menu-sub-content" className={cn("list-none m-0 p-0", tc.subBg)}>
          <MenuContext.Provider value={childContext}>{children}</MenuContext.Provider>
        </ul>
      )}
    </li>
  );
}
SubMenu.displayName = "Menu.SubMenu";

// ---------- Item child component API ----------
interface ItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick"> {
  key: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (info: { key: string }) => void;
}

const Item = React.forwardRef<HTMLButtonElement, ItemProps>(
  (
    { key: itemKey, icon, disabled, danger, children, className, style, onClick, ...rest },
    ref,
  ) => {
    const ctx = useMenuContext("Item");
    const tc = themeClasses[ctx.theme];
    const isSelected = ctx.selectedKeys.includes(itemKey);
    const indentStyle =
      ctx.mode === "inline" && !ctx.inlineCollapsed
        ? { paddingLeft: `${ctx.level * ctx.inlineIndent + 8}px` }
        : style;

    return (
      <li role="none" data-slot="menu-item" data-key={itemKey}>
        <button
          ref={ref}
          type="button"
          role="menuitem"
          tabIndex={disabled ? -1 : 0}
          disabled={disabled}
          onClick={(e) => {
            if (disabled) return;
            onClick?.({ key: itemKey });
            ctx.onItemClick({
              key: itemKey,
              keyPath: [itemKey],
              item: { key: itemKey, label: children as React.ReactNode, ...(disabled !== undefined ? { disabled } : {}), ...(danger !== undefined ? { danger } : {}) },
              domEvent: e,
            });
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-md text-left outline-none transition-colors",
            ctx.mode === "horizontal" ? "h-9 px-3" : "h-8 px-2",
            tc.item,
            isSelected ? tc.itemActive : tc.itemHover,
            danger && "text-destructive data-[selected=true]:bg-destructive/10 data-[selected=true]:text-destructive",
            disabled && "pointer-events-none opacity-50",
            className,
          )}
          style={indentStyle}
          data-selected={isSelected || undefined}
          {...rest}
        >
          {icon && (
            <span className="inline-flex size-4 shrink-0 items-center justify-center">
              {icon}
            </span>
          )}
          <span className="flex-1 truncate">{children}</span>
        </button>
      </li>
    );
  },
);
Item.displayName = "Menu.Item";

// ---------- Divider child component API ----------
function Divider() {
  const ctx = useMenuContext("Divider");
  const tc = themeClasses[ctx.theme];
  return (
    <li
      role="separator"
      aria-orientation="horizontal"
      data-slot="menu-divider"
      className={cn("my-1 h-px mx-2", tc.divider)}
    />
  );
}
Divider.displayName = "Menu.Divider";

// ---------- ItemGroup child component API ----------
interface ItemGroupProps {
  title: React.ReactNode;
  children?: React.ReactNode;
}
function ItemGroup({ title, children }: ItemGroupProps) {
  const ctx = useMenuContext("ItemGroup");
  const tc = themeClasses[ctx.theme];
  return (
    <li role="group" data-slot="menu-group" className="py-1">
      <div
        className={cn(
          "px-2 py-1 text-xs font-semibold text-muted-foreground",
          tc.item,
        )}
      >
        {title}
      </div>
      <ul role="menu" data-slot="menu-group-list" className="list-none m-0 p-0">
        {children}
      </ul>
    </li>
  );
}
ItemGroup.displayName = "Menu.ItemGroup";

// Attach child components
(Menu as unknown as { Item: typeof Item }).Item = Item;
(Menu as unknown as { SubMenu: typeof SubMenu }).SubMenu = SubMenu;
(Menu as unknown as { Divider: typeof Divider }).Divider = Divider;
(Menu as unknown as { ItemGroup: typeof ItemGroup }).ItemGroup = ItemGroup;

export { Menu, Item as MenuItem, SubMenu as MenuSubMenu, Divider as MenuDivider, ItemGroup as MenuItemGroup };
export type { ItemProps as MenuItemProps, SubMenuProps };
