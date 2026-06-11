"use client"

import * as React from "react"
import { KanbanBoard } from "@/components/business/kanban-board"
import { cn } from "@/lib/utils"

interface MobileKanbanProps {
  columns: {
    id: string
    title: string
    items: { id: string; title: string; description?: string; [key: string]: unknown }[]
  }[]
  onColumnsChange?: (columns: any[]) => void
  renderCard?: (item: any) => React.ReactNode
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
