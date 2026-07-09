"use client"
import * as React from "react"
import { cn } from "@chaos_team/chaos-ui/lib"

interface ConfettiProps {
  trigger: number
  count?: number
  duration?: number
  className?: string
  onComplete?: () => void
}

const COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#a855f7"]

interface ParticleSpec {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  color: string
  shape: "rect" | "circle"
  opacity: number
  gravity: number
  drag: number
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function createParticle(w: number, h: number): ParticleSpec {
  const r = Math.random()
  const side = r < 0.7 ? 0 : r < 0.85 ? 1 : 2
  let x = 0, y = 0, vx = 0, vy = 0

  switch (side) {
    case 0: // top (70%)
      x = rand(-0.2, 1.2) * w
      y = -30
      vx = rand(-4, 4)
      vy = rand(2, 7)
      break
    case 1: // left (15%)
      x = -30
      y = rand(-0.1, 0.3) * h
      vx = rand(3, 7)
      vy = rand(-2, 4)
      break
    case 2: // right (15%)
      x = w + 30
      y = rand(-0.1, 0.3) * h
      vx = rand(-7, -3)
      vy = rand(-2, 4)
      break
  }

  return {
    x,
    y,
    vx,
    vy,
    rotation: rand(0, 360),
    rotationSpeed: rand(-8, 8),
    size: rand(6, 14),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: Math.random() > 0.5 ? "rect" : "circle",
    opacity: 1,
    gravity: rand(0.05, 0.15),
    drag: rand(0.99, 0.995),
  }
}

export function Confetti({ trigger, count = 120, duration = 3000, className, onComplete }: ConfettiProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const rafRef = React.useRef<number>(0)
  const startTimeRef = React.useRef<number>(0)

  React.useEffect(() => {
    if (trigger <= 0) return

    const container = containerRef.current
    if (!container) return

    const w = window.innerWidth
    const h = window.innerHeight
    const particles = Array.from({ length: count }, () => createParticle(w, h))
    const els: HTMLSpanElement[] = []

    for (const p of particles) {
      const el = document.createElement("span")
      el.style.position = "absolute"
      el.style.left = "0"
      el.style.top = "0"
      el.style.width = `${p.size}px`
      el.style.height = p.shape === "circle" ? `${p.size}px` : `${p.size * 0.6}px`
      el.style.backgroundColor = p.color
      el.style.borderRadius = p.shape === "circle" ? "50%" : "2px"
      el.style.willChange = "transform, opacity"
      el.style.pointerEvents = "none"
      container.appendChild(el)
      els.push(el)
    }

    startTimeRef.current = performance.now()

    function tick(now: number) {
      const elapsed = now - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const el = els[i]

        p.vx *= p.drag
        p.vy *= p.drag
        p.vy += p.gravity
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed
        p.opacity = 1 - Math.pow(progress, 2)

        el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`
        el.style.opacity = String(Math.max(0, p.opacity))
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        for (const el of els) el.remove()
        onComplete?.()
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      for (const el of els) el.remove()
    }
  }, [trigger, count, duration, onComplete])

  if (trigger <= 0) return null

  return (
    <div
      ref={containerRef}
      key={trigger}
      data-slot="confetti"
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-[200] overflow-hidden", className)}
    />
  )
}
