"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronRightIcon, ChevronDownIcon } from "@/components/ui/icons";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * Props for the JSONViewerUI component.
 */
interface JSONViewerUIProps {
  /** JSON data to display / 要显示的 JSON 数据 */
  data: unknown;
  /** Additional className / 额外类名 */
  className?: string;
  /** Default expanded state (default: true) / 默认展开状态 */
  defaultExpanded?: boolean;
  /** Force collapse all nodes / 强制折叠所有节点 */
  collapsed?: boolean;
  /** Show line numbers (default: false) / 是否显示行号 */
  showLineNumbers?: boolean;
  /** Color theme (default: "dark") / 颜色主题 */
  theme?: "light" | "dark";
}

/* ------------------------------------------------------------------ */
/*  Theme tokens                                                      */
/* ------------------------------------------------------------------ */

const themes = {
  dark: {
    bg: "bg-zinc-900",
    text: "text-zinc-200",
    key: "text-cyan-400",
    string: "text-green-400",
    number: "text-yellow-400",
    boolean: "text-purple-400",
    null: "text-red-400",
    punctuation: "text-zinc-500",
    lineNumber: "text-zinc-600",
  },
  light: {
    bg: "bg-zinc-50",
    text: "text-zinc-800",
    key: "text-cyan-600",
    string: "text-green-600",
    number: "text-yellow-600",
    boolean: "text-purple-600",
    null: "text-red-600",
    punctuation: "text-zinc-400",
    lineNumber: "text-zinc-300",
  },
} as const;

type ThemeName = keyof typeof themes;

/* ------------------------------------------------------------------ */
/*  LineRow - extracted to module scope                               */
/* ------------------------------------------------------------------ */

