"use client"
import * as React from "react"
import { isFeatureEnabled, useFeatureFlag, useFeatureFlags } from "@/lib/feature-flag"

export { isFeatureEnabled, useFeatureFlag, useFeatureFlags }

export function FeatureGate({
  flag,
  fallback = null,
  userContext,
  children,
}: {
  flag: string
  fallback?: React.ReactNode
  userContext?: { userId?: string; email?: string }
  children: React.ReactNode
}) {
  const enabled = useFeatureFlag(flag, userContext)
  if (!enabled) return <>{fallback}</>
  return <>{children}</>
}
