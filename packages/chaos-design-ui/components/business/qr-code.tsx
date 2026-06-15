"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

interface QRCodeToDataURLOptions {
  width?: number
  margin?: number
  errorCorrectionLevel?: "L" | "M" | "Q" | "H"
  color?: { dark?: string; light?: string }
}

interface QRCodeProps {
  value: string
  size?: number
  level?: "L" | "M" | "Q" | "H"
  fgColor?: string
  bgColor?: string
  className?: string
}

function QRCode({
  value,
  size = 200,
  level = "M",
  fgColor = "#000000",
  bgColor = "#ffffff",
  className,
}: QRCodeProps) {
  const [dataUrl, setDataUrl] = React.useState("")

  React.useEffect(() => {
    if (!value) {
      setDataUrl("")
      return
    }
    import("qrcode")
      .then((QRCodeLib) =>
        QRCodeLib.default.toDataURL(value, {
          width: size,
          margin: 2,
          errorCorrectionLevel: level,
          color: { dark: fgColor, light: bgColor },
        }),
      )
      .then(setDataUrl)
      .catch(() => setDataUrl(""))
  }, [value, size, level, fgColor, bgColor])

  if (!value || !dataUrl) return null

  return (
    <img
      src={dataUrl}
      alt={`QR code for ${value}`}
      width={size}
      height={size}
      data-slot="qr-code"
      className={cn("rounded-lg", className)}
    />
  )
}

QRCode.displayName = "QRCode"

export { QRCode }
export type { QRCodeProps }
