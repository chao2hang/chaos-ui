import * as React from "react"
import { cn } from "@/lib/utils"

export function PrintLayout({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  React.useEffect(() => {
    if (typeof document === "undefined") return
    const style = document.createElement("style")
    style.setAttribute("data-print-layout", "")
    style.textContent = `
      @media print {
        body * { visibility: hidden; }
        [data-print-root], [data-print-root] * { visibility: visible; }
        [data-print-root] { position: absolute; left: 0; top: 0; width: 100%; padding: 0; }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div
      data-print-root
      data-slot="print-layout"
      className={cn(
        "mx-auto max-w-3xl bg-white p-8 text-black print:p-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
