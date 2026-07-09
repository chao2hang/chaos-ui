"use client";
import { cn } from "@/lib/utils";
import { FileCard } from "@/components/business/file-card";
/**
 * @component AttachmentList
 * @category business/attachment
 * @since 0.7.0
 * @description 附件列表
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
function AttachmentList({
  attachments = [],
  onRemove,
  className,
}: AttachmentListProps) {
  if (attachments.length === 0)
    return (
      <div
        data-slot="attachment-list"
        className={cn("text-muted-foreground text-sm", className)}
      >
        暂无附件
      </div>
    );
  return (
    <div
      data-slot="attachment-list"
      className={cn("flex flex-col gap-2", className)}
    >
      {attachments.map((a) => (
        <FileCard
          key={a.id}
          name={a.name}
          size={a.size}
          type={a.type}
          {...(a.url !== undefined ? { url: a.url } : {})}
          {...(onRemove ? { onRemove: () => onRemove(a.id) } : {})}
        />
      ))}
    </div>
  );
}
export { AttachmentList };
export type { AttachmentListProps };
