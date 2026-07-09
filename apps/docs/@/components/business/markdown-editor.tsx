"use client";

import * as React from "react";
import {
  BoldIcon,
  ItalicIcon,
  Heading1Icon,
  Heading2Icon,
  LinkIcon,
  CodeIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  ImageIcon,
  EyeIcon,
  PencilIcon,
  Columns3Icon,
} from "@chaos_team/chaos-ui/ui-icons";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Textarea } from "@chaos_team/chaos-ui/ui";
import { SegmentedControl } from "@chaos_team/chaos-ui/ui";
import { ChatMarkdownRenderer } from "@chaos_team/chaos-ui/business";

/**
 * @component MarkdownEditor
 * @category business/form
 * @since 1.0.0
 * @description Markdown 编辑器,支持工具栏(粗体/斜体/标题/链接/代码/列表/引用/图片)、实时预览、三种模式(编辑/预览/分屏)。
 * @keywords markdown, editor, textarea, preview
 * @example
 * <MarkdownEditor value="# Hello" onChange={setMd} mode="split" />
 */

type MarkdownMode = "split" | "editor" | "preview";

interface MarkdownTool {
  key: string;
  icon: React.ReactNode;
  title: string;
  wrap?: [string, string];
  insert?: string;
}

const TOOLS: MarkdownTool[] = [
  { key: "bold", icon: <BoldIcon />, title: "粗体", wrap: ["**", "**"] },
  { key: "italic", icon: <ItalicIcon />, title: "斜体", wrap: ["*", "*"] },
  { key: "h1", icon: <Heading1Icon />, title: "标题1", insert: "# " },
  { key: "h2", icon: <Heading2Icon />, title: "标题2", insert: "## " },
  { key: "link", icon: <LinkIcon />, title: "链接", wrap: ["[", "](url)"] },
  { key: "code", icon: <CodeIcon />, title: "行内代码", wrap: ["`", "`"] },
  { key: "ul", icon: <ListIcon />, title: "无序列表", insert: "- " },
  { key: "ol", icon: <ListOrderedIcon />, title: "有序列表", insert: "1. " },
  { key: "quote", icon: <QuoteIcon />, title: "引用", insert: "> " },
  { key: "image", icon: <ImageIcon />, title: "图片", insert: "![alt](url)" },
];

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  mode?: MarkdownMode;
  toolbar?: boolean;
  height?: number | string;
  className?: string;
}

function MarkdownEditor({
  value = "",
  onChange,
  placeholder = "请输入 Markdown...",
  mode: modeProp,
  toolbar = true,
  height = 300,
  className,
}: MarkdownEditorProps) {
  const [internalMode, setInternalMode] = React.useState<MarkdownMode>("split");
  const mode = modeProp ?? internalMode;
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const applyTool = React.useCallback(
    (tool: MarkdownTool) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = value.substring(start, end);
      let newValue: string;
      let newCursorStart: number;
      let newCursorEnd: number;

      if (tool.wrap) {
        const [before, after] = tool.wrap;
        newValue =
          value.substring(0, start) +
          before +
          selected +
          after +
          value.substring(end);
        newCursorStart = start + before.length;
        newCursorEnd = end + before.length;
      } else if (tool.insert) {
        // Insert at line start
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        newValue =
          value.substring(0, lineStart) +
          tool.insert +
          value.substring(lineStart);
        newCursorStart = start + tool.insert.length;
        newCursorEnd = end + tool.insert.length;
      } else {
        return;
      }

      onChange?.(newValue);

      // Restore focus and selection
      requestAnimationFrame(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorStart, newCursorEnd);
      });
    },
    [value, onChange],
  );

  const modeOptions = [
    { value: "editor" as const, label: "编辑", icon: <PencilIcon className="size-3.5" /> },
    { value: "split" as const, label: "分屏", icon: <Columns3Icon className="size-3.5" /> },
    { value: "preview" as const, label: "预览", icon: <EyeIcon className="size-3.5" /> },
  ];

  const heightStyle =
    typeof height === "number" ? { height: `${height}px` } : { height };

  return (
    <div
      data-slot="markdown-editor"
      className={cn("flex flex-col rounded-md border bg-background", className)}
    >
      {/* Toolbar */}
      {toolbar && (
        <div className="flex items-center justify-between gap-2 border-b p-1.5">
          <div
            className="flex flex-wrap items-center gap-0.5"
            role="toolbar"
            aria-label="Markdown 编辑工具栏"
          >
            {TOOLS.map((tool) => (
              <Button
                key={tool.key}
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => applyTool(tool)}
                title={tool.title}
                aria-label={tool.title}
              >
                {tool.icon}
              </Button>
            ))}
          </div>
          {!modeProp && (
            <SegmentedControl
              options={modeOptions}
              value={mode}
              onChange={(v) => setInternalMode(v as MarkdownMode)}
              size="sm"
            />
          )}
        </div>
      )}

      {/* Content area */}
      <div
        className={cn(
          "flex min-h-0 flex-1",
          mode === "split" && "flex-row divide-x",
        )}
        style={heightStyle}
      >
        {/* Editor pane */}
        {mode !== "preview" && (
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            aria-label="Markdown 编辑区"
            className={cn(
              "min-h-full flex-1 resize-none rounded-none border-0 focus-visible:ring-0",
              mode === "split" && "border-r",
            )}
            style={{ height: "100%" }}
          />
        )}

        {/* Preview pane */}
        {mode !== "editor" && (
          <div
            className={cn(
              "min-h-0 flex-1 overflow-auto p-3",
              mode === "split" && "bg-muted/20",
            )}
            aria-label="Markdown 预览区"
          >
            {value.trim() ? (
              <ChatMarkdownRenderer content={value} />
            ) : (
              <p className="text-sm text-muted-foreground">
                {placeholder}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

MarkdownEditor.displayName = "MarkdownEditor";

export { MarkdownEditor };
export type { MarkdownEditorProps, MarkdownMode };
