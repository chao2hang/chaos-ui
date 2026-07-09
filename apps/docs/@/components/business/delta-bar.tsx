import { cn } from "@chaos_team/chaos-ui/lib";
import { formatPercent } from "@chaos_team/chaos-ui/lib";

/**
 * @component DeltaBar
 * @category business/charts
 * @since 0.7.0
 * @description 增量条 — a horizontal progress bar showing value against a max,
 * colored by positive/negative delta, with an accessible label.
 * @param value Current value (may be negative).
 * @param maxValue Scale ceiling; defaults to `Math.max(1, |value|)`.
 * @param label Optional caption rendered above the bar.
 * @param className Extra classes on the root.
 * @example
 * <DeltaBar value={42} maxValue={100} label="增长率" />
 */

interface DeltaBarProps {
  value: number;
  maxValue?: number;
  label?: string;
  className?: string;
}

function DeltaBar({
  value,
  maxValue,
  label,
  className,
}: DeltaBarProps) {
  const positive = value >= 0;
  const max = maxValue ?? Math.max(1, Math.abs(value));
  const pct = Math.min(100, Math.max(0, (Math.abs(value) / max) * 100));

  return (
    <div
      data-slot="delta-bar"
      className={cn("flex flex-col gap-1", className)}
    >
      {label ? (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{label}</span>
          <span
            className={cn(
              "font-medium tabular-nums",
              positive ? "text-emerald-600" : "text-red-600",
            )}
          >
            {positive ? "+" : "−"}
            {formatPercent(Math.abs(value) / 100)}
          </span>
        </div>
      ) : null}
      <div
        className="relative h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={-max}
        aria-valuemax={max}
        aria-label={label ?? "增量"}
      >
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full",
            positive ? "bg-emerald-500" : "bg-red-500",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export { DeltaBar };
export type { DeltaBarProps };
