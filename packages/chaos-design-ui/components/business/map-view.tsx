"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MapMarker {
  id: string
  /** [longitude, latitude] — 高德地图坐标系,经度在前 */
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
  /** 高德地图 JS API key。生产环境必须通过 props 传入,不要硬编码。 */
  apiKey?: string
  /** 高德 JS API 版本,默认 "2.0" */
  apiVersion?: string
  className?: string
}

/**
 * 高德地图最小类型声明。
 * 仅覆盖 MapView 用到的 API,避免依赖 @types/amap。
 * 若需要更完整类型,可安装 `@amap/amap-jsapi-loader` 并替换本声明。
 */
interface AMapStatic {
  Map: new (
    el: HTMLElement,
    opts: { zoom: number; center: [number, number]; viewMode: "2D" | "3D" },
  ) => AMapInstance
  Marker: new (opts: { position: [number, number]; title?: string }) => AMapMarker
  InfoWindow: new (opts: {
    content: string
    offset: { x: number; y: number }
  }) => AMapInfoWindow
  Pixel: new (x: number, y: number) => { x: number; y: number }
}

interface AMapInstance {
  setCenter(center: [number, number]): void
  setZoom(zoom: number): void
  add(marker: AMapMarker): void
  remove(marker: AMapMarker): void
  destroy(): void
}

interface AMapMarker {
  getPosition(): [number, number]
  on(event: "click", handler: () => void): void
}

interface AMapInfoWindow {
  open(map: AMapInstance, position: [number, number]): void
}

interface AMapWindow {
  AMap?: AMapStatic
}

const amapWindow = (typeof window === "undefined" ? ({} as AMapWindow) : window) as Window &
  AMapWindow & typeof globalThis

/** 缓存 script 加载 Promise,避免并发调用重复注入 */
let amapScriptPromise: Promise<AMapStatic> | null = null

function loadAmapScript(apiKey?: string, version = "2.0"): Promise<AMapStatic> {
  if (amapScriptPromise) return amapScriptPromise

  amapScriptPromise = new Promise<AMapStatic>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("SSR not supported"))
      amapScriptPromise = null
      return
    }

    if (amapWindow.AMap) {
      resolve(amapWindow.AMap)
      return
    }

    const key = apiKey ?? ""
    if (!key) {
      reject(
        new Error("MapView 缺少 apiKey:请通过 props.apiKey 传入高德地图 JS API key"),
      )
      amapScriptPromise = null
      return
    }

    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = `https://webapi.amap.com/maps?v=${encodeURIComponent(version)}&key=${encodeURIComponent(key)}`
    script.onerror = () => {
      reject(new Error("Failed to load Amap script"))
      amapScriptPromise = null
    }
    script.onload = () => {
      if (amapWindow.AMap) {
        resolve(amapWindow.AMap)
      } else {
        reject(new Error("Amap script loaded but window.AMap missing"))
        amapScriptPromise = null
      }
    }
    document.head.appendChild(script)
  })

  return amapScriptPromise
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (ch: string) => {
    switch (ch.charCodeAt(0)) {
      case 38: return "&amp;"
      case 60: return "&lt;"
      case 62: return "&gt;"
      case 34: return "&quot;"
      case 39: return "&#39;"
      default: return ch
    }
  })
}

const DEFAULT_CENTER: [number, number] = [116.4074, 39.9042]

export function MapView({
  center = DEFAULT_CENTER,
  zoom = 11,
  markers = [],
  height = 400,
  apiKey,
  apiVersion = "2.0",
  className,
  ...props
}: MapViewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const mapRef = React.useRef<AMapInstance | null>(null)
  const markersRef = React.useRef<AMapMarker[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [isReady, setIsReady] = React.useState(false)

  // 初次挂载:加载脚本并初始化地图
  React.useEffect(() => {
    let disposed = false

    async function initMap() {
      try {
        const AMap = await loadAmapScript(apiKey, apiVersion)
        if (disposed || !containerRef.current) return

        const map = new AMap.Map(containerRef.current, {
          zoom,
          center,
          viewMode: "2D",
        })
        mapRef.current = map
        if (!disposed) setIsReady(true)
      } catch (e) {
        if (!disposed) setError(e instanceof Error ? e.message : "地图初始化失败")
      }
    }

    initMap()

    return () => {
      disposed = true
      if (mapRef.current) {
        mapRef.current.destroy()
        mapRef.current = null
      }
      markersRef.current = []
      setIsReady(false)
    }
    // 仅在 mount 时初始化;center/zoom/markers 变化走单独 effect 增量更新
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, apiVersion])

  // center / zoom 变化时调用对应 setter,不销毁地图
  React.useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.setCenter(center)
  }, [center])

  React.useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.setZoom(zoom)
  }, [zoom])

  // markers 变化时增量更新:先 remove 旧的,再 add 新的
  React.useEffect(() => {
    const AMap = amapWindow.AMap
    const map = mapRef.current
    if (!map || !AMap) return

    // 清除上一轮 markers
    markersRef.current.forEach((m) => map.remove(m))
    markersRef.current = []

    const added = markers.map((m) => {
      const marker = new AMap.Marker({
        position: m.position,
        title: m.title,
      })

      if (m.title || m.description) {
        const segments: string[] = []
        if (m.title) {
          segments.push(
            `<div style="font-weight:bold;margin-bottom:4px;">${escapeHtml(m.title)}</div>`,
          )
        }
        if (m.description) {
          segments.push(`<div>${escapeHtml(m.description)}</div>`)
        }

        const infoWindow = new AMap.InfoWindow({
          content: segments.join(""),
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
      return marker
    })

    markersRef.current = added
  }, [markers])

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
