"use client"
import * as React from "react"

type KeyCombo = string

type HotkeyHandler = (event: KeyboardEvent) => void

interface HotkeyOptions {
  enabled?: boolean
  preventDefault?: boolean
  allowInInputs?: boolean
}

function normalize(combo: string): string {
  return combo
    .toLowerCase()
    .split("+")
    .map((k) => k.trim())
    .sort()
    .join("+")
}

function isInputElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  )
}

function matchesEvent(event: KeyboardEvent, combo: string): boolean {
  const parts = combo.split("+").map((p) => p.trim())
  const key = event.key.toLowerCase()
  const needs = {
    mod: parts.includes("mod") || parts.includes("cmd") || parts.includes("ctrl"),
    shift: parts.includes("shift"),
    alt: parts.includes("alt") || parts.includes("option"),
    key: parts.filter(
      (p) =>
        !["mod", "cmd", "ctrl", "shift", "alt", "option", "meta"].includes(p)
    )[0],
  }
  const modPressed = event.metaKey || event.ctrlKey
  if (needs.mod !== modPressed) return false
  if (needs.shift !== event.shiftKey) return false
  if (needs.alt !== event.altKey) return false
  if (!needs.key) return false
  return key === needs.key.toLowerCase()
}

export function useHotkeys(
  keys: Record<KeyCombo, HotkeyHandler>,
  options: HotkeyOptions = {}
) {
  const { enabled = true, preventDefault = true, allowInInputs = false } = options
  const handlersRef = React.useRef(keys)
  React.useEffect(() => {
    handlersRef.current = keys
  }, [keys])

  React.useEffect(() => {
    if (!enabled) return
    const listener = (event: KeyboardEvent) => {
      if (!allowInInputs && isInputElement(event.target)) return
      for (const [combo, handler] of Object.entries(handlersRef.current)) {
        if (matchesEvent(event, normalize(combo))) {
          if (preventDefault) event.preventDefault()
          handler(event)
          return
        }
      }
    }
    document.addEventListener("keydown", listener)
    return () => document.removeEventListener("keydown", listener)
  }, [enabled, preventDefault, allowInInputs])
}
