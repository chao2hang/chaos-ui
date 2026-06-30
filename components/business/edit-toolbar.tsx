"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/**
 * @component EditToolbar
 * @category business/editor
 * @since 0.7.0
 * @description 编辑工具栏 — 统一编辑操作的按钮容器。
 * 内置 Save / Cancel / Delete 按钮槽位，支持自定义额外操作。
 * / Edit toolbar — unified button container for edit operations.
 * @keywords toolbar, edit, save, cancel, delete, actions
 * @example
 * <EditToolbar
 *   onSave={handleSave}
 *   onCancel={handleCancel}
 *   onDelete={handleDelete}
 *   saveText="保存"
 *   loading={saving}
 * />
 */

interface EditToolbarProps extends React.ComponentProps<"div"> {
  /** Save callback / 保存回调 */
  onSave?: () => void;
  /** Cancel callback / 取消回调 */
  onCancel?: () => void;
  /** Delete callback / 删除回调 */
  onDelete?: () => void;
  /** Whether the save action is loading / 保存是否加载中 */
  loading?: boolean;
  /** Disable the save button / 禁用保存按钮 */
  saveDisabled?: boolean;
  /** Save button text / 保存按钮文本 */
  saveText?: string;
  /** Cancel button text / 取消按钮文本 */
  cancelText?: string;
  /** Delete button text / 删除按钮文本 */
  deleteText?: string;
  /** Extra action buttons rendered before the divider / 额外操作按钮 */
  extraActions?: React.ReactNode;
  /** Whether to show the delete button / 是否显示删除按钮 */
  showDelete?: boolean;
  /** Alignment of action buttons / 按钮对齐方式 */
  align?: "start" | "center" | "end";
}

function EditToolbar({
  className,
  onSave,
  onCancel,
  onDelete,
  loading = false,
  saveDisabled = false,
  saveText = "Save",
  cancelText = "Cancel",
  deleteText = "Delete",
  extraActions,
  showDelete = false,
  align = "end",
  ...props
}: EditToolbarProps) {
  const alignClass =
    align === "start"
      ? "justify-start"
      : align === "center"
        ? "justify-center"
        : "justify-end";

  return (
    <div
      data-slot="edit-toolbar"
      className={cn(
        "border-border flex items-center gap-2 border-b px-4 py-2",
        alignClass,
        className,
      )}
      {...props}
    >
      {extraActions && (
        <>
          <div className="flex items-center gap-2">{extraActions}</div>
          <Separator orientation="vertical" className="h-5" />
        </>
      )}

      {showDelete && onDelete && (
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          disabled={loading}
        >
          {deleteText}
        </Button>
      )}

      {onCancel && (
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={loading}
        >
          {cancelText}
        </Button>
      )}

      {onSave && (
        <Button size="sm" onClick={onSave} disabled={loading || saveDisabled}>
          {loading ? "..." : saveText}
        </Button>
      )}
    </div>
  );
}

export { EditToolbar };
export type { EditToolbarProps };
