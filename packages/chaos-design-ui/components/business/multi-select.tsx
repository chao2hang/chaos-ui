"use client"
import * as React from "react"
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface MultiSelectOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
  group?: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  className?: string
  maxCount?: number
  maxSelected?: number
  clearable?: boolean
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No results found",
  disabled,
  className,
  maxCount = 3,
  maxSelected,
  clearable = true,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const valueSet = React.useMemo(() => new Set(value), [value])
  const optionMap = React.useMemo(() => {
    const map = new Map<string, MultiSelectOption>()
    for (const o of options) map.set(o.value, o)
    return map
  }, [options])

  const toggle = React.useCallback(
    (val: string) => {
      if (valueSet.has(val)) {
        onChange?.(value.filter((v) => v !== val))
      } else {
        if (maxSelected && value.length >= maxSelected) return
        onChange?.([...value, val])
      }
    },
    [value, valueSet, maxSelected, onChange],
  )

  const visibleValues = value.slice(0, maxCount)
  const overflow = value.length - maxCount

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "h-auto min-h-9 w-full justify-between font-normal",
              value.length === 0 && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <div className="flex flex-1 flex-wrap items-center gap-1 overflow-hidden">
          {value.length === 0 ? (
            <span>{placeholder}</span>
          ) : (
            <>
              {visibleValues.map((v) => {
	                const opt = optionMap.get(v)
                return (
                  <Badge
                    key={v}
                    variant="secondary"
                    className="gap-1 pr-0.5 text-xs"
                  >
                    {opt?.label ?? v}
                    <span
                      role="button"
	              aria-label="Remove"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggle(v)
                      }}
                      className="ml-0.5 rounded-sm p-0.5 hover:bg-muted"
                    >
                      <XIcon className="size-3" />
                    </span>
                  </Badge>
                )
              })}
              {overflow > 0 && (
                <Badge variant="secondary" className="text-xs">
                  +{overflow}
                </Badge>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          {clearable && value.length > 0 && (
            <span
              role="button"
	              aria-label="Clear all"
              onClick={(e) => {
                e.stopPropagation()
                onChange?.([])
              }}
              className="rounded p-0.5 hover:bg-muted"
            >
              <XIcon className="size-3.5 opacity-60 hover:opacity-100" />
            </span>
          )}
          <ChevronDownIcon className="size-4 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--anchor-width)] p-0" align="start">
        {open && (
          <MultiSelectPanel
	            options={options}
	            value={value}
	            valueSet={valueSet}
            onToggle={toggle}
            searchPlaceholder={searchPlaceholder}
            emptyText={emptyText}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}

function MultiSelectPanel({
  options,
  value,
  valueSet,
  onToggle,
  searchPlaceholder,
  emptyText,
}: {
  options: MultiSelectOption[]
  value: string[]
  valueSet: Set<string>
  onToggle: (val: string) => void
  searchPlaceholder: string
  emptyText: string
}) {
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const filtered = React.useMemo(() => {
    if (!query) return options
    const q = query.toLowerCase()
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase().includes(q) ||
        o.description?.toLowerCase().includes(q)
    )
  }, [options, query])

  const grouped = React.useMemo(() => {
    const map = new Map<string, MultiSelectOption[]>()
    for (const opt of filtered) {
      const key = opt.group ?? ""
      const arr = map.get(key) ?? []
      arr.push(opt)
      map.set(key, arr)
    }
    return Array.from(map.entries())
  }, [filtered])

  return (
    <>
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <SearchIcon className="size-4 shrink-0 opacity-50" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-7 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
        />
      </div>
      <div className="max-h-64 overflow-y-auto p-1">
        {grouped.length === 0 && (
          <div className="px-2 py-6 text-center text-sm text-muted-foreground">{emptyText}</div>
        )}
        {grouped.map(([group, items]) => (
          <div key={group || "_default"}>
            {group && (
              <div className="px-2 py-1 text-xs font-medium text-muted-foreground">{group}</div>
            )}
            {items.map((opt) => {
	              const isSelected = valueSet.has(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={opt.disabled}
                  onClick={() => onToggle(opt.value)}
                  className={cn(
                    "flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-hidden select-none",
                    "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    opt.disabled && "pointer-events-none opacity-50"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-sm border",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input"
                    )}
                  >
                    {isSelected && <CheckIcon className="size-3" />}
                  </span>
                  <span className="flex-1 truncate">
                    {opt.label}
                    {opt.description && (
                      <span className="ml-2 text-xs text-muted-foreground">{opt.description}</span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}
