import { cn } from "@/lib/utils";

/**
 * @component Tracking
 * @category business/charts
 * @since 0.7.0
 * @description 追踪组件
 * @keywords tracking
 * @example
 * <Tracking />
 */

interface TrackingProps {
  target: number;
  actual: number;
  label?: string;
  className?: string;
}

function Tracking({ className }: TrackingProps) {
  return (
    <div data-slot="tracking" className={cn("", className)}>
      {null}
    </div>
  );
}

export { Tracking };
export type { TrackingProps };
