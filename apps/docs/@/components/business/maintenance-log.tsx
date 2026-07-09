"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Badge } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@chaos_team/chaos-ui/ui";
import {
  WrenchIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  ActivityIcon,
  SettingsIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

/** Supported maintenance types. */
export type MaintenanceType =
  "preventive" | "corrective" | "emergency" | "inspection" | "calibration";

/** Status of a maintenance entry. */
export type MaintenanceStatus = "completed" | "in-progress" | "scheduled";

/** A single maintenance log entry. */
export interface MaintenanceEntry {
  id: string;
  /** Date of maintenance (YYYY-MM-DD or free-form). */
  date: string;
  /** Maintenance type. */
  type: MaintenanceType;
  /** Short title for the entry. */
  title?: string;
  /** Detailed description of the work performed. */
  description?: string;
  /** Name of the technician who performed the work. */
  technician?: string;
  /** List of parts or materials used. */
  parts?: string[];
  /** Duration of the maintenance (free-form, e.g. "2.5 hours"). */
  duration?: string;
  /** Current status. */
  status: MaintenanceStatus;
  /** Cost of the maintenance. */
  cost?: number;
}

/** Props for the MaintenanceLog component. */
export interface MaintenanceLogProps {
  /** Maintenance entries to display. */
  entries: MaintenanceEntry[];
  /** Optional title shown above the log. */
  title?: string;
  /** Show filter tabs by maintenance type. */
  showFilter?: boolean;
  /** Text to display when there are no entries. */
  emptyText?: string;
  /** Additional CSS class names. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const typeConfig: Record<
  MaintenanceType,
  {
    label: string;
    variant: "default" | "success" | "warning" | "destructive" | "info";
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  preventive: {
    label: "Preventive",
    variant: "info",
    icon: WrenchIcon,
  },
  corrective: {
    label: "Corrective",
    variant: "warning",
    icon: SettingsIcon,
  },
  emergency: {
    label: "Emergency",
    variant: "destructive",
    icon: AlertCircleIcon,
  },
  inspection: {
    label: "Inspection",
    variant: "success",
    icon: CheckCircleIcon,
  },
  calibration: {
    label: "Calibration",
    variant: "default",
    icon: ActivityIcon,
  },
};

const statusLabels: Record<MaintenanceStatus, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  scheduled: "Scheduled",
};

const filterOptions: Array<{ value: MaintenanceType | "all"; label: string }> =
  [
    { value: "all", label: "All" },
    { value: "preventive", label: "Preventive" },
    { value: "corrective", label: "Corrective" },
    { value: "emergency", label: "Emergency" },
    { value: "inspection", label: "Inspection" },
    { value: "calibration", label: "Calibration" },
  ];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * @component MaintenanceLog
 * @category business/equipment
 * @since 0.2.0
 * @description Timeline-based maintenance history log for equipment. Displays
 *   color-coded entries with type badges, technician info, parts lists, and
 *   filterable tabs. / \u8bbe\u5907\u7ef4\u62a4\u5386\u53f2\u65f6\u95f4\u7ebf\uff0c\u6309\u7c7b\u578b\u989c\u8272\u7f16\u7801\uff0c\u5c55\u793a\u6280\u672f\u5458\u3001
 *   \u96f6\u4ef6\u5217\u8868\u548c\u53ef\u7b5b\u9009\u6807\u7b7e\u9875\u3002
 * @keywords maintenance, log, timeline, equipment, history, \u7ef4\u62a4, \u65e5\u5fd7
 * @example
 * <MaintenanceLog
 *   entries={[{ id: "1", date: "2025-01-15", type: "preventive", description: "Oil change", status: "completed" }]}
 *   showFilter
 * />
 */
function MaintenanceLog({
  entries,
  title,
  showFilter = false,
  emptyText = "No maintenance records.",
  className,
}: MaintenanceLogProps) {
  const [activeFilter, setActiveFilter] = React.useState<
    MaintenanceType | "all"
  >("all");

  const filteredEntries = React.useMemo(() => {
    if (activeFilter === "all") return entries;
    return entries.filter((e) => e.type === activeFilter);
  }, [entries, activeFilter]);

  return (
    <div
      data-slot="maintenance-log"
      className={cn("flex flex-col gap-4", className)}
    >
      {/* Title */}
      {title && <h3 className="text-base font-semibold">{title}</h3>}

      {/* Filter tabs */}
      {showFilter && (
        <div className="flex flex-wrap gap-1">
          {filterOptions.map((opt) => (
            <Button
              key={opt.value}
              type="button"
              variant={activeFilter === opt.value ? "default" : "outline"}
              size="xs"
              onClick={() => setActiveFilter(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      )}

      {/* Timeline */}
      {filteredEntries.length > 0 ? (
        <Timeline>
          {filteredEntries.map((entry) => {
            const config = typeConfig[entry.type] ?? typeConfig.inspection;
            const Icon = config.icon;

            return (
              <TimelineItem key={entry.id}>
                <TimelineDot variant={config.variant}>
                  <Icon className="size-4" />
                </TimelineDot>
                <TimelineConnector />
                <TimelineContent className="pb-6 last:pb-0">
                  {/* Date and badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <time className="text-muted-foreground text-xs">
                      {entry.date}
                    </time>
                    <Badge
                      variant={
                        config.variant === "destructive"
                          ? "destructive"
                          : config.variant === "default"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {config.label}
                    </Badge>
                    <Badge
                      variant={
                        entry.status === "completed"
                          ? "secondary"
                          : entry.status === "in-progress"
                            ? "outline"
                            : "ghost"
                      }
                    >
                      {statusLabels[entry.status]}
                    </Badge>
                  </div>

                  {/* Title */}
                  {entry.title && (
                    <h4 className="mt-1 text-sm font-semibold">
                      {entry.title}
                    </h4>
                  )}

                  {/* Description */}
                  {entry.description && (
                    <p className="text-muted-foreground mt-1 text-sm">
                      {entry.description}
                    </p>
                  )}

                  {/* Meta details */}
                  <div className="text-muted-foreground mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    {entry.technician && (
                      <span>
                        Technician:{" "}
                        <span className="text-foreground font-medium">
                          {entry.technician}
                        </span>
                      </span>
                    )}
                    {entry.duration && (
                      <span className="flex items-center gap-1">
                        <ClockIcon className="size-3" />
                        {entry.duration}
                      </span>
                    )}
                    {entry.cost != null && (
                      <span>
                        Cost:{" "}
                        <span className="text-foreground font-medium">
                          \u00a5{entry.cost.toLocaleString()}
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Parts list */}
                  {entry.parts && entry.parts.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs font-medium">Parts used:</span>
                      <ul className="mt-1 flex flex-wrap gap-1">
                        {entry.parts.map((part, i) => (
                          <li key={i}>
                            <Badge variant="outline" className="text-[0.65rem]">
                              {part}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      ) : (
        <p className="text-muted-foreground py-8 text-center text-sm">
          {emptyText}
        </p>
      )}
    </div>
  );
}

export { MaintenanceLog };
