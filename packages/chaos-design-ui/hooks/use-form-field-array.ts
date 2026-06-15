"use client"
import * as React from "react"

export function useFormFieldArray<T>(opts: {
  defaultValue?: T[]
  min?: number
  max?: number
} = {}) {
  const { defaultValue, min = 0, max = Infinity } = opts
  const [items, setItems] = React.useState<T[]>(defaultValue ?? [])
  const append = React.useCallback(
    (item: T) => {
      setItems((prev) => (prev.length >= max ? prev : [...prev, item]))
    },
    [max]
  )
  const remove = React.useCallback(
    (index: number) => {
      setItems((prev) => (prev.length <= min ? prev : prev.filter((_, i) => i !== index)))
    },
    [min]
  )
  const swap = React.useCallback((a: number, b: number) => {
    setItems((prev) => {
      if (a < 0 || a >= prev.length || b < 0 || b >= prev.length) return prev
      if (a === b) return prev
      const next = prev.slice()
      ;[next[a], next[b]] = [next[b], next[a]]
      return next
    })
  }, [])
  const update = React.useCallback((index: number, value: T) => {
    setItems((prev) => prev.map((item, i) => (i === index ? value : item)))
  }, [])
  const move = React.useCallback((from: number, to: number) => swap(from, to), [swap])
  const reset = React.useCallback(
    (next?: T[]) => {
      setItems(next ?? defaultValue ?? [])
    },
    [defaultValue]
  )
  const canAdd = items.length < max
  const canRemove = items.length > min
  return { items, append, remove, swap, move, update, reset, canAdd, canRemove, length: items.length }
}
