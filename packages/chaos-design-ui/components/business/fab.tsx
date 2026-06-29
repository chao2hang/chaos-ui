"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronUpIcon } from "lucide-react"

interface FabProps extends React.ComponentProps<typeof Button> {
  icon?: React.ReactNode
  label?: string
  position?: "bottom-right" | "bottom-left" | "bottom-center"
  offset?: number
}

const positionClass: Record<NonNullable<FabProps["position"]>, string> = {
  "bottom-right": "right-4",
  "bottom-left": "left-4",
  "bottom-center": "left-1/2 -translate-x-1/2",
}

export function Fab({
  icon,
  label,
  position = "bottom-right",
  offset = 4,
  className,
  ...props
}: FabProps) {
  return (
    <Button
      data-slot="fab"
      size={label ? "default" : "icon-lg"}
      className={cn(
        "fixed bottom-4 z-40 rounded-full shadow-lg",
        positionClass[position],
        className
      )}
      style={{ bottom: `calc(${offset} * 0.25rem + 1rem)` }}
      {...props}
    >
      {icon}
      {label && <span>{label}</span>}
    </Button>
  )
}

interface FabSpeedDialAction {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

interface FabSpeedDialProps {
  icon: React.ReactNode
  actions: FabSpeedDialAction[]
  position?: "bottom-right" | "bottom-left"
}

export function FabSpeedDial({
  icon,
  actions,
  position = "bottom-right",
}: FabSpeedDialProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <div
      data-slot="fab-speed-dial"
      className={cn(
        "fixed bottom-4 z-40 flex flex-col-reverse items-end gap-2",
        position === "bottom-right" ? "right-4" : "left-4"
      )}
    >
      {open && (
        <div className="flex flex-col-reverse items-end gap-2">
          {actions.map((a, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="rounded-md bg-foreground/90 px-2 py-1 text-xs text-background shadow-md">
                {a.label}
              </span>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => {
                  a.onClick?.()
                  setOpen(false)
                }}
                className="rounded-full shadow-md"
              >
                {a.icon}
              </Button>
            </div>
          ))}
        </div>
      )}
      <Button
        size="icon-lg"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full shadow-lg"
        aria-expanded={open}
        aria-label={open ? "关闭快捷操作" : "打开快捷操作"}
      >
        {icon}
      </Button>
    </div>
  )
}

interface BackTopProps {
  threshold?: number
  target?: React.RefObject<HTMLElement | null>
  className?: string
}

export function BackTop({ threshold = 400, target, className }: BackTopProps) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = target?.current ?? window
    const onScroll = () => {
      const top = target?.current ? target.current.scrollTop : window.scrollY
      setVisible(top > threshold)
    }
    el.addEventListener("scroll", onScroll as EventListener)
    onScroll()
    return () => el.removeEventListener("scroll", onScroll as EventListener)
  }, [target, threshold])

  const scrollToTop = () => {
    if (target?.current) {
      target.current.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (!visible) return null

  return (
    <Button
      data-slot="back-top"
      variant="secondary"
      size="icon"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-4 right-4 z-30 rounded-full shadow-md",
        className
      )}
      aria-label="返回顶部"
    >
      <ChevronUpIcon />
    </Button>
  )
}
