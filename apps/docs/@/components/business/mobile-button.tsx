"use client"

import * as React from "react"
import { Button } from "@chaos_team/chaos-ui/ui"
import { cn } from "@chaos_team/chaos-ui/lib"

interface MobileButtonProps extends React.ComponentProps<typeof Button> {
  fullWidth?: boolean
}

function MobileButton({ className, fullWidth = true, ...props }: MobileButtonProps) {
  return (
    <Button
      className={cn(
        "h-12 px-6 text-base",
        "md:h-8 md:px-3 md:text-sm",
        fullWidth && "w-full md:w-auto",
        className
      )}
      {...props}
    />
  )
}

export { MobileButton }
export type { MobileButtonProps }
