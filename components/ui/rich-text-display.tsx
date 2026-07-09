"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { FileIcon, PaperclipIcon } from "./icons";

interface RichTextMention {
  /** Unique identifier / 唯一标识 */
  id: string;
  /** Mention display name / 提及显示名称 */
  name: string;
  /** Avatar URL / 头像地址 */
  avatar?: string;
}

interface RichTextAttachment {
  /** File name / 文件名 */
  name: string;
  /** File URL / 文件地址 */
  url: string;
  /** File size in bytes / 文件大小（字节） */
  size?: number;
}

interface RichTextDisplayProps extends React.ComponentProps<"div"> {
  /** Rich text content (HTML string or structured JSON) / 富文本内容（HTML 字符串或结构化 JSON） */
  content?: string;
  /** Content format / 内容格式 */
  format?: "html" | "json";
  /** Mention list / 提及列表 */
  mentions?: RichTextMention[];
  /** Attachment list / 附件列表 */
  attachments?: RichTextAttachment[];
}

const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "strong",
  "em",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "blockquote",
  "code",
  "pre",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "span",
  "div",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "target", "rel"]),
  img: new Set(["src", "alt", "width", "height"]),
  span: new Set(["class"]),
  div: new Set(["class"]),
};

function sanitizeHtml(html: string): string {
  // Very basic sanitizer using DOMParser
  if (typeof window === "undefined") return html;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  cleanNode(doc.body);
  return doc.body.innerHTML;
}

