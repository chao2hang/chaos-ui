"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";
import { indexFromClientX } from "./chart-hover";
import { useSeriesVisibility } from "./use-series-visibility";

/**
 * @component AreaChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 面积图(趋势+填充) — pure SVG, zero runtime deps. Supports
 * multi-series overlay with gradient fills and per-series colors.
 * Wide containers measure width so the plot fills horizontally (issue #13).
 * Hover shows x-aligned multi-series tooltip + crosshair (issue #22).
 * Multi-series legend is interactive by default (issue #23 / CUI-DASH-08).
 * @param data Single-series values (legacy) or use `series` for multi-series.
 * @param series One or more named series with optional colors.
 * @param labels X-axis labels aligned to data points.
 * @param height SVG viewport height in px.
 * @param color Default fill/stroke color for single-series mode.
 * @param gradient Whether to use SVG gradient fill (default true).
 * @param showTooltip Whether to show hover tooltip + crosshair (default true).
 * @param interactiveLegend Click legend to toggle series visibility (default true).
 * @param defaultHiddenSeries Series names hidden on first render.
 * @param onSeriesVisibilityChange Callback with hidden series names after toggle.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <AreaChart data={[10, 40, 25, 60, 45]} labels={["一","二","三","四","五"]} />
 * ```
 * 面积图(趋势+填充)
 */
export interface AreaChartSeries {
  /** Series name for legend. */
  name: string;
  /** Numeric values, left-to-right. */
  values: number[];
  /**
   * Stroke + fill color. Prefer palette tokens (`chart-1`…`chart-5`, `green`, …)
   * or omit for auto palette. `primary` and `chart-1` resolve to different hues
   * so multi-series stays distinguishable (issue #14).
   */
  color?: string;
}

export interface AreaChartProps {
  /** Numeric series values (single-series mode). */
  data?: number[];
  /** Multi-series mode — overrides `data` when provided. */
  series?: AreaChartSeries[];
  /** X-axis labels aligned 1:1 with `data`. */
  labels?: string[];
  /** SVG height in px. */
  height?: number;
  /** Stroke + fill color (single-series mode only). */
  color?: string;
  /** Whether to use SVG gradient fill for areas. / 是否使用渐变填充 */
  gradient?: boolean;
  /**
   * Show hover tooltip + vertical crosshair aligned to x index (issue #22).
   * Default true. Disable for static sparkline-like embeds.
   */
  showTooltip?: boolean;
  /**
   * Click multi-series legend to show/hide series (issue #23).
   * Default true. Set false for static legend.
   */
  interactiveLegend?: boolean;
  /** Series names hidden on first render (issue #23). */
  defaultHiddenSeries?: string[];
  /** Fires after legend toggle with currently hidden series names. */
  onSeriesVisibilityChange?: (hidden: string[]) => void;
  className?: string;
}

const DEFAULT_AREA_DATA = [12, 28, 18, 45, 32, 60, 48];
const DEFAULT_AREA_LABELS = ["一", "二", "三", "四", "五", "六", "日"];
const FALLBACK_CHART_WIDTH = 320;
const MIN_CHART_WIDTH = 200;

const AREA_PALETTE = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

/** Token / CSS-var names → concrete SVG-safe colors (CUI-DASH-01, #14). */
const AREA_COLOR_TOKENS: Record<string, string> = {
  primary: "#3b82f6",
  // Distinct from primary so dual-series primary + chart-1 stay readable
  "chart-1": "#6366f1",
  "chart-2": "#10b981",
  "chart-3": "#f59e0b",
  "chart-4": "#ef4444",
  "chart-5": "#8b5cf6",
  blue: "#3b82f6",
  green: "#10b981",
  amber: "#f59e0b",
  red: "#ef4444",
  purple: "#8b5cf6",
};

/**
 * Resolve series colors for SVG presentation attributes.
 * CSS variables like `var(--color-primary)` often fail as SVG attributes;
 * map known tokens / var() wrappers to hex. Unknown values pass through.
 */
function resolveAreaColor(input: string | undefined, fallback: string): string {
  if (!input || input === "currentColor") return fallback;
  const trimmed = input.trim();
  const varMatch = /^var\(\s*--(?:color-)?([a-z0-9-]+)\s*\)$/i.exec(trimmed);
  const token = varMatch?.[1]?.toLowerCase() ?? trimmed.toLowerCase();
  if (AREA_COLOR_TOKENS[token]) return AREA_COLOR_TOKENS[token]!;
  // Strip leading --color- / color- prefixes if passed as token names
  const bare = token.replace(/^(?:--)?color-/, "");
  if (AREA_COLOR_TOKENS[bare]) return AREA_COLOR_TOKENS[bare]!;
  return trimmed;
}

