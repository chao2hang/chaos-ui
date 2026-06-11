"use client"
import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export interface TransferItem {
  key: string
  label: string
  description?: string
  disabled?: boolean
}

interface TransferProps {
  dataSource: TransferItem[]
  targetKeys?: string[]
  onChange?: (targetKeys: string[]) => void
  titles?: [string, string]
  searchable?: boolean
  filterOption?: (input: string, item: TransferItem) => boolean
  render?: (item: TransferItem) => React.ReactNode
  disabled?: boolean
  className?: string
  oneWay?: boolean
}

const defaultFilter = (input: string, item: TransferItem) =>
  item.label.toLowerCase().includes(input.toLowerCase())

export function Transfer({
  dataSource,
  targetKeys = [],
  onChange,
  titles = ["源列表", "目标列表"],
  searchable = true,
  filterOption = defaultFilter,
  render,
  disabled,
  className,
  oneWay = false,
}: TransferProps) {
  const [selectedSource, setSelectedSource] = React.useState<string[]>([])
  const [selectedTarget, setSelectedTarget] = React.useState<string[]>([])
  const [searchLeft, setSearchLeft] = React.useState("")
  const [searchRight, setSearchRight] = React.useState("")

  const source = React.useMemo(
    () => dataSource.filter((d) => !targetKeys.includes(d.key)),
    [dataSource, targetKeys]
  )
  const target = React.useMemo(
    () => dataSource.filter((d) => targetKeys.includes(d.key)),
    [dataSource, targetKeys]
  )

  const filteredSource = source.filter((s) => filterOption(searchLeft, s))
  const filteredTarget = target.filter((s) => filterOption(searchRight, s))

  const moveToTarget = () => {
    if (disabled) return
    const next = Array.from(new Set([...targetKeys, ...selectedSource]))
    onChange?.(next)
    setSelectedSource([])
  }

  const moveToSource = () => {
    if (disabled) return
    const next = targetKeys.filter((k) => !selectedTarget.includes(k))
    onChange?.(next)
    setSelectedTarget([])
  }

  const toggleSource = (key: string) => {
    setSelectedSource((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const toggleTarget = (key: string) => {
    setSelectedTarget((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  return (
    <div
      data-slot="transfer"
      className={cn("flex items-stretch gap-2", disabled && "opacity-50", className)}
    >
      <TransferPanel
        title={titles[0]}
        items={filteredSource}
        selected={selectedSource}
        onToggle={toggleSource}
        searchable={searchable}
        searchValue={searchLeft}
        onSearchChange={setSearchLeft}
        render={render}
        disabled={disabled}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={moveToTarget}
          disabled={selectedSource.length === 0 || disabled}
          aria-label="添加到目标"
        >
          <ChevronRightIcon />
        </Button>
        {!oneWay && (
          <Button
            variant="outline"
            size="icon"
            onClick={moveToSource}
            disabled={selectedTarget.length === 0 || disabled}
            aria-label="移回源"
          >
            <ChevronLeftIcon />
          </Button>
        )}
      </div>
      <TransferPanel
        title={titles[1]}
        items={filteredTarget}
        selected={selectedTarget}
        onToggle={toggleTarget}
        searchable={searchable}
        searchValue={searchRight}
        onSearchChange={setSearchRight}
        render={render}
        disabled={disabled}
      />
    </div>
  )
}

function TransferPanel({
  title,
  items,
  selected,
  onToggle,
  searchable,
  searchValue,
  onSearchChange,
  render,
  disabled,
}: {
  title: string
  items: TransferItem[]
  selected: string[]
  onToggle: (key: string) => void
  searchable: boolean
  searchValue: string
  onSearchChange: (v: string) => void
  render?: (item: TransferItem) => React.ReactNode
  disabled?: boolean
}) {
  const allSelected = items.length > 0 && items.every((i) => selected.includes(i.key))
  const someSelected = items.some((i) => selected.includes(i.key))

  return (
    <div className="flex h-72 w-full flex-col rounded-md border">
      <div className="flex items-center justify-between border-b px-3 py-2 text-sm font-medium">
        <span>{title}</span>
        <span className="text-xs text-muted-foreground">
          {selected.length}/{items.length}
        </span>
      </div>
      {searchable && (
        <div className="flex items-center gap-2 border-b px-3 py-2">
          <SearchIcon className="size-4 shrink-0 opacity-50" />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索..."
            className="h-7 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          />
        </div>
      )}
      <div className="flex items-center border-b px-3 py-1.5">
        <button
          type="button"
          aria-label="全选"
          onClick={() => {
            if (allSelected) items.forEach((i) => selected.includes(i.key) && onToggle(i.key))
            else items.forEach((i) => !selected.includes(i.key) && onToggle(i.key))
          }}
          disabled={disabled || items.length === 0}
          className={cn(
            "flex size-4 items-center justify-center rounded-[4px] border transition-colors",
            allSelected
              ? "border-primary bg-primary text-primary-foreground"
              : someSelected
                ? "border-primary bg-primary/50 text-primary-foreground"
                : "border-input"
          )}
        >
          {allSelected && <CheckIcon className="size-3" />}
          {!allSelected && someSelected && (
            <span className="block h-0.5 w-2 bg-primary-foreground" />
          )}
        </button>
        <span className="ml-2 text-xs text-muted-foreground">全选</span>
      </div>
      <div className="flex-1 overflow-y-auto p-1">
        {items.length === 0 ? (
          <div className="px-2 py-6 text-center text-sm text-muted-foreground">无数据</div>
        ) : (
          items.map((item) => (
            <label
              key={item.key}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                "hover:bg-accent",
                item.disabled && "pointer-events-none opacity-50"
              )}
            >
              <Checkbox
                checked={selected.includes(item.key)}
                onCheckedChange={() => onToggle(item.key)}
                disabled={item.disabled || disabled}
              />
              <div className="flex-1 truncate">
                {render ? render(item) : (
                  <>
                    <div className="truncate">{item.label}</div>
                    {item.description && (
                      <div className="truncate text-xs text-muted-foreground">{item.description}</div>
                    )}
                  </>
                )}
              </div>
            </label>
          ))
        )}
      </div>
    </div>
  )
}