function cleanNode(node: Node) {
  const children = Array.from(node.childNodes);
  for (const child of children) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as Element;
      const tag = el.tagName.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) {
        // Replace disallowed element with its children
        while (el.firstChild) {
          node.insertBefore(el.firstChild, el);
        }
        node.removeChild(el);
        continue;
      }
      // Clean attributes
      const allowed = ALLOWED_ATTRS[tag] ?? new Set();
      for (const attr of Array.from(el.attributes)) {
        if (!allowed.has(attr.name.toLowerCase())) {
          el.removeAttribute(attr.name);
        } else if (
          (attr.name === "href" || attr.name === "src") &&
          /^\s*javascript:/i.test(attr.value)
        ) {
          el.removeAttribute(attr.name);
        }
      }
    }
    if (child.hasChildNodes()) {
      cleanNode(child);
    }
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function renderJsonNode(node: unknown, key: string): React.ReactNode {
  if (node == null || typeof node !== "object") {
    return <React.Fragment key={key}>{String(node ?? "")}</React.Fragment>;
  }

  const obj = node as Record<string, unknown>;
  const tag = (obj.tagName ?? obj.type ?? obj.tag) as string | undefined;
  const children = obj.children as unknown[] | undefined;
  const text = obj.text as string | undefined;
  const attrs = (obj.attrs ?? obj.props ?? {}) as Record<string, string>;

  if (text != null && !tag) {
    return <React.Fragment key={key}>{text}</React.Fragment>;
  }

  switch (tag) {
    case "h1":
      return (
        <h1 key={key} className="mt-4 mb-2 text-2xl font-semibold">
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </h1>
      );
    case "h2":
      return (
        <h2 key={key} className="mt-4 mb-2 text-xl font-semibold">
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </h2>
      );
    case "h3":
      return (
        <h3 key={key} className="mt-3 mb-2 text-lg font-semibold">
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </h3>
      );
    case "h4":
      return (
        <h4 key={key} className="mt-3 mb-1 text-base font-semibold">
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </h4>
      );
    case "h5":
      return (
        <h5 key={key} className="mt-2 mb-1 text-sm font-semibold">
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </h5>
      );
    case "h6":
      return (
        <h6 key={key} className="mt-2 mb-1 text-sm font-medium">
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </h6>
      );
    case "p":
      return (
        <p key={key} className="mb-2 leading-6">
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </p>
      );
    case "strong":
      return (
        <strong key={key} className="font-semibold">
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </strong>
      );
    case "em":
      return (
        <em key={key}>
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </em>
      );
    case "ul":
      return (
        <ul key={key} className="mb-2 list-disc space-y-1 pl-6">
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key} className="mb-2 list-decimal space-y-1 pl-6">
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </ol>
      );
    case "li":
      return (
        <li key={key}>
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </li>
      );
    case "a":
      return (
        <a
          key={key}
          href={attrs.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </a>
      );
    case "img":
      return (
        <img
          key={key}
          src={attrs.src}
          alt={attrs.alt ?? ""}
          className="max-w-full rounded-lg"
        />
      );
    case "blockquote":
      return (
        <blockquote
          key={key}
          className="border-primary/40 text-muted-foreground mb-2 border-l-2 pl-3 italic"
        >
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </blockquote>
      );
    case "code":
      return (
        <code
          key={key}
          className="bg-muted text-foreground rounded px-1 py-0.5 font-mono text-xs"
        >
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
        </code>
      );
    case "pre":
      return (
        <pre key={key} className="bg-muted mb-2 overflow-x-auto rounded-lg p-3">
          <code className="font-mono text-xs">
            {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`))}
          </code>
        </pre>
      );
    case "br":
      return <br key={key} />;
    default:
      return (
        <div key={key}>
          {children?.map((c, i) => renderJsonNode(c, `${key}-${i}`)) ?? text}
        </div>
      );
  }
}

/**
 * @component RichTextDisplay
 * @category ui/data-display
 * @since 0.2.0
 * @description Read-only rich text display supporting HTML (sanitized) and JSON formats, with mentions and attachments / 只读富文本显示，支持 HTML（已消毒）和 JSON 格式，可显示提及和附件
 * @keywords rich-text, display, html, json, 富文本, 显示
 * @example
 * <RichTextDisplay
 *   format="html"
 *   content="<p>Hello <strong>world</strong></p>"
 *   attachments={[{ name: "file.pdf", url: "/file.pdf", size: 102400 }]}
 * />
 */
function RichTextDisplay({
  className,
  content = "",
  format = "html",
  mentions = [],
  attachments = [],
  ...props
}: RichTextDisplayProps) {
  const sanitizedHtml = React.useMemo(() => {
    if (format !== "html") return "";
    return sanitizeHtml(content);
  }, [content, format]);

  const jsonNodes = React.useMemo(() => {
    if (format !== "json") return null;
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  }, [content, format]);

  return (
    <div
      data-slot="rich-text-display"
      className={cn("w-full text-sm", className)}
      {...props}
    >
      {format === "html" ? (
        <div
          className="rich-text-content text-foreground leading-6"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      ) : (
        <div className="rich-text-content text-foreground leading-6">
          {jsonNodes ? renderJsonNode(jsonNodes, "root") : content}
        </div>
      )}

      {mentions.length > 0 && (
        <div className="border-border mt-3 border-t pt-2">
          <div className="text-muted-foreground mb-1 text-xs font-medium">
            Mentions
          </div>
          <div className="flex flex-wrap gap-2">
            {mentions.map((m) => (
              <div
                key={m.id}
                className="bg-muted flex items-center gap-1.5 rounded-md px-2 py-1 text-xs"
              >
                {m.avatar && (
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="size-4 rounded-full"
                  />
                )}
                <span className="text-foreground font-medium">@{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {attachments.length > 0 && (
        <div className="border-border mt-3 border-t pt-2">
          <div className="text-muted-foreground mb-1 flex items-center gap-1 text-xs font-medium">
            <PaperclipIcon className="size-3" />
            Attachments
          </div>
          <div className="space-y-1">
            {attachments.map((file, i) => (
              <a
                key={i}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-muted flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors"
              >
                <FileIcon className="text-muted-foreground size-4 shrink-0" />
                <span className="text-foreground flex-1 truncate text-xs font-medium">
                  {file.name}
                </span>
                {file.size != null && (
                  <span className="text-muted-foreground shrink-0 text-xs">
                    {formatFileSize(file.size)}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { RichTextDisplay };
export type { RichTextDisplayProps, RichTextMention, RichTextAttachment };
