"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

/**
 * A single keyboard shortcut entry.
 */
interface ShortcutItem {
  /** Shortcut keys to display, e.g. ["Ctrl", "K"] */
  keys: string[];
  /** Description of what the shortcut does */
  description: string;
  /** Optional action when item is selected in dialog */
  action?: () => void;
}

/**
 * A named group of related shortcuts.
 */
interface ShortcutGroup {
  /** Group title */
  title: string;
  /** Shortcuts in this group */
  shortcuts: ShortcutItem[];
}

/**
 * Props for the KeyboardShortcutDialog component.
 */
interface KeyboardShortcutDialogProps {
  /** Dialog open state */
  open?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Grouped shortcut data */
  groups: ShortcutGroup[];
  /** Dialog title */
  title?: string;
  /** Search placeholder */
  placeholder?: string;
  /** Additional CSS class for the dialog content */
  className?: string;
}

/**
 * @component KeyboardShortcutDialog
 * @category ui/utility
 * @since 1.0.0
 * @description A searchable dialog showing all keyboard shortcuts, grouped by category.
 * Uses CommandDialog (cmdk) for built-in search/filtering. Each shortcut group is rendered
 * as a CommandGroup with CommandItem rows showing description + key badges.
 * @keywords keyboard, shortcut, dialog, search, hotkey, command palette
 * @example
 * <KeyboardShortcutDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   groups={[{ title: "Navigation", shortcuts: [{ keys: ["Ctrl", "K"], description: "Open palette" }] }]}
 * />
 */
function KeyboardShortcutDialog({
  open,
  onOpenChange,
  groups,
  title = "Keyboard Shortcuts",
  placeholder = "Search shortcuts...",
  className,
}: KeyboardShortcutDialogProps) {
  return (
    <CommandDialog
      data-slot="keyboard-shortcut-dialog"
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      className={cn(className)}
    >
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>No shortcuts found</CommandEmpty>
        {groups.map((group) => (
          <CommandGroup key={group.title} heading={group.title}>
            {group.shortcuts.map((shortcut, idx) => {
              // Build a unique value for cmdk filtering: description + all key names
              const filterValue = [
                shortcut.description,
                ...shortcut.keys,
              ].join(" ");
              return (
                <CommandItem
                  key={`${group.title}-${idx}`}
                  value={filterValue}
                  onSelect={() => {
                    shortcut.action?.();
                  }}
                  className="flex items-center justify-between"
                >
                  <span>{shortcut.description}</span>
                  <KbdGroup>
                    {shortcut.keys.map((key, keyIdx) => (
                      <React.Fragment key={keyIdx}>
                        {keyIdx > 0 && (
                          <span className="text-muted-foreground text-xs">
                            +
                          </span>
                        )}
                        <Kbd size="sm">{key}</Kbd>
                      </React.Fragment>
                    ))}
                  </KbdGroup>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

export { KeyboardShortcutDialog };
export type {
  KeyboardShortcutDialogProps,
  ShortcutItem,
  ShortcutGroup,
};
