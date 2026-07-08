"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface MarkdownViewerProps extends React.ComponentProps<"div"> {
  /** Markdown content string / Markdown 内容字符串 */
  content?: string;
}

type InlineSegment =
  | { type: "text"; content: string }
  | { type: "bold"; content: string }
  | { type: "italic"; content: string }
  | { type: "code"; content: string }
  | { type: "link"; text: string; url: string }
  | { type: "image"; alt: string; url: string };

function parseInline(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let remaining = text;

  // Combined pattern: bold (**...**), italic (*...*), code (`...`), link [text](url), image ![alt](url)
  const combinedRegex =
    /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\))/;

  while (remaining.length > 0) {
    const match = remaining.match(combinedRegex);
    if (!match || match.index === undefined) {
      segments.push({ type: "text", content: remaining });
      break;
    }

    if (match.index > 0) {
      segments.push({ type: "text", content: remaining.slice(0, match.index) });
    }

    if (match[2] != null) {
      segments.push({ type: "bold", content: match[2] });
    } else if (match[3] != null) {
      segments.push({ type: "italic", content: match[3] });
    } else if (match[4] != null) {
      segments.push({ type: "code", content: match[4] });
    } else if (match[5] != null && match[6] != null) {
      segments.push({ type: "image", alt: match[5], url: match[6] });
    } else if (match[7] != null && match[8] != null) {
      segments.push({ type: "link", text: match[7], url: match[8] });
    }

    remaining = remaining.slice(match.index + match[0].length);
  }

  return segments;
}

function renderInline(
  segments: InlineSegment[],
  keyPrefix: string,
): React.ReactNode[] {
  return segments.map((seg, i) => {
    const key = `${keyPrefix}-${i}`;
    switch (seg.type) {
      case "bold":
        return (
          <strong key={key} className="font-semibold">
            {seg.content}
          </strong>
        );
      case "italic":
        return <em key={key}>{seg.content}</em>;
      case "code":
        return (
          <code
            key={key}
            className="bg-muted text-foreground rounded px-1 py-0.5 font-mono text-xs"
          >
            {seg.content}
          </code>
        );
      case "link":
        return (
          <a
            key={key}
            href={seg.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {seg.text}
          </a>
        );
      case "image":
        return (
          <img
            key={key}
            src={seg.url}
            alt={seg.alt}
            className="max-w-full rounded-lg"
          />
        );
      default:
        return <React.Fragment key={key}>{seg.content}</React.Fragment>;
    }
  });
}

interface Block {
  type:
    | "heading"
    | "paragraph"
    | "code"
    | "list"
    | "ordered-list"
    | "blockquote"
    | "hr"
    | "table";
  level?: number;
  text?: string;
  items?: string[];
  lang?: string;
  table?: { header: string[]; rows: string[][] };
}

function parseBlocks(md: string): Block[] {
  const lines = md.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!;

    // Code block
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3);
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i]!.trim().startsWith("```")) {
        codeLines.push(lines[i]!);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: "code", text: codeLines.join("\n"), lang });
      continue;
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line.trim())) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1]!.length,
        text: headingMatch[2] ?? "",
      });
      i++;
      continue;
    }

    // Blockquote
    if (line.trim().startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i]!.trim().startsWith(">")) {
        quoteLines.push(lines[i]!.trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join("\n") });
      continue;
    }

    // Table (basic: header | header, separator, rows)
    const nextLine = lines[i + 1];
    if (
      line.includes("|") &&
      nextLine != null &&
      /^\|?[\s-:|-]+\|?$/.test(nextLine.trim())
    ) {
      const header = line
        .split("|")
        .map((c) => c.trim())
        .filter((c) => c.length > 0);
      i += 2; // skip header and separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i]!.includes("|")) {
        const cells = lines[i]!.split("|")
          .map((c) => c.trim())
          .filter((c) => c.length > 0);
        rows.push(cells);
        i++;
      }
      blocks.push({ type: "table", table: { header, rows } });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i]!.trim())) {
        items.push(lines[i]!.trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ordered-list", items });
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i]!.trim())) {
        items.push(lines[i]!.trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i]!.trim() !== "" &&
      !lines[i]!.trim().startsWith("```") &&
      !lines[i]!.trim().startsWith("#") &&
      !lines[i]!.trim().startsWith(">") &&
      !/^---+\s*$/.test(lines[i]!.trim()) &&
      !/^[-*]\s+/.test(lines[i]!.trim()) &&
      !/^\d+\.\s+/.test(lines[i]!.trim())
    ) {
      paraLines.push(lines[i]!);
      i++;
    }
    blocks.push({ type: "paragraph", text: paraLines.join(" ") });
  }

  return blocks;
}

