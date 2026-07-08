"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { CheckIcon, SearchIcon } from "./icons";

/**
 * @component Command
 * @category ui/overlay
 * @since 0.2.0
 * @description Root container for a command palette / keyboard-driven command menu / 键盘驱动的命令面板根容器
 * @keywords command, palette, search, cmdk, keyboard
 * @example
 * <Command>
 *   <CommandInput placeholder="Type a command..." />
 *   <CommandList>
 *     <CommandItem>Profile</CommandItem>
 *   </CommandList>
 * </Command>
 */
function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-xl! p-1",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component CommandDialog
 * @category ui/overlay
 * @since 0.2.0
 * @description Command palette wrapped in a modal dialog with title and description / 包裹在模态对话框中的命令面板
 * @keywords command, dialog, modal, palette, search
 * @example
 * <CommandDialog open={open} onOpenChange={setOpen}>
 *   <CommandInput />
 *   <CommandList>...</CommandList>
 * </CommandDialog>
 */
function CommandDialog({
  title,
  description,
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
}) {
  const { t } = useTranslation("ui");
  const resolvedTitle = title ?? t("commandDialog.title");
  const resolvedDescription = description ?? t("commandDialog.description");
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{resolvedTitle}</DialogTitle>
        <DialogDescription>{resolvedDescription}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0",
          className,
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

/**
 * @component CommandInput
 * @category ui/overlay
 * @since 0.2.0
 * @description Search input for filtering command items, with a search icon addon / 用于过滤命令项的搜索输入框，带搜索图标插件
 * @keywords command, input, search, filter, text
 * @example
 * <CommandInput placeholder="Search commands..." />
 */
function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="border-input/30 bg-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

/**
 * @component CommandList
 * @category ui/overlay
 * @since 0.2.0
 * @description Scrollable container for command items with keyboard navigation support / 支持键盘导航的可滚动命令项容器
 * @keywords command, list, scroll, items, container
 * @example
 * <CommandList>
 *   <CommandItem>Action 1</CommandItem>
 * </CommandList>
 */
function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component CommandEmpty
 * @category ui/overlay
 * @since 0.2.0
 * @description Shown when no command items match the current search query / 当前搜索无匹配项时显示的空状态
 * @keywords command, empty, no results, placeholder
 * @example
 * <CommandEmpty>No results found.</CommandEmpty>
 */
function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  );
}

/**
 * @component CommandGroup
 * @category ui/overlay
 * @since 0.2.0
 * @description Groups related command items under a common heading / 将相关命令项分组在公共标题下
 * @keywords command, group, heading, category, section
 * @example
 * <CommandGroup heading="Actions">
 *   <CommandItem>Copy</CommandItem>
 * </CommandGroup>
 */
function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component CommandSeparator
 * @category ui/overlay
 * @since 0.2.0
 * @description Visual divider between command groups or items / 命令组或命令项之间的视觉分隔线
 * @keywords command, separator, divider, hr
 * @example
 * <CommandSeparator />
 */
function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

/**
 * @component CommandItem
 * @category ui/overlay
 * @since 0.2.0
 * @description Selectable item in a command palette with keyboard navigation and check icon on selection / 命令面板中可选择项，支持键盘导航和选中标记
 * @keywords command, item, select, action, option
 * @example
 * <CommandItem onSelect={() => console.log("selected")}>
 *   Profile
 *   <CommandShortcut>Ctrl+P</CommandShortcut>
 * </CommandItem>
 */
function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item data-selected:bg-muted data-selected:text-foreground data-selected:*:[svg]:text-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <CheckIcon className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  );
}

/**
 * @component CommandShortcut
 * @category ui/overlay
 * @since 0.2.0
 * @description Displays a keyboard shortcut badge inside a CommandItem / 在命令项中显示快捷键标识
 * @keywords command, shortcut, keyboard, badge, keybind
 * @example
 * <CommandShortcut>Ctrl+K</CommandShortcut>
 */
function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground group-data-selected/command-item:text-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
