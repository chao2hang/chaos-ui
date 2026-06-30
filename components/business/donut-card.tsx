import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";

/**
 * @component DonutCard
 * @category business/charts
 * @since 0.7.0
 * @description 环形图卡片 — donut SVG with center label and legend.
 * @param data Segments with label/value/color.
 * @param centerLabel Optional text drawn in the donut hole.
 * @param className Extra classes on the root.
 * @example
 * <DonutCard data={[{label:"A",value:60,color:"#3b82f6"}]} centerLabel="总计" />
 */

interface DonutCardProps {
  data: Array<{ label: string; value: number; color: string }>;
  centerLabel?: string;
  className?: string;
}

function DonutCard({ data, centerLabel, className }: DonutCardProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = 40;
  const c = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div
      data-slot="donut-card"
      className={cn(
        "flex flex-col items-center gap-4 rounded-lg border bg-card p-4 sm:flex-row",
        className,
      )}
      role="img"
      aria-label={`环形图，共 ${data.length} 段，总计 ${total}`}
    >
      <div className="relative size-32 shrink-0">
        <svg viewBox="0 0 100 100" className="size-32 -rotate-90" role="presentation">
          {data.map((d) => {
            const frac = d.value / total;
            const seg = (
              <circle
                key={d.label}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth="12"
                strokeDasharray={`${frac * c} ${c}`}
                strokeDashoffset={-acc * c}
              >
                <title>
                  {d.label}: {formatNumber(d.value)}
                </title>
              </circle>
            );
            acc += frac;
            return seg;
          })}
        </svg>
        {centerLabel ? (
          <span className="absolute inset-0 flex items-center justify-center text-sm font-medium tabular-nums">
            {centerLabel}
          </span>
        ) : null}
      </div>
      <ul className="flex flex-1 flex-col gap-1.5 text-sm" role="list">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2">
            <span
              className="size-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: d.color }}
              aria-hidden="true"
            />
            <span className="text-muted-foreground">{d.label}</span>
            <span className="ml-auto tabular-nums">{formatNumber(d.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { DonutCard };
export type { DonutCardProps };
