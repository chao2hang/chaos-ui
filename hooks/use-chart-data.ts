"use client"
import * as React from "react"

export interface ChartState {
  activeSeries: Set<string>
  hiddenSeries: Set<string>
  hoveredPoint: unknown | null
  containerRef: React.RefObject<HTMLDivElement | null>
  hidden: boolean
  toggleSeries: (name: string) => void
  setHovered: (point: unknown | null) => void
  setHidden: (hidden: boolean) => void
}

export function useChartData(): ChartState {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [activeSeries] = React.useState<Set<string>>(() => new Set())
  const [hiddenSeries] = React.useState<Set<string>>(() => new Set())
  const [hoveredPoint, setHoveredPoint] = React.useState<unknown | null>(null)
  const [hidden, setHidden] = React.useState(false)

  const toggleSeries = React.useCallback((name: string) => {
    if (hiddenSeries.has(name)) hiddenSeries.delete(name)
    else hiddenSeries.add(name)
  }, [hiddenSeries])

  return {
    activeSeries,
    hiddenSeries,
    hoveredPoint,
    containerRef,
    hidden,
    toggleSeries,
    setHovered: setHoveredPoint,
    setHidden,
  }
}
