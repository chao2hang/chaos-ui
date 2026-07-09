"use client";
import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { UploadIcon } from "@chaos_team/chaos-ui/ui";
/**
 * @component AttachmentUploader
 * @category business/attachment
 * @since 0.7.0
 * @description 附件上传器
 */
interface AttachmentUploaderProps {
accept?: string;
  maxSize?: number;
  onUpload?: (files: File[]) => void;
  className?: string;
}
function AttachmentUploader({ accept, maxSize, onUpload, className }: AttachmentUploaderProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const [over, setOver] = React.useState(false);
  const handle = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    const valid = maxSize ? arr.filter((f) => f.size <= maxSize) : arr;
    onUpload?.(valid);
  };
  return (
    <div
      data-slot="attachment-uploader"
      className={cn("flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-sm text-muted-foreground transition-colors", over && "border-primary bg-primary/5", className)}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files); }}
      role="button"
      tabIndex={0}
      onClick={() => ref.current?.click()}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") ref.current?.click(); }}
    >
      <UploadIcon className="size-6" />
      <span>点击或拖拽文件到此处上传{maxSize ? `（最大 ${(maxSize / 1024 / 1024).toFixed(0)} MB）` : ""}</span>
      <input ref={ref} type="file" accept={accept} multiple className="hidden" onChange={(e) => handle(e.target.files)} />
    </div>
  );
}
export { AttachmentUploader };
export type { AttachmentUploaderProps };
