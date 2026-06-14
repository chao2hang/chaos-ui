"use client"

import * as React from "react"
import { CheckIcon, PencilIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export interface InlineEditProps extends Omit<React.ComponentProps<"div">, "onSave"> {
  value: string
  placeholder?: string
  multiline?: boolean
  disabled?: boolean
  validate?: (value: string) => string | undefined
  onSave?: (value: string) => void | Promise<void>
  renderValue?: (value: string) => React.ReactNode
}

export function InlineEdit({
  value,
  placeholder = "Empty",
  multiline,
  disabled,
  validate,
  onSave,
  renderValue,
  className,
  ...props
}: InlineEditProps) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(value)
  const [error, setError] = React.useState<string>()
  const [saving, setSaving] = React.useState(false)

  const save = async () => {
    const nextError = validate?.(draft)
    setError(nextError)
    if (nextError) return
    setSaving(true)
    try {
      await onSave?.(draft)
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  if (!editing) {
    const startEditing = () => {
      setDraft(value)
      setError(undefined)
      setEditing(true)
    }

    return (
      <div data-slot="inline-edit" className={cn("group/inline-edit inline-flex items-center gap-2", className)} {...props}>
        <button
          type="button"
          disabled={disabled}
          className="rounded-sm text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={startEditing}
        >
          {value ? renderValue?.(value) ?? value : <span className="text-muted-foreground">{placeholder}</span>}
        </button>
        {!disabled && (
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            className="opacity-0 group-hover/inline-edit:opacity-100"
            onClick={startEditing}
            aria-label="Edit value"
          >
            <PencilIcon />
          </Button>
        )}
      </div>
    )
  }

  const Control = multiline ? Textarea : Input

  return (
    <div data-slot="inline-edit" className={cn("space-y-1.5", className)} {...props}>
      <div className="flex items-start gap-2">
        <Control
          value={draft}
          aria-invalid={!!error}
          disabled={saving}
          onChange={(event) => {
            setDraft(event.target.value)
            setError(undefined)
          }}
          onKeyDown={(event) => {
            if (!multiline && event.key === "Enter") void save()
            if (event.key === "Escape") setEditing(false)
          }}
        />
        <Button type="button" size="icon-sm" onClick={save} disabled={saving} aria-label="Save value">
          <CheckIcon />
        </Button>
        <Button type="button" size="icon-sm" variant="outline" onClick={() => setEditing(false)} disabled={saving} aria-label="Cancel editing">
          <XIcon />
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
