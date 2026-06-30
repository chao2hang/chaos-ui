"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component DockPanel
 * @category business/ux
 * @since 0.7.0
 * @description 停靠面板
 * @keywords dock, panel
 * @example
 * <DockPanel />
 */

interface DockPanelProps {
  side: "left" | "right" | "bottom";
  collapsed?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  className?: string;
}

function DockPanel({ className }: DockPanelProps) {
  return (
    <div data-slot="dock-panel" className={cn("", className)}>
      {null}
    </div>
  );
}

export { DockPanel };
export type { DockPanelProps };
