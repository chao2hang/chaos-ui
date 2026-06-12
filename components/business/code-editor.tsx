"use client"
import * as React from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { html } from "@codemirror/lang-html"
import { css } from "@codemirror/lang-css"
import { json } from "@codemirror/lang-json"
import { python } from "@codemirror/lang-python"
import { oneDark } from "@codemirror/theme-one-dark"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { cn } from "@/lib/utils"

type SupportedLang = "javascript" | "typescript" | "html" | "css" | "json" | "python" | "plaintext"

const LANG_MAP: Record<SupportedLang, (() => unknown) | null> = {
  javascript: () => javascript(),
  typescript: () => javascript({ typescript: true }),
  html: () => html(),
  css: () => css(),
  json: () => json(),
  python: () => python(),
  plaintext: null,
}

interface CodeEditorProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  value?: string
  onChange?: (value: string) => void
  language?: SupportedLang
  readonly?: boolean
  showLineNumbers?: boolean
  showCopy?: boolean
  height?: string | number
  theme?: "light" | "dark"
  filename?: string
  className?: string
}

export function CodeEditor({
  value = "",
  onChange,
  language = "typescript",
  readonly = false,
  showLineNumbers = true,
  showCopy = true,
  height = 320,
  theme = "light",
  filename,
  className,
  ...props
}: CodeEditorProps) {
  const [copied, copy] = useCopyToClipboard()
  const ext = LANG_MAP[language] ? LANG_MAP[language]() : null
  return (
    <div
      data-slot="code-editor"
      className={cn("overflow-hidden rounded-md border bg-zinc-50 dark:bg-zinc-950", className)}
      {...props}
    >
      {(filename || showCopy) && (
        <div className="flex items-center justify-between border-b bg-muted/30 px-3 py-1.5 text-xs">
          {filename && <span className="font-mono text-muted-foreground">{filename}</span>}
          {showCopy && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => copy(value)}
              aria-label="复制代码"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </Button>
          )}
        </div>
      )}
      <CodeMirror
        value={value}
        height={`${height}px`}
        extensions={ext ? [ext as never] : []}
        editable={!readonly}
        basicSetup={{ lineNumbers: showLineNumbers, foldGutter: showLineNumbers }}
        theme={theme === "dark" ? oneDark : "light"}
        onChange={onChange}
      />
    </div>
  )
}
