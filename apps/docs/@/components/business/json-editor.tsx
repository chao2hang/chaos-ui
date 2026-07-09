"use client";

import * as React from "react";
import { CodeEditor } from "./code-editor";
import { cn } from "@chaos_team/chaos-ui/lib";

export interface JsonEditorProps {
  /** JSON string (controlled). */
  value: string;
  /** Called on every change. */
  onChange?: (value: string) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Whether the editor is read-only. */
  readOnly?: boolean | undefined;
  /** Minimum height. */
  minHeight?: number;
  /** Maximum height. */
  maxHeight?: number;
  /** If true, auto-formats the JSON value on mount and on external value changes. */
  autoFormat?: boolean | undefined;
  /** Additional class names. */
  className?: string;
  /** Called when the editor receives focus. */
  onFocus?: () => void;
  /** Called when the editor loses focus. */
  onBlur?: () => void;
}

/**
 * Try to pretty-print a JSON string. Returns the original string on failure.
 */
function tryFormat(value: string): string {
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

/**
 * @component JsonEditor
 * @category business/data
 * @since 1.1.0
 * @description JSON code editor with optional auto-formatting / JSON 代码编辑器，支持可选的自动格式化
 * @keywords json, editor, format, data, config
 * @example
 * <JsonEditor
 *   value='{"name":"Alice"}'
 *   autoFormat
 *   onChange={(v) => setConfig(v)}
 * />
 */
function JsonEditor({
  value,
  onChange,
  placeholder,
  readOnly,
  minHeight = 200,
  maxHeight,
  autoFormat,
  className,
  onFocus,
  onBlur,
}: JsonEditorProps) {
  const formatted = React.useMemo(
    () => (autoFormat ? tryFormat(value) : value),
    [autoFormat, value],
  );

  const handleChange = React.useCallback(
    (next: string) => {
      onChange?.(autoFormat ? tryFormat(next) : next);
    },
    [onChange, autoFormat],
  );

  return (
    <div data-slot="json-editor" className={cn("relative", className)}>
      <CodeEditor
        value={formatted}
        onChange={handleChange}
        language="json"
        placeholder={placeholder ?? '{ "key": "value" }'}
        readOnly={readOnly}
        minHeight={minHeight}
        maxHeight={maxHeight}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}

export { JsonEditor };
