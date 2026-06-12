"use client"

import * as React from "react"
import { KanbanBoard, type KanbanItem, type KanbanColumnData } from "@/components/business/kanban-board"
import { cn } from "@/lib/utils"

interface MobileKanbanProps {
  columns: KanbanColumnData[]
  onColumnsChange?: (columns: KanbanColumnData[]) => void
  renderCard?: (item: KanbanItem) => React.ReactNode
  className?: string
}

function MobileKanban({ className, ...props }: MobileKanbanProps) {
  return (
    <KanbanBoard
      className={cn(
        "[&>div]:w-64",
        "md:[&>div]:w-72",
        className
      )}
      {...props}
    />
  )
}

export { MobileKanban }
export type { MobileKanbanProps }