function renderBlock(block: Block, index: number): React.ReactNode {
  const key = `block-${index}`;
  switch (block.type) {
    case "heading": {
      const level = block.level ?? 1;
      const sizes = [
        "text-2xl",
        "text-xl",
        "text-lg",
        "text-base",
        "text-sm",
        "text-sm",
      ];
      return (
        <div
          key={key}
          className={cn(
            "font-semibold",
            sizes[level - 1] ?? "text-base",
            "mt-4 mb-2",
          )}
        >
          {renderInline(parseInline(block.text ?? ""), key)}
        </div>
      );
    }
    case "paragraph":
      return (
        <p key={key} className="text-foreground mb-2 leading-6">
          {renderInline(parseInline(block.text ?? ""), key)}
        </p>
      );
    case "code":
      return (
        <pre
          key={key}
          className="bg-muted text-foreground mb-2 overflow-x-auto rounded-lg p-3"
        >
          <code className="font-mono text-xs">{block.text}</code>
        </pre>
      );
    case "blockquote":
      return (
        <blockquote
          key={key}
          className="border-l-primary/40 text-muted-foreground mb-2 border-l-2 pl-3 italic"
        >
          {block.text?.split("\n").map((l, i) => (
            <div key={`${key}-line-${i}`}>
              {renderInline(parseInline(l), `${key}-line-${i}`)}
            </div>
          ))}
        </blockquote>
      );
    case "list":
      return (
        <ul key={key} className="text-foreground mb-2 list-disc space-y-1 pl-6">
          {block.items?.map((item, i) => (
            <li key={`${key}-${i}`}>
              {renderInline(parseInline(item), `${key}-${i}`)}
            </li>
          ))}
        </ul>
      );
    case "ordered-list":
      return (
        <ol
          key={key}
          className="text-foreground mb-2 list-decimal space-y-1 pl-6"
        >
          {block.items?.map((item, i) => (
            <li key={`${key}-${i}`}>
              {renderInline(parseInline(item), `${key}-${i}`)}
            </li>
          ))}
        </ol>
      );
    case "hr":
      return <hr key={key} className="border-border my-4" />;
    case "table":
      return (
        <div key={key} className="mb-2 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted/30">
                {block.table?.header.map((h, i) => (
                  <th
                    key={`${key}-h-${i}`}
                    className="border-border border px-3 py-1.5 text-left font-medium"
                  >
                    {renderInline(parseInline(h), `${key}-h-${i}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table?.rows.map((row, i) => (
                <tr key={`${key}-r-${i}`}>
                  {row.map((cell, j) => (
                    <td
                      key={`${key}-r-${i}-c-${j}`}
                      className="border-border border px-3 py-1.5"
                    >
                      {renderInline(parseInline(cell), `${key}-r-${i}-c-${j}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

/**
 * @component MarkdownViewer
 * @category ui/data-display
 * @since 0.2.0
 * @description Read-only markdown renderer supporting headings, bold, italic, code blocks, lists, links, images, blockquotes, tables, and horizontal rules / 只读 Markdown 渲染器，支持标题、粗体、斜体、代码块、列表、链接、图片、引用、表格和分割线
 * @keywords markdown, viewer, renderer, read-only, Markdown 渲染
 * @example
 * <MarkdownViewer content="# Hello\n\nThis is **bold** and *italic*." />
 */
function MarkdownViewer({
  className,
  content = "",
  ...props
}: MarkdownViewerProps) {
  const blocks = React.useMemo(() => parseBlocks(content), [content]);

  return (
    <div
      data-slot="markdown-viewer"
      className={cn("text-foreground text-sm leading-6", className)}
      {...props}
    >
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

export { MarkdownViewer };
export type { MarkdownViewerProps };
