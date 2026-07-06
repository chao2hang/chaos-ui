"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AlertTriangleIcon, PackageIcon } from "lucide-react";

export interface InventoryAlert {
  id: string;
  product: string;
  sku: string;
  stock: number;
  threshold: number;
  severity: "low" | "critical" | "out";
}

interface InventoryAlertListProps extends React.ComponentProps<"div"> {
  alerts: InventoryAlert[];
  className?: string;
}

const severityConfig: Record<
  InventoryAlert["severity"],
  { label: string; className: string }
> = {
  low: { label: "低库存", className: "bg-yellow-100 text-yellow-800" },
  critical: { label: "严重不足", className: "bg-orange-100 text-orange-800" },
  out: { label: "已售罄", className: "bg-red-100 text-red-800" },
};

function InventoryAlertList({
  alerts,
  className,
  ...props
}: InventoryAlertListProps) {
  if (alerts.length === 0) {
    return (
      <div
        data-slot="inventory-alert-list"
        className={cn(
          "text-muted-foreground flex flex-col items-center justify-center py-8",
          className,
        )}
        {...props}
      >
        <PackageIcon className="size-8 opacity-40" />
        <p className="mt-2 text-sm">库存充足，无需关注</p>
      </div>
    );
  }

  return (
    <div
      data-slot="inventory-alert-list"
      className={cn("space-y-2", className)}
      {...props}
    >
      {alerts.map((alert) => {
        const sev = severityConfig[alert.severity];
        return (
          <div
            key={alert.id}
            className="bg-card flex items-center gap-3 rounded-lg border p-3"
          >
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full",
                alert.severity === "out"
                  ? "bg-red-100"
                  : alert.severity === "critical"
                    ? "bg-orange-100"
                    : "bg-yellow-100",
              )}
            >
              <AlertTriangleIcon
                className={cn(
                  "size-4",
                  alert.severity === "out"
                    ? "text-red-600"
                    : alert.severity === "critical"
                      ? "text-orange-600"
                      : "text-yellow-600",
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium">
                  {alert.product}
                </span>
                <Badge
                  variant="outline"
                  className={cn("text-[10px]", sev.className)}
                >
                  {sev.label}
                </Badge>
              </div>
              <div className="text-muted-foreground mt-0.5 flex items-center gap-3 text-xs">
                <span>SKU: {alert.sku}</span>
                <span>库存: {alert.stock}</span>
                <span>阈值: {alert.threshold}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { InventoryAlertList };
export type { InventoryAlertListProps, InventoryAlert };
