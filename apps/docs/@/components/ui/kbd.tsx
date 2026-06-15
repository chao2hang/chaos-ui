import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const kbdVariants = cva(
  "pointer-events-none inline-flex items-center justify-center gap-0.5 rounded-md border bg-muted font-mono font-medium text-muted-foreground shadow-xs select-none",
  {
    variants: {
      size: {
        sm: "h-5 min-w-5 px-1 text-[0.65rem]",
        default: "h-6 min-w-6 px-1.5 text-xs",
        lg: "h-7 min-w-7 px-2 text-sm",
      },
    },
    defaultVariants: { size: "default" },
  }
)

function Kbd({
  className,
  size,
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ size }), className)}
      {...props}
    />
  )
}

function KbdGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup, kbdVariants }
