"use client";

import * as React from "react";
import { CheckIcon, PencilIcon, XIcon } from "@chaos_team/chaos-ui/ui-icons";

import { Button } from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Textarea } from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

export interface InlineEditProps extends Omit<
  React.ComponentProps<"div">,
  "onSave"
> {
  value: string;
  placeholder?: string;
  multiline?: boolean;
  disabled?: boolean;
  validate?: (value: string) => string | undefined;
  onSave?: (value: string) => void | Promise<void>;
  renderValue?: (value: string) => React.ReactNode;
}

/**
 * @component InlineEdit
 * @category business/ux
 * @since 0.2.0
 * @description Inline text editing with click-to-edit, validation, and save/cancel actions; supports single-line and multiline modes / 内联文本编辑组件，支持点击编辑、验证和保存/取消操作，兼容单行和多行模式
 * @keywords inline, edit, text, input, validation
 * @example
 * <InlineEdit value="Hello" onSave={(v) => console.log(v)} />
 */
export function InlineEdit({
  value,
  placeholder = "Empty",
  multiline,
  disabled,
  validate,
  onSave,
  renderValue,
  className,
  ...props
}: InlineEditProps) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const [error, setError] = React.useState<string>();
  const [saving, setSaving] = React.useState(false);

  const save = async () => {
    const nextError = validate?.(draft);
    setError(nextError);
    if (nextError) return;
    setSaving(true);
    try {
      await onSave?.(draft);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  if (!editing) {
    const startEditing = () => {
      setDraft(value);
      setError(undefined);
      setEditing(true);
    };

    return (
      <div
        data-slot="inline-edit"
        className={cn(
          "group/inline-edit inline-flex items-center gap-2",
          className,
        )}
        {...props}
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled}
          className="h-auto justify-start px-0 py-0 text-left font-normal"
          onClick={startEditing}
        >
          {value ? (
            (renderValue?.(value) ?? value)
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
        {!disabled && (
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            className="opacity-0 group-hover/inline-edit:opacity-100"
            onClick={startEditing}
            aria-label="Edit value"
          >
            <PencilIcon />
          </Button>
        )}
      </div>
    );
  }

  const Control = multiline ? Textarea : Input;

  return (
    <div
      data-slot="inline-edit"
      className={cn("space-y-1.5", className)}
      {...props}
    >
      <div className="flex items-start gap-2">
        <Control
          value={draft}
          aria-invalid={!!error}
          disabled={saving}
          onChange={(event) => {
            setDraft(event.target.value);
            setError(undefined);
          }}
          onKeyDown={(event) => {
            if (!multiline && event.key === "Enter") void save();
            if (event.key === "Escape") setEditing(false);
          }}
        />
        <Button
          type="button"
          size="icon-sm"
          onClick={save}
          disabled={saving}
          aria-label="Save value"
        >
          <CheckIcon />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          onClick={() => setEditing(false)}
          disabled={saving}
          aria-label="Cancel editing"
        >
          <XIcon />
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
