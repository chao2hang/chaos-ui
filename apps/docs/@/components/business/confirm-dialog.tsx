"use client"
import * as React from "react"
import { AlertTriangleIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: React.ReactNode
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
  onConfirm?: () => void | Promise<void>
  loading?: boolean
  icon?: React.ReactNode
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "确认操作",
  description = "此操作不可撤销，是否继续？",
  confirmText = "确认",
  cancelText = "取消",
  variant = "default",
  onConfirm,
  loading,
  icon,
}: ConfirmDialogProps) {
  const [pending, setPending] = React.useState(false)

  const handle = async () => {
    if (!onConfirm) {
      onOpenChange?.(false)
      return
    }
    setPending(true)
    try {
      await onConfirm()
      onOpenChange?.(false)
    } finally {
      setPending(false)
    }
  }

  const isLoading = loading || pending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              {icon ?? <AlertTriangleIcon className="size-4" />}
            </div>
            <div className="flex flex-col gap-1.5">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange?.(false)} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={handle}
            disabled={isLoading}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface ConfirmOptions {
  title?: string
  description?: React.ReactNode
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
}

export function useConfirm(): [(options: ConfirmOptions) => Promise<boolean>, () => void] {
  const [state, setState] = React.useState<{
    open: boolean
    options: ConfirmOptions
    resolve?: (v: boolean) => void
  }>({ open: false, options: {} })

  const confirm = React.useCallback(
    (options: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        setState({ open: true, options, resolve })
      }),
    []
  )

  const close = React.useCallback(
    (result: boolean) => {
      state.resolve?.(result)
      setState((s) => ({ ...s, open: false, resolve: undefined }))
    },
    [state]
  )

  return [confirm, close as () => void] as const
}

export function ConfirmDialogContainer({
  state,
  onClose,
}: {
  state: { open: boolean; options: ConfirmOptions }
  onClose: (result: boolean) => void
}) {
  return (
    <ConfirmDialog
      open={state.open}
      onOpenChange={(open) => {
        if (!open) onClose(false)
      }}
      onConfirm={() => onClose(true)}
      {...state.options}
    />
  )
}
