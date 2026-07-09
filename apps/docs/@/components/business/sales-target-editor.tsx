"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Progress, ProgressIndicator } from "@chaos_team/chaos-ui/ui";
import { PlusIcon, Trash2Icon, TargetIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component SalesTargetEditor
 * @category business/finance
 * @since 0.7.0
 * @description 销售目标编辑表 — editable quarterly targets per region with annual totals.
 * @keywords sales, target, editor
 * @param rows Sales target records grouped by year and region.
 * @param onChange Callback fired with the updated rows whenever a quarter changes.
 * @example
 * <SalesTargetEditor rows={[{ id: "1", year: 2026, region: "华东", q1: 100, q2: 120, q3: 130, q4: 150, annual: 500 }]} />
 */

interface SalesTargetRow {
  id: string;
  year: number;
  region: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  annual: number;
}

interface SalesTargetEditorProps {
  rows: SalesTargetRow[];
  onChange?: (rows: unknown[]) => void;
  className?: string;
}

function SalesTargetEditor({
  rows = [],
  onChange,
  className,
}: SalesTargetEditorProps) {
  const [localRows, setLocalRows] = React.useState<SalesTargetRow[]>(rows);

  React.useEffect(() => {
    setLocalRows(rows);
  }, [rows]);

  const commit = (next: SalesTargetRow[]) => {
    setLocalRows(next);
    onChange?.(next);
  };

  const updateQuarter = (
    id: string,
    quarter: "q1" | "q2" | "q3" | "q4",
    val: number,
  ) => {
    commit(
      localRows.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, [quarter]: val };
        updated.annual = updated.q1 + updated.q2 + updated.q3 + updated.q4;
        return updated;
      }),
    );
  };

  const removeRow = (id: string) => {
    commit(localRows.filter((r) => r.id !== id));
  };

  const addRow = () => {
    const id = `row-${Date.now()}`;
    commit([
      ...localRows,
      {
        id,
        year: new Date().getFullYear(),
        region: "",
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        annual: 0,
      },
    ]);
  };

  const maxAnnual = Math.max(1, ...localRows.map((r) => r.annual));

  return (
    <div
      data-slot="sales-target-editor"
      className={cn("flex flex-col gap-3", className)}
    >
      <div className="flex items-center gap-2">
        <TargetIcon className="text-muted-foreground size-5" aria-hidden />
        <h3 className="text-base font-medium">销售目标</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-muted-foreground border-b text-left">
              <th scope="col" className="px-2 py-1.5 font-medium">
                年度
              </th>
              <th scope="col" className="px-2 py-1.5 font-medium">
                区域
              </th>
              <th scope="col" className="px-2 py-1.5 font-medium">
                Q1
              </th>
              <th scope="col" className="px-2 py-1.5 font-medium">
                Q2
              </th>
              <th scope="col" className="px-2 py-1.5 font-medium">
                Q3
              </th>
              <th scope="col" className="px-2 py-1.5 font-medium">
                Q4
              </th>
              <th scope="col" className="px-2 py-1.5 font-medium">
                年度合计
              </th>
              <th scope="col" className="px-2 py-1.5 font-medium">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {localRows.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-muted-foreground px-2 py-4 text-center"
                >
                  暂无目标数据
                </td>
              </tr>
            ) : (
              localRows.map((row) => {
                const pct = Math.min(100, (row.annual / maxAnnual) * 100);
                return (
                  <tr key={row.id} className="border-b last:border-0">
                    <td className="px-2 py-1.5 tabular-nums">{row.year}</td>
                    <td className="px-2 py-1.5">
                      <Input
                        aria-label={`区域 ${row.id}`}
                        value={row.region}
                        onChange={(e) =>
                          commit(
                            localRows.map((r) =>
                              r.id === row.id
                                ? { ...r, region: e.target.value }
                                : r,
                            ),
                          )
                        }
                      />
                    </td>
                    {(["q1", "q2", "q3", "q4"] as const).map((q) => (
                      <td key={q} className="px-2 py-1.5">
                        <Input
                          aria-label={`${q} ${row.id}`}
                          type="number"
                          className="w-20"
                          value={Number.isFinite(row[q]) ? row[q] : 0}
                          onChange={(e) =>
                            updateQuarter(row.id, q, e.target.valueAsNumber)
                          }
                        />
                      </td>
                    ))}
                    <td className="px-2 py-1.5">
                      <div className="flex flex-col gap-1">
                        <Progress value={pct} aria-label={`年度合计 ${row.id}`}>
                          <ProgressIndicator style={{ width: `${pct}%` }} />
                        </Progress>
                        <span className="text-muted-foreground text-xs tabular-nums">
                          {formatNumber(row.annual)}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-1.5">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        aria-label={`删除 ${row.id}`}
                        onClick={() => removeRow(row.id)}
                      >
                        <Trash2Icon className="size-4" aria-hidden />
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-muted-foreground">
          共 {localRows.length} 条
        </Label>
        <Button type="button" variant="outline" size="sm" onClick={addRow}>
          <PlusIcon className="size-4" aria-hidden />
          新增目标
        </Button>
      </div>
    </div>
  );
}

export { SalesTargetEditor };
export type { SalesTargetEditorProps };
