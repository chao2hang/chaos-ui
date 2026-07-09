"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@chaos_team/chaos-ui/ui";
import { Separator } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  ClockIcon,
  MapPinIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

/** Possible operational states for a piece of equipment. */
export type EquipmentStatus =
  "running" | "idle" | "maintenance" | "fault" | "offline";

/** A single metric displayed on the equipment card. */
export interface EquipmentMetric {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "flat";
}

/** A quick action button rendered in the card footer. */
export interface EquipmentAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

/** Props for the EquipmentCard component. */
export interface EquipmentCardProps {
  /** Equipment name. */
  name: string;
  /** Equipment model or serial number. */
  model?: string;
  /** Current operational status. */
  status: EquipmentStatus;
  /** Key metrics to display in a 2-column grid. */
  metrics?: EquipmentMetric[];
  /** Next scheduled maintenance date (free-form string). */
  nextMaintenance?: string;
  /** Physical location of the equipment. */
  location?: string;
  /** Custom action buttons rendered in the footer. */
  actions?: EquipmentAction[];
  /** Click handler for the entire card. */
  onClick?: () => void;
  /** Additional CSS class names. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const statusConfig: Record<
  EquipmentStatus,
  { label: string; className: string }
> = {
  running: {
    label: "Running",
    className:
      "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  },
  idle: {
    label: "Idle",
    className: "bg-muted text-muted-foreground",
  },
  maintenance: {
    label: "Maintenance",
    className:
      "bg-blue-500/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  },
  fault: {
    label: "Fault",
    className:
      "bg-red-500/15 text-red-600 dark:bg-red-500/20 dark:text-red-400",
  },
  offline: {
    label: "Offline",
    className:
      "bg-neutral-500/15 text-neutral-500 dark:bg-neutral-500/20 dark:text-neutral-400",
  },
};

const trendIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  up: TrendingUpIcon,
  down: TrendingDownIcon,
  flat: MinusIcon,
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * @component EquipmentCard
 * @category business/equipment
 * @since 0.2.0
 * @description Equipment information card for MES equipment management.
 *   Shows name, status badge, key metrics in a 2-column grid, location,
 *   next maintenance date, and quick action buttons. / MES \u8bbe\u5907\u4fe1\u606f\u5361\u7247\uff0c
 *   \u5c55\u793a\u8bbe\u5907\u540d\u79f0\u3001\u72b6\u6001\u5fbd\u6807\u3001\u5173\u952e\u6307\u6807\u3001\u4f4d\u7f6e\u3001\u4e0b\u6b21\u7ef4\u62a4\u65e5\u671f\u548c\u5feb\u6377\u64cd\u4f5c\u3002
 * @keywords equipment, card, MES, manufacturing, status, metrics, \u8bbe\u5907
 * @example
 * <EquipmentCard
 *   name="CNC Mill #3"
 *   model="Haas VF-2SS"
 *   status="running"
 *   metrics={[{ label: "OEE", value: "92%" }]}
 * />
 */
function EquipmentCard({
  name,
  model,
  status,
  metrics,
  nextMaintenance,
  location,
  actions,
  onClick,
  className,
}: EquipmentCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Card
      data-slot="equipment-card"
      className={cn(
        onClick && "cursor-pointer transition-shadow hover:shadow-md",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {/* Header */}
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <span>{name}</span>
            {model && (
              <span className="text-muted-foreground text-xs font-normal">
                {model}
              </span>
            )}
          </div>
          <span
            className={cn(
              "inline-flex h-5 shrink-0 items-center rounded-full px-2 text-xs font-medium",
              statusInfo.className,
            )}
          >
            {statusInfo.label}
          </span>
        </CardTitle>
      </CardHeader>

      {/* Body */}
      <CardContent>
        <div className="flex flex-col gap-3">
          {/* Location */}
          {location && (
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <MapPinIcon className="size-3.5 shrink-0" />
              <span>{location}</span>
            </div>
          )}

          {/* Metrics grid */}
          {metrics && metrics.length > 0 && (
            <>
              <Separator />
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {metrics.map((metric) => {
                  const TrendIcon = metric.trend
                    ? trendIcons[metric.trend]
                    : undefined;
                  return (
                    <div key={metric.label} className="flex flex-col">
                      <span className="text-muted-foreground text-[0.65rem] leading-tight">
                        {metric.label}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold">
                          {metric.value}
                          {metric.unit && (
                            <span className="text-muted-foreground ml-0.5 text-xs font-normal">
                              {metric.unit}
                            </span>
                          )}
                        </span>
                        {TrendIcon && (
                          <TrendIcon
                            className={cn(
                              "size-3",
                              metric.trend === "up" && "text-emerald-500",
                              metric.trend === "down" && "text-red-500",
                              metric.trend === "flat" &&
                                "text-muted-foreground",
                            )}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Next maintenance */}
          {nextMaintenance && (
            <>
              <Separator />
              <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <ClockIcon className="size-3.5 shrink-0" />
                <span>Next maintenance: {nextMaintenance}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>

      {/* Footer actions */}
      {actions && actions.length > 0 && (
        <CardFooter className="flex-wrap gap-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              type="button"
              variant="outline"
              size="xs"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                action.onClick?.();
              }}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}

export { EquipmentCard };
