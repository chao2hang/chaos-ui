"use client"

import * as React from "react"

interface UseClipboardReturn {
  /** Copies text to clipboard */
  copy: (text: string) => Promise<boolean>
  /** Whether a copy operation is in progress */
  copying: boolean
  /** Whether the last copy was successful */
  copied: boolean
  /** Recently copied text */
  value: string | null
  /** Reset copied state */
  reset: () => void
}

/**
 * Copy text to clipboard with state tracking.
 * Unifies the existing use-copy-to-clipboard under a standard API.
 *
 * @param timeout - How long "copied" stays true (ms, default 2000)
 * @since 0.2.0
 */
export function useClipboard(timeout = 2000): UseClipboardReturn {
  const [copying, setCopying] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [value, setValue] = React.useState<string | null>(null)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  const copy = React.useCallback(
    async (text: string): Promise<boolean> => {
      setCopying(true)
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setValue(text)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopied(false), timeout)
        return true
      } catch {
        // Fallback for older browsers
        try {
          const textarea = document.createElement("textarea")
          textarea.value = text
          textarea.style.position = "fixed"
          textarea.style.opacity = "0"
          document.body.appendChild(textarea)
          textarea.select()
          const success = document.execCommand("copy")
          document.body.removeChild(textarea)
          if (success) {
            setCopied(true)
            setValue(text)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => setCopied(false), timeout)
          }
          return success
        } catch {
          return false
        }
      } finally {
        setCopying(false)
      }
    },
    [timeout],
  )

  const reset = React.useCallback(() => {
    setCopied(false)
    setValue(null)
    setCopying(false)
  }, [])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return { copy, copying, copied, value, reset }
}
