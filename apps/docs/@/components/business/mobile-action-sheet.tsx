"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component MobileActionSheet
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端操作表 — 从底部滑出的操作菜单，含遮罩、取消按钮与一组动作项。
 * @keywords mobile, action, sheet
 * @param open 是否展开。
 * @param onOpenChange 控制展开状态；点击遮罩或取消时以 false 调用。
 * @param actions 动作集合；danger 为 true 时渲染为红色警示样式。
 * @example
 * <MobileActionSheet open={open} onOpenChange={setOpen}
 *   actions={[{label:"编辑",onClick:edit},{label:"删除",onClick:del,danger:true}]} />
 */

interface MobileActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actions: Array<{ label: string; onClick: () => void; danger?: boolean }>;
  className?: string;
}

function MobileActionSheet({
  open,
  onOpenChange,
  actions = [],
  className,
}: MobileActionSheetProps) {
  const sheetId = React.useId();

  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      data-slot="mobile-action-sheet"
      role="dialog"
      aria-modal="true"
      aria-label="操作菜单"
      className={cn("fixed inset-0 z-50 flex flex-col justify-end", className)}
    >
      <button
        type="button"
        aria-label="关闭"
        tabIndex={-1}
        onClick={close}
        className="absolute inset-0 bg-black/40"
      />
      <div
        role="document"
        id={sheetId}
        className="bg-popover relative m-2 mb-3 flex flex-col gap-1 rounded-xl p-1 shadow-lg"
      >
        <ul role="menu" className="flex flex-col">
          {actions.map((action) => (
            <li key={action.label} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  action.onClick();
                  close();
                }}
                className={cn(
                  "hover:bg-muted h-11 w-full rounded-lg text-sm font-medium transition-colors",
                  action.danger ? "text-destructive" : "text-foreground",
                )}
              >
                {action.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="bg-border my-1 h-px" aria-hidden="true" />
        <button
          type="button"
          role="menuitem"
          onClick={close}
          className="text-foreground hover:bg-muted h-11 w-full rounded-lg text-sm font-medium transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  );
}

export { MobileActionSheet };
export type { MobileActionSheetProps };
