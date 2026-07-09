"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@chaos_team/chaos-ui/ui";

/**
 * @component DockPanel
 * @category business/ux
 * @since 0.7.0
 * @description 停靠面板 — 可停靠在左/右/下侧的可折叠面板，含切换按钮与内容区。
 * @param side 停靠方位 left/right/bottom
 * @param collapsed 是否折叠
 * @param onToggle 折叠状态切换回调
 * @param children 面板内容
 * @example
 * <DockPanel side="left" collapsed={false} onToggle={() => {}}>
 *   <p>面板内容</p>
 * </DockPanel>
 */

interface DockPanelProps {
  side: "left" | "right" | "bottom";
  collapsed?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  className?: string;
}

const SIDE_CLASS: Record<DockPanelProps["side"], string> = {
  left: "flex-row",
  right: "flex-row-reverse",
  bottom: "flex-col",
};

const PANEL_CLASS: Record<DockPanelProps["side"], string> = {
  left: "w-64",
  right: "w-64",
  bottom: "h-48",
};

function DockPanel({
  side,
  collapsed = false,
  onToggle,
  children,
  className,
}: DockPanelProps) {
  const isVertical = side === "bottom";
  const ToggleIcon =
    side === "left"
      ? ChevronLeftIcon
      : side === "right"
        ? ChevronRightIcon
        : ChevronUpIcon;
  const label = collapsed
    ? `展开${side === "bottom" ? "下方" : "侧栏"}面板`
    : `折叠${side === "bottom" ? "下方" : "侧栏"}面板`;

  return (
    <div
      data-slot="dock-panel"
      className={cn("flex items-stretch", SIDE_CLASS[side], className)}
    >
      <div
        className={cn(
          "border-muted bg-card flex shrink-0 items-center justify-center",
          isVertical ? "h-8 w-full border-t" : "w-8 flex-col border-r",
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={label}
          onClick={onToggle}
        >
          <ToggleIcon
            className={cn(
              "size-4 transition-transform",
              collapsed && "rotate-180",
            )}
          />
        </Button>
      </div>
      <div
        className={cn(
          "border-muted bg-card overflow-hidden transition-all",
          isVertical ? "border-t" : "border-l",
          PANEL_CLASS[side],
          collapsed ? (isVertical ? "h-0" : "w-0") : "",
        )}
        role="region"
        aria-label="停靠面板内容"
        aria-hidden={collapsed}
      >
        <div
          className={cn("h-full overflow-auto p-3", isVertical ? "" : "w-64")}
        >
          {collapsed ? null : children}
        </div>
      </div>
    </div>
  );
}

export { DockPanel };
export type { DockPanelProps };
