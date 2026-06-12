"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const STYLE_ID = "chaos-confetti-keyframes"

function ensureKeyframes() {
  if (typeof document === "undefined") return
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = `
    @keyframes confetti-fall {
      0% { transform: translateY(-10vh) rotate(0); opacity: 1; }
      100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
    }
  `
  document.head.appendChild(style)
}

interface ConfettiProps {
  active: boolean
  count?: number
  duration?: number
  className?: string
}

const COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#a855f7"]

export function Confetti({ active, count = 60, duration = 3000, className }: ConfettiProps) {
  React.useEffect(() => {
    ensureKeyframes()
  }, [])
  if (!active) return null
  return (
    <div
      data-slot="confetti"
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-[200] overflow-hidden", className)}
    >
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 0.3
        const size = 6 + Math.random() * 6
        const color = COLORS[i % COLORS.length]
        const rotate = Math.random() * 360
        return (
          <span
            key={i}
            className="absolute top-0 block animate-[confetti-fall_var(--duration)_var(--delay)_forwards]"
            style={
              {
                left: `${left}%`,
                width: size,
                height: size * 0.4,
                background: color,
                transform: `rotate(${rotate}deg)`,
                "--duration": `${duration}ms`,
                "--delay": `${delay}s`,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
