"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, GripHorizontalIcon, XIcon } from "lucide-react";

export interface DashboardWidget {
  id: string;
  type: "chart" | "table" | "stat" | "text";
  title: string;
  w: number;
  h: number;
  x: number;
  y: number;
}

interface DashboardDesignerProps extends React.ComponentProps<"div"> {
  widgets: DashboardWidget[];
  onChange?: (widgets: DashboardWidget[]) => void;
  className?: string;
  cols?: number;
}

const defaultWidgetContent: Record<string, string> = {
  chart: "图表区域",
  table: "表格区域",
  stat: "统计卡片",
  text: "文本区域",
};

let widgetCounter = 0;

function DashboardDesigner({
  widgets,
  onChange,
  className,
  cols = 12,
  ...props
}: DashboardDesignerProps) {
  const handleAdd = () => {
    const id = `widget_${++widgetCounter}`;
    onChange?.([
      ...widgets,
      {
        id,
        type: "chart",
        title: `组件 ${widgetCounter}`,
        w: 6,
        h: 4,
        x: 0,
        y: widgets.length * 4,
      },
    ]);
  };

  const handleRemove = (id: string) => {
    onChange?.(widgets.filter((w) => w.id !== id));
  };

  return (
    <div
      data-slot="dashboard-designer"
      className={cn("space-y-4", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm">
          {widgets.length} 个组件
        </span>
        <Button size="sm" variant="outline" onClick={handleAdd}>
          <PlusIcon /> 添加组件
        </Button>
      </div>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {widgets.map((widget) => (
          <Card
            key={widget.id}
            className="hover:ring-primary/30 cursor-grab transition-shadow hover:ring-2"
            style={{ gridColumn: `span ${Math.min(widget.w, cols)}` }}
          >
            <CardHeader className="flex flex-row items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2">
                <GripHorizontalIcon className="text-muted-foreground size-3.5" />
                <CardTitle className="text-sm">{widget.title}</CardTitle>
              </div>
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() => handleRemove(widget.id)}
              >
                <XIcon className="size-3.5" />
              </Button>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="bg-muted/40 text-muted-foreground flex items-center justify-center rounded py-8 text-sm">
                {defaultWidgetContent[widget.type]}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export { DashboardDesigner };
export type { DashboardDesignerProps, DashboardWidget };
