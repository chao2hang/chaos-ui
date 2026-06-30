import { cn } from "@/lib/utils";

/**
 * @component BarList
 * @category business/charts
 * @since 0.7.0
 * @description 条形列表
 * @keywords bar, list
 * @example
 * <BarList />
 */

interface BarListProps {
  data: Array<{ label: string; value: number; color?: string }>;
  className?: string;
}

function BarList({ className }: BarListProps) {
  return (
    <div data-slot="bar-list" className={cn("", className)}>
      {null}
    </div>
  );
}

export { BarList };
export type { BarListProps };
