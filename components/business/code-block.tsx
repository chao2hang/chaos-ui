"use client";
import * as React from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CodeBlockProps extends React.ComponentProps<"div"> {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  showCopy?: boolean;
  highlightLines?: number[];
  maxHeight?: number;
}

function tokenize(code: string, language: string): React.ReactNode[] {
  if (!language) return [code];
  const patterns: Record<string, RegExp[]> = {
    js: [
      /\/\/.*$/gm,
      /\b(?:const|let|var|function|return|if|else|for|while|import|export|from|default|class|new|async|await|true|false|null|undefined|this)\b/g,
      /(?:"[^"]*"|'[^']*'|`[^`]*`)/g,
      /\b\d+\b/g,
    ],
    ts: [
      /\/\/.*$/gm,
      /\b(?:const|let|var|function|return|if|else|for|while|import|export|from|default|class|new|async|await|interface|type|enum|public|private|protected|true|false|null|undefined|this|extends|implements)\b/g,
      /(?:"[^"]*"|'[^']*'|`[^`]*`)/g,
      /\b\d+\b/g,
    ],
    json: [
      /(?:"(?:[^"\\]|\\.)*")(\s*:)/g,
      /\b(?:true|false|null)\b/g,
      /\b-?\d+(?:\.\d+)?\b/g,
    ],
  };
  const regs = patterns[language] ?? patterns.js ?? [];
  const tokens: { start: number; end: number; type: string }[] = [];
  for (let i = 0; i < regs.length; i++) {
    const re = new RegExp(
      (regs[i] as RegExp).source,
      (regs[i] as RegExp).flags,
    );
    let m: RegExpExecArray | null;
    while ((m = re.exec(code)) !== null) {
      tokens.push({
        start: m.index,
        end: m.index + m[0].length,
        type: ["comment", "keyword", "string", "number"][i] ?? "unknown",
      });
    }
  }
  tokens.sort((a, b) => a.start - b.start || b.end - a.end);
  const filtered: typeof tokens = [];
  for (const t of tokens) {
    if (filtered.some((f) => t.start < f.end && t.end > f.start)) continue;
    filtered.push(t);
  }
  const result: React.ReactNode[] = [];
  let cursor = 0;
  for (const t of filtered) {
    if (t.start > cursor) result.push(code.slice(cursor, t.start));
    result.push(
      <span
        key={`${t.start}-${t.end}`}
        className={cn(
          t.type === "comment" && "text-muted-foreground italic",
          t.type === "keyword" && "text-info",
          t.type === "string" && "text-success",
          t.type === "number" && "text-warning",
        )}
      >
        {code.slice(t.start, t.end)}
      </span>,
    );
    cursor = t.end;
  }
  if (cursor < code.length) result.push(code.slice(cursor));
  return result;
}

export function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = true,
  showCopy = true,
  highlightLines = [],
  maxHeight = 480,
  className,
  ...props
}: CodeBlockProps) {
  const { t } = useTranslation("data");
  const [copied, copy] = useCopyToClipboard();
  const lines = code.split("\n");
  const tokens = React.useMemo(
    () => tokenize(code, language ?? ""),
    [code, language],
  );

  return (
    <div
      data-slot="code-block"
      className={cn(
        "group relative overflow-hidden rounded-md border bg-zinc-950 text-zinc-100",
        className,
      )}
      {...props}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400">
          <span className="font-mono">{filename}</span>
          {language && (
            <span className="text-[0.65rem] uppercase">{language}</span>
          )}
        </div>
      )}
      {showCopy && (
        <Button
          variant="ghost"
          size="icon-xs"
          className="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => copy(code)}
          aria-label={t("codeBlock.copyCode")}
        >
          {copied ? (
            <CheckIcon className="text-zinc-100" />
          ) : (
            <CopyIcon className="text-zinc-100" />
          )}
        </Button>
      )}
      <pre
        className="overflow-auto p-3 text-xs font-mono leading-relaxed"
        style={{ maxHeight }}
      >
        <code>
          {showLineNumbers ? (
            <div className="w-full">
              {lines.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    highlightLines.includes(i + 1) && "bg-zinc-800/60",
                  )}
                >
                  <span className="select-none pr-4 text-right text-zinc-600 w-8 shrink-0">
                    {i + 1}
                  </span>
                  <span className="flex-1 whitespace-pre">
                    {lines[i] || " "}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            tokens
          )}
        </code>
      </pre>
    </div>
  );
}
