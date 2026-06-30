import { cn } from "@/lib/utils";

/**
 * @component DeltaBar
 * @category business/charts
 * @since 0.7.0
 * @description 增量条
 * @keywords delta, bar
 * @example
 * <DeltaBar />
 */

interface DeltaBarProps {
  value: number;
  maxValue?: number;
  label?: string;
  className?: string;
}

function DeltaBar({ className }: DeltaBarProps) {
  return (
    <div data-slot="delta-bar" className={cn("", className)}>
      {null}
    </div>
  );
}

export { DeltaBar };
export type { DeltaBarProps };
