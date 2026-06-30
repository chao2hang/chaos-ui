import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ChartCard
 * @category business/charts
 * @since 0.7.0
 * @description 图表卡片
 * @keywords chart, card
 * @example
 * <ChartCard />
 */

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

function ChartCard({ className }: ChartCardProps) {
  return (
    <div data-slot="chart-card" className={cn("", className)}>
      {null}
    </div>
  );
}

export { ChartCard };
export type { ChartCardProps };
