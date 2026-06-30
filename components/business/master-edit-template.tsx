"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component MasterEditTemplate
 * @category business/bill
 * @since 0.7.0
 * @description 主数据编辑模板
 * @keywords master, edit, template
 * @example
 * <MasterEditTemplate />
 */

interface MasterEditTemplateProps {
  title?: string;
  onBack?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

function MasterEditTemplate({ className }: MasterEditTemplateProps) {
  return (
    <div data-slot="master-edit-template" className={cn("", className)}>
      {null}
    </div>
  );
}

export { MasterEditTemplate };
export type { MasterEditTemplateProps };
