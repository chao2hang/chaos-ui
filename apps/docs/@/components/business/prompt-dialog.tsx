"use client"
import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PromptDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: React.ReactNode
  label?: string
  placeholder?: string
  defaultValue?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: (value: string) => void | Promise<void>
  required?: boolean
  inputType?: "text" | "email" | "password" | "number"
}

export function PromptDialog({
  open,
  onOpenChange,
  title = "请输入",
  description,
  label,
  placeholder,
  defaultValue = "",
  confirmText = "确认",
  cancelText = "取消",
  onConfirm,
  required = true,
  inputType = "text",
}: PromptDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <PromptDialogBody
          title={title}
          description={description}
          label={label}
          placeholder={placeholder}
          defaultValue={defaultValue}
          confirmText={confirmText}
          cancelText={cancelText}
          required={required}
          inputType={inputType}
          onConfirm={onConfirm}
          onClose={() => onOpenChange?.(false)}
        />
      )}
    </Dialog>
  )
}

function PromptDialogBody({
  title,
  description,
  label,
  placeholder,
  defaultValue,
  confirmText,
  cancelText,
  required,
  inputType,
  onConfirm,
  onClose,
}: Omit<PromptDialogProps, "open" | "onOpenChange"> & { onClose: () => void }) {
  const [value, setValue] = React.useState(defaultValue ?? "")
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handle = async () => {
    if (required && !value.trim()) {
      setError("此项必填")
      return
    }
    if (!onConfirm) {
      onClose()
      return
    }
    setPending(true)
    try {
      await onConfirm(value)
      onClose()
    } finally {
      setPending(false)
    }
  }

  return (
    <DialogContent showCloseButton={false} className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      <div className="flex flex-col gap-1.5">
        {label && <Label>{label}</Label>}
        <Input
          type={inputType}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (error) setError(null)
          }}
          placeholder={placeholder}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handle()
            }
          }}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose} disabled={pending}>
          {cancelText}
        </Button>
        <Button onClick={handle} disabled={pending}>
          {confirmText}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
