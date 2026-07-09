"use client";

import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { formatFileSize } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  DownloadIcon,
  XIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component FileCard
 * @category business/attachment
 * @since 0.7.0
 * @description 文件卡片
 * @keywords file, card
 * @param name 文件名
 * @param size 文件大小（字节）
 * @param type 文件 MIME 类型，用于挑选展示图标
 * @param url 可选的文件下载/预览地址
 * @param onRemove 可选的移除回调，提供时渲染移除按钮
 * @example
 * <FileCard name="report.pdf" size={1024} type="application/pdf" />
 */

interface FileCardProps {
  name: string;
  size: number;
  type: string;
  url?: string;
  onRemove?: () => void;
  className?: string;
}

function pickIcon(type: string): React.ReactNode {
  if (type.startsWith("image/")) return <ImageIcon />;
  if (
    type === "application/pdf" ||
    type === "text/plain" ||
    type.startsWith("text/")
  ) {
    return <FileTextIcon />;
  }
  return <FileIcon />;
}

function FileCard({
  name,
  size,
  type,
  url,
  onRemove,
  className,
}: FileCardProps) {
  return (
    <div
      data-slot="file-card"
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-card p-3 text-sm",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
      >
        {pickIcon(type)}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate font-medium" title={name}>
          {name}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatFileSize(size)}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {url !== undefined && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`下载 ${name}`}
            render={<a href={url} download={name} />}
          >
            <DownloadIcon />
          </Button>
        )}
        {onRemove !== undefined && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`移除 ${name}`}
            onClick={onRemove}
          >
            <XIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

export { FileCard };
export type { FileCardProps };
