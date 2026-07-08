"use client";

import * as React from "react";
import {
  DownloadIcon,
  Maximize2Icon,
  Minimize2Icon,
  ExternalLinkIcon,
  AlertTriangleIcon,
  Loader2Icon,
} from "lucide-react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DocType = "word" | "excel" | "ppt" | "unknown";

interface OfficeDocPreviewProps {
  /** Document URL (publicly accessible) / 文档公开访问 URL */
  src: string;
  /** Document file name (for type detection) / 文件名（用于类型识别） */
  fileName?: string;
  /** Explicit document type override / 手动指定文档类型 */
  docType?: DocType;
  /** Preview height / 预览高度 */
  height?: number | string;
  /** Whether to show toolbar / 是否显示工具栏 */
  showToolbar?: boolean;
  /** Whether to allow fullscreen / 是否允许全屏 */
  allowFullscreen?: boolean;
  /** Whether to show download button / 是否显示下载按钮 */
  allowDownload?: boolean;
  /** Preview engine / 预览引擎 */
  engine?: "microsoft" | "google";
  /** Loading placeholder / 加载占位 */
  loadingText?: string;
  /** Error text / 错误提示 */
  errorText?: string;
  /** Called when preview loads / 预览加载完成 */
  onLoad?: () => void;
  /** Called on preview error / 预览错误 */
  onError?: (error: string) => void;
  /** Additional class / 额外类名 */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const docLabels: Record<DocType, string> = {
  word: "Word 文档",
  excel: "Excel 表格",
  ppt: "PowerPoint 演示",
  unknown: "文档",
};

function detectDocType(fileName?: string, explicitType?: DocType): DocType {
  if (explicitType && explicitType !== "unknown") return explicitType;
  if (!fileName) return "unknown";

  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "doc":
    case "docx":
    case "rtf":
      return "word";
    case "xls":
    case "xlsx":
    case "csv":
      return "excel";
    case "ppt":
    case "pptx":
      return "ppt";
    default:
      return "unknown";
  }
}

function buildMicrosoftViewerUrl(src: string): string {
  const encoded = encodeURIComponent(src);
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encoded}`;
}

function buildGoogleViewerUrl(src: string): string {
  const encoded = encodeURIComponent(src);
  return `https://docs.google.com/gview?url=${encoded}&embedded=true`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function OfficeDocPreview({
  src,
  fileName,
  docType: explicitType,
  height = 600,
  showToolbar = true,
  allowFullscreen = true,
  allowDownload = true,
  engine = "microsoft",
  loadingText = "正在加载预览...",
  errorText = "文档加载失败，请检查链接是否有效",
  onLoad,
  onError,
  className,
}: OfficeDocPreviewProps) {
  const [fullscreen, setFullscreen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [useFallback, setUseFallback] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const detectedType = detectDocType(fileName, explicitType);
  const viewerUrl =
    engine === "google"
      ? buildGoogleViewerUrl(src)
      : buildMicrosoftViewerUrl(src);

  // Handle iframe load
  const handleIframeLoad = () => {
    setLoading(false);
    onLoad?.();
  };

  // Handle iframe error
  const handleIframeError = () => {
    setLoading(false);
    setError(errorText);
    onError?.(errorText);
  };

  // Auto-detect loading timeout
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setLoading(false);
        // Don't set error — the viewer might still be loading
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [loading]);

  // Keyboard shortcut for fullscreen
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullscreen) {
        setFullscreen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [fullscreen]);

  const content = (
    <div
      data-slot="office-doc-preview"
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg border bg-background",
        fullscreen && "fixed inset-0 z-50 rounded-none",
        className,
      )}
      style={fullscreen ? {} : { height }}
    >
      {/* Toolbar */}
      {showToolbar && (
        <div className="flex shrink-0 items-center gap-1.5 border-b bg-muted/30 px-3 py-1.5">
          <span className="text-sm font-medium">
            {docLabels[detectedType]}
          </span>
          {fileName && (
            <span className="truncate text-xs text-muted-foreground">
              {fileName}
            </span>
          )}
          <div className="ml-auto flex items-center gap-1">
            {allowFullscreen && (
              <button
                type="button"
                onClick={() => setFullscreen((f) => !f)}
                className={cn(
                  "rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                title={fullscreen ? "退出全屏" : "全屏"}
              >
                {fullscreen ? (
                  <Minimize2Icon className="size-4" />
                ) : (
                  <Maximize2Icon className="size-4" />
                )}
              </button>
            )}
            {allowDownload && (
              <a
                href={src}
                download={fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                title="下载"
              >
                <DownloadIcon className="size-4" />
              </a>
            )}
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              title="新窗口打开"
            >
              <ExternalLinkIcon className="size-4" />
            </a>
          </div>
        </div>
      )}

      {/* Content area */}
      <div className="relative flex-1">
        {/* Loading state */}
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-background/80">
            <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{loadingText}</span>
          </div>
        )}

        {/* Error state */}
        {error ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
            <AlertTriangleIcon className="size-12 text-amber-500" />
            <p className="text-sm text-muted-foreground">{error}</p>
            <div className="flex gap-2">
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border border-input px-3 py-1.5 text-sm",
                  "hover:bg-muted transition-colors",
                )}
              >
                <ExternalLinkIcon className="size-3.5" />
                直接打开
              </a>
              {engine === "microsoft" && (
                <button
                  type="button"
                  onClick={() => {
                    setUseFallback(true);
                    setError(null);
                    setLoading(true);
                  }}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md border border-input px-3 py-1.5 text-sm",
                    "hover:bg-muted transition-colors",
                  )}
                >
                  切换到 Google 预览
                </button>
              )}
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={useFallback ? buildGoogleViewerUrl(src) : viewerUrl}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            className="h-full w-full border-none"
            title={fileName ?? "Office document preview"}
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        )}
      </div>
    </div>
  );

  return content;
}

export { OfficeDocPreview, detectDocType };
export type { OfficeDocPreviewProps, DocType };