function LineRow({
  children,
  line,
  showLineNumbers,
  theme,
}: {
  children?: React.ReactNode;
  line: number;
  showLineNumbers: boolean;
  theme: ThemeName;
}) {
  const t = themes[theme];
  return (
    <div className="flex">
      {showLineNumbers && (
        <span
          className={cn(
            "mr-3 inline-block w-8 shrink-0 text-right select-none",
            t.lineNumber,
          )}
        >
          {line}
        </span>
      )}
      <span className="flex-1">{children}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  JSONNode - recursive renderer                                     */
/* ------------------------------------------------------------------ */

interface JSONNodeProps {
  data: unknown;
  keyName?: string | null;
  level: number;
  defaultExpanded: boolean;
  forceCollapsed: boolean;
  showLineNumbers: boolean;
  theme: ThemeName;
  lineNumber: number;
  onLineNumberChange: (n: number) => void;
}

function JSONNode({
  data,
  keyName = null,
  level,
  defaultExpanded,
  forceCollapsed,
  showLineNumbers,
  theme,
  lineNumber,
  onLineNumberChange,
}: JSONNodeProps) {
  const t = themes[theme];
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  React.useEffect(() => {
    if (forceCollapsed) setExpanded(false);
  }, [forceCollapsed]);

  const isObject = data !== null && typeof data === "object";
  const isArray = Array.isArray(data);
  const entries = isObject
    ? Object.entries(data as Record<string, unknown>)
    : [];
  const hasChildren = entries.length > 0;

  const renderValue = (val: unknown): React.ReactNode => {
    if (val === null) return <span className={t.null}>null</span>;
    if (val === undefined) return <span className={t.null}>undefined</span>;
    if (typeof val === "string")
      return <span className={t.string}>&quot;{val}&quot;</span>;
    if (typeof val === "number")
      return <span className={t.number}>{String(val)}</span>;
    if (typeof val === "boolean")
      return <span className={t.boolean}>{String(val)}</span>;
    return null;
  };

  const renderKey = (k: string) => (
    <span className={t.key}>&quot;{k}&quot;</span>
  );

  const toggleExpanded = () => setExpanded((prev) => !prev);

  // Calculate total lines: opener line + children lines + closer line
  // Each child takes at least 1 line, plus comma lines between children
  const numChildren = entries.length;
  const childLineCount = numChildren; // simplified: each child = 1 line minimum
  const totalLines = 1 + childLineCount + Math.max(0, numChildren - 1) + 1;

  React.useEffect(() => {
    onLineNumberChange(lineNumber + totalLines);
  }, [lineNumber, totalLines, onLineNumberChange]);

  // Render primitive value
  if (!isObject) {
    return (
      <LineRow
        line={lineNumber}
        showLineNumbers={showLineNumbers}
        theme={theme}
      >
        {keyName !== null && (
          <>
            {renderKey(keyName)}
            <span className={t.punctuation}>: </span>
          </>
        )}
        {renderValue(data)}
      </LineRow>
    );
  }

  // Render object/array
  const opener = isArray ? "[" : "{";
  const closer = isArray ? "]" : "}";

  if (!hasChildren) {
    return (
      <LineRow
        line={lineNumber}
        showLineNumbers={showLineNumbers}
        theme={theme}
      >
        {keyName !== null && (
          <>
            {renderKey(keyName)}
            <span className={t.punctuation}>: </span>
          </>
        )}
        <span className={t.punctuation}>
          {opener}
          {closer}
        </span>
      </LineRow>
    );
  }

  let childLine = lineNumber + 1;
  const childrenLines: React.ReactNode[] = [];

  entries.forEach(([k, v], idx) => {
    const startLine = childLine;
    childrenLines.push(
      <JSONNode
        key={k + idx}
        data={v}
        keyName={isArray ? null : k}
        level={level + 1}
        defaultExpanded={defaultExpanded}
        forceCollapsed={forceCollapsed}
        showLineNumbers={showLineNumbers}
        theme={theme}
        lineNumber={startLine}
        onLineNumberChange={(n) => {
          childLine = n;
        }}
      />,
    );
    if (idx < entries.length - 1) {
      childLine += 1;
      childrenLines.push(
        <LineRow
          key={k + idx + "-comma"}
          line={childLine}
          showLineNumbers={showLineNumbers}
          theme={theme}
        >
          <span className={t.punctuation}>,</span>
        </LineRow>,
      );
    }
  });

  const endLine = childLine + 1;

  return (
    <>
      <LineRow
        line={lineNumber}
        showLineNumbers={showLineNumbers}
        theme={theme}
      >
        <span className="flex items-start">
          <button
            type="button"
            onClick={toggleExpanded}
            className="mr-0.5 inline-flex shrink-0 cursor-pointer rounded p-0.5 hover:bg-white/10"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? (
              <ChevronDownIcon className="size-3.5" />
            ) : (
              <ChevronRightIcon className="size-3.5" />
            )}
          </button>
          {keyName !== null && (
            <>
              {renderKey(keyName)}
              <span className={t.punctuation}>: </span>
            </>
          )}
          <span className={t.punctuation}>{opener}</span>
          {!expanded && (
            <>
              <span className={t.punctuation}>{closer}</span>
              {level > 0 && <span className={t.punctuation}>,</span>}
            </>
          )}
        </span>
      </LineRow>
      {expanded && (
        <>
          <div style={{ marginLeft: level === 0 ? 0 : 20 }}>
            {childrenLines}
          </div>
          <LineRow
            line={endLine}
            showLineNumbers={showLineNumbers}
            theme={theme}
          >
            <span className={t.punctuation}>{closer}</span>
            {level > 0 && <span className={t.punctuation}>,</span>}
          </LineRow>
        </>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  JSONViewerUI - main export                                        */
/* ------------------------------------------------------------------ */

/**
 * @component JSONViewerUI
 * @category ui/data-display
 * @since 0.2.0
 * @description Lightweight JSON tree viewer with collapsible nodes,
 *   syntax highlighting, and optional line numbers. / 轻量级 JSON 树查看器，
 *   支持折叠节点、语法高亮和可选行号。
 * @keywords json, viewer, tree, syntax, highlight, collapsible, dark
 * @example
 * ```tsx
 * <JSONViewerUI data={{ name: "John", age: 30, items: [1, 2] }} theme="dark" />
 * ```
 */
function JSONViewerUI({
  data,
  className,
  defaultExpanded = true,
  collapsed = false,
  showLineNumbers = false,
  theme = "dark",
}: JSONViewerUIProps) {
  const t = themes[theme];

  return (
    <div
      data-slot="json-viewer-ui"
      className={cn(
        t.bg,
        t.text,
        "overflow-auto rounded-lg p-3 font-mono text-sm",
        className,
      )}
    >
      <JSONNode
        data={data}
        level={0}
        defaultExpanded={defaultExpanded}
        forceCollapsed={collapsed}
        showLineNumbers={showLineNumbers}
        theme={theme}
        lineNumber={1}
        onLineNumberChange={() => {}}
      />
    </div>
  );
}

export { JSONViewerUI };
export type { JSONViewerUIProps };
