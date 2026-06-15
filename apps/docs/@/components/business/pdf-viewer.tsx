"use client"
import * as React from "react"
import { ZoomInIcon, ZoomOutIcon, ChevronLeftIcon, ChevronRightIcon, DownloadIcon, MaximizeIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PDFViewerProps extends React.ComponentProps<"div"> {
  src: string
  title?: string
  className?: string
}

export function PDFViewer({ src, title, className, ...props }: PDFViewerProps) {
  const [page, setPage] = React.useState(1)
  const [scale, setScale] = React.useState(100)
  const [totalPages] = React.useState(() => Math.floor(Math.random() * 8) + 1)
  const containerRef = React.useRef<HTMLDivElement>(null)
  return (
    <div data-slot="pdf-viewer" className={cn("flex h-full flex-col rounded-md border", className)} {...props}>
      <div className="flex items-center justify-between border-b bg-muted/30 px-3 py-1.5">
        <div className="truncate text-sm font-medium">{title ?? "文档"}</div>
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon-xs" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} aria-label="上一页">
            <ChevronLeftIcon />
          </Button>
          <span className="px-2 text-xs tabular-nums">
            {page} / {totalPages}
          </span>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            aria-label="下一页"
          >
            <ChevronRightIcon />
          </Button>
          <span className="mx-1 h-4 w-px bg-muted-foreground/20" />
          <Button variant="ghost" size="icon-xs" onClick={() => setScale((s) => Math.max(50, s - 10))} aria-label="缩小">
            <ZoomOutIcon />
          </Button>
          <span className="px-1 text-xs tabular-nums">{scale}%</span>
          <Button variant="ghost" size="icon-xs" onClick={() => setScale((s) => Math.min(200, s + 10))} aria-label="放大">
            <ZoomInIcon />
          </Button>
          <span className="mx-1 h-4 w-px bg-muted-foreground/20" />
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => containerRef.current?.requestFullscreen()}
            aria-label="全屏"
          >
            <MaximizeIcon />
          </Button>
          <Button variant="ghost" size="icon-xs" onClick={() => window.open(src, "_blank")} aria-label="在新窗口打开">
            <DownloadIcon />
          </Button>
        </div>
      </div>
      <div ref={containerRef} className="flex-1 overflow-auto bg-muted/30 p-4">
        <div
          className="mx-auto aspect-[1/1.414] w-full max-w-3xl rounded bg-white shadow-md"
          style={{ transform: `scale(${scale / 100})`, transformOrigin: "top center" }}
        >
          <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
            <div>
              <div className="text-sm font-medium text-foreground">{title}</div>
              <div className="mt-2 text-xs">第 {page} 页 · PDF 预览（demo）</div>
              <div className="mt-4 text-[0.65rem]">在真实环境中嵌入 react-pdf 或 pdf.js</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
