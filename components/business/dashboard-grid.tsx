"use client";
import { cn } from "@/lib/utils";

/**
 * @component DashboardGrid
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <DashboardGrid />
 * ```
 * 预设仪表盘网格布局
 */
export interface DashboardGridProps {
  className?: string;
}

function DashboardGrid({ className }: DashboardGridProps) {
  return <div data-slot="dashboard-grid" className={cn("", className)} />;
}

export { DashboardGrid };
