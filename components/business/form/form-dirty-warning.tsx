"use client"
import * as React from "react"
import { AlertTriangleIcon, XIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface FormDirtyWarningProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDiscard: () => void
  onSave?: () => Promise<void> | void
  message?: string
  saveText?: string
  discardText?: string
  cancelText?: string
  saving?: boolean
}

export function FormDirtyWarning({
  open,
  onOpenChange,
  onDiscard,
  onSave,
  message = "您有未保存的更改。是否保存后再离开？",
  saveText = "保存并继续",
  discardText = "放弃修改",
  cancelText = "取消",
  saving,
}: FormDirtyWarningProps) {
  const [pending, setPending] = React.useState(false)
  const handleSave = async () => {
    if (!onSave) return
    setPending(true)
    try {
      await onSave()
      onOpenChange(false)
    } finally {
      setPending(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning">
              <AlertTriangleIcon className="size-4" />
            </div>
            <div>
              <DialogTitle>未保存的修改</DialogTitle>
              <DialogDescription>{message}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={pending || saving}>
            {cancelText}
          </Button>
          <Button variant="destructive" onClick={onDiscard} disabled={pending || saving}>
            <XIcon />
            {discardText}
          </Button>
          {onSave && (
            <Button onClick={handleSave} disabled={pending || saving}>
              {saveText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
