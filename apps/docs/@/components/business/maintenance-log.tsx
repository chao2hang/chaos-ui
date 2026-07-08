"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  WrenchIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ClockIcon,
} from "lucide-react";

export interface MaintenanceRecord {
  id: string;
  equipment: string;
  type: string;
  description: string;
  status: "scheduled" | "completed" | "overdue";
  date: string;
  technician?: string;
}

interface MaintenanceLogProps extends React.HTMLAttributes<HTMLDivElement> {
  records: MaintenanceRecord[];
  className?: string;
}

const statusIcons: Record<MaintenanceRecord["status"], React.ElementType> = {
  scheduled: ClockIcon,
  completed: CheckCircleIcon,
  overdue: AlertTriangleIcon,
};

const statusConfig: Record<
  MaintenanceRecord["status"],
  { label: string; className: string }
> = {
  scheduled: { label: "已排期", className: "bg-blue-100 text-blue-800" },
  completed: { label: "已完成", className: "bg-green-100 text-green-800" },
  overdue: { label: "已逾期", className: "bg-red-100 text-red-800" },
};

function MaintenanceLog({ records, className, ...props }: MaintenanceLogProps) {
  return (
    <div
      data-slot="maintenance-log"
      className={cn("space-y-3", className)}
      {...props}
    >
      {records.map((record) => {
        const Icon = statusIcons[record.status];
        const config = statusConfig[record.status];
        return (
          <div
            key={record.id}
            className="flex gap-3 border-b pb-3 last:border-0"
          >
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full",
                record.status === "scheduled"
                  ? "bg-blue-100"
                  : record.status === "completed"
                    ? "bg-green-100"
                    : "bg-red-100",
              )}
            >
              <Icon
                className={cn(
                  "size-4",
                  record.status === "scheduled"
                    ? "text-blue-600"
                    : record.status === "completed"
                      ? "text-green-600"
                      : "text-red-600",
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{record.equipment}</span>
                <Badge
                  variant="outline"
                  className={cn("text-[10px]", config.className)}
                >
                  {config.label}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-0.5 text-sm">
                {record.type} - {record.description}
              </p>
              <div className="text-muted-foreground mt-1 flex items-center gap-3 text-xs">
                <span>{record.date}</span>
                {record.technician && <span>技师: {record.technician}</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { MaintenanceLog };
export type { MaintenanceLogProps };
