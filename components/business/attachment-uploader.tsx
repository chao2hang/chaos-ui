"use client";

import { cn } from "@/lib/utils";

/**
 * @component AttachmentUploader
 * @category business/attachment
 * @since 0.7.0
 * @description 附件上传器
 * @keywords attachment, uploader
 * @example
 * <AttachmentUploader />
 */

interface AttachmentUploaderProps {
  accept?: string;
  maxSize?: number;
  onUpload?: (files: File[]) => void;
  className?: string;
}

function AttachmentUploader({ className }: AttachmentUploaderProps) {
  return (
    <div data-slot="attachment-uploader" className={cn("", className)}>
      {null}
    </div>
  );
}

export { AttachmentUploader };
export type { AttachmentUploaderProps };
