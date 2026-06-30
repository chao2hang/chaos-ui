import { cn } from "@/lib/utils";

/**
 * @component DonutCard
 * @category business/charts
 * @since 0.7.0
 * @description 环形图卡片
 * @keywords donut, card
 * @example
 * <DonutCard />
 */

interface DonutCardProps {
  data: Array<{ label: string; value: number; color: string }>;
  centerLabel?: string;
  className?: string;
}

function DonutCard({ className }: DonutCardProps) {
  return (
    <div data-slot="donut-card" className={cn("", className)}>
      {null}
    </div>
  );
}

export { DonutCard };
export type { DonutCardProps };
