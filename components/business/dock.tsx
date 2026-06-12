"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export interface DockItem {
  key: string
  label: string
  icon: React.ReactNode
  onClick?: () => void
  badge?: number | string
  active?: boolean
}

interface DockProps extends React.ComponentProps<"div"> {
  items: DockItem[]
  orientation?: "horizontal" | "vertical"
  magnification?: boolean
  className?: string
}

export function Dock({ items, orientation = "horizontal", magnification = true, className, ...props }: DockProps) {
  return (
    <div
      data-slot="dock"
      data-orientation={orientation}
      className={cn(
        "flex items-center gap-1 rounded-2xl border bg-background/80 p-1.5 shadow-lg backdrop-blur",
        orientation === "vertical" && "flex-col",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <DockButton key={item.key} item={item} magnification={magnification} orientation={orientation} />
      ))}
    </div>
  )
}

function DockButton({ item, magnification, orientation }: { item: DockItem; magnification: boolean; orientation: "horizontal" | "vertical" }) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [scale, setScale] = React.useState(1)

  const onMouseMove = (e: React.MouseEvent) => {
    if (!magnification || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const distance = orientation === "horizontal" ? Math.abs(e.clientX - rect.left - rect.width / 2) : Math.abs(e.clientY - rect.top - rect.height / 2)
    const intensity = Math.max(0, 1 - distance / 60)
    setScale(1 + intensity * 0.4)
  }

  const onMouseLeave = () => setScale(1)

  return (
    <button
      ref={ref}
      type="button"
      onClick={item.onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={item.label}
      title={item.label}
      className={cn(
        "group relative flex size-10 items-center justify-center rounded-xl transition-transform",
        item.active && "bg-primary/10 text-primary",
        !item.active && "hover:bg-muted"
      )}
      style={{ transform: `scale(${scale})` }}
    >
      {item.icon}
      {item.badge !== undefined && item.badge !== 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex size-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[0.6rem] font-medium text-destructive-foreground">
          {item.badge}
        </span>
      )}
      <span className="pointer-events-none absolute top-full mt-1 rounded bg-foreground/90 px-1.5 py-0.5 text-[0.65rem] text-background opacity-0 transition-opacity group-hover:opacity-100">
        {item.label}
      </span>
    </button>
  )
}
