"use client"

import * as React from "react"

/**
 * Tracks page visibility changes (tab focus/blur, minimize).
 * @param onChange - Optional callback when visibility changes
 * @returns Whether the page is currently visible
 * @since 0.2.0
 */
export function useVisibilityChange(onChange?: (visible: boolean) => void): boolean {
  const [visible, setVisible] = React.useState<boolean>(
    typeof document !== "undefined" ? !document.hidden : true,
  )

  React.useEffect(() => {
    const handler = () => {
      const isVisible = !document.hidden
      setVisible(isVisible)
      onChange?.(isVisible)
    }

    document.addEventListener("visibilitychange", handler)
    return () => document.removeEventListener("visibilitychange", handler)
  }, [onChange])

  return visible
}
