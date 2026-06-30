"use client";

import { cn } from "@/lib/utils";

/**
 * @component FileCard
 * @category business/attachment
 * @since 0.7.0
 * @description 文件卡片
 * @keywords file, card
 * @example
 * <FileCard />
 */

interface FileCardProps {
  name: string;
  size: number;
  type: string;
  url?: string;
  onRemove?: () => void;
  className?: string;
}

function FileCard({ className }: FileCardProps) {
  return (
    <div data-slot="file-card" className={cn("", className)}>
      {null}
    </div>
  );
}

export { FileCard };
export type { FileCardProps };
