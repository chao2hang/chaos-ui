"use client";

import * as React from "react";
import {
  KanbanBoard,
  type KanbanItem,
  type KanbanColumnData,
} from "@chaos_team/chaos-ui/business";
import { cn } from "@chaos_team/chaos-ui/lib";

interface MobileKanbanProps {
  columns: KanbanColumnData[];
  onColumnsChange?: (columns: KanbanColumnData[]) => void;
  renderCard?: (item: KanbanItem) => React.ReactNode;
  className?: string;
}

function MobileKanban({ className, ...props }: MobileKanbanProps) {
  return (
    <KanbanBoard
      className={cn("[&>div]:w-64", "md:[&>div]:w-72", className)}
      {...props}
    />
  );
}

export { MobileKanban };
export type { MobileKanbanProps };
