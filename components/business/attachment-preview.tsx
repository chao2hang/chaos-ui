"use client";

import { cn } from "@/lib/utils";

/**
 * @component AttachmentPreview
 * @category business/attachment
 * @since 0.7.0
 * @description 附件预览
 * @keywords attachment, preview
 * @example
 * <AttachmentPreview />
 */

interface AttachmentPreviewProps {
  url: string;
  type: string;
  name?: string;
  className?: string;
}

function AttachmentPreview({ className }: AttachmentPreviewProps) {
  return (
    <div data-slot="attachment-preview" className={cn("", className)}>
      {null}
    </div>
  );
}

export { AttachmentPreview };
export type { AttachmentPreviewProps };
