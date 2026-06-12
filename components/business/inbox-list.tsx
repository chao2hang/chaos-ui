"use client"
import * as React from "react"
import { SearchIcon, InboxIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/business/empty-state"
import { formatRelativeTime } from "@/lib/format"

export interface InboxItem {
  id: string
  from: { name: string; avatar?: string }
  subject: string
  preview?: string
  timestamp: number | string | Date
  read?: boolean
  starred?: boolean
  labels?: string[]
}

interface InboxListProps extends React.ComponentProps<"div"> {
  items: InboxItem[]
  selected?: string
  onSelect?: (id: string) => void
  onStar?: (id: string) => void
  onSearch?: (query: string) => void
  className?: string
}

export function InboxList({ items, selected, onSelect, onStar, onSearch, className, ...props }: InboxListProps) {
  const [query, setQuery] = React.useState("")
  const filtered = items.filter(
    (i) =>
      !query ||
      i.subject.toLowerCase().includes(query.toLowerCase()) ||
      i.from.name.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div data-slot="inbox-list" className={cn("flex h-full flex-col rounded-md border bg-card", className)} {...props}>
      <div className="border-b p-2">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              onSearch?.(e.target.value)
            }}
            placeholder="搜索邮件..."
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-4">
            <EmptyState variant="default" title="收件箱为空" description="没有邮件" />
          </div>
        ) : (
          filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect?.(item.id)}
              className={cn(
                "flex w-full items-start gap-2 border-b px-3 py-2.5 text-left transition-colors hover:bg-muted/30",
                selected === item.id && "bg-primary/5",
                !item.read && "font-medium"
              )}
            >
              <div className="size-8 shrink-0 rounded-full bg-muted" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm">{item.from.name}</span>
                  <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </div>
                <p className="truncate text-sm">{item.subject}</p>
                {item.preview && <p className="truncate text-xs text-muted-foreground">{item.preview}</p>}
                {item.labels && item.labels.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {item.labels.map((l) => (
                      <span key={l} className="rounded bg-muted px-1.5 py-0.5 text-[0.65rem]">{l}</span>
                    ))}
                  </div>
                )}
              </div>
              {onStar && (
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    onStar(item.id)
                  }}
                  className={item.starred ? "text-warning" : ""}
                  aria-label={item.starred ? "取消星标" : "加星标"}
                >
                  ★
                </Button>
              )}
              {!item.read && <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />}
            </button>
          ))
        )}
      </div>
    </div>
  )
}
