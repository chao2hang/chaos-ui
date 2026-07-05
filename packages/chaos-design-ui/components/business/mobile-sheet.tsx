"use client"

import * as React from "react"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"

interface MobileSheetProps {
  children: React.ReactNode
  title?: string
  description?: string
  trigger?: React.ReactNode
  actions?: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

function MobileSheet({ children, title, description, trigger, actions, side = "bottom", open, onOpenChange, className }: MobileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <SheetTrigger
          render={trigger as React.ReactElement}
          data-slot="mobile-sheet-trigger"
        />
      )}
      <SheetContent
        side={side}
        className={cn(
          "h-[80vh]",
          "sm:h-auto sm:max-h-[90vh]",
          className
        )}
      >
        <SheetHeader className="p-4 border-b">
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
        {actions && (
          <SheetFooter className="p-4 border-t">
            {actions}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

export { MobileSheet }
export type { MobileSheetProps }
