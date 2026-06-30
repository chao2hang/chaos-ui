"use client";

import { cn } from "@/lib/utils";

/**
 * @component CompanyBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 公司选择器
 * @keywords company, browse
 * @example
 * <CompanyBrowse />
 */

interface CompanyBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: unknown) => void;
  className?: string;
}

function CompanyBrowse({ className }: CompanyBrowseProps) {
  return (
    <div data-slot="company-browse" className={cn("", className)}>
      {null}
    </div>
  );
}

export { CompanyBrowse };
export type { CompanyBrowseProps };
