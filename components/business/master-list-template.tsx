"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component MasterListTemplate
 * @category business/bill
 * @since 0.7.0
 * @description 主数据列表模板
 * @keywords master, list, template
 * @example
 * <MasterListTemplate />
 */

interface MasterListTemplateProps {
  title?: string;
  onCreate?: () => void;
  children?: React.ReactNode;
  className?: string;
}

function MasterListTemplate({ className }: MasterListTemplateProps) {
  return (
    <div data-slot="master-list-template" className={cn("", className)}>
      {null}
    </div>
  );
}

export { MasterListTemplate };
export type { MasterListTemplateProps };