function AreaChart({
  data = DEFAULT_AREA_DATA,
  series,
  labels = DEFAULT_AREA_LABELS,
  height = 180,
  color,
  gradient = true,
  showTooltip = true,
  interactiveLegend = true,
  defaultHiddenSeries,
  onSeriesVisibilityChange,
  className,
}: AreaChartProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const plotRef = React.useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = React.useState(FALLBACK_CHART_WIDTH);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const pad = 8;
  const baseId = React.useId();
  const { isHidden, toggle } = useSeriesVisibility({
    interactiveLegend,
    defaultHiddenSeries,
    onSeriesVisibilityChange,
  });

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const apply = (width: number) => {
      const next = Math.max(MIN_CHART_WIDTH, Math.round(width));
      setChartWidth((prev) => (prev === next ? prev : next));
    };

    apply(el.getBoundingClientRect().width || FALLBACK_CHART_WIDTH);

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      apply(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Normalize to multi-series (default color from palette, not currentColor)
  const multiSeries: AreaChartSeries[] =
    series && series.length > 0
      ? series
      : [
          {
            name: "默认",
            values: data,
            color: color ?? AREA_PALETTE[0] ?? "#3b82f6",
          },
        ];

  const resolvedSeries = multiSeries.map((s, si) => ({
    ...s,
    resolvedColor: resolveAreaColor(
      s.color,
      AREA_PALETTE[si % AREA_PALETTE.length]!,
    ),
  }));

  // Scale + draw from visible series only (issue #23); hide-all is safe.
  const visibleSeries = resolvedSeries.filter((s) => !isHidden(s.name));
  const allValues = visibleSeries.flatMap((s) => s.values);
  const max = allValues.length > 0 ? Math.max(1, ...allValues) : 1;
  const min = allValues.length > 0 ? Math.min(0, ...allValues) : 0;
  const range = max - min || 1;
  const len = Math.max(1, ...multiSeries.map((s) => s.values.length));
  const stepX = (chartWidth - pad * 2) / Math.max(1, len - 1);
  const yAt = (v: number) => pad + (1 - (v - min) / range) * (height - pad * 2);

  // Generate stable gradient IDs from useId
  const gradientIds = multiSeries.map((_, i) => `${baseId}-grad-${i}`);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!showTooltip) return;
    const plot = plotRef.current;
    if (!plot) return;
    const rect = plot.getBoundingClientRect();
    const next = indexFromClientX(
      e.clientX,
      rect.left,
      rect.width,
      pad,
      chartWidth,
      len,
    );
    setActiveIndex((prev) => (prev === next ? prev : next));
  };

  const handlePointerLeave = () => {
    setActiveIndex(null);
  };

  const activeX = activeIndex != null ? pad + activeIndex * stepX : null;
  const activeLabel =
    activeIndex != null ? (labels[activeIndex] ?? String(activeIndex)) : null;

  // Keep tooltip inside plot: prefer right of cursor x, flip near right edge
  const tooltipLeftPct =
    activeX != null
      ? Math.min(88, Math.max(4, (activeX / chartWidth) * 100 + 4))
      : 0;

  return (
    <div
      ref={rootRef}
      data-slot="area-chart"
      className={cn("w-full", className)}
      role="img"
      aria-label={`面积图，${multiSeries.length} 条线，${len} 个数据点，最大值 ${max}`}
    >
      {multiSeries.length > 1 && (
        <div
          data-slot="area-chart-legend"
          className="mb-1 flex flex-wrap items-center gap-3 text-[10px]"
          role="list"
        >
          {resolvedSeries.map((s) => {
            const hidden = isHidden(s.name);
            const itemClass = cn(
              "inline-flex items-center gap-1 rounded-sm",
              interactiveLegend &&
                "hover:bg-muted/60 focus-visible:ring-ring cursor-pointer focus-visible:ring-1 focus-visible:outline-none",
              hidden && "text-muted-foreground line-through opacity-45",
            );
            if (!interactiveLegend) {
              return (
                <span key={s.name} className={itemClass} role="listitem">
                  <span
                    className="inline-block size-2 rounded-sm"
                    style={{ backgroundColor: s.resolvedColor }}
                    aria-hidden="true"
                  />
                  {s.name}
                </span>
              );
            }
            return (
              <button
                key={s.name}
                type="button"
                role="listitem"
                className={itemClass}
                aria-pressed={!hidden}
                aria-label={
                  hidden ? `显示系列 ${s.name}` : `隐藏系列 ${s.name}`
                }
                onClick={() => toggle(s.name)}
              >
                <span
                  className="inline-block size-2 rounded-sm"
                  style={{ backgroundColor: s.resolvedColor }}
                  aria-hidden="true"
                />
                {s.name}
              </button>
            );
          })}
        </div>
      )}
      <div
        ref={plotRef}
        data-slot="area-chart-plot"
        className="relative w-full touch-none"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerMove}
      >
        <svg
          viewBox={`0 0 ${chartWidth} ${height}`}
          width="100%"
          height={height}
          preserveAspectRatio="none"
          role="presentation"
        >
          <defs>
            {resolvedSeries.map((s, si) => {
              const gid = gradientIds[si];
              return gradient ? (
                <linearGradient key={gid} id={gid} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={s.resolvedColor}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="100%"
                    stopColor={s.resolvedColor}
                    stopOpacity={0.06}
                  />
                </linearGradient>
              ) : null;
            })}
          </defs>
          {resolvedSeries.map((s, si) => {
            if (isHidden(s.name)) return null;
            const gid = gradientIds[si];
            const pts = s.values.map((v, i) => `${pad + i * stepX},${yAt(v)}`);
            const linePath = `M ${pts.join(" L ")}`;
            const areaPath = `${linePath} L ${pad + (s.values.length - 1) * stepX},${height - pad} L ${pad},${height - pad} Z`;
            return (
              <g key={s.name}>
                <path
                  d={areaPath}
                  fill={gradient ? `url(#${gid})` : s.resolvedColor}
                  fillOpacity={gradient ? 1 : 0.18}
                  stroke="none"
                />
                <path
                  d={linePath}
                  fill="none"
                  stroke={s.resolvedColor}
                  strokeWidth={2.25}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                {s.values.map((v, i) => {
                  const active = showTooltip && activeIndex === i;
                  return (
                    <circle
                      key={i}
                      cx={pad + i * stepX}
                      cy={yAt(v)}
                      r={active ? 4 : 2.5}
                      fill={s.resolvedColor}
                      stroke={active ? "var(--background, #fff)" : undefined}
                      strokeWidth={active ? 1.5 : undefined}
                      vectorEffect="non-scaling-stroke"
                    >
                      {!showTooltip ? (
                        <title>
                          {s.name} {labels[i] ?? i}: {formatNumber(v)}
                        </title>
                      ) : null}
                    </circle>
                  );
                })}
              </g>
            );
          })}
          {showTooltip && activeX != null && (
            <line
              data-slot="area-chart-crosshair"
              x1={activeX}
              x2={activeX}
              y1={pad}
              y2={height - pad}
              stroke="currentColor"
              strokeOpacity={0.28}
              strokeWidth={1}
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
              pointerEvents="none"
            />
          )}
        </svg>
        {showTooltip && activeIndex != null && activeLabel != null && (
          <div
            data-slot="area-chart-tooltip"
            className="border-border bg-popover text-popover-foreground pointer-events-none absolute top-2 z-10 min-w-[7.5rem] rounded-md border px-2 py-1.5 text-[11px] shadow-md"
            style={{ left: `${tooltipLeftPct}%` }}
            aria-hidden="true"
          >
            <div className="text-muted-foreground mb-1 font-medium">
              {activeLabel}
            </div>
            <ul className="space-y-0.5">
              {visibleSeries.map((s) => {
                const v = s.values[activeIndex];
                if (v === undefined) return null;
                return (
                  <li key={s.name} className="flex items-center gap-1.5">
                    <span
                      className="inline-block size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: s.resolvedColor }}
                    />
                    <span className="text-muted-foreground flex-1 truncate">
                      {s.name}
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatNumber(v)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div
        data-slot="area-chart-axis"
        className="text-muted-foreground mt-1 flex justify-between text-[10px]"
        style={{ paddingLeft: pad, paddingRight: pad }}
        role="list"
      >
        {labels.slice(0, len).map((l, i) => (
          <span key={i} role="listitem">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export { AreaChart };
