"use client"
import * as React from "react"
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDownIcon, GripVerticalIcon } from "lucide-react"

function KanbanBoard({ columns, onColumnsChange, renderCard, className }: { columns: { id: string; title: string; items: { id: string; title: string; description?: string; [key: string]: unknown }[] }[]; onColumnsChange?: (columns: any[]) => void; renderCard?: (item: any) => React.ReactNode; className?: string }) {
  const sensors = useSensors(useSensor(PointerSensor as any, { activationConstraint: { distance: 5 } }))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeData = active.data.current
    const overData = over.data.current

    if (!activeData || !overData) return

    const sourceCol = activeData.columnId
    const destCol = overData.columnId || overData.type === "column" ? overData.columnId : sourceCol

    if (!sourceCol || !destCol) return

    const newColumns = columns.map((col) => ({ ...col, items: [...col.items] }))

    if (sourceCol === destCol) {
      const col = newColumns.find((c) => c.id === sourceCol)
      if (!col) return
      const oldIndex = col.items.findIndex((item) => item.id === active.id)
      const newIndex = col.items.findIndex((item) => item.id === over.id)
      if (oldIndex !== -1 && newIndex !== -1) {
        col.items = arrayMove(col.items, oldIndex, newIndex)
      }
    } else {
      const srcCol = newColumns.find((c) => c.id === sourceCol)
      const dstCol = newColumns.find((c) => c.id === destCol)
      if (!srcCol || !dstCol) return
      const itemIndex = srcCol.items.findIndex((item) => item.id === active.id)
      if (itemIndex === -1) return
      const [item] = srcCol.items.splice(itemIndex, 1)
      dstCol.items.push(item)
    }

    onColumnsChange?.(newColumns)
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
        {columns.map((column) => (
          <KanbanColumn key={column.id} column={column} renderCard={renderCard} />
        ))}
      </div>
    </DndContext>
  )
}

function KanbanColumn({ column, renderCard }: { column: any; renderCard?: (item: any) => React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <div className="flex w-72 shrink-0 flex-col rounded-lg border bg-muted/30">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{column.title}</h3>
          <Badge variant="secondary" className="h-5 px-1.5 text-xs">{column.items.length}</Badge>
        </div>
        <Button variant="ghost" size="icon-xs" onClick={() => setCollapsed(!collapsed)}>
          <ChevronDownIcon className={cn("size-4 transition-transform", collapsed && "-rotate-90")} />
        </Button>
      </div>
      <Collapsible open={!collapsed}>
        <CollapsibleContent>
          <SortableContext items={column.items.map((i: any) => i.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2 p-2 pt-0 min-h-[40px]">
              {column.items.map((item: any) => (
                <KanbanCard key={item.id} item={item} columnId={column.id} renderCard={renderCard} />
              ))}
            </div>
          </SortableContext>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

function KanbanCard({ item, columnId, renderCard }: { item: any; columnId: string; renderCard?: (item: any) => React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    data: { columnId, type: "card" },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("rounded-md border bg-background p-3 text-sm shadow-xs", isDragging && "shadow-md")}
    >
      <div className="flex items-start gap-2">
        <button className="mt-0.5 cursor-grab text-muted-foreground hover:text-foreground" {...attributes} {...listeners}>
          <GripVerticalIcon className="size-3.5" />
        </button>
        <div className="flex-1 min-w-0">
          {renderCard ? renderCard(item) : (
            <>
              <p className="font-medium truncate">{item.title}</p>
              {item.description && <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export { KanbanBoard }
