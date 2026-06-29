"use client"
import * as React from "react"
import SignaturePadLib from "signature_pad"
import { cn } from "@/lib/utils"

interface SignaturePadProps {
  width?: number
  height?: number
  onChange?: (dataUrl: string) => void
  className?: string
}

interface SignaturePadRef {
  clear: () => void
}

const SignaturePad = React.forwardRef<SignaturePadRef, SignaturePadProps>(
  ({ width = 400, height = 200, onChange, className }, ref) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const padRef = React.useRef<SignaturePadLib | null>(null)

    React.useImperativeHandle(ref, () => ({
      clear() {
        padRef.current?.clear()
        onChange?.("")
      },
    }))

    React.useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ratio = Math.max(window.devicePixelRatio || 1, 1)
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext("2d")
      if (ctx) ctx.scale(ratio, ratio)

      const pad = new SignaturePadLib(canvas, {
        backgroundColor: "rgba(255,255,255,0)",
      })

      pad.addEventListener("endStroke", () => {
        onChange?.(pad.toDataURL())
      })

      padRef.current = pad

      return () => {
        pad.clear()
      }
    }, [width, height, onChange])

    return (
      <canvas
        ref={canvasRef}
        data-slot="signature-pad"
        className={cn(
          "rounded-lg border border-input bg-background touch-none",
          className,
        )}
      />
    )
  },
)

SignaturePad.displayName = "SignaturePad"

export { SignaturePad }
export type { SignaturePadProps, SignaturePadRef }
