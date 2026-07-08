"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ChatMarkdownRenderer
 * @category business/chat
 * @since 0.7.0
 * @description Markdown渲染器（轻量内联解析：标题、列表、代码块、引用、链接、粗体/斜体）
 * @keywords chat, markdown, renderer
 * @example
 * <ChatMarkdownRenderer content="# Title\nHello **world**" />
 */

interface ChatMarkdownRendererProps {
  content: string;
  className?: string;
}

interface Segment {
  type: "h1" | "h2" | "h3" | "ul" | "ol" | "quote" | "code" | "p";
  text: string;
}

function parseMarkdown(src: string): Segment[] {
  const lines = src.split(/\r?\n/);
  const segments: Segment[] = [];
  const at = (idx: number): string => lines[idx] ?? "";
  let i = 0;
  while (i < lines.length) {
    const line = at(i);
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      segments.push({ type: "h3", text: line.slice(4) });
      i += 1;
    } else if (line.startsWith("## ")) {
      segments.push({ type: "h2", text: line.slice(3) });
      i += 1;
    } else if (line.startsWith("# ")) {
      segments.push({ type: "h1", text: line.slice(2) });
      i += 1;
    } else if (line.startsWith("> ")) {
      const buf: string[] = [line.slice(2)];
      i += 1;
      while (i < lines.length && at(i).startsWith("> ")) {
        buf.push(at(i).slice(2));
        i += 1;
      }
      segments.push({ type: "quote", text: buf.join("\n") });
    } else if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      i += 1;
      const buf: string[] = [];
      while (i < lines.length && !at(i).startsWith("```")) {
        buf.push(at(i));
        i += 1;
      }
      i += 1; // skip closing fence
      segments.push({
        type: "code",
        text: lang ? `${lang}\n${buf.join("\n")}` : buf.join("\n"),
      });
    } else if (/^\s*[-*]\s+/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(at(i))) {
        buf.push(at(i).replace(/^\s*[-*]\s+/, ""));
        i += 1;
      }
      segments.push({ type: "ul", text: buf.join("\n") });
    } else if (/^\s*\d+\.\s+/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(at(i))) {
        buf.push(at(i).replace(/^\s*\d+\.\s+/, ""));
        i += 1;
      }
      segments.push({ type: "ol", text: buf.join("\n") });
    } else {
      segments.push({ type: "p", text: line });
      i += 1;
    }
  }
  return segments;
}

/** Render inline markdown: **bold**, *italic*, `code`, [text](url) */
function renderInline(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  const regex =
    /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[2] !== undefined) {
      nodes.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      nodes.push(<em key={key++}>{match[3]}</em>);
    } else if (match[4] !== undefined) {
      nodes.push(
        <code
          key={key++}
          className="bg-muted rounded px-1 py-0.5 font-mono text-[0.85em]"
        >
          {match[4]}
        </code>,
      );
    } else if (match[5] !== undefined && match[6] !== undefined) {
      nodes.push(
        <a
          key={key++}
          href={match[6]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2"
        >
          {match[5]}
        </a>,
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes.length ? nodes : text;
}

function ChatMarkdownRendererImpl({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const segments = parseMarkdown(content);
  if (segments.length === 0) {
    return <p className="text-sm">{content}</p>;
  }
  return (
    <div
      className={cn("flex flex-col gap-2 text-sm leading-relaxed", className)}
    >
      {segments.map((seg, idx) => {
        switch (seg.type) {
          case "h1":
            return (
              <h1 key={idx} className="text-lg font-semibold">
                {renderInline(seg.text)}
              </h1>
            );
          case "h2":
            return (
              <h2 key={idx} className="text-base font-semibold">
                {renderInline(seg.text)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={idx} className="text-sm font-semibold">
                {renderInline(seg.text)}
              </h3>
            );
          case "quote":
            return (
              <blockquote
                key={idx}
                className="border-border text-muted-foreground border-l-2 pl-3"
              >
                {renderInline(seg.text)}
              </blockquote>
            );
          case "code":
            return (
              <pre
                key={idx}
                className="bg-muted overflow-x-auto rounded-md p-2 font-mono text-xs"
              >
                <code>{seg.text}</code>
              </pre>
            );
          case "ul":
            return (
              <ul key={idx} className="list-disc pl-5">
                {seg.text.split("\n").map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={idx} className="list-decimal pl-5">
                {seg.text.split("\n").map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          default:
            return <p key={idx}>{renderInline(seg.text)}</p>;
        }
      })}
    </div>
  );
}

function ChatMarkdownRenderer({
  content = "",
  className,
}: ChatMarkdownRendererProps) {
  return (
    <div data-slot="chat-markdown-renderer" className={className}>
      <ChatMarkdownRendererImpl content={content} />
    </div>
  );
}

export { ChatMarkdownRenderer };
export type { ChatMarkdownRendererProps };
