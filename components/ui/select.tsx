"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";

import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  CheckIcon,
  ChevronUpIcon,
} from "@/components/ui/icons";

/**
 * @component Select
 * @category ui/data-entry
 * @since 0.2.0
 * @description Root component for a dropdown select menu for choosing one or more options / 下拉选择菜单根组件，用于选择一个或多个选项
 * @keywords select, dropdown, picker, option, menu, combobox
 * @example
 * <Select>
 *   <SelectTrigger><SelectValue placeholder="Choose..." /></SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="1">Option 1</SelectItem>
 *   </SelectContent>
 * </Select>
 */
const Select = SelectPrimitive.Root;

/**
 * @component SelectGroup
 * @category ui/data-entry
 * @since 0.2.0
 * @description Groups related select items under an optional label / 将相关选项分组，可附带分组标签
 * @keywords select, group, option group, category
 * @example
 * <SelectGroup>
 *   <SelectLabel>Fruits</SelectLabel>
 *   <SelectItem value="apple">Apple</SelectItem>
 * </SelectGroup>
 */
function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  );
}

export type SelectValueProps = SelectPrimitive.Value.Props;

/**
 * @component SelectValue
 * @category ui/data-entry
 * @since 0.2.0
 * @description Displays the currently selected value or placeholder in the trigger / 在触发器上显示当前选中的值或占位文本
 * @keywords select, value, display, placeholder, trigger
 * @example
 * <SelectValue placeholder="Select an option..." />
 */
function SelectValue({ className, ...props }: SelectValueProps) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  );
}

export type SelectTriggerProps = SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default";
};

/**
 * @component SelectTrigger
 * @category ui/data-entry
 * @since 0.2.0
 * @description The clickable button that toggles the select dropdown with size variants / 可点击按钮，切换下拉菜单的显示，支持尺寸变体
 * @keywords select, trigger, button, toggle, dropdown
 * @example
 * <SelectTrigger size="default">
 *   <SelectValue placeholder="Choose..." />
 * </SelectTrigger>
 */
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // #19: default w-full for form grids (was w-fit); use className="w-fit" for compact toolbars
        "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex w-full items-center justify-between gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}

export type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >;

/**
 * @component SelectContent
 * @category ui/data-entry
 * @since 0.2.0
 * @description The dropdown popup containing select items with scroll buttons / 下拉弹出面板，包含选项列表和滚动按钮
 * @keywords select, content, popup, dropdown, list, options
 * @example
 * <SelectContent side="bottom" align="center">
 *   <SelectItem value="1">Option 1</SelectItem>
 * </SelectContent>
 */
function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg shadow-md ring-1 duration-100 data-[align-trigger=true]:animate-none",
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

/**
 * @component SelectLabel
 * @category ui/data-entry
 * @since 0.2.0
 * @description Label for grouping related items within a SelectGroup / 选择分组标签，用于标识一组相关选项
 * @keywords select, label, group, heading, category
 * @example
 * <SelectLabel>Fruits</SelectLabel>
 */
function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("text-muted-foreground px-1.5 py-1 text-xs", className)}
      {...props}
    />
  );
}

export type SelectItemProps = SelectPrimitive.Item.Props;

/**
 * @component SelectItem
 * @category ui/data-entry
 * @since 0.2.0
 * @description An individual selectable option item with check indicator / 单个可选项，包含选中勾选指示器
 * @keywords select, item, option, choice, check, indicator
 * @example
 * <SelectItem value="apple">Apple</SelectItem>
 */
function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

/**
 * @component SelectSeparator
 * @category ui/data-entry
 * @since 0.2.0
 * @description Visual divider between select item groups / 选项组之间的视觉分隔线
 * @keywords select, separator, divider, group
 * @example
 * <SelectSeparator />
 */
function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

/**
 * @component SelectScrollUpButton
 * @category ui/data-entry
 * @since 0.2.0
 * @description Scroll-up arrow button for overflowing select content / 向上滚动箭头按钮，用于溢出内容的选项列表
 * @keywords select, scroll, up, arrow, button
 * @example
 * <SelectScrollUpButton />
 */
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "bg-popover top-0 z-10 flex w-full cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

/**
 * @component SelectScrollDownButton
 * @category ui/data-entry
 * @since 0.2.0
 * @description Scroll-down arrow button for overflowing select content / 向下滚动箭头按钮，用于溢出内容的选项列表
 * @keywords select, scroll, down, arrow, button
 * @example
 * <SelectScrollDownButton />
 */
function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bg-popover bottom-0 z-10 flex w-full cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
