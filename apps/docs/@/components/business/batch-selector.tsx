"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDownIcon } from "lucide-react";

interface BatchSelectorProps extends React.ComponentProps<"div"> {
  selectedIds: string[];
  total: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  actions?: React.ReactNode;
  className?: string;
}

function BatchSelector({
  selectedIds,
  total,
  onSelectAll,
  onDeselectAll,
  actions,
  className,
  ...props
}: BatchSelectorProps) {
  const allSelected = selectedIds.length === total && total > 0;

  return (
    <div
      data-slot="batch-selector"
      className={cn(
        "bg-muted/30 flex items-center gap-3 rounded-lg border px-3 py-2 text-sm",
        selectedIds.length === 0 && "hidden",
        className,
      )}
      {...props}
    >
      <Checkbox
        checked={allSelected}
        onCheckedChange={(c) => {
          if (c) onSelectAll();
          else onDeselectAll();
        }}
      />
      <span className="text-muted-foreground">
        已选{" "}
        <span className="text-foreground font-medium">
          {selectedIds.length}
        </span>{" "}
        / {total} 项
      </span>
      <Button variant="link" size="sm" onClick={onDeselectAll}>
        取消选择
      </Button>
      <div className="flex-1" />
      {actions}
    </div>
  );
}

export { BatchSelector };
export type { BatchSelectorProps };
