"use client"
import * as React from "react"

export interface ExperimentVariant {
  key: string
  weight: number
  payload?: unknown
}

export function pickVariant<T extends ExperimentVariant>(variants: T[], seed?: string): T {
  if (variants.length === 0) throw new Error("variants is empty")
  const total = variants.reduce((s, v) => s + v.weight, 0)
  if (total <= 0) return variants[0]
  const hash = seed ? Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0) : Math.random() * total
  const target = hash % total
  let acc = 0
  for (const v of variants) {
    acc += v.weight
    if (target < acc) return v
  }
  return variants[variants.length - 1]
}

export function useExperiment<T extends ExperimentVariant>(key: string, variants: T[], userId?: string): T {
  const variant = React.useMemo(() => pickVariant(variants, userId ?? key), [key, userId, variants])
  return variant
}
