"use client"
import * as React from "react"
import { PlusIcon, XIcon, GripVerticalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FormRepeaterProps<T> extends Omit<React.ComponentProps<"div">, "onChange"> {
  value: T[]
  onChange?: (value: T[]) => void
  defaultItem: () => T
  min?: number
  max?: number
  addLabel?: string
  renderItem: (item: T, index: number, meta: { onChange: (item: T) => void; onRemove: () => void; canRemove: boolean; canMoveUp: boolean; canMoveDown: boolean; onMoveUp: () => void; onMoveDown: () => void }) => React.ReactNode
  className?: string
}

export function FormRepeater<T>({
  value,
  onChange,
  defaultItem,
  min = 0,
  max = 100,
  addLabel = "添加",
  renderItem,
  className,
  ...props
}: FormRepeaterProps<T>) {
  const setAt = (i: number, next: T) => {
    const arr = value.slice()
    arr[i] = next
    onChange?.(arr)
  }
  const removeAt = (i: number) => {
    if (value.length <= min) return
    onChange?.(value.filter((_, idx) => idx !== i))
  }
  const add = () => {
    if (value.length >= max) return
    onChange?.([...value, defaultItem()])
  }
  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return
    const arr = value.slice()
    const [moved] = arr.splice(from, 1)
    arr.splice(to, 0, moved)
    onChange?.(arr)
  }

  return (
    <div data-slot="form-repeater" className={cn("space-y-2", className)} {...props}>
      {value.map((item, i) => {
        const meta = {
          onChange: (next: T) => setAt(i, next),
          onRemove: () => removeAt(i),
          canRemove: value.length > min,
          canMoveUp: i > 0,
          canMoveDown: i < value.length - 1,
          onMoveUp: () => move(i, i - 1),
          onMoveDown: () => move(i, i + 1),
        }
        return (
          <div key={i} className="flex items-start gap-2 rounded-md border bg-card p-2">
            <div className="mt-2 flex flex-col items-center gap-1 text-muted-foreground">
              <GripVerticalIcon className="size-4 cursor-grab" />
              <span className="text-xs tabular-nums">{i + 1}</span>
            </div>
            <div className="flex-1 min-w-0">{renderItem(item, i, meta)}</div>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={meta.onRemove}
              disabled={!meta.canRemove}
              aria-label="删除"
            >
              <XIcon />
            </Button>
          </div>
        )
      })}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={add}
        disabled={value.length >= max}
        className="w-full"
      >
        <PlusIcon />
        {addLabel}
        {max < Infinity && <span className="text-xs text-muted-foreground">({value.length}/{max})</span>}
      </Button>
    </div>
  )
}
