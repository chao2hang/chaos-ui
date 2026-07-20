"use client";
import * as React from "react";
import {
  DownloadIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  PrinterIcon,
} from "@/components/ui/icons";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { toast } from "sonner";

export type ExportFormat = "csv" | "xlsx" | "json" | "pdf" | "print";

interface ExportButtonProps<T> {
  data: T[];
  filename?: string;
  formats?: ExportFormat[];
  columns?: Array<{
    key: keyof T;
    header: string;
    format?: (v: unknown) => string;
  }>;
  className?: string;
  size?: "sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg";
  variant?: "default" | "outline" | "secondary" | "ghost";
  label?: string;
  onExport?: (format: ExportFormat, data: T[]) => void;
}

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/** Escape text for HTML document.write print export (not for CSV). */
function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * @component ExportButton
 * @category business/ux
 * @since 0.2.0
 * @description Data export button supporting CSV, XLSX, JSON, PDF, and print formats with column mapping and custom callbacks / 数据导出按钮，支持 CSV/XLSX/JSON/PDF/打印格式，含列映射和自定义回调
 * @keywords export, download, csv, xlsx, json, pdf, print
 * @example
 * <ExportButton data={rows} filename="report" formats={["csv", "xlsx"]} />
 */
export function ExportButton<T extends Record<string, unknown>>({
  data,
  filename = "export",
  formats = ["csv", "xlsx", "json"],
  columns,
  className,
  size = "default",
  variant = "outline",
  label,
  onExport,
}: ExportButtonProps<T>) {
  const { t } = useTranslation("upload");
  const resolvedLabel = label ?? t("exportButton.label");
  const getColumns = React.useCallback((): Array<{
    key: keyof T;
    header: string;
    format?: (v: unknown) => string;
  }> => {
    if (columns) return columns;
    if (data.length === 0) return [];
    return Object.keys(data[0] as object).map((k) => ({
      key: k as keyof T,
      header: k,
    }));
  }, [columns, data]);

  const exportCsv = () => {
    const cols = getColumns();
    const header = cols.map((c) => escapeCsv(c.header)).join(",");
    const rows = data.map((row) =>
      cols
        .map((c) => escapeCsv(c.format ? c.format(row[c.key]) : row[c.key]))
        .join(","),
    );
    const csv = "\uFEFF" + [header, ...rows].join("\n");
    downloadBlob(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
      `${filename}.csv`,
    );
  };

  const exportXlsx = () => {
    const cols = getColumns();
    const rows = data.map((row) =>
      cols.map((c) => (c.format ? c.format(row[c.key]) : row[c.key]) ?? ""),
    );
    const tsv = [
      cols.map((c) => c.header).join("\t"),
      ...rows.map((r) => r.join("\t")),
    ].join("\n");
    downloadBlob(
      new Blob([tsv], { type: "application/vnd.ms-excel" }),
      `${filename}.xls`,
    );
  };

  const exportJson = () => {
    const json = JSON.stringify(data, null, 2);
    downloadBlob(
      new Blob([json], { type: "application/json" }),
      `${filename}.json`,
    );
  };

  const exportPrint = () => {
    if (typeof window === "undefined") return;
    const cols = getColumns();
    const win = window.open("", "_blank");
    if (!win) {
      toast.error(t("exportButton.popupBlocked"));
      return;
    }
    const styles = `
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #111; }
        h1 { font-size: 18px; margin-bottom: 12px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; }
        th { background: #f5f5f5; }
      </style>
    `;
    const safeTitle = escapeHtml(filename);
    const headerRow = cols
      .map((c) => `<th>${escapeHtml(c.header)}</th>`)
      .join("");
    const bodyRows = data
      .map(
        (row) =>
          `<tr>${cols
            .map((c) => {
              const raw = c.format ? c.format(row[c.key]) : (row[c.key] ?? "");
              return `<td>${escapeHtml(raw)}</td>`;
            })
            .join("")}</tr>`,
      )
      .join("");
    win.document.write(
      `<html><head><title>${safeTitle}</title>${styles}</head><body><h1>${safeTitle}</h1><table><thead><tr>${headerRow}</tr></thead><tbody>${bodyRows}</tbody></table></body></html>`,
    );
    win.document.close();
    win.print();
  };

  const handlers: Record<ExportFormat, () => void> = {
    csv: exportCsv,
    xlsx: exportXlsx,
    json: exportJson,
    pdf: exportCsv,
    print: exportPrint,
  };

  if (formats.length === 1) {
    const onlyFormat = formats[0];
    if (!onlyFormat) return null;
    return (
      <Button
        data-slot="export-button"
        variant={variant}
        size={size}
        className={className}
        onClick={() => {
          handlers[onlyFormat]();
          onExport?.(onlyFormat, data);
        }}
      >
        <DownloadIcon />
        {resolvedLabel}
      </Button>
    );
  }

  const formatLabels: Record<ExportFormat, string> = {
    csv: t("exportButton.csv"),
    xlsx: t("exportButton.xlsx"),
    json: t("exportButton.json"),
    pdf: t("exportButton.pdf"),
    print: t("exportButton.print"),
  };

  return (
    <DropdownMenu data-slot="export-button">
      <DropdownMenuTrigger
        render={
          <Button variant={variant} size={size} className={cn(className)} />
        }
      >
        <DownloadIcon />
        {resolvedLabel}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {formats.map((f) => (
          <DropdownMenuItem
            key={f}
            onClick={() => {
              handlers[f]();
              onExport?.(f, data);
            }}
          >
            {f === "csv" && <FileTextIcon />}
            {f === "xlsx" && <FileSpreadsheetIcon />}
            {f === "json" && <FileTextIcon />}
            {f === "pdf" && <FileTextIcon />}
            {f === "print" && <PrinterIcon />}
            {formatLabels[f]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
