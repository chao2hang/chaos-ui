"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WrenchIcon, MapPinIcon, CalendarIcon } from "lucide-react";

interface EquipmentCardProps extends React.ComponentProps<typeof Card> {
  name: string;
  model?: string;
  serialNumber?: string;
  status?: "normal" | "maintenance" | "fault" | "offline";
  location?: string;
  lastMaintenance?: string;
}

const statusMap: Record<string, { label: string; className: string }> = {
  normal: { label: "正常", className: "bg-green-100 text-green-800" },
  maintenance: { label: "保养中", className: "bg-yellow-100 text-yellow-800" },
  fault: { label: "故障", className: "bg-red-100 text-red-800" },
  offline: { label: "离线", className: "bg-gray-100 text-gray-600" },
};

function EquipmentCard({
  name,
  model,
  serialNumber,
  status = "normal",
  location,
  lastMaintenance,
  className,
  ...props
}: EquipmentCardProps) {
  const statusConfig = statusMap[status] ?? statusMap.normal;

  return (
    <Card data-slot="equipment-card" className={cn("", className)} {...props}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <WrenchIcon className="text-muted-foreground size-4" />
            {name}
          </CardTitle>
          <Badge
            variant="outline"
            className={cn("text-xs", statusConfig.className)}
          >
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5 text-sm">
        {model && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">型号</span>
            <span>{model}</span>
          </div>
        )}
        {serialNumber && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">序列号</span>
            <span className="font-mono text-xs">{serialNumber}</span>
          </div>
        )}
        {location && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">位置</span>
            <span className="flex items-center gap-1">
              <MapPinIcon className="size-3" />
              {location}
            </span>
          </div>
        )}
        {lastMaintenance && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">上次保养</span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="size-3" />
              {lastMaintenance}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { EquipmentCard };
export type { EquipmentCardProps };
