"use client";
import { cn } from "@/lib/utils";
/**
 * @component BarList
 * @category business/charts
 * @since 0.7.0
 * @description 条形列表
 */
interface BarListProps {
data: Array<{ label: string; value: number; color?: string }>;
  className?: string;
}
function BarList({ data, className }: BarListProps) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div data-slot="bar-list" className={cn("flex flex-col gap-2", className)}>
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-2 text-sm">
          <span className="w-28 shrink-0 truncate text-muted-foreground">{d.label}</span>
          <div className="h-4 flex-1 overflow-hidden rounded bg-muted">
            <div className="h-full rounded" style={{ width: `${(d.value / max) * 100}%`, backgroundColor: d.color ?? "hsl(var(--primary))" }} />
          </div>
          <span className="w-12 shrink-0 text-right tabular-nums">{d.value}</span>
        </div>
      ))}
    </div>
  );
}
export { BarList };
export type { BarListProps };
