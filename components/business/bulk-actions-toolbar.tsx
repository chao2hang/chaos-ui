"use client";
import * as React from "react";
import { XIcon } from "@/components/ui/icons";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

interface BulkAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  disabled?: boolean;
}

interface BulkActionsToolbarProps extends React.ComponentProps<"div"> {
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
  label: labelProp,
  className,
  ...props
}: BulkActionsToolbarProps) {
  const { t } = useTranslation("navigation");
  const label = labelProp ?? t("bulkActionsToolbar.label");
  if (selectedCount === 0) return null;

  return (
    <div
      data-slot="bulk-actions-toolbar"
      role="toolbar"
      aria-label={t("bulkActionsToolbar.ariaLabel")}
      className={cn(
        "sticky top-0 z-10 flex items-center gap-3 rounded-md border bg-popover px-3 py-2 shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium">{label}</span>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
          {selectedCount} / {count}
        </span>
      </div>
      <div className="mx-2 h-4 w-px bg-border" />
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
          aria-label={t("bulkActionsToolbar.clear")}
        >
          <XIcon />
        </Button>
      )}
    </div>
  );
}
