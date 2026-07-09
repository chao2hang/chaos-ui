"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * @component StatusActionButtons
 * @category business
 * @since 1.2.0
 * @description 按状态自动渲染操作按钮组。接收 status + actionMap，按状态映射
 * 渲染对应按钮。适用于订单 9 态、费用 6 态、经销商 5 态等场景。
 * / Status-driven action button group — maps status to visible buttons.
 * @keywords status, action, button, order, workflow, state-machine
 * @example
 * <StatusActionButtons
 *   status="PENDING"
 *   actionMap={{
 *     PENDING: [
 *       { key: "approve", label: "审批通过", variant: "primary" },
 *       { key: "reject", label: "驳回", variant: "outline" },
 *     ],
 *     APPROVED: [{ key: "ship", label: "发货", variant: "primary" }],
 *   }}
 *   onAction={(key) => handleAction(key)}
 * />
 */

export interface StatusActionButton {
  /** Unique key for the action / 操作唯一标识 */
  key: string;
  /** Button label / 按钮文案 */
  label: React.ReactNode;
  /** Button variant / 按钮样式 */
  variant?:
    "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  /** Button size / 按钮尺寸 */
  size?: "sm" | "default" | "lg" | "icon" | "icon-sm";
  /** Icon element / 图标 */
  icon?: React.ReactNode;
  /** Disabled state / 是否禁用 */
  disabled?: boolean;
  /** Loading state / 加载中 */
  loading?: boolean;
  /** Hidden state / 是否隐藏 */
  hidden?: boolean;
}

export interface StatusActionButtonsProps {
  /** Current status / 当前状态 */
  status: string;
  /** Status → buttons mapping / 状态到按钮的映射 */
  actionMap: Record<string, StatusActionButton[]>;
  /** Action click callback / 按钮点击回调 */
  onAction?: (actionKey: string) => void;
  /** Extra className / 额外样式 */
  className?: string;
  /** Gap between buttons / 按钮间距 */
  gap?: "sm" | "md" | "lg";
  /** Align / 对齐方式 */
  align?: "start" | "center" | "end";
  /** Fallback buttons when status not in map / 状态未匹配时的回退按钮 */
  fallback?: StatusActionButton[];
}

const gapMap = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-3",
};

const alignMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

const variantMap: Record<
  string,
  React.ComponentProps<typeof Button>["variant"]
> = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
  destructive: "destructive",
  link: "link",
};

function StatusActionButtons({
  status,
  actionMap,
  onAction,
  className,
  gap = "md",
  align = "end",
  fallback = [],
}: StatusActionButtonsProps) {
  const buttons = actionMap[status] ?? fallback;
  const visibleButtons = buttons.filter((b) => !b.hidden);

  if (visibleButtons.length === 0) return null;

  return (
    <div
      data-slot="status-action-buttons"
      className={cn(
        "flex items-center",
        gapMap[gap],
        alignMap[align],
        className,
      )}
    >
      {visibleButtons.map((btn) => (
        <Button
          key={btn.key}
          variant={variantMap[btn.variant ?? "outline"]}
          size={btn.size ?? "sm"}
          disabled={btn.disabled || btn.loading}
          onClick={() => onAction?.(btn.key)}
        >
          {btn.icon && <span className="mr-1 shrink-0">{btn.icon}</span>}
          {btn.label}
        </Button>
      ))}
    </div>
  );
}

export { StatusActionButtons };
