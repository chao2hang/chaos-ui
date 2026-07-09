"use client";

import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { FileIcon, DownloadIcon } from "@chaos_team/chaos-ui/ui-icons";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * An attachment in the markdown viewer.
 */
interface Attachment {
  /** File name / 文件名 */
  name: string;
  /** Download URL / 下载地址 */
  url: string;
  /** File size in bytes / 文件大小（字节） */
  size?: number;
}

/**
 * Props for the MarkdownViewerBiz component.
 */
interface MarkdownViewerBizProps {
  /** Markdown content string / Markdown 内容字符串 */
  content: string;
  /** Attachments to display below content / 内容下方显示的附件列表 */
  attachments?: Attachment[];
  /** Additional className / 额外类名 */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Simple inline markdown parser                                     */
/* ------------------------------------------------------------------ */

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

/**
 * Minimal self-contained markdown parser supporting:
 * - Headings (h1-h6)
 * - Bold/italic
 * - Inline code
 * - Code blocks
 * - Links
 * - Unordered/ordered lists
 * - Blockquotes
 * - Paragraphs
 * - Horizontal rules
 */
function renderMarkdown(md: string): React.ReactNode {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let listItems: React.ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      elements.push(
        listType === "ul" ? (
          <ul key={`list-${i}`} className="list-disc space-y-1 pl-6">
            {listItems}
          </ul>
        ) : (
          <ol key={`list-${i}`} className="list-decimal space-y-1 pl-6">
            {listItems}
          </ol>
        ),
      );
      listItems = [];
      listType = null;
    }
  };

  const renderInline = (text: string): React.ReactNode => {
    // Split by code, bold, italic, links
    const parts = text.split(
      /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[([^\]]+)\]\(([^)]+)\))/g,
    );
    return parts.filter(Boolean).map((part, idx) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={idx}
            className="bg-muted rounded px-1 py-0.5 font-mono text-xs"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={idx} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      // Match [text](url)
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={idx}
            href={linkMatch[2]}
            className="text-primary underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  while (i < lines.length) {
    const line = lines[i] ?? "";

    // Code block
    if (line.trim().startsWith("```")) {
      flushList();
      const lang = line.trim().slice(3);
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !(lines[i] ?? "").trim().startsWith("```")) {
        codeLines.push(lines[i] ?? "");
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre
          key={`code-${i}`}
          className="bg-muted/50 overflow-x-auto rounded-lg border p-3"
        >
          <code className="font-mono text-sm">{codeLines.join("\n")}</code>
          {lang && <span className="sr-only">{lang}</span>}
        </pre>,
      );
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushList();
      const level = (headingMatch[1] ?? "").length;
      const text = headingMatch[2] ?? "";
      const sizes = [
        "text-2xl",
        "text-xl",
        "text-lg",
        "text-base",
        "text-sm",
        "text-xs",
      ];
      elements.push(
        React.createElement(
          `h${level}`,
          {
            key: `h-${i}`,
            className: cn("font-semibold", sizes[level - 1] ?? "text-base"),
          },
          renderInline(text),
        ),
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---" || line.trim() === "***") {
      flushList();
      elements.push(<hr key={`hr-${i}`} className="border-border my-2" />);
      i++;
      continue;
    }

    // Blockquote
    if (line.trim().startsWith(">")) {
      flushList();
      elements.push(
        <blockquote
          key={`bq-${i}`}
          className="border-primary/30 text-muted-foreground border-l-4 pl-3 italic"
        >
          {renderInline(line.replace(/^>\s?/, ""))}
        </blockquote>,
      );
      i++;
      continue;
    }

    // Unordered list
    if (line.match(/^\s*[-*+]\s+/)) {
      const text = line.replace(/^\s*[-*+]\s+/, "");
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listItems.push(<li key={`li-${i}`}>{renderInline(text)}</li>);
      i++;
      continue;
    }

    // Ordered list
    if (line.match(/^\s*\d+\.\s+/)) {
      const text = line.replace(/^\s*\d+\.\s+/, "");
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listItems.push(<li key={`li-${i}`}>{renderInline(text)}</li>);
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      flushList();
      i++;
      continue;
    }

    // Paragraph
    flushList();
    elements.push(
      <p key={`p-${i}`} className="text-sm leading-relaxed">
        {renderInline(line)}
      </p>,
    );
    i++;
  }

  flushList();
  return elements;
}

/* ------------------------------------------------------------------ */
/*  MarkdownViewerBiz - main export                                   */
/* ------------------------------------------------------------------ */

/**
 * @component MarkdownViewerBiz
 * @category business/markdown
 * @since 0.2.0
 * @description Business markdown viewer with attachment support. Renders
 *   markdown content with a self-contained parser and displays an
 *   attachment list with download links at the bottom. / 业务 Markdown
 *   查看器，支持附件。使用自包含解析器渲染 Markdown 内容，并在底部显示
 *   带下载链接的附件列表。
 * @keywords markdown, viewer, attachment, download, biz
 * @example
 * ```tsx
 * <MarkdownViewerBiz
 *   content="# Hello\nThis is **bold** text."
 *   attachments={[{ name: "doc.pdf", url: "/files/doc.pdf", size: 1024 }]}
 * />
 * ```
 */
function MarkdownViewerBiz({
  content,
  attachments = [],
  className,
}: MarkdownViewerBizProps) {
  return (
    <div
      data-slot="markdown-viewer-biz"
      className={cn("flex flex-col gap-4", className)}
    >
      <div data-slot="markdown-viewer-biz-content" className="space-y-2">
        {content ? (
          renderMarkdown(content)
        ) : (
          <p className="text-muted-foreground text-sm">暂无内容</p>
        )}
      </div>

      {attachments.length > 0 && (
        <div
          data-slot="markdown-viewer-biz-attachments"
          className="border-t pt-3"
        >
          <div className="mb-2 text-sm font-medium">
            附件 ({attachments.length})
          </div>
          <div className="flex flex-col gap-1.5">
            {attachments.map((att, idx) => (
              <a
                key={idx}
                href={att.url}
                download={att.name}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-muted flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors"
              >
                <FileIcon className="text-primary size-4 shrink-0" />
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="truncate text-sm font-medium">
                    {att.name}
                  </span>
                  {att.size !== undefined && (
                    <span className="text-muted-foreground text-xs">
                      {formatFileSize(att.size)}
                    </span>
                  )}
                </div>
                <DownloadIcon className="text-muted-foreground size-4 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { MarkdownViewerBiz };
export type { MarkdownViewerBizProps, Attachment };
