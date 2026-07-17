"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { ArrowLeftIcon, SaveIcon, XIcon } from "@/components/ui";

/**
 * @component MasterEditTemplate
 * @category business/bill
 * @since 0.7.0
 * @deprecated Since 1.13.0. This template renders an in-page `<h2>` title and a
 * fixed action bar, which conflicts with FE-10 page density (issue #60 §1 L3).
 * Prefer `PageChrome variant="form"` + `Card`/`CardSection` for create/edit
 * forms (no in-page title; submit in card/footer). Kept for backward
 * compatibility; do not use in new pages.
 * @description 主数据编辑模板 — 含返回/保存/取消操作栏与表单内容区的标准编辑页骨架。
 * @param title 页面标题
 * @param onBack 返回回调
 * @param onSave 保存回调
 * @param onCancel 取消回调
 * @param loading 保存中状态
 * @param children 表单内容
 * @example
 * <MasterEditTemplate title="编辑供应商" onSave={() => {}} onCancel={() => {}}>
 *   <input />
 * </MasterEditTemplate>
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

/**
 * @deprecated Use `PageChrome variant="form"` + `Card`/`CardSection`.
 */
function MasterEditTemplate({
  title = "编辑",
  onBack,
  onSave,
  onCancel,
  loading = false,
  children,
  className,
}: MasterEditTemplateProps) {
  return (
    <div
      data-slot="master-edit-template"
      className={cn("flex flex-col gap-4", className)}
      role="region"
      aria-label={`编辑页 ${title}`}
    >
      <div className="flex items-center gap-3">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="返回"
            onClick={onBack}
          >
            <ArrowLeftIcon />
          </Button>
        )}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="bg-card flex-1 rounded-lg border p-4">{children}</div>
      <div className="flex items-center justify-end gap-2 border-t pt-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            icon={<XIcon />}
          >
            取消
          </Button>
        )}
        {onSave && (
          <Button
            type="button"
            onClick={onSave}
            disabled={loading}
            icon={<SaveIcon />}
            aria-busy={loading}
          >
            {loading ? "保存中" : "保存"}
          </Button>
        )}
      </div>
    </div>
  );
}

export { MasterEditTemplate };
export type { MasterEditTemplateProps };
