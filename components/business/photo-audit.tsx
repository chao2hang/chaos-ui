"use client";

import { cn } from "@/lib/utils";

/**
 * @component PhotoAudit
 * @category business/bill
 * @since 0.7.0
 * @description 照片审核组件
 * @keywords photo, audit
 * @example
 * <PhotoAudit />
 */

interface PhotoAuditProps {
  photos: Array<{ src: string; alt?: string }>;
  onApprove?: (idx: number) => void;
  onReject?: (idx: number, reason: string) => void;
  className?: string;
}

function PhotoAudit({ className }: PhotoAuditProps) {
  return (
    <div data-slot="photo-audit" className={cn("", className)}>
      {null}
    </div>
  );
}

export { PhotoAudit };
export type { PhotoAuditProps };
