"use client"
import * as React from "react"

export function useToggle(
  initial = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = React.useState(initial)
  const toggle = React.useCallback(() => setValue((v) => !v), [])
  return [value, toggle, setValue]
}
