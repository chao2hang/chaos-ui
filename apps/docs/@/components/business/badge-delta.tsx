"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { ArrowDownRightIcon, ArrowUpRightIcon, MinusIcon } from "@chaos_team/chaos-ui/ui";
/**
 * @component BadgeDelta
 * @category business/charts
 * @since 0.7.0
 * @description 增量徽章
 */
interface BadgeDeltaProps {
value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}
function BadgeDelta({ value, suffix = "%", prefix, className }: BadgeDeltaProps) {
  const dir = value > 0 ? "up" : value < 0 ? "down" : "flat";
  const Icon = dir === "up" ? ArrowUpRightIcon : dir === "down" ? ArrowDownRightIcon : MinusIcon;
  return (
    <span className={cn("inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-xs font-medium", dir === "up" ? "bg-emerald-100 text-emerald-700" : dir === "down" ? "bg-red-100 text-red-700" : "bg-muted text-muted-foreground", className)} data-slot="badge-delta">
      <Icon className="size-3" />
      {prefix}{Math.abs(value)}{suffix}
    </span>
  );
}
export { BadgeDelta };
export type { BadgeDeltaProps };
