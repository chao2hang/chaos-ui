"use client"
import * as React from "react"

export function useStep(max: number, initial = 0) {
  const [step, setStep] = React.useState(initial)
  const next = React.useCallback(
    () => setStep((s) => Math.min(s + 1, max - 1)),
    [max]
  )
  const prev = React.useCallback(
    () => setStep((s) => Math.max(s - 1, 0)),
    []
  )
  const goTo = React.useCallback(
    (i: number) => setStep(Math.min(Math.max(0, i), max - 1)),
    [max]
  )
  const reset = React.useCallback(() => setStep(initial), [initial])
  return { step, next, prev, goTo, reset, isFirst: step === 0, isLast: step === max - 1 }
}
