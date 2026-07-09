"use client";

import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import {
  ClipboardListIcon,
  UploadIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component PasteUpload
 * @category business/attachment
 * @since 0.7.0
 * @description 粘贴上传
 * @keywords paste, upload
 * @param onPaste 粘贴文件时的回调，传入从剪贴板解析出的文件列表
 * @param children 自定义区域内容；未提供时渲染默认的粘贴提示
 * @example
 * <PasteUpload onPaste={(files) => upload(files)} />
 */

interface PasteUploadProps {
  onPaste?: (files: File[]) => void;
  children?: React.ReactNode;
  className?: string;
}

function extractFiles(event: ClipboardEvent): File[] {
  const list = event.clipboardData?.files;
  if (list && list.length > 0) {
    return Array.from(list);
  }
  const items = event.clipboardData?.items;
  if (!items) return [];
  const files: File[] = [];
  for (const item of Array.from(items)) {
    if (item.kind === "file") {
      const file = item.getAsFile();
      if (file) files.push(file);
    }
  }
  return files;
}

function PasteUpload({ onPaste, children, className }: PasteUploadProps) {
  const [lastCount, setLastCount] = React.useState<number | null>(null);

  const handlePaste = React.useCallback(
    (event: React.ClipboardEvent<HTMLDivElement>) => {
      const native = event.nativeEvent as ClipboardEvent;
      const files = extractFiles(native);
      if (files.length === 0) return;
      event.preventDefault();
      setLastCount(files.length);
      onPaste?.(files);
    },
    [onPaste],
  );

  const handleKey = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // 允许键盘用户在聚焦区域内触发粘贴（Ctrl/Cmd+V 由浏览器派发 paste 事件）
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "v" || event.key === "V")
      ) {
        // 让浏览器继续派发原生 paste 事件，此处不阻止默认行为
        return;
      }
    },
    [],
  );

  return (
    <div
      data-slot="paste-upload"
      role="region"
      aria-label="粘贴上传区域"
      tabIndex={0}
      onPaste={handlePaste}
      onKeyDown={handleKey}
      className={cn(
        "flex min-h-32 flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/40 p-6 text-center text-sm text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      {children ?? (
        <>
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-md bg-muted text-foreground"
          >
            <ClipboardListIcon />
          </span>
          <p className="font-medium text-foreground">粘贴文件以上传</p>
          <p className="flex items-center gap-1 text-xs">
            <UploadIcon aria-hidden="true" className="size-3.5" />
            按 Ctrl/Cmd + V 粘贴图片或文件
          </p>
        </>
      )}

      {lastCount !== null && (
        <p
          role="status"
          className="mt-1 text-xs text-primary"
        >
          已捕获 {lastCount} 个文件
        </p>
      )}
    </div>
  );
}

export { PasteUpload };
export type { PasteUploadProps };
