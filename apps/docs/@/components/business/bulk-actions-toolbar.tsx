"use client";
import * as React from "react";
import { XIcon } from "@chaos_team/chaos-ui/ui-icons";
import { useTranslation } from "react-i18next";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";

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

/**
 * @component BulkActionsToolbar
 * @category business/ux
 * @since 0.2.0
 * @description Sticky toolbar for batch operations on selected items with customizable action buttons / 批量操作工具栏，显示已选数量并支持自定义操作按钮
 * @keywords bulk, actions, toolbar, batch, selection
 * @example
 * <BulkActionsToolbar count={100} selectedCount={5} actions={[{ label: "Delete", onClick: () => {} }]} onClear={() => {}} />
 */
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
          aria-label={t("bulkActionsToolbar.clear")}
        >
          <XIcon />
        </Button>
      )}
    </div>
  );
}
