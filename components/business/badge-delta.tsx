import { cn } from "@/lib/utils";

/**
 * @component BadgeDelta
 * @category business/charts
 * @since 0.7.0
 * @description 增量徽章
 * @keywords badge, delta
 * @example
 * <BadgeDelta />
 */

interface BadgeDeltaProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

function BadgeDelta({ className }: BadgeDeltaProps) {
  return (
    <div data-slot="badge-delta" className={cn("", className)}>
      {null}
    </div>
  );
}

export { BadgeDelta };
export type { BadgeDeltaProps };
