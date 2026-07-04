"use client";

import { CodeEditor } from "./code-editor";
import type { CodeEditorLanguage, SQLDialect } from "./code-editor";

export interface SqlEditorProps {
  /** SQL content (controlled). */
  value: string;
  /** Called on every change. */
  onChange?: ((value: string) => void) | undefined;
  /** SQL dialect. Defaults to `"standard"`. */
  dialect?: SQLDialect;
  /** Placeholder text. */
  placeholder?: string;
  /** Whether the editor is read-only. */
  readOnly?: boolean;
  /** Minimum height. */
  minHeight?: number;
  /** Maximum height. */
  maxHeight?: number;
  /** Additional class names. */
  className?: string;
  /** Called when the editor receives focus. */
  onFocus?: () => void;
  /** Called when the editor loses focus. */
  onBlur?: () => void;
}

/**
 * @component SqlEditor
 * @category business/data
 * @since 1.1.0
 * @description SQL code editor with dialect-aware syntax highlighting (Standard, MySQL, PostgreSQL) / SQL 代码编辑器，支持方言感知的语法高亮
 * @keywords sql, editor, mysql, postgresql, query, database
 * @example
 * <SqlEditor
 *   value="SELECT * FROM users WHERE id = 1"
 *   dialect="postgresql"
 *   onChange={(v) => setQuery(v)}
 * />
 */
function SqlEditor({
  value,
  onChange,
  dialect = "standard",
  placeholder,
  readOnly,
  minHeight = 200,
  maxHeight,
  className,
  onFocus,
  onBlur,
}: SqlEditorProps) {
  const lang: CodeEditorLanguage =
    dialect === "mysql"
      ? "mysql"
      : dialect === "postgresql"
        ? "postgresql"
        : "sql";

  return (
    <CodeEditor
      value={value}
      onChange={onChange}
      language={lang}
      placeholder={placeholder ?? "SELECT ..."}
      readOnly={readOnly}
      minHeight={minHeight}
      maxHeight={maxHeight}
      className={className}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

export { SqlEditor };
