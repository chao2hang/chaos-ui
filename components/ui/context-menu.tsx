"use client";
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";

import { cn } from "@/lib/utils";
import { CheckIcon, ChevronRightIcon } from "./icons";

/**
 * @component ContextMenu
 * @category ui/overlay
 * @since 0.2.0
 * @description Root component for a right-click context menu / 右键上下文菜单的根组件
 * @keywords context-menu, right-click, menu, overlay
 * @example
 * <ContextMenu>
 *   <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem>Action</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 */
function ContextMenu({ ...props }: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

/**
 * @component ContextMenuTrigger
 * @category ui/overlay
 * @since 0.2.0
 * @description Element that opens the context menu on right-click / 右键触发上下文菜单的元素
 * @keywords context-menu, trigger, right-click, activator
 * @example
 * <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
 */
function ContextMenuTrigger({ ...props }: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

/**
 * @component ContextMenuPortal
 * @category ui/overlay
 * @since 0.2.0
 * @description Portals the context menu content out of the DOM hierarchy / 将上下文菜单内容传出门户到 DOM 外层
 * @keywords context-menu, portal, dom, render
 * @example
 * <ContextMenuPortal>
 *   <ContextMenuContent>...</ContextMenuContent>
 * </ContextMenuPortal>
 */
function ContextMenuPortal({ ...props }: ContextMenuPrimitive.Portal.Props) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

/**
 * @component ContextMenuContent
 * @category ui/overlay
 * @since 0.2.0
 * @description The popup container for context menu items with positioning and animation / 上下文菜单项的弹出容器，带定位和动画
 * @keywords context-menu, content, popup, dropdown, items
 * @example
 * <ContextMenuContent>
 *   <ContextMenuItem>Copy</ContextMenuItem>
 *   <ContextMenuSeparator />
 *   <ContextMenuItem>Delete</ContextMenuItem>
 * </ContextMenuContent>
 */
function ContextMenuContent({
  align = "start",
  alignOffset = 0,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <ContextMenuPortal>
      <ContextMenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50 outline-none"
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn(
            "bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg p-1 shadow-md ring-1 outline-none",
            className,
          )}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPortal>
  );
}

/**
 * @component ContextMenuGroup
 * @category ui/overlay
 * @since 0.2.0
 * @description Groups related context menu items together / 将相关的上下文菜单项分组
 * @keywords context-menu, group, section, items
 * @example
 * <ContextMenuGroup>
 *   <ContextMenuItem>Action 1</ContextMenuItem>
 *   <ContextMenuItem>Action 2</ContextMenuItem>
 * </ContextMenuGroup>
 */
function ContextMenuGroup({ ...props }: ContextMenuPrimitive.Group.Props) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

/**
 * @component ContextMenuLabel
 * @category ui/overlay
 * @since 0.2.0
 * @description Non-interactive label text inside a context menu group / 上下文菜单组内的非交互标签文本
 * @keywords context-menu, label, heading, group, text
 * @example
 * <ContextMenuLabel inset>Actions</ContextMenuLabel>
 */
function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & { inset?: boolean }) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
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
 * @component ContextMenuItem
 * @category ui/overlay
 * @since 0.2.0
 * @description Interactive menu item with support for default and destructive variants / 交互式菜单项，支持默认和危险变体
 * @keywords context-menu, item, action, menu, destructive
 * @example
 * <ContextMenuItem onSelect={() => doAction()}>Copy</ContextMenuItem>
 */
function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component ContextMenuSub
 * @category ui/overlay
 * @since 0.2.0
 * @description Root for a nested submenu within a context menu / 上下文菜单中嵌套子菜单的根组件
 * @keywords context-menu, submenu, nested, cascade
 * @example
 * <ContextMenuSub>
 *   <ContextMenuSubTrigger>More options</ContextMenuSubTrigger>
 *   <ContextMenuSubContent>
 *     <ContextMenuItem>Sub action</ContextMenuItem>
 *   </ContextMenuSubContent>
 * </ContextMenuSub>
 */
function ContextMenuSub({ ...props }: ContextMenuPrimitive.SubmenuRoot.Props) {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  );
}

/**
 * @component ContextMenuSubTrigger
 * @category ui/overlay
 * @since 0.2.0
 * @description Trigger item that opens a nested submenu, with a chevron indicator / 打开嵌套子菜单的触发项，带箭头指示器
 * @keywords context-menu, submenu, trigger, nested, chevron
 * @example
 * <ContextMenuSubTrigger inset>Share</ContextMenuSubTrigger>
 */
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & { inset?: boolean }) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

/**
 * @component ContextMenuSubContent
 * @category ui/overlay
 * @since 0.2.0
 * @description Popup container for the nested submenu content / 嵌套子菜单内容的弹出容器
 * @keywords context-menu, submenu, content, popup, nested
 * @example
 * <ContextMenuSubContent>
 *   <ContextMenuItem>Sub action</ContextMenuItem>
 * </ContextMenuSubContent>
 */
function ContextMenuSubContent({
  className,
  ...props
}: ContextMenuPrimitive.Popup.Props) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      sideOffset={4}
      className={cn("min-w-[160px]", className)}
      {...props}
    />
  );
}

/**
 * @component ContextMenuCheckboxItem
 * @category ui/overlay
 * @since 0.2.0
 * @description Context menu item with a checkbox indicator for toggle state / 带复选框指示器的上下文菜单项，用于切换状态
 * @keywords context-menu, checkbox, toggle, check, item
 * @example
 * <ContextMenuCheckboxItem checked={isChecked} onCheckedChange={setChecked}>
 *   Show sidebar
 * </ContextMenuCheckboxItem>
 */
function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props & { inset?: boolean }) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex items-center justify-center">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

/**
 * @component ContextMenuRadioGroup
 * @category ui/overlay
 * @since 0.2.0
 * @description Radio group container for mutually exclusive context menu items / 互斥上下文菜单项的单选组容器
 * @keywords context-menu, radio, group, exclusive, select
 * @example
 * <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
 *   <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
 * </ContextMenuRadioGroup>
 */
function ContextMenuRadioGroup({
  ...props
}: ContextMenuPrimitive.RadioGroup.Props) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

/**
 * @component ContextMenuRadioItem
 * @category ui/overlay
 * @since 0.2.0
 * @description Context menu item with a radio indicator for single-selection within a group / 带单选指示器的上下文菜单项，用于组内单选
 * @keywords context-menu, radio, item, select, exclusive
 * @example
 * <ContextMenuRadioItem value="dark">Dark mode</ContextMenuRadioItem>
 */
function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: ContextMenuPrimitive.RadioItem.Props & { inset?: boolean }) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex items-center justify-center">
        <ContextMenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

/**
 * @component ContextMenuSeparator
 * @category ui/overlay
 * @since 0.2.0
 * @description Horizontal divider between context menu items or groups / 上下文菜单项或组之间的水平分隔线
 * @keywords context-menu, separator, divider, hr
 * @example
 * <ContextMenuSeparator />
 */
function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
