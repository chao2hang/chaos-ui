"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component SequencePreview
 * @category ui/display
 * @since 0.7.0
 * @description 编号预览组件 — 展示编号规则生成的示例，含前缀+日期+序号。
 * / Sequence preview — displays a generated sequence example.
 * @keywords sequence, preview, number, code, rule
 * @example
 * <SequencePreview prefix="ORD" date={new Date()} seq={1} zeroFill={4} />
 */
interface SequencePreviewProps extends React.ComponentProps<"div"> {
  /** Prefix / 前缀 */
  prefix?: string;
  /** Date used in the sequence / 编号中的日期 */
  date?: Date;
  /** Date format: "YYYYMMDD" | "YYMMDD" | "none" / 日期格式 */
  dateFormat?: "YYYYMMDD" | "YYMMDD" | "none";
  /** Sequence number / 序号 */
  seq?: number;
  /** Zero-fill width / 补零位数 */
  zeroFill?: number;
  /** Separator between parts / 分隔符 */
  separator?: string;
}

function SequencePreview({
  prefix = "",
  date = new Date(),
  dateFormat = "YYYYMMDD",
  seq = 1,
  zeroFill = 4,
  separator = "-",
  className,
  ...props
}: SequencePreviewProps) {
  const parts: string[] = [];
  if (prefix) parts.push(prefix);

  if (dateFormat !== "none") {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    parts.push(
      dateFormat === "YYYYMMDD"
        ? `${y}${m}${d}`
        : `${String(y).slice(2)}${m}${d}`,
    );
  }

  parts.push(String(seq).padStart(zeroFill, "0"));

  const result = parts.join(separator);

  return (
    <div
      data-slot="sequence-preview"
      className={cn(
        "border-border bg-muted/30 inline-flex items-center gap-2 rounded-md border border-dashed px-3 py-1.5",
        className,
      )}
      {...props}
    >
      <span className="font-mono text-sm font-medium tracking-wider">
        {result}
      </span>
    </div>
  );
}

export { SequencePreview };
export type { SequencePreviewProps };
