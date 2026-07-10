"use client";

import * as React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { sql, MySQL, PostgreSQL } from "@codemirror/lang-sql";
import { json } from "@codemirror/lang-json";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Extension } from "@codemirror/state";
import { CopyIcon, CheckIcon } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export type CodeEditorLanguage =
  | "javascript"
  | "typescript"
  | "json"
  | "sql"
  | "mysql"
  | "postgresql"
  | "css"
  | "html"
  | "text";

type SQLDialect = "standard" | "mysql" | "postgresql";

/**
 * Map a user-facing language tag to the CodeMirror extension array.
 * Falls back to plain text when the language is unknown.
 */
function languageExtension(
  lang: CodeEditorLanguage,
  sqlDialect?: SQLDialect,
): Extension[] {
  switch (lang) {
    case "javascript":
      return [javascript({ jsx: false, typescript: false })];
    case "typescript":
      return [javascript({ jsx: false, typescript: true })];
    case "json":
      return [json()];
    case "sql": {
      const dialect = sqlDialect ?? "standard";
      if (dialect === "mysql") return [sql({ dialect: MySQL })];
      if (dialect === "postgresql") return [sql({ dialect: PostgreSQL })];
      return [sql({})];
    }
    case "mysql":
      return [sql({ dialect: MySQL })];
    case "postgresql":
      return [sql({ dialect: PostgreSQL })];
    case "css":
      return [css()];
    case "html":
      return [html()];
    default:
      return [];
  }
}

export interface CodeEditorProps {
  /** Code content (controlled). */
  value: string;
  /** Called on every change. */
  onChange?: ((value: string) => void) | undefined;
  /** Language for syntax highlighting. Defaults to `"text"`. */
  language?: CodeEditorLanguage | undefined;
  /** SQL dialect hint when `language` is `"sql"`. */
  sqlDialect?: SQLDialect | undefined;
  /** Placeholder text displayed when the editor is empty. */
  placeholder?: string | undefined;
  /** Whether the editor is read-only. */
  readOnly?: boolean | undefined;
  /** If true, the copy button is hidden. */
  hideCopy?: boolean | undefined;
  /** Minimum height. Defaults to `200`. Specify `0` for auto height. */
  minHeight?: number | undefined;
  /** Maximum height. Scrolls when exceeded. */
  maxHeight?: number | undefined;
  /** Show line numbers. Defaults to true. */
  lineNumbers?: boolean | undefined;
  /** Additional class names for the wrapper. */
  className?: string | undefined;
  /** Called when the editor receives focus. */
  onFocus?: (() => void) | undefined;
  /** Called when the editor loses focus. */
  onBlur?: (() => void) | undefined;
}

/**
 * @component CodeEditor
 * @category business/data
 * @since 1.1.0
 * @description Multi-language code editor powered by CodeMirror 6 with syntax highlighting, theme support, and a copy button / 基于 CodeMirror 6 的多语言代码编辑器，支持语法高亮、主题和复制按钮
 * @keywords code, editor, codemirror, syntax, sql, json, javascript
 * @example
 * <CodeEditor
 *   value="SELECT * FROM users"
 *   language="sql"
 *   onChange={(v) => setQuery(v)}
 * />
 */
function CodeEditor({
  value,
  onChange,
  language = "text",
  sqlDialect,
  placeholder,
  readOnly,
  hideCopy,
  minHeight = 200,
  maxHeight,
  lineNumbers = true,
  className,
  onFocus,
  onBlur,
}: CodeEditorProps) {
  const { t } = useTranslation("data");
  const [copied, copy] = useCopyToClipboard();

  const extensions = React.useMemo(
    () => languageExtension(language, sqlDialect),
    [language, sqlDialect],
  );

  const containerStyle: React.CSSProperties = {
    minHeight: minHeight || undefined,
    maxHeight,
  };

  return (
    <div
      data-slot="code-editor"
      className={cn(
        "group relative overflow-hidden rounded-md border bg-zinc-950",
        readOnly && "opacity-80",
        className,
      )}
      style={containerStyle}
    >
      {!hideCopy && (
        <Button
          variant="ghost"
          size="icon-xs"
          className="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => copy(value)}
          aria-label={t("codeBlock.copyCode")}
        >
          {copied ? (
            <CheckIcon className="text-zinc-100" />
          ) : (
            <CopyIcon className="text-zinc-100" />
          )}
        </Button>
      )}
      <CodeMirror
        value={value}
        extensions={extensions}
        theme={oneDark}
        basicSetup={{
          lineNumbers,
          foldGutter: true,
          highlightActiveLine: true,
          autocompletion: !readOnly,
        }}
        style={{ fontSize: "0.8125rem" }}
        {...(onChange !== undefined
          ? { onChange: onChange as (val: string, update: unknown) => void }
          : {})}
        {...(placeholder !== undefined
          ? { placeholder: placeholder as string }
          : {})}
        {...(readOnly !== undefined ? { readOnly } : {})}
        {...(onFocus !== undefined ? { onFocus } : {})}
        {...(onBlur !== undefined ? { onBlur } : {})}
      />
    </div>
  );
}

export { CodeEditor };
export type { SQLDialect };
