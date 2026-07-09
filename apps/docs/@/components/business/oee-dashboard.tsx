"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @component OeeDashboard
 * @category business/manufacturing
 * @since 1.0.0
 * @description Overall Equipment Effectiveness (OEE) dashboard displaying
 * availability, performance, and quality metrics with gauge visualization
 * and loss breakdown.
 * @keywords oee, equipment, manufacturing, availability, performance, quality, tpm
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Equipment OEE data. */
interface OeeEquipment {
  id: string;
  name: string;
  /** Availability 0–100. */
  availability: number;
  /** Performance 0–100. */
  performance: number;
  /** Quality 0–100. */
  quality: number;
  /** Planned production time in minutes. */
  plannedTime: number;
  /** Downtime in minutes. */
  downtime: number;
  /** Total units produced. */
  totalUnits: number;
  /** Defective units. */
  defectUnits: number;
  /** Ideal cycle time in seconds. */
  idealCycleTime: number;
  /** Running time in minutes. */
  runTime: number;
}

/** Loss breakdown item. */
interface OeeLoss {
  label: string;
  /** Loss duration in minutes. */
  minutes: number;
  /** Loss category. */
  category: "availability" | "performance" | "quality";
  color?: string;
}

/** Props for OeeDashboard. */
interface OeeDashboardProps {
  /** Equipment data. */
  equipment: OeeEquipment;
  /** Loss breakdown items. */
  losses?: OeeLoss[];
  /** Dashboard title. */
  title?: string;
  /** Target OEE percentage for comparison. */
  targetOee?: number;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function oee(e: OeeEquipment): number {
  return (e.availability / 100) * (e.performance / 100) * (e.quality / 100) * 100;
}

function gaugeColor(value: number, target: number): string {
  if (value >= target) return "text-emerald-500";
  if (value >= target * 0.8) return "text-amber-500";
  return "text-destructive";
}

function gaugeStroke(value: number, target: number): string {
  if (value >= target) return "#10b981";
  if (value >= target * 0.8) return "#f59e0b";
  return "#ef4444";
}

function formatPct(v: number): string {
  return `${v.toFixed(1)}%`;
}

function formatMin(v: number): string {
  if (v >= 60) {
    const h = Math.floor(v / 60);
    const m = Math.round(v % 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${Math.round(v)}m`;
}

const lossCategoryColors: Record<string, string> = {
  availability: "bg-rose-500",
  performance: "bg-amber-500",
  quality: "bg-violet-500",
};

/* -------------------------------------------------------------------------- */
/*  Gauge subcomponent                                                        */
/* -------------------------------------------------------------------------- */

function Gauge({
  label,
  value,
  target,
  sublabel,
}: {
  label: string;
  value: number;
  target: number;
  sublabel?: string;
}) {
  const size = 120;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = gaugeStroke(value, target);

  return (
    <div className="flex flex-col items-center" data-slot="oee-gauge">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-2xl font-bold", gaugeColor(value, target))}>
            {formatPct(value)}
          </span>
          {sublabel && <span className="text-[10px] text-muted-foreground">{sublabel}</span>}
        </div>
      </div>
      <span className="mt-1 text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function OeeDashboard({
  equipment,
  losses = [],
  title = "OEE Dashboard",
  targetOee = 85,
  className,
}: OeeDashboardProps) {
  const oeeValue = oee(equipment);
  const totalLossMinutes = losses.reduce((s, l) => s + l.minutes, 0);

  return (
    <div
      data-slot="oee-dashboard"
      className={cn("space-y-5 rounded-xl border border-border bg-card p-5 shadow-sm", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{equipment.name}</p>
        </div>
        <Badge variant={oeeValue >= targetOee ? "default" : "destructive"} className="text-sm">
          Target: {formatPct(targetOee)}
        </Badge>
      </div>

      {/* Gauges row */}
      <div className="flex flex-wrap items-center justify-around gap-4">
        <Gauge label="OEE" value={oeeValue} target={targetOee} sublabel="Overall" />
        <Gauge label="Availability" value={equipment.availability} target={90} sublabel={`${formatMin(equipment.runTime)} / ${formatMin(equipment.plannedTime)}`} />
        <Gauge label="Performance" value={equipment.performance} target={95} sublabel={`${equipment.totalUnits} units`} />
        <Gauge label="Quality" value={equipment.quality} target={99} sublabel={`${equipment.defectUnits} defects`} />
      </div>

      {/* Loss breakdown */}
      {losses.length > 0 && (
        <div data-slot="oee-losses">
          <h4 className="mb-2 text-sm font-semibold text-foreground">
            Loss Breakdown <span className="text-muted-foreground">({formatMin(totalLossMinutes)} total)</span>
          </h4>
          <div className="space-y-1.5">
            {losses.map((loss, i) => {
              const pct = totalLossMinutes > 0 ? (loss.minutes / totalLossMinutes) * 100 : 0;
              return (
                <div key={i} data-slot="loss-item" className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-xs text-muted-foreground">{loss.label}</span>
                  <div className="relative h-5 flex-1 overflow-hidden rounded bg-muted">
                    <div
                      className={cn("h-full rounded transition-all", lossCategoryColors[loss.category] ?? "bg-muted-foreground")}
                      style={{ width: `${pct}%` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-end pr-2 text-[10px] font-medium text-foreground">
                      {formatMin(loss.minutes)} ({formatPct(pct)})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-muted/20 p-3" data-slot="oee-metric">
          <div className="text-xs text-muted-foreground">Planned Time</div>
          <div className="mt-0.5 text-lg font-bold tabular-nums text-foreground">{formatMin(equipment.plannedTime)}</div>
        </div>
        <div className="rounded-lg border border-border bg-muted/20 p-3" data-slot="oee-metric">
          <div className="text-xs text-muted-foreground">Run Time</div>
          <div className="mt-0.5 text-lg font-bold tabular-nums text-foreground">{formatMin(equipment.runTime)}</div>
        </div>
        <div className="rounded-lg border border-border bg-muted/20 p-3" data-slot="oee-metric">
          <div className="text-xs text-muted-foreground">Downtime</div>
          <div className="mt-0.5 text-lg font-bold tabular-nums text-destructive">{formatMin(equipment.downtime)}</div>
        </div>
        <div className="rounded-lg border border-border bg-muted/20 p-3" data-slot="oee-metric">
          <div className="text-xs text-muted-foreground">Defect Rate</div>
          <div className="mt-0.5 text-lg font-bold tabular-nums text-foreground">
            {equipment.totalUnits > 0 ? formatPct((equipment.defectUnits / equipment.totalUnits) * 100) : "0.0%"}
          </div>
        </div>
      </div>
    </div>
  );
}

export { OeeDashboard };
export type { OeeDashboardProps, OeeEquipment, OeeLoss };
