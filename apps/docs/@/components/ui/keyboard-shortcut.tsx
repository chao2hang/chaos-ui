"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

/**
 * @component KeyboardShortcut
 * @category ui/utility
 * @since 0.7.0
 * @description 键盘快捷键展示组件 — 渲染格式化的快捷键提示。
 * / Keyboard shortcut display — renders formatted key combination hints.
 * @keywords keyboard, shortcut, hotkey, kbd, shortcut display
 * @example
 * <KeyboardShortcut keys={["Ctrl", "K"]} description="Open command palette" />
 */
interface KeyboardShortcutProps extends React.ComponentProps<"div"> {
  /** Key combination to display / 按键组合 */
  keys: string[];
  /** Optional description text / 描述文本 */
  description?: string;
  /** Layout: "horizontal" (keys + description inline) or "vertical" / 布局 */
  layout?: "horizontal" | "vertical";
}

function KeyboardShortcut({
  keys,
  description,
  layout = "horizontal",
  className,
  ...props
}: KeyboardShortcutProps) {
  return (
    <div
      data-slot="keyboard-shortcut"
      className={cn(
        "flex items-center gap-2",
        layout === "vertical" && "flex-col gap-1",
        className,
      )}
      {...props}
    >
      {description && (
        <span className="text-muted-foreground text-sm">{description}</span>
      )}
      <KbdGroup>
        {keys.map((key, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-muted-foreground text-xs">+</span>}
            <Kbd>{key}</Kbd>
          </React.Fragment>
        ))}
      </KbdGroup>
    </div>
  );
}

export { KeyboardShortcut };
export type { KeyboardShortcutProps };
