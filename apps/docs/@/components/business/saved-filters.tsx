"use client"
import * as React from "react"
import { BookmarkIcon, BookmarkCheckIcon, ChevronDownIcon, TrashIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface SavedFilter {
  id: string
  name: string
  filters: Record<string, unknown>
  createdAt?: number | string
  isPinned?: boolean
}

interface SavedFiltersProps {
  filters: SavedFilter[]
  activeId?: string
  onApply?: (id: string) => void
  onSave?: (name: string) => void
  onDelete?: (id: string) => void
  onPin?: (id: string) => void
  className?: string
  label?: string
}

export function SavedFilters({
  filters,
  activeId,
  onApply,
  onSave,
  onDelete,
  onPin,
  className,
  label = "已保存的筛选",
}: SavedFiltersProps) {
  const [name, setName] = React.useState("")
  const [openSave, setOpenSave] = React.useState(false)

  const handleSave = () => {
    if (!name.trim()) return
    onSave?.(name.trim())
    setName("")
    setOpenSave(false)
  }

  return (
    <div data-slot="saved-filters" className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="sm" />
          }
        >
          <BookmarkIcon />
          {label}
          <ChevronDownIcon className="size-3.5 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {filters.length === 0 ? (
            <div className="px-2 py-6 text-center text-xs text-muted-foreground">暂无保存的筛选</div>
          ) : (
            filters.map((f) => (
              <DropdownMenuItem
                key={f.id}
                onClick={() => onApply?.(f.id)}
                className="flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  {f.isPinned ? (
                    <BookmarkCheckIcon className="size-3.5 text-primary" />
                  ) : (
                    <BookmarkIcon className="size-3.5" />
                  )}
                  <span className="truncate">{f.name}</span>
                </span>
                <div className="flex items-center gap-1">
                  {f.id === activeId && (
                    <span className="rounded bg-primary/10 px-1 text-[0.65rem] text-primary">应用</span>
                  )}
                  {onPin && (
                    <button
                      type="button"
                      aria-label="固定"
                      onClick={(e) => {
                        e.stopPropagation()
                        onPin(f.id)
                      }}
                      className="opacity-50 hover:opacity-100"
                    >
                      <BookmarkIcon className="size-3" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      aria-label="删除"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(f.id)
                      }}
                      className="opacity-50 hover:opacity-100 hover:text-destructive"
                    >
                      <TrashIcon className="size-3" />
                    </button>
                  )}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {onSave && (
        <DropdownMenu open={openSave} onOpenChange={setOpenSave}>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="sm" />
            }
          >
            <BookmarkCheckIcon />
            保存当前
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 p-3">
            <DropdownMenuGroup>
              <DropdownMenuLabel>命名并保存</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-2 p-1">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="筛选名称..."
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave()
                }}
              />
              <Button size="sm" onClick={handleSave} disabled={!name.trim()}>
                保存
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
