"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "@chaos_team/chaos-ui/ui-icons";
import { cn } from "@chaos_team/chaos-ui/lib";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@chaos_team/chaos-ui/ui";
import { Kbd, KbdGroup } from "@chaos_team/chaos-ui/ui";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  group?: string;
  shortcut?: string;
  keywords?: string[];
  onSelect?: () => void;
  disabled?: boolean;
}

export interface CommandGroup {
  id: string;
  label: string;
  items: CommandItem[];
}

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  groups?: CommandGroup[];
  placeholder?: string;
  emptyText?: string;
  trigger?: React.ReactElement;
  shortcut?: string;
  className?: string;
  showShortcut?: boolean;
}

const flatten = (groups: CommandGroup[]): CommandItem[] =>
  groups.flatMap((g) => g.items);

/**
 * @component CommandPalette
 * @category business/ux
 * @since 0.2.0
 * @description Keyboard-driven command palette (Cmd+K) with grouped items, search, and shortcut display / 键盘驱动的命令面板，支持分组、搜索和快捷键显示
 * @keywords command, palette, search, keyboard, shortcut, cmdk
 * @example
 * <CommandPalette groups={[{ id: "actions", label: "Actions", items: [{ id: "new", label: "New", onSelect: () => {} }] }]} />
 */
export function CommandPalette({
  open,
  onOpenChange,
  groups = [],
  placeholder = "输入命令或搜索...",
  emptyText = "未找到结果",
  trigger,
  shortcut = "mod+K",
  className,
  showShortcut = true,
}: CommandPaletteProps) {
  const { t } = useTranslation("navigation");
  const resolvedPlaceholder =
    placeholder === "输入命令或搜索..."
      ? t("commandPalette.placeholder")
      : placeholder;
  const resolvedEmptyText =
    emptyText === "未找到结果" ? t("commandPalette.emptyText") : emptyText;
  const [internal, setInternal] = React.useState(false);
  const isOpen = open ?? internal;
  const setOpen = React.useCallback(
    (v: boolean) => {
      if (open === undefined) setInternal(v);
      onOpenChange?.(v);
    },
    [open, onOpenChange],
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const parts = shortcut.toLowerCase().split("+");
    const isMod =
      parts.includes("mod") || parts.includes("cmd") || parts.includes("ctrl");
    const key = parts.filter(
      (p) => !["mod", "cmd", "ctrl", "shift", "alt", "option"].includes(p),
    )[0];
    if (!key) return;
    const handler = (e: KeyboardEvent) => {
      if (isMod && !(e.metaKey || e.ctrlKey)) return;
      if (e.key.toLowerCase() === key) {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [shortcut, isOpen, setOpen]);

  const allItems = React.useMemo(() => flatten(groups), [groups]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger && <DialogTrigger render={trigger} />}
      <DialogContent
        showCloseButton={false}
        data-slot="command-palette"
        className="max-w-xl gap-0 overflow-hidden p-0 sm:max-w-xl"
      >
        <DialogTitle className="sr-only">
          {t("commandPalette.srTitle")}
        </DialogTitle>
        <CommandPrimitive
          className={cn(
            "[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
            className,
          )}
          label={t("commandPalette.label")}
        >
          <div className="flex items-center gap-2 border-b px-3">
            <SearchIcon className="size-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
              placeholder={resolvedPlaceholder}
              className="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
            />
            {showShortcut && (
              <KbdGroup className="ml-auto">{parseShortcut(shortcut)}</KbdGroup>
            )}
          </div>
          <CommandPrimitive.List className="max-h-80 overflow-y-auto p-1">
            <CommandPrimitive.Empty className="text-muted-foreground px-3 py-8 text-center text-sm">
              {resolvedEmptyText}
            </CommandPrimitive.Empty>
            {groups.map((group) => (
              <CommandPrimitive.Group key={group.id} heading={group.label}>
                {group.items.map((item) => (
                  <CommandPrimitive.Item
                    key={item.id}
                    value={`${item.label} ${item.keywords?.join(" ") ?? ""}`}
                    onSelect={() => {
                      item.onSelect?.();
                      setOpen(false);
                    }}
                    {...(item.disabled !== undefined
                      ? { disabled: item.disabled }
                      : {})}
                    className="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                  >
                    {item.icon}
                    <div className="flex-1 truncate">
                      <div className="truncate">{item.label}</div>
                      {item.description && (
                        <div className="text-muted-foreground truncate text-xs">
                          {item.description}
                        </div>
                      )}
                    </div>
                    {item.shortcut && (
                      <KbdGroup>
                        {item.shortcut.split("+").map((k, i) => (
                          <Kbd key={i} size="sm">
                            {k.trim()}
                          </Kbd>
                        ))}
                      </KbdGroup>
                    )}
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            ))}
          </CommandPrimitive.List>
          {allItems.length > 0 && (
            <div className="text-muted-foreground flex items-center justify-between border-t px-3 py-2 text-[0.65rem]">
              <span>
                {t("commandPalette.totalItems", { count: allItems.length })}
              </span>
              <span className="flex items-center gap-1">
                <Kbd size="sm">↑</Kbd>
                <Kbd size="sm">↓</Kbd>
                {t("commandPalette.navigate")}
                <Kbd size="sm">↵</Kbd>
                {t("commandPalette.select")}
                <Kbd size="sm">Esc</Kbd>
                {t("commandPalette.close")}
              </span>
            </div>
          )}
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  );
}

function parseShortcut(shortcut: string): React.ReactNode {
  return shortcut.split("+").map((k, i) => (
    <Kbd key={i} size="sm">
      {k.trim() === "mod" || k.trim() === "cmd"
        ? "⌘"
        : k.trim() === "ctrl"
          ? "Ctrl"
          : k.trim() === "shift"
            ? "⇧"
            : k.trim() === "alt"
              ? "⌥"
              : k.trim()}
    </Kbd>
  ));
}
