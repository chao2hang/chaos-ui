"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component KeyboardShortcutsManager
 * @category ui/utilities
 * @since 0.2.0
 * @description Global keyboard shortcuts registration center that parses key combos and listens on document keydown / 全局键盘快捷键注册中心，解析组合键并监听 document keydown
 * @keywords keyboard, shortcuts, hotkeys, shortcut, manager
 * @example
 * <KeyboardShortcutsManager
 *   shortcuts={[{ id: "save", keys: "cmd+s", handler: () => save() }]}
 * />
 */

interface ShortcutDef {
  /** Unique shortcut id / 唯一标识 */
  id: string;
  /** Key combo like "cmd+k", "ctrl+shift+p" / 组合键，如 "cmd+k"、"ctrl+shift+p" */
  keys: string;
  /** Human-readable description / 描述 */
  description?: string;
  /** Handler invoked when the combo is pressed / 按下时的处理函数 */
  handler: (event: KeyboardEvent) => void;
  /** Scope tag for grouping (default: "global") / 作用域标签（默认 "global"） */
  scope?: string;
  /** Whether to call preventDefault on match (default: true) / 匹配时是否阻止默认行为（默认 true） */
  preventDefault?: boolean;
}

interface KeyboardShortcutsManagerProps extends React.ComponentProps<"div"> {
  /** Shortcut definitions / 快捷键定义 */
  shortcuts?: ShortcutDef[];
  /** Whether shortcuts are enabled (default: true) / 是否启用（默认 true） */
  enabled?: boolean;
  /** Callback when any shortcut triggers / 任一快捷键触发时的回调 */
  onTrigger?: (shortcutId: string) => void;
}

interface ParsedCombo {
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  meta: boolean;
  key: string;
}

function parseCombo(keys: string): ParsedCombo {
  const parts = keys
    .toLowerCase()
    .split("+")
    .map((p) => p.trim());
  const ctrl = parts.includes("ctrl");
  const shift = parts.includes("shift");
  const alt = parts.includes("alt");
  const cmd = parts.includes("cmd");
  const meta = parts.includes("meta");
  const modifierSet = new Set(["ctrl", "shift", "alt", "cmd", "meta"]);
  const keyPart = parts.find((p) => !modifierSet.has(p)) ?? "";
  return {
    ctrl,
    shift,
    alt,
    // Normalize cmd/meta/ctrl to metaKey for cross-platform
    meta: cmd || meta || ctrl,
    key: keyPart,
  };
}

function isTypingInField(event: KeyboardEvent): boolean {
  const target = event.target as HTMLElement | null;
  if (!target) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

function matches(combo: ParsedCombo, event: KeyboardEvent): boolean {
  const key = event.key.toLowerCase();
  if (combo.key && combo.key !== key) return false;
  if (combo.meta !== (event.metaKey || event.ctrlKey)) return false;
  if (combo.shift !== event.shiftKey) return false;
  if (combo.alt !== event.altKey) return false;
  return true;
}

function KeyboardShortcutsManager({
  className,
  shortcuts = [],
  enabled = true,
  onTrigger,
  ...props
}: KeyboardShortcutsManagerProps) {
  // Keep latest handler refs in a ref so we don't rebind the listener.
  const shortcutsRef = React.useRef(shortcuts);
  shortcutsRef.current = shortcuts;
  const enabledRef = React.useRef(enabled);
  enabledRef.current = enabled;
  const onTriggerRef = React.useRef(onTrigger);
  onTriggerRef.current = onTrigger;

  React.useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!enabledRef.current) return;
      const list = shortcutsRef.current;
      for (const shortcut of list) {
        const combo = parseCombo(shortcut.keys);
        // Allow typing in fields only if the shortcut explicitly requires meta/ctrl
        const isModifierShortcut = combo.meta;
        if (isTypingInField(event) && !isModifierShortcut) continue;
        if (matches(combo, event)) {
          if (shortcut.preventDefault !== false) event.preventDefault();
          shortcut.handler(event);
          onTriggerRef.current?.(shortcut.id);
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div
      data-slot="keyboard-shortcuts-manager"
      className={cn(className)}
      {...props}
    />
  );
}

/**
 * @component useKeyboardShortcuts
 * @category ui/utilities
 * @since 0.2.0
 * @description Hook that registers keyboard shortcuts programmatically / 以编程方式注册键盘快捷键的 Hook
 * @keywords keyboard, shortcuts, hook, hotkeys
 * @example
 * useKeyboardShortcuts([{ id: "save", keys: "cmd+s", handler: () => save() }]);
 */
function useKeyboardShortcuts(shortcuts: ShortcutDef[], enabled = true) {
  const shortcutsRef = React.useRef(shortcuts);
  shortcutsRef.current = shortcuts;
  const enabledRef = React.useRef(enabled);
  enabledRef.current = enabled;

  React.useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!enabledRef.current) return;
      for (const shortcut of shortcutsRef.current) {
        const combo = parseCombo(shortcut.keys);
        if (isTypingInField(event) && !combo.meta) continue;
        if (matches(combo, event)) {
          if (shortcut.preventDefault !== false) event.preventDefault();
          shortcut.handler(event);
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);
}

export { KeyboardShortcutsManager, useKeyboardShortcuts };
export type { ShortcutDef, KeyboardShortcutsManagerProps };
