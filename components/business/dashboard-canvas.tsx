"use client";

import { cn } from "@/lib/utils";

/**
 * @component DashboardCanvas
 * @category business/charts
 * @since 0.7.0
 * @description 仪表盘画布
 * @keywords dashboard, canvas
 * @example
 * <DashboardCanvas />
 */

interface DashboardCanvasProps {
  widgets: Array<{
    id: string;
    title: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }>;
  onChange?: (widgets: unknown[]) => void;
  className?: string;
}

function DashboardCanvas({ className }: DashboardCanvasProps) {
  return (
    <div data-slot="dashboard-canvas" className={cn("", className)}>
      {null}
    </div>
  );
}

export { DashboardCanvas };
export type { DashboardCanvasProps };
