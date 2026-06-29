"use client"
import * as React from "react"
import { MaximizeIcon, MinimizeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChartFullscreenButtonProps {
  target: React.RefObject<HTMLElement | null>
}

export function ChartFullscreenButton({ target }: ChartFullscreenButtonProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  React.useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handler)
    return () => document.removeEventListener("fullscreenchange", handler)
  }, [])

  const toggle = async () => {
    if (!target.current) return
    if (isFullscreen) {
      await document.exitFullscreen()
    } else {
      await target.current.requestFullscreen()
    }
  }

  return (
    <Button
      data-slot="chart-fullscreen"
      variant="ghost"
      size="icon-xs"
      onClick={toggle}
      aria-label={isFullscreen ? "退出全屏" : "进入全屏"}
      title={isFullscreen ? "退出全屏" : "进入全屏"}
    >
      {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
    </Button>
  )
}
