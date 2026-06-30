"use client";

import { cn } from "@/lib/utils";

/**
 * @component AttachmentList
 * @category business/attachment
 * @since 0.7.0
 * @description 附件列表
 * @keywords attachment, list
 * @example
 * <AttachmentList />
 */

interface AttachmentListProps {
  attachments: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url?: string;
  }>;
  onRemove?: (id: string) => void;
  className?: string;
}

function AttachmentList({ className }: AttachmentListProps) {
  return (
    <div data-slot="attachment-list" className={cn("", className)}>
      {null}
    </div>
  );
}

export { AttachmentList };
export type { AttachmentListProps };
