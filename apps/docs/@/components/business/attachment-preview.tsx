"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { FileIcon } from "@chaos_team/chaos-ui/ui";
/**
 * @component AttachmentPreview
 * @category business/attachment
 * @since 0.7.0
 * @description 附件预览
 */
interface AttachmentPreviewProps {
url: string;
  type: string;
  name?: string;
  className?: string;
}
function AttachmentPreview({ url, type, name, className }: AttachmentPreviewProps) {
  return (
    <div data-slot="attachment-preview" className={cn("flex items-center justify-center overflow-hidden rounded-lg border bg-muted/30 p-4", className)}>
      {type.startsWith("image/") ? (
        <img src={url} alt={name ?? "附件"} className="max-h-80 object-contain" />
      ) : (
        <a href={url} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <FileIcon className="size-10" />
          <span className="underline">{name ?? "打开附件"}</span>
        </a>
      )}
    </div>
  );
}
export { AttachmentPreview };
export type { AttachmentPreviewProps };
