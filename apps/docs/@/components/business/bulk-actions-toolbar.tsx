"use client";
import * as React from "react";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BulkAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  disabled?: boolean;
}

interface BulkActionsToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  selectedCount: number;
  onClear?: () => void;
  actions?: BulkAction[];
  label?: string;
}

export function BulkActionsToolbar({
  count,
  selectedCount,
  onClear,
  actions = [],
  label = "已选择",
  className,
  ...props
}: BulkActionsToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      data-slot="bulk-actions-toolbar"
      role="toolbar"
      aria-label="批量操作"
      className={cn(
        "bg-popover sticky top-0 z-10 flex items-center gap-3 rounded-md border px-3 py-2 shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium">{label}</span>
        <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
          {selectedCount} / {count}
        </span>
      </div>
      <div className="bg-border mx-2 h-4 w-px" />
      <div className="flex flex-1 flex-wrap items-center gap-1">
        {actions.map((action, i) => (
          <Button
            key={i}
            size="sm"
            variant={action.variant ?? "outline"}
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
      {onClear && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClear}
          aria-label="清除选择"
        >
          <XIcon />
        </Button>
      )}
    </div>
  );
}
