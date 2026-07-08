"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component IotSensorGrid
 * @category business/iot
 * @since 1.0.0
 * @description IoT sensor grid dashboard showing real-time sensor readings,
 * threshold alerts, battery levels, and signal strength for a fleet of devices.
 * @keywords iot, sensor, grid, realtime, monitoring, alert, device, dashboard
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Sensor status. */
type SensorStatus = "online" | "warning" | "critical" | "offline";

/** A single IoT sensor. */
interface Sensor {
  id: string;
  /** Sensor name. */
  name: string;
  /** Location / zone. */
  location: string;
  /** Sensor type. */
  type: "temperature" | "humidity" | "pressure" | "vibration" | "co2" | "flow" | "voltage";
  /** Current reading. */
  value: number;
  /** Unit of measurement. */
  unit: string;
  /** Min threshold. */
  minThreshold?: number;
  /** Max threshold. */
  maxThreshold?: number;
  /** Battery level 0–100. */
  batteryLevel?: number;
  /** Signal strength 0–100. */
  signalStrength?: number;
  /** Last update timestamp. */
  lastUpdate?: string;
  /** Status override. */
  status?: SensorStatus;
}

/** Props for IotSensorGrid. */
interface IotSensorGridProps {
  /** Sensors to display. */
  sensors: Sensor[];
  /** Dashboard title. */
  title?: string;
  /** Auto-refresh interval in ms (0 = disabled). */
  refreshInterval?: number;
  /** Sensor click handler. */
  onSensorClick?: (sensor: Sensor) => void;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const sensorIcons: Record<string, string> = {
  temperature: "🌡️",
  humidity: "💧",
  pressure: "📡",
  vibration: "📳",
  co2: "☁️",
  flow: "🔄",
  voltage: "⚡",
};

/** Compute status from value and thresholds. */
function computeStatus(sensor: Sensor): SensorStatus {
  if (sensor.status) return sensor.status;
  if (sensor.minThreshold != null && sensor.value < sensor.minThreshold) return "critical";
  if (sensor.maxThreshold != null && sensor.value > sensor.maxThreshold) return "critical";
  // Check warning zone (within 10% of threshold)
  if (sensor.minThreshold != null && sensor.value < sensor.minThreshold * 1.1) return "warning";
  if (sensor.maxThreshold != null && sensor.value > sensor.maxThreshold * 0.9) return "warning";
  return "online";
}

const statusConfig: Record<SensorStatus, { label: string; color: string; border: string; badge: string; dot: string }> = {
  online: {
    label: "Online",
    color: "text-emerald-600",
    border: "border-emerald-300 dark:border-emerald-800",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  warning: {
    label: "Warning",
    color: "text-amber-600",
    border: "border-amber-300 dark:border-amber-800",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  critical: {
    label: "Critical",
    color: "text-destructive",
    border: "border-destructive/50",
    badge: "bg-destructive/10 text-destructive",
    dot: "bg-destructive",
  },
  offline: {
    label: "Offline",
    color: "text-muted-foreground",
    border: "border-border",
    badge: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};

function batteryColor(level: number): string {
  if (level >= 60) return "text-emerald-500";
  if (level >= 20) return "text-amber-500";
  return "text-destructive";
}

function signalBars(strength: number): number {
  if (strength >= 75) return 4;
  if (strength >= 50) return 3;
  if (strength >= 25) return 2;
  if (strength > 0) return 1;
  return 0;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function IotSensorGrid({
  sensors,
  title = "IoT Sensor Grid",
  refreshInterval = 0,
  onSensorClick,
  className,
}: IotSensorGridProps) {
  const [tick, setTick] = React.useState(0);

  // Auto refresh
  React.useEffect(() => {
    if (refreshInterval <= 0) return;
    const interval = setInterval(() => setTick((t) => t + 1), refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Status counts
  const statusCounts = React.useMemo(() => {
    const counts = { online: 0, warning: 0, critical: 0, offline: 0 };
    for (const s of sensors) {
      const status = computeStatus(s);
      counts[status]++;
    }
    return counts;
  }, [sensors, tick]);

  return (
    <div
      data-slot="iot-sensor-grid"
      className={cn("space-y-4 rounded-lg border border-border bg-card p-5", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" data-slot="live-indicator" />
        </div>
        <div className="flex items-center gap-2">
          {(["online", "warning", "critical", "offline"] as SensorStatus[]).map((status) => {
            const cfg = statusConfig[status];
            return (
              <div key={status} className="flex items-center gap-1">
                <span className={cn("size-2 rounded-full", cfg.dot)} />
                <span className="text-xs text-muted-foreground">
                  {countsLabel(status, statusCounts)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sensor cards grid */}
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-slot="sensor-cards"
      >
        {sensors.map((sensor) => {
          const status = computeStatus(sensor);
          const cfg = statusConfig[status];
          const bars = signalBars(sensor.signalStrength ?? 0);
          const isOutOfRange =
            (sensor.minThreshold != null && sensor.value < sensor.minThreshold) ||
            (sensor.maxThreshold != null && sensor.value > sensor.maxThreshold);

          return (
            <div
              key={sensor.id}
              data-slot="sensor-card"
              data-sensor-id={sensor.id}
              data-sensor-status={status}
              onClick={() => onSensorClick?.(sensor)}
              className={cn(
                "rounded-lg border-2 bg-card p-4 shadow-sm transition-shadow",
                cfg.border,
                onSensorClick && "cursor-pointer hover:shadow-md",
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{sensorIcons[sensor.type] ?? "📊"}</span>
                  <div>
                    <div className="text-sm font-medium text-foreground">{sensor.name}</div>
                    <div className="text-xs text-muted-foreground">{sensor.location}</div>
                  </div>
                </div>
                <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium", cfg.badge)}>
                  {cfg.label}
                </span>
              </div>

              {/* Reading */}
              <div className="mt-3 flex items-baseline gap-1">
                <span className={cn("text-2xl font-bold tabular-nums", isOutOfRange ? cfg.color : "text-foreground")}>
                  {sensor.value.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">{sensor.unit}</span>
              </div>

              {/* Threshold range */}
              {(sensor.minThreshold != null || sensor.maxThreshold != null) && (
                <div className="mt-1 text-xs text-muted-foreground">
                  Range: {sensor.minThreshold ?? "—"} ~ {sensor.maxThreshold ?? "—"} {sensor.unit}
                </div>
              )}

              {/* Battery & Signal */}
              <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
                {sensor.batteryLevel != null && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">🔋</span>
                    <span className={cn("text-xs font-medium", batteryColor(sensor.batteryLevel))}>
                      {sensor.batteryLevel}%
                    </span>
                  </div>
                )}
                {sensor.signalStrength != null && (
                  <div className="flex items-center gap-0.5" data-slot="signal-bars">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={cn(
                          "w-1 rounded-sm",
                          bar <= bars ? "bg-foreground" : "bg-muted",
                        )}
                        style={{ height: `${4 + bar * 2}px` }}
                      />
                    ))}
                    <span className="ml-1 text-[10px] text-muted-foreground">{sensor.signalStrength}%</span>
                  </div>
                )}
                {sensor.lastUpdate && (
                  <span className="text-[10px] text-muted-foreground">{sensor.lastUpdate}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {sensors.length === 0 && (
        <div className="py-8 text-center text-sm text-muted-foreground">
          No sensors deployed
        </div>
      )}
    </div>
  );
}

/** Helper for status count label. */
function countsLabel(status: SensorStatus, counts: Record<SensorStatus, number>): string {
  const labels: Record<SensorStatus, string> = {
    online: "Online",
    warning: "Warning",
    critical: "Critical",
    offline: "Offline",
  };
  return `${labels[status]}: ${counts[status]}`;
}


export { IotSensorGrid };
export type { IotSensorGridProps, Sensor, SensorStatus };
