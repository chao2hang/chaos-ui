"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { XIcon } from "lucide-react"

function TagsInput({ value = [], onChange, placeholder = "Add tag...", max, disabled, className }: { value?: string[]; onChange?: (v: string[]) => void; placeholder?: string; max?: number; disabled?: boolean; className?: string }) {
  const [input, setInput] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const addTag = (tag: string): void => {
    const trimmed = tag.trim()
    if (!trimmed) return
    if (max && value.length >= max) return
    if (value.includes(trimmed)) return
    onChange?.([...value, trimmed])
    setInput("")
  }

  const removeTag = (index: number): void => {
    onChange?.(value.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(input)
    }
    if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value.length - 1)
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-8 flex-wrap items-center gap-1.5 rounded-md border bg-transparent px-2 py-1 text-sm",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag, i) => (
        <Badge key={i} variant="secondary" className="gap-1">
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTag(i) }}
              className="ml-0.5 rounded-full hover:bg-muted-foreground/20"
            >
              <XIcon className="size-3" />
            </button>
          )}
        </Badge>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        disabled={disabled || !!(max && value.length >= max)}
        className="flex-1 min-w-[80px] bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
      />
    </div>
  )
}

export { TagsInput }
