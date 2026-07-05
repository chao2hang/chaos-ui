"use client"

import * as React from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"

interface MobileDialogProps {
  children: React.ReactNode
  title?: string
  description?: string
  trigger?: React.ReactNode
  actions?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

function MobileDialog({ children, title, description, trigger, actions, open, onOpenChange, className }: MobileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger
          render={trigger as React.ReactElement}
          data-slot="mobile-dialog-trigger"
        />
      )}
      <DialogContent
        className={cn(
          "max-w-full inset-0 rounded-none p-0 translate-x-0 translate-y-0",
          "sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:max-w-md sm:p-6",
          className
        )}
      >
        <DialogHeader className="p-4 sm:p-0 sm:mb-4 border-b sm:border-0">
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="flex-1 overflow-auto p-4 sm:p-0">
          {children}
        </div>
        {actions && (
          <DialogFooter className="p-4 sm:p-0 sm:mt-4 border-t sm:border-0">
            {actions}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { MobileDialog }
export type { MobileDialogProps }
