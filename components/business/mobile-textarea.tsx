"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type MobileTextareaProps = React.ComponentProps<"textarea">

function MobileTextarea({ className, ...props }: MobileTextareaProps) {
  return (
    <Textarea
      className={cn(
        "min-h-[120px] px-4 py-3 text-base",
        "md:min-h-[80px] md:px-2.5 md:py-1 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { MobileTextarea }
export type { MobileTextareaProps }
