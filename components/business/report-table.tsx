"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  ProTable,
  type ProColumn,
  type Density,
} from "@/components/business/pro-table";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

/**
 * @component ReportTable
 * @category business/data
 * @since 1.14.0
 * @description 报表型服务端列表，对齐 Ecology WeaTable：列元数据 JSON + 服务端 loadData
 * 分页/排序 + 合计行。内部复用 ProTable（列设置/密度/导出），不另起表格引擎。
 * / Server-driven report table aligning with Ecology WeaTable: column-metadata JSON +
 * server loadData (pagination/sort) + summary row. Reuses ProTable internally.
 * @keywords report, table, server, summary, total, weatable
 * @example
 * ```tsx
 * <ReportTable
 *   columns={[
 *     { key: 'name', title: '名称' },
 *     { key: 'amount', title: '金额', dataType: 'money', sortable: true },
 *   ]}
 *   loadData={async (p) => ({ rows: await api.page(p), total: 100, summary: { amount: 9999 } })}
 *   rowKey="id"
 * />
 * ```
 */

/* ------------------------------------------------------------------ */
/*  Protocol types                                                      */
/* ------------------------------------------------------------------ */

export type ReportDataType = "text" | "number" | "date" | "money" | "enum";
export type ReportRender = "text" | "badge" | "link" | "money" | "datetime";

export interface ReportColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  fixed?: "left" | "right";
  hidden?: boolean;
  dataType?: ReportDataType;
  /** Built-in cell renderer. / 内置渲染类型 */
  render?: ReportRender;
  /** Enum map for badge/text rendering. / 枚举映射 */
  enumMap?: Record<string, { label: string; color?: string }>;
  /** Permission key (consumer-side gate). / 权限标识 */
  permission?: string;
  /** Custom cell renderer (overrides built-in). / 自定义渲染 */
  cellRender?: (value: unknown, row: T, index: number) => React.ReactNode;
  /** Link href builder (when render === 'link'). / 链接构造 */
  href?: (row: T) => string;
}

export interface ReportLoadParams {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, unknown>;
}

export interface ReportLoadResult<T = Record<string, unknown>> {
  rows: T[];
  total: number;
  /** Column-key → aggregate value for the summary row. / 列键→合计值 */
  summary?: Record<string, number | string>;
}

export interface ReportTableProps<T = Record<string, unknown>> {
  columns: ReportColumn<T>[];
  loadData: (params: ReportLoadParams) => Promise<ReportLoadResult<T>>;
  rowKey?: string;
  /** Initial page size (default 10). / 初始每页条数 */
  pageSize?: number;
  /** Initial density. / 初始密度 */
  density?: Density;
  /** Enable column settings (default true). / 启用列设置 */
  columnSettings?: boolean;
  /** Export hook. / 导出钩子 */
  onExport?: (payload: { columns: ReportColumn<T>[]; rows: T[] }) => void;
  /** Enable column-settings persistence (localStorage key). / 列设置持久化 key */
  storageKey?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Cell renderers                                                      */
/* ------------------------------------------------------------------ */

function renderCell<T>(
  col: ReportColumn<T>,
  value: unknown,
  row: T,
  index: number,
): React.ReactNode {
  if (col.cellRender) return col.cellRender(value, row, index);

  const str = value == null ? "" : String(value);

  switch (col.render) {
    case "money":
      return (
        <span className="tabular-nums">
          {formatCurrency(typeof value === "number" ? value : Number(str) || 0)}
        </span>
      );
    case "datetime":
      return value ? formatDateTime(value as string | number | Date) : "-";
    case "link": {
      const href = col.href?.(row);
      return href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          {str || "-"}
        </a>
      ) : (
        str || "-"
      );
    }
    case "badge": {
      const entry = value != null ? col.enumMap?.[str] : undefined;
      return entry ? (
        <Badge
          variant={entry.color === "destructive" ? "destructive" : "secondary"}
        >
          {entry.label}
        </Badge>
      ) : (
        str || "-"
      );
    }
    case "text":
    default:
      if (col.dataType === "number") {
        return value == null || value === ""
          ? "-"
          : formatNumber(Number(value));
      }
      return str || "-";
  }
}

