"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";

import { cn } from "@/lib/utils";
import { CheckIcon, ChevronRightIcon } from "./icons";

/**
 * @component DropdownMenu
 * @category ui/overlay
 * @since 0.2.0
 * @description Root component for a dropdown menu triggered by a button click / 按钮点击触发的下拉菜单根组件
 * @keywords dropdown, menu, overlay, popup
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Edit</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 */
function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

/**
 * @component DropdownMenuPortal
 * @category ui/overlay
 * @since 0.2.0
 * @description Portals the dropdown menu content out of the DOM hierarchy / 将下拉菜单内容传出门户到 DOM 外层
 * @keywords dropdown, menu, portal, dom, render
 * @example
 * <DropdownMenuPortal>
 *   <DropdownMenuContent>...</DropdownMenuContent>
 * </DropdownMenuPortal>
 */
function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

/**
 * @component DropdownMenuTrigger
 * @category ui/overlay
 * @since 0.2.0
 * @description Element that opens the dropdown menu when clicked / 点击时打开下拉菜单的触发元素
 * @keywords dropdown, menu, trigger, button, activator
 * @example
 * <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
 */
function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

/**
 * @component DropdownMenuContent
 * @category ui/overlay
 * @since 0.2.0
 * @description Popup container for dropdown menu items with positioning and animations / 下拉菜单项的弹出容器，带定位和动画
 * @keywords dropdown, menu, content, popup, items
 * @example
 * <DropdownMenuContent align="start">
 *   <DropdownMenuItem>Profile</DropdownMenuItem>
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem>Logout</DropdownMenuItem>
 * </DropdownMenuContent>
 */
function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg p-1 shadow-md ring-1 duration-100 outline-none data-closed:overflow-hidden",
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

/**
 * @component DropdownMenuGroup
 * @category ui/overlay
 * @since 0.2.0
 * @description Groups related dropdown menu items together / 将相关的下拉菜单项分组
 * @keywords dropdown, menu, group, section, items
 * @example
 * <DropdownMenuGroup>
 *   <DropdownMenuItem>Action 1</DropdownMenuItem>
 *   <DropdownMenuItem>Action 2</DropdownMenuItem>
 * </DropdownMenuGroup>
 */
function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

/**
 * @component DropdownMenuLabel
 * @category ui/overlay
 * @since 0.2.0
 * @description Non-interactive label text inside a dropdown menu group / 下拉菜单组内的非交互标签文本
 * @keywords dropdown, menu, label, heading, group
 * @example
 * <DropdownMenuLabel inset>Account</DropdownMenuLabel>
 */
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "text-muted-foreground px-1.5 py-1 text-xs font-medium data-inset:pl-7",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component DropdownMenuItem
 * @category ui/overlay
 * @since 0.2.0
 * @description Interactive menu item with support for default and destructive variants / 交互式菜单项，支持默认和危险变体
 * @keywords dropdown, menu, item, action, destructive
 * @example
 * <DropdownMenuItem onSelect={() => doAction()}>Copy</DropdownMenuItem>
 */
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:*:[svg]:text-destructive relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component DropdownMenuSub
 * @category ui/overlay
 * @since 0.2.0
 * @description Root for a nested submenu within a dropdown menu / 下拉菜单中嵌套子菜单的根组件
 * @keywords dropdown, menu, submenu, nested, cascade
 * @example
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Sub action</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 */
function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

/**
 * @component DropdownMenuSubTrigger
 * @category ui/overlay
 * @since 0.2.0
 * @description Trigger item that opens a nested submenu, with a chevron indicator / 打开嵌套子菜单的触发项，带箭头指示器
 * @keywords dropdown, menu, submenu, trigger, nested, chevron
 * @example
 * <DropdownMenuSubTrigger inset>Share</DropdownMenuSubTrigger>
 */
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

/**
 * @component DropdownMenuSubContent
 * @category ui/overlay
 * @since 0.2.0
 * @description Popup container for the nested submenu content with positioning / 嵌套子菜单内容的弹出容器，带定位
 * @keywords dropdown, menu, submenu, content, popup, nested
 * @example
 * <DropdownMenuSubContent>
 *   <DropdownMenuItem>Sub action</DropdownMenuItem>
 * </DropdownMenuSubContent>
 */
function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 w-auto min-w-[96px] rounded-lg p-1 shadow-lg ring-1 duration-100",
        className,
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

/**
 * @component DropdownMenuCheckboxItem
 * @category ui/overlay
 * @since 0.2.0
 * @description Dropdown menu item with a checkbox indicator for toggle state / 带复选框指示器的下拉菜单项，用于切换状态
 * @keywords dropdown, menu, checkbox, toggle, check, item
 * @example
 * <DropdownMenuCheckboxItem checked={isChecked} onCheckedChange={setChecked}>
 *   Show status bar
 * </DropdownMenuCheckboxItem>
 */
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

/**
 * @component DropdownMenuRadioGroup
 * @category ui/overlay
 * @since 0.2.0
 * @description Radio group container for mutually exclusive dropdown menu items / 互斥下拉菜单项的单选组容器
 * @keywords dropdown, menu, radio, group, exclusive, select
 * @example
 * <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
 *   <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 */
function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

/**
 * @component DropdownMenuRadioItem
 * @category ui/overlay
 * @since 0.2.0
 * @description Dropdown menu item with a radio indicator for single-selection within a group / 带单选指示器的下拉菜单项，用于组内单选
 * @keywords dropdown, menu, radio, item, select, exclusive
 * @example
 * <DropdownMenuRadioItem value="dark">Dark mode</DropdownMenuRadioItem>
 */
function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

/**
 * @component DropdownMenuSeparator
 * @category ui/overlay
 * @since 0.2.0
 * @description Horizontal divider between dropdown menu items or groups / 下拉菜单项或组之间的水平分隔线
 * @keywords dropdown, menu, separator, divider, hr
 * @example
 * <DropdownMenuSeparator />
 */
function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

/**
 * @component DropdownMenuShortcut
 * @category ui/overlay
 * @since 0.2.0
 * @description Displays a keyboard shortcut badge inside a dropdown menu item / 在下拉菜单项中显示快捷键标识
 * @keywords dropdown, menu, shortcut, keyboard, badge, keybind
 * @example
 * <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
 */
function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
