"use client";

import * as React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  ZoomInIcon,
  ZoomOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  MaximizeIcon,
  FileTextIcon,
  AlertTriangleIcon,
} from "@chaos_team/chaos-ui/ui-icons";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";

// Configure pdf.js worker from CDN — consumers can override
// `pdfjs.GlobalWorkerOptions.workerSrc` to use a local copy.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * @component PDFViewer
 * @category business/display
 * @since 1.0.0
 * @description PDF 查看器,基于 react-pdf (pdf.js) 实现真实 PDF 渲染,支持翻页、缩放、全屏、下载。
 * @keywords pdf, viewer, react-pdf, document
 * @example
 * <PDFViewer src="/document.pdf" title="合同.pdf" initialScale={100} />
 */

interface PDFViewerProps extends Omit<React.ComponentProps<"div">, "onError"> {
  /** PDF 文件 URL 或 base64 data URI */
  src: string;
  /** 文档标题(显示在工具栏) */
  title?: string;
  /** 文档加载成功回调 */
  onLoadSuccess?: (pdf: { numPages: number }) => void;
  /** 文档加载失败回调 */
  onError?: (error: Error) => void;
  /** 初始缩放比例(百分比,50-200) */
  initialScale?: number;
  className?: string;
}

function PDFViewer({
  src,
  title,
  onLoadSuccess,
  onError,
  initialScale = 100,
  className,
  ...props
}: PDFViewerProps) {
  const [page, setPage] = React.useState(1);
  const [scale, setScale] = React.useState(initialScale);
  const [numPages, setNumPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleLoadSuccess = React.useCallback(
    (pdf: { numPages: number }) => {
      setNumPages(pdf.numPages);
      setLoading(false);
      setError(null);
      onLoadSuccess?.(pdf);
    },
    [onLoadSuccess],
  );

  const handleLoadError = React.useCallback(
    (err: Error) => {
      setLoading(false);
      setError(err.message || "PDF 加载失败");
      onError?.(err);
    },
    [onError],
  );

  // Reset state when src changes
  React.useEffect(() => {
    setPage(1);
    setScale(initialScale);
    setLoading(true);
    setError(null);
    setNumPages(0);
  }, [src, initialScale]);

  return (
    <div
      data-slot="pdf-viewer"
      className={cn("flex h-full flex-col rounded-md border", className)}
      {...props}
    >
      {/* Toolbar */}
      <div className="bg-muted/30 flex items-center justify-between border-b px-3 py-1.5">
        <div className="flex items-center gap-2 truncate text-sm font-medium">
          <FileTextIcon className="text-muted-foreground size-4 shrink-0" />
          <span className="truncate">{title ?? "文档"}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
            aria-label="上一页"
          >
            <ChevronLeftIcon />
          </Button>
          <span className="px-2 text-xs tabular-nums">
            {numPages > 0 ? `${page} / ${numPages}` : "—"}
          </span>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setPage((p) => Math.min(numPages, p + 1))}
            disabled={page >= numPages || loading}
            aria-label="下一页"
          >
            <ChevronRightIcon />
          </Button>
          <span className="bg-muted-foreground/20 mx-1 h-4 w-px" />
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setScale((s) => Math.max(50, s - 10))}
            disabled={loading || !!error}
            aria-label="缩小"
          >
            <ZoomOutIcon />
          </Button>
          <span className="px-1 text-xs tabular-nums">{scale}%</span>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setScale((s) => Math.min(200, s + 10))}
            disabled={loading || !!error}
            aria-label="放大"
          >
            <ZoomInIcon />
          </Button>
          <span className="bg-muted-foreground/20 mx-1 h-4 w-px" />
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => containerRef.current?.requestFullscreen()}
            aria-label="全屏"
          >
            <MaximizeIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => window.open(src, "_blank")}
            aria-label="在新窗口打开"
          >
            <DownloadIcon />
          </Button>
        </div>
      </div>

      {/* Document area */}
      <div
        ref={containerRef}
        className="bg-muted/30 flex-1 overflow-auto p-4"
        role="document"
        aria-label={title ?? "PDF 文档"}
      >
        {error ? (
          <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 text-center">
            <AlertTriangleIcon className="text-destructive size-8" />
            <div className="text-foreground text-sm font-medium">
              PDF 加载失败
            </div>
            <div className="text-xs">{error}</div>
          </div>
        ) : (
          <Document
            file={src}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={handleLoadError}
            loading={
              <div className="flex h-full items-center justify-center">
                <div className="bg-muted mx-auto aspect-[1/1.414] w-full max-w-3xl animate-pulse rounded" />
              </div>
            }
            className="flex justify-center"
          >
            <Page
              pageNumber={page}
              scale={scale / 100}
              className="shadow-md"
              loading={
                <div className="bg-muted mx-auto aspect-[1/1.414] w-full max-w-3xl animate-pulse rounded" />
              }
            />
          </Document>
        )}
      </div>
    </div>
  );
}

PDFViewer.displayName = "PDFViewer";

export { PDFViewer };
export type { PDFViewerProps };