/* ------------------------------------------------------------------ */
/*  ReportTable                                                          */
/* ------------------------------------------------------------------ */

function ReportTable<T extends Record<string, unknown>>({
  columns,
  loadData,
  rowKey = "id",
  pageSize: pageSizeProp = 10,
  density = "default",
  columnSettings = true,
  onExport,
  storageKey,
  className,
}: ReportTableProps<T>) {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(pageSizeProp);
  const [rows, setRows] = React.useState<T[]>([]);
  const [total, setTotal] = React.useState(0);
  const [summary, setSummary] = React.useState<
    Record<string, number | string> | undefined
  >();
  const [loading, setLoading] = React.useState(false);

  // Keep latest loadData without refetching when parent passes an inline function.
  const loadDataRef = React.useRef(loadData);
  React.useEffect(() => {
    loadDataRef.current = loadData;
  }, [loadData]);

  // Load data on page/pageSize changes only.
  // NOTE: sort wiring is deferred to v2 (ProTable manages visual sort internally
  // and does not yet expose an onSort callback). Consumers needing server-side sort
  // can pass filters via a wrapper until then.
  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadDataRef
      .current({ page, pageSize })
      .then((res) => {
        if (cancelled) return;
        setRows(res.rows);
        setTotal(res.total);
        setSummary(res.summary);
      })
      .catch(() => {
        if (cancelled) return;
        setRows([]);
        setTotal(0);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page, pageSize]);

  // Restore column visibility from localStorage
  const hiddenFromStorage = React.useMemo(() => {
    if (!storageKey || typeof window === "undefined") return {};
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  }, [storageKey]);

  // Map ReportColumn → ProColumn
  const proColumns: ProColumn<T>[] = React.useMemo(
    () =>
      columns.map((col) => ({
        key: col.key,
        title: col.title,
        dataIndex: col.key,
        ...(typeof col.width === "number" ? { width: col.width } : {}),
        ...(col.fixed ? { fixed: col.fixed } : {}),
        visible: hiddenFromStorage[col.key] !== false && !col.hidden,
        ...(col.sortable !== undefined ? { sortable: col.sortable } : {}),
        resizable: true,
        render: (value: unknown, row: T, index: number) =>
          renderCell(col, value, row, index),
      })),
    [columns, hiddenFromStorage],
  );

  // Summary row values for numeric columns
  const summaryCells = React.useMemo(() => {
    if (!summary) return [];
    return columns.map((col) => ({
      key: col.key,
      value: summary[col.key],
      align: col.align,
    }));
  }, [summary, columns]);

  const hasSummary = summary && summaryCells.some((c) => c.value != null);

  const exportHandler = React.useMemo(() => {
    if (!onExport) return undefined;
    return (payload: { data: T[] }) =>
      onExport({
        columns,
        rows: payload.data,
      });
  }, [onExport, columns]);

  return (
    <div data-slot="report-table" className={cn("w-full", className)}>
      <ProTable<T>
        columns={proColumns}
        data={rows}
        loading={loading}
        density={density}
        columnSettings={columnSettings}
        rowKey={rowKey}
        pagination={{
          current: page - 1,
          pageSize,
          total,
          onChange: (p, ps) => {
            setPage(p + 1);
            setPageSize(ps);
          },
        }}
        {...(exportHandler ? { onExport: exportHandler } : {})}
      />

      {/* Sort trigger via header click is handled inside ProTable when sortable.
          Summary footer */}
      {hasSummary && (
        <div className="border-t">
          <div className="bg-muted/40 flex items-center border-t text-sm font-medium">
            {summaryCells.map((c) => (
              <div
                key={c.key}
                className={cn(
                  "flex-1 px-2 py-1.5",
                  c.align === "right" && "text-right",
                  c.align === "center" && "text-center",
                )}
              >
                {c.value != null
                  ? typeof c.value === "number"
                    ? formatNumber(c.value)
                    : c.value
                  : ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { ReportTable };
