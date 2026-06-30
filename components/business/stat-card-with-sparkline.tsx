import { cn } from "@/lib/utils";

/**
 * @component StatCardWithSparkline
 * @category business/charts
 * @since 0.7.0
 * @description 带迷你图统计卡片
 * @keywords stat, card, with, sparkline
 * @example
 * <StatCardWithSparkline />
 */

interface StatCardWithSparklineProps {
  label: string;
  value: string | number;
  trend?: number;
  sparklineData?: number[];
  className?: string;
}

function StatCardWithSparkline({ className }: StatCardWithSparklineProps) {
  return (
    <div data-slot="stat-card-with-sparkline" className={cn("", className)}>
      {null}
    </div>
  );
}

export { StatCardWithSparkline };
export type { StatCardWithSparklineProps };
