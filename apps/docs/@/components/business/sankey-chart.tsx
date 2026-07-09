"use client";
import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";

/**
 * @component SankeyChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 桑基图(流量流转) — left source bars flowing into right target bars
 * with weighted connecting bands (pure SVG, no deps).
 * @param flows Each flow: source label, target label, value.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <SankeyChart flows={[{source:"广告",target:"下单",value:60}]} />
 * ```
 * 桑基图(流量流转)
 */
export interface SankeyChartProps {
  /** Source → target flows. */
  flows?: Array<{ source: string; target: string; value: number }>;
  className?: string;
}

const DEFAULT_SANKEY: Array<{ source: string; target: string; value: number }> = [
  { source: "搜索", target: "下单", value: 40 },
  { source: "广告", target: "下单", value: 25 },
  { source: "广告", target: "流失", value: 15 },
  { source: "直接", target: "下单", value: 20 },
];

const SOURCE_COLORS: Record<string, string> = {
  搜索: "#3b82f6",
  广告: "#8b5cf6",
  直接: "#10b981",
};
const TARGET_COLORS: Record<string, string> = {
  下单: "#3b82f6",
  流失: "#ef4444",
};

function SankeyChart({
  flows = DEFAULT_SANKEY,
  className,
}: SankeyChartProps) {
  const sources = React.useMemo(() => {
    const seen: string[] = [];
    for (const f of flows) if (!seen.includes(f.source)) seen.push(f.source);
    return seen;
  }, [flows]);
  const targets = React.useMemo(() => {
    const seen: string[] = [];
    for (const f of flows) if (!seen.includes(f.target)) seen.push(f.target);
    return seen;
  }, [flows]);

  const sourceTotals = React.useMemo(() => {
    const m = new Map<string, number>();
    for (const f of flows) m.set(f.source, (m.get(f.source) ?? 0) + f.value);
    return m;
  }, [flows]);
  const targetTotals = React.useMemo(() => {
    const m = new Map<string, number>();
    for (const f of flows) m.set(f.target, (m.get(f.target) ?? 0) + f.value);
    return m;
  }, [flows]);

  const height = 200;
  const gap = 8;
  const totalSource = Math.max(1, ...Array.from(sourceTotals.values()));
  const totalTarget = Math.max(1, ...Array.from(targetTotals.values()));
  const totalMax = Math.max(totalSource, totalTarget);

  const sourceBars = sources.map((s, i) => {
    const prevH = sources
      .slice(0, i)
      .reduce((acc, p) => acc + ((sourceTotals.get(p) ?? 0) / totalMax) * (height - gap * (sources.length - 1)), 0);
    const h = ((sourceTotals.get(s) ?? 0) / totalMax) * (height - gap * (sources.length - 1));
    return { label: s, y: prevH + i * gap, h, color: SOURCE_COLORS[s] ?? "#3b82f6" };
  });
  const targetBars = targets.map((t, i) => {
    const prevH = targets
      .slice(0, i)
      .reduce((acc, p) => acc + ((targetTotals.get(p) ?? 0) / totalMax) * (height - gap * (targets.length - 1)), 0);
    const h = ((targetTotals.get(t) ?? 0) / totalMax) * (height - gap * (targets.length - 1));
    return { label: t, y: prevH + i * gap, h, color: TARGET_COLORS[t] ?? "#10b981" };
  });

  const x1 = 90;
  const x2 = 230;
  const bandH = (f: { source: string; target: string; value: number }) =>
    (f.value / totalMax) * (height - gap * (Math.max(sources.length, targets.length) - 1));

  // running offsets per side for band stacking
  const srcOffset = new Map<string, number>();
  const tgtOffset = new Map<string, number>();

  return (
    <div
      data-slot="sankey-chart"
      className={cn("w-full overflow-x-auto", className)}
      role="img"
      aria-label={`桑基图，${sources.length} 源 → ${targets.length} 目标`}
    >
      <svg viewBox={`0 0 320 ${height}`} width="100%" role="presentation">
        {flows.map((f, i) => {
          const sb = sourceBars.find((b) => b.label === f.source);
          const tb = targetBars.find((b) => b.label === f.target);
          if (!sb || !tb) return null;
          const so = srcOffset.get(f.source) ?? 0;
          const to = tgtOffset.get(f.target) ?? 0;
          const bh = bandH(f);
          srcOffset.set(f.source, so + bh);
          tgtOffset.set(f.target, to + bh);

          const y1 = sb.y + so;
          const y2 = tb.y + to;
          const midX = (x1 + x2) / 2;
          const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2} L ${x2} ${y2 + bh} C ${midX} ${y2 + bh}, ${midX} ${y1 + bh}, ${x1} ${y1 + bh} Z`;
          return (
            <path
              key={i}
              d={d}
              fill={sb.color}
              fillOpacity={0.25}
            >
              <title>
                {f.source} → {f.target}: {formatNumber(f.value)}
              </title>
            </path>
          );
        })}
        {sourceBars.map((b) => (
          <g key={`s-${b.label}`}>
            <rect x={x1 - 8} y={b.y} width={8} height={b.h} fill={b.color} />
            <text x={x1 - 12} y={b.y + b.h / 2} textAnchor="end" dominantBaseline="middle" className="fill-muted-foreground text-[9px]">
              {b.label}
            </text>
          </g>
        ))}
        {targetBars.map((b) => (
          <g key={`t-${b.label}`}>
            <rect x={x2} y={b.y} width={8} height={b.h} fill={b.color} />
            <text x={x2 + 12} y={b.y + b.h / 2} textAnchor="start" dominantBaseline="middle" className="fill-muted-foreground text-[9px]">
              {b.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export { SankeyChart };
