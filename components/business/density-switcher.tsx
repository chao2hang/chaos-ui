"use client"
import * as React from "react"
import { CheckIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DensitySwitcherProps {
  open: boolean
  density?: "compact" | "default" | "comfortable"
  onChange?: (open: boolean) => void
  className?: string
  size?: "sm" | "default" | "lg"
  children?: React.ReactNode
}

const DENSITY_STYLES: Record<NonNullable<DensitySwitcherProps["density"]>, string> = {
  compact: "h-7 px-2 text-xs",
  default: "h-9 px-3 text-sm",
  comfortable: "h-11 px-4 text-base",
}

const SIZE_STYLES: Record<NonNullable<DensitySwitcherProps["size"]>, string> = {
  sm: "scale-75",
  default: "scale-100",
  lg: "scale-125",
}

export function DensitySwitcher({
  open: openProp,
  density = "default",
  onChange,
  className,
  size = "default",
  children,
}: DensitySwitcherProps) {
  const [open, setOpen] = React.useState(openProp ?? false)
  React.useEffect(() => {
    if (openProp !== undefined) setOpen(openProp)
  }, [openProp])
  const handleChange = (checked: boolean) => {
    setOpen(checked)
    onChange?.(checked)
  }
  return (
    <button
      type="button"
      role="switch"
      aria-checked={open}
      data-state={open ? "on" : "off"}
      data-density={density}
      onClick={() => handleChange(!open)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border bg-muted/30 px-2 py-1 text-xs transition-colors hover:bg-muted",
        DENSITY_STYLES[density],
        className
      )}
    >
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded-full transition-all",
          SIZE_STYLES[size],
          open ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"
        )}
      >
        {open ? <CheckIcon className="size-3" /> : <XIcon className="size-3" />}
      </span>
      <span className="text-xs">{children ?? "密度"}</span>
    </button>
  )
}
