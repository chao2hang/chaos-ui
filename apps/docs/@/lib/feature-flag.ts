"use client"
import * as React from "react"

export interface FeatureFlag {
  key: string
  enabled: boolean
  description?: string
  rolloutPercentage?: number
  metadata?: Record<string, unknown>
}

const FLAGS: Record<string, FeatureFlag> = {
  "new-dashboard": { key: "new-dashboard", enabled: true, description: "新版仪表盘" },
  "ai-assistant": { key: "ai-assistant", enabled: false, rolloutPercentage: 10 },
  "dark-mode": { key: "dark-mode", enabled: true },
}

export function isFeatureEnabled(key: string, userContext?: { userId?: string; email?: string }): boolean {
  const flag = FLAGS[key]
  if (!flag) return false
  if (!flag.enabled) return false
  if (flag.rolloutPercentage === undefined) return true
  if (flag.rolloutPercentage >= 100) return true
  if (flag.rolloutPercentage <= 0) return false
  const seed = (userContext?.userId ?? userContext?.email ?? "anon").length
  return (seed % 100) < flag.rolloutPercentage
}

export function useFeatureFlag(key: string, userContext?: { userId?: string; email?: string }): boolean {
  const enabled = React.useMemo(() => isFeatureEnabled(key, userContext), [key, userContext?.userId, userContext?.email])
  return enabled
}

export function useFeatureFlags(userContext?: { userId?: string; email?: string }): Record<string, boolean> {
  const flags = React.useMemo(
    () =>
      Object.keys(FLAGS).reduce((acc, k) => {
        acc[k] = isFeatureEnabled(k, userContext)
        return acc
      }, {} as Record<string, boolean>),
    [userContext?.userId, userContext?.email]
  )
  return flags
}
