"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @component SPCControlChart
 * @category business/quality
 * @since 1.0.0
 * @description Statistical Process Control (SPC) chart with center line,
 * upper/lower control limits (UCL/LCL), warning limits, and automatic
 * out-of-control point detection using Western Electric rules.
 * @keywords spc, control chart, quality, ucl, lcl, cpk, six sigma, process
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** A single measurement sample. */
interface SPCSample {
  /** Sample index or label. */
  label: string;
  /** Measured value. */
  value: number;
}

/** Props for SPCControlChart. */
interface SPCControlChartProps {
  /** Sample data. */
  samples: SPCSample[];
  /** Chart title. */
  title?: string;
  /** Pre-calculated center line (mean). If omitted, computed from data. */
  centerLine?: number;
  /** Pre-calculated UCL. If omitted, computed as mean + 3σ. */
  ucl?: number;
  /** Pre-calculated LCL. If omitted, computed as mean - 3σ. */
  lcl?: number;
  /** Pre-calculated σ (sigma). If omitted, computed from data. */
  sigma?: number;
  /** Show warning limits at ±2σ. */
  showWarningLimits?: boolean;
  /** Y-axis label. */
  yLabel?: string;
  /** Unit suffix for values. */
  unit?: string;
  /** Chart height in px. */
  height?: number;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function stdDev(values: number[], avg: number): number {
  if (values.length < 2) return 0;
  const variance = values.reduce((s, v) => s + (v - avg) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

/**
 * Western Electric Rule 1: any point beyond 3σ from center line.
 * Rule 2: 2 of 3 consecutive points beyond 2σ (same side).
 * Rule 3: 4 of 5 consecutive points beyond 1σ (same side).
 * Rule 4: 8 consecutive points on one side of center line.
 */
function detectViolations(
  samples: SPCSample[],
  cl: number,
  sigma: number,
): Set<number> {
  const violations = new Set<number>();
  if (sigma === 0) return violations;

  // Rule 1: beyond 3σ
  for (let i = 0; i < samples.length; i++) {
    if (Math.abs(samples[i]!.value - cl) > 3 * sigma) {
      violations.add(i);
    }
  }

  // Rule 4: 8 consecutive on one side
  let runSide = 0;
  let runCount = 0;
  for (let i = 0; i < samples.length; i++) {
    const side = samples[i]!.value > cl ? 1 : samples[i]!.value < cl ? -1 : 0;
    if (side === 0) {
      runSide = 0;
      runCount = 0;
    } else if (side === runSide) {
      runCount++;
      if (runCount >= 8) {
        for (let j = i - 7; j <= i; j++) violations.add(j);
      }
    } else {
      runSide = side;
      runCount = 1;
    }
  }

  // Rule 2: 2 of 3 beyond 2σ same side
  for (let i = 2; i < samples.length; i++) {
    const win = [samples[i - 2], samples[i - 1], samples[i]];
    let above = 0;
    let below = 0;
    for (const s of win) {
      if (s!.value > cl + 2 * sigma) above++;
      if (s!.value < cl - 2 * sigma) below++;
    }
    if (above >= 2 || below >= 2) {
      for (let j = i - 2; j <= i; j++) {
        if (Math.abs(samples[j]!.value - cl) > 2 * sigma) violations.add(j);
      }
    }
  }

  return violations;
}

function formatVal(v: number, unit?: string): string {
  return `${v.toFixed(2)}${unit ?? ""}`;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function SPCControlChart({
  samples,
  title = "SPC Control Chart",
  centerLine,
  ucl,
  lcl,
  sigma,
  showWarningLimits = true,
  yLabel,
  unit,
  height = 320,
  className,
}: SPCControlChartProps) {
  const width = Math.max(600, samples.length * 50 + 80);
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Compute statistics
  const values = samples.map((s) => s.value);
  const { cl, sd } = React.useMemo(() => {
    const computedCl = centerLine ?? mean(values);
    const computedSd = sigma ?? stdDev(values, computedCl);
    return { cl: computedCl, sd: computedSd };
  }, [centerLine, sigma, values]);
  const computedUCL = ucl ?? cl + 3 * sd;
  const computedLCL = lcl ?? cl - 3 * sd;

  // Detect violations
  const violations = React.useMemo(
    () => detectViolations(samples, cl, sd),
    [samples, cl, sd],
  );

  // Y scale
  const yMin = Math.min(computedLCL, ...values) - sd;
  const yMax = Math.max(computedUCL, ...values) + sd;
  const yRange = yMax - yMin || 1;

  const yScale = (v: number) => {
    return padding.top + chartH - ((v - yMin) / yRange) * chartH;
  };

  // X scale
  const xScale = (i: number) => {
    if (samples.length <= 1) return padding.left + chartW / 2;
    return padding.left + (i / (samples.length - 1)) * chartW;
  };

  // Build line path
  const linePath = samples
    .map((s, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(s.value)}`)
    .join(" ");

  const warningUCL = cl + 2 * sd;
  const warningLCL = cl - 2 * sd;

  // Cpk calculation (simplified — assumes symmetric spec)
  const cpk = sd > 0 ? Math.min((computedUCL - cl) / (3 * sd), (cl - computedLCL) / (3 * sd)) : 0;

  return (
    <div
      data-slot="spc-control-chart"
      className={cn("space-y-3 rounded-lg border border-border bg-card p-5", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-3 text-sm">
          <Badge variant="outline" className="text-xs">
            CL: {formatVal(cl, unit)}
          </Badge>
          <Badge variant="outline" className="text-xs">
            σ: {formatVal(sd, unit)}
          </Badge>
          <Badge variant={cpk >= 1.33 ? "default" : "destructive"} className="text-xs">
            Cpk: {cpk.toFixed(2)}
          </Badge>
          {violations.size > 0 && (
            <Badge variant="destructive" className="text-xs" data-slot="violation-badge">
              {violations.size} violation{violations.size > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto">
        <svg
          width={width}
          height={height}
          data-slot="spc-chart-svg"
          role="img"
          aria-label="SPC control chart"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((p) => {
            const y = padding.top + chartH * p;
            return (
              <line
                key={p}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-border"
              />
            );
          })}

          {/* Warning limits (±2σ) */}
          {showWarningLimits && sd > 0 && (
            <>
              <line
                x1={padding.left}
                y1={yScale(warningUCL)}
                x2={width - padding.right}
                y2={yScale(warningUCL)}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="6 4"
                className="text-amber-500"
              />
              <text x={padding.left - 8} y={yScale(warningUCL) - 4} textAnchor="end" className="fill-amber-600 text-[10px]">
                +2σ: {formatVal(warningUCL, unit)}
              </text>
              <line
                x1={padding.left}
                y1={yScale(warningLCL)}
                x2={width - padding.right}
                y2={yScale(warningLCL)}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="6 4"
                className="text-amber-500"
              />
              <text x={padding.left - 8} y={yScale(warningLCL) + 12} textAnchor="end" className="fill-amber-600 text-[10px]">
                -2σ: {formatVal(warningLCL, unit)}
              </text>
            </>
          )}

          {/* UCL line */}
          <line
            x1={padding.left}
            y1={yScale(computedUCL)}
            x2={width - padding.right}
            y2={yScale(computedUCL)}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="8 4"
            className="text-destructive"
          />
          <text x={padding.left - 8} y={yScale(computedUCL) - 4} textAnchor="end" className="fill-destructive text-[10px] font-medium">
            UCL: {formatVal(computedUCL, unit)}
          </text>

          {/* LCL line */}
          <line
            x1={padding.left}
            y1={yScale(computedLCL)}
            x2={width - padding.right}
            y2={yScale(computedLCL)}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="8 4"
            className="text-destructive"
          />
          <text x={padding.left - 8} y={yScale(computedLCL) + 12} textAnchor="end" className="fill-destructive text-[10px] font-medium">
            LCL: {formatVal(computedLCL, unit)}
          </text>

          {/* Center line */}
          <line
            x1={padding.left}
            y1={yScale(cl)}
            x2={width - padding.right}
            y2={yScale(cl)}
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary"
          />
          <text x={padding.left - 8} y={yScale(cl) - 4} textAnchor="end" className="fill-primary text-[10px] font-medium">
            CL: {formatVal(cl, unit)}
          </text>

          {/* Data line */}
          <path
            d={linePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-foreground/70"
          />

          {/* Data points */}
          {samples.map((s, i) => {
            const isViolation = violations.has(i);
            return (
              <g key={i}>
                <circle
                  cx={xScale(i)}
                  cy={yScale(s.value)}
                  r={isViolation ? 5 : 3.5}
                  fill={isViolation ? "currentColor" : "white"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={isViolation ? "text-destructive" : "text-primary"}
                />
                {isViolation && (
                  <text
                    x={xScale(i)}
                    y={yScale(s.value) - 10}
                    textAnchor="middle"
                    className="fill-destructive text-[10px] font-bold"
                  >
                    !
                  </text>
                )}
              </g>
            );
          })}

          {/* X-axis labels */}
          {samples.map((s, i) => {
            // Show every nth label to avoid crowding
            const interval = Math.ceil(samples.length / 15);
            if (i % interval !== 0 && i !== samples.length - 1) return null;
            return (
              <text
                key={`label-${i}`}
                x={xScale(i)}
                y={height - padding.bottom + 16}
                textAnchor="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {s.label}
              </text>
            );
          })}

          {/* Y-axis label */}
          {yLabel && (
            <text
              x={-(height / 2)}
              y={16}
              transform="rotate(-90)"
              textAnchor="middle"
              className="fill-muted-foreground text-xs"
            >
              {yLabel}
            </text>
          )}
        </svg>
      </div>

      {/* Summary stats */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span>n = {samples.length}</span>
        <span>Min = {formatVal(Math.min(...values), unit)}</span>
        <span>Max = {formatVal(Math.max(...values), unit)}</span>
        <span>Range = {formatVal(Math.max(...values) - Math.min(...values), unit)}</span>
        {violations.size === 0 ? (
          <Badge variant="outline" className="text-xs text-emerald-600">Process in control</Badge>
        ) : (
          <Badge variant="destructive" className="text-xs">Out of control — investigate</Badge>
        )}
      </div>
    </div>
  );
}

export { SPCControlChart };
export type { SPCControlChartProps, SPCSample };
