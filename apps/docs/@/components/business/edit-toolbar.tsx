"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";

interface EditToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  editing?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  className?: string;
}

function EditToolbar({
  editing = false,
  onEdit,
  onSave,
  onCancel,
  loading = false,
  className,
  ...props
}: EditToolbarProps) {
  if (!editing) {
    return (
      <div
        data-slot="edit-toolbar"
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {onEdit && (
          <Button size="sm" variant="outline" onClick={onEdit}>
            编辑
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      data-slot="edit-toolbar"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {onSave && (
        <Button size="sm" onClick={onSave} disabled={loading}>
          <CheckIcon /> 保存
        </Button>
      )}
      {onCancel && (
        <Button size="sm" variant="outline" onClick={onCancel}>
          <XIcon /> 取消
        </Button>
      )}
    </div>
  );
}

export { EditToolbar };
export type { EditToolbarProps };
