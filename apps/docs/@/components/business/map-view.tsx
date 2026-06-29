"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MapMarker {
  id: string
  position: [number, number]
  title?: string
  description?: string
  onClick?: () => void
}

interface MapViewProps extends React.ComponentProps<"div"> {
  center?: [number, number]
  zoom?: number
  markers?: MapMarker[]
  height?: number | string
  className?: string
}

// 加载高德地图 JS API
function loadAmapScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("SSR not supported"))
      return
    }
    // @ts-ignore
    if (window.AMap) {
      resolve()
      return
    }
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "https://webapi.amap.com/maps?v=2.0&key=YOUR_AMAP_KEY"
    script.onerror = () => reject(new Error("Failed to load Amap"))
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}

export function MapView({
  center = [39.9042, 116.4074],
  zoom = 11,
  markers = [],
  height = 400,
  className,
  ...props
}: MapViewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const mapRef = React.useRef<any>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    let isMounted = true

    async function initMap() {
      try {
        await loadAmapScript()
        if (!isMounted || !containerRef.current) return

        // @ts-ignore
        const AMap = window.AMap
        if (!AMap) {
          setError("高德地图加载失败")
          return
        }

        const map = new AMap.Map(containerRef.current, {
          zoom,
          center,
          viewMode: "2D",
        })

        mapRef.current = map

        // 添加标记
        markers.forEach((m) => {
          const marker = new AMap.Marker({
            position: m.position,
            title: m.title,
          })

          if (m.title || m.description) {
            const info = []
            if (m.title) info.push(`<div style="font-weight:bold;margin-bottom:4px;">${m.title}</div>`)
            if (m.description) info.push(`<div>${m.description}</div>`)

            const infoWindow = new AMap.InfoWindow({
              content: info.join(""),
              offset: new AMap.Pixel(0, -30),
            })

            marker.on("click", () => {
              infoWindow.open(map, marker.getPosition())
              m.onClick?.()
            })
          } else if (m.onClick) {
            marker.on("click", m.onClick)
          }

          map.add(marker)
        })

        setIsReady(true)
      } catch (e) {
        if (isMounted) {
          setError("地图初始化失败")
        }
      }
    }

    initMap()

    return () => {
      isMounted = false
      if (mapRef.current) {
        mapRef.current.destroy()
        mapRef.current = null
      }
    }
  }, [center, zoom, markers])

  if (error) {
    return (
      <div
        data-slot="map-view"
        className={cn(
          "flex items-center justify-center overflow-hidden rounded-md border bg-muted",
          className,
        )}
        style={{ height }}
        {...props}
      >
        <div className="text-sm text-muted-foreground">{error}</div>
      </div>
    )
  }

  return (
    <div
      data-slot="map-view"
      className={cn("relative overflow-hidden rounded-md border", className)}
      style={{ height }}
      {...props}
    >
      <div ref={containerRef} className="h-full w-full" />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-sm text-muted-foreground">地图加载中...</div>
        </div>
      )}
    </div>
  )
}
