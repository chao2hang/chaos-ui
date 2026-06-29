"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  ScrollArea,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui";

export type Aggregation = "sum" | "count" | "avg" | "min" | "max";

interface PivotTableProps<T extends Record<string, unknown>> {
  data: T[];
  rowField: keyof T;
  columnField: keyof T;
  valueField: keyof T;
  aggregation?: Aggregation;
  className?: string;
  showRowTotal?: boolean;
  showColumnTotal?: boolean;
  filter?: (row: T) => boolean;
  formatValue?: (v: number) => string;
}

function aggregate(values: number[], type: Aggregation): number {
  if (values.length === 0) return 0;
  switch (type) {
    case "sum":
      return values.reduce((a, b) => a + b, 0);
    case "count":
      return values.length;
    case "avg":
      return values.reduce((a, b) => a + b, 0) / values.length;
    case "min":
      return Math.min(...values);
    case "max":
      return Math.max(...values);
  }
}

export function PivotTable<T extends Record<string, unknown>>({
  data,
  rowField,
  columnField,
  valueField,
  aggregation = "sum",
  className,
  showRowTotal = true,
  showColumnTotal = true,
  filter,
  formatValue,
}: PivotTableProps<T>) {
  const { t } = useTranslation("data");
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    let result = data;
    if (filter) result = result.filter(filter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((r) =>
        String(r[rowField]).toLowerCase().includes(q),
      );
    }
    return result;
  }, [data, filter, rowField, search]);

  const matrix = React.useMemo(() => {
    const rowSet = new Set<string>();
    const colSet = new Set<string>();
    for (const r of filtered) {
      rowSet.add(String(r[rowField]));
      colSet.add(String(r[columnField]));
    }
    const rows = Array.from(rowSet).sort();
    const cols = Array.from(colSet).sort();
    const cellMap = new Map<string, number[]>();
    for (const r of filtered) {
      const key = `${r[rowField]}|${r[columnField]}`;
      const arr = cellMap.get(key) ?? [];
      const v = r[valueField];
      arr.push(typeof v === "number" ? v : Number(v) || 0);
      cellMap.set(key, arr);
    }
    return { rows, cols, cellMap };
  }, [filtered, rowField, columnField, valueField]);

  const format =
    formatValue ??
    ((v) => v.toLocaleString("zh-CN", { maximumFractionDigits: 2 }));

  const getCell = (row: string, col: string) => {
    const arr = matrix.cellMap.get(`${row}|${col}`) ?? [];
    return aggregate(arr, aggregation);
  };

  const rowTotals = matrix.rows.map((r) => {
    const allValues: number[] = [];
    for (const c of matrix.cols) {
      const arr = matrix.cellMap.get(`${r}|${c}`) ?? [];
      allValues.push(...arr);
    }
    return aggregate(allValues, aggregation);
  });

  const colTotals = matrix.cols.map((c) => {
    const allValues: number[] = [];
    for (const r of matrix.rows) {
      const arr = matrix.cellMap.get(`${r}|${c}`) ?? [];
      allValues.push(...arr);
    }
    return aggregate(allValues, aggregation);
  });

  const grandTotal = React.useMemo(() => {
    const allValues: number[] = [];
    for (const r of matrix.rows) {
      for (const c of matrix.cols) {
        const arr = matrix.cellMap.get(`${r}|${c}`) ?? [];
        allValues.push(...arr);
      }
    }
    return aggregate(allValues, aggregation);
  }, [matrix, aggregation]);

  return (
    <Card data-slot="pivot-table" className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {String(rowField)} × {String(columnField)} · {aggregation}
        </CardTitle>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("pivotTable.searchPlaceholder")}
          className="h-7 w-48"
        />
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea>
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow className="border-b bg-muted/30">
                <TableHead className="sticky left-0 z-10 bg-muted/30 px-3 py-2 text-left font-medium">
                  {String(rowField)} \ {String(columnField)}
                </TableHead>
                {matrix.cols.map((c) => (
                  <TableHead
                    key={c}
                    className="px-3 py-2 text-right font-medium"
                  >
                    {c}
                  </TableHead>
                ))}
                {showColumnTotal && (
                  <TableHead className="bg-muted/50 px-3 py-2 text-right font-medium">
                    {t("pivotTable.total")}
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {matrix.rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={matrix.cols.length + (showColumnTotal ? 2 : 1)}
                    className="px-3 py-6 text-center text-muted-foreground"
                  >
                    {t("pivotTable.noData")}
                  </TableCell>
                </TableRow>
              ) : (
                matrix.rows.map((r, ri) => (
                  <TableRow
                    key={r}
                    className="border-b last:border-0 hover:bg-muted/20"
                  >
                    <TableCell className="sticky left-0 z-10 bg-background px-3 py-2 font-medium">
                      {r}
                    </TableCell>
                    {matrix.cols.map((c) => (
                      <TableCell
                        key={c}
                        className="px-3 py-2 text-right tabular-nums"
                      >
                        {format(getCell(r, c))}
                      </TableCell>
                    ))}
                    {showColumnTotal && (
                      <TableCell className="bg-muted/30 px-3 py-2 text-right font-semibold tabular-nums">
                        {format(rowTotals[ri] ?? 0)}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
            {showRowTotal && matrix.rows.length > 0 && (
              <TableFooter>
                <TableRow className="bg-muted/30 font-semibold">
                  <TableCell className="sticky left-0 z-10 bg-muted/30 px-3 py-2">
                    {t("pivotTable.total")}
                  </TableCell>
                  {colTotals.map((t, i) => (
                    <TableCell
                      key={i}
                      className="px-3 py-2 text-right tabular-nums"
                    >
                      {format(t)}
                    </TableCell>
                  ))}
                  {showColumnTotal && (
                    <TableCell className="bg-muted/50 px-3 py-2 text-right tabular-nums">
                      {format(grandTotal)}
                    </TableCell>
                  )}
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
