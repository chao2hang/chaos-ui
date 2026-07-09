"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Progress, ProgressIndicator } from "@chaos_team/chaos-ui/ui";
import { PlusIcon, Trash2Icon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component PolicyLineEditor
 * @category business/finance
 * @since 0.7.0
 * @description 政策明细编辑器 — editable table of policy lines with usage progress.
 * @keywords policy, line, editor
 * @param rows Policy line records to render and edit.
 * @param onChange Callback fired with the updated rows whenever a field changes.
 * @example
 * <PolicyLineEditor rows={[{ id: "1", name: "满100减20", type: "discount", condition: "≥100", reward: "-20", quota: 1000, used: 120 }]} />
 */

interface PolicyLine {
  id: string;
  name: string;
  type: string;
  condition: string;
  reward: string;
  quota: number;
  used: number;
}

interface PolicyLineEditorProps {
  rows: PolicyLine[];
  onChange?: (rows: unknown[]) => void;
  className?: string;
}

function PolicyLineEditor({
  rows = [],
  onChange,
  className,
}: PolicyLineEditorProps) {
  const [localRows, setLocalRows] = React.useState<PolicyLine[]>(rows);

  React.useEffect(() => {
    setLocalRows(rows);
  }, [rows]);

  const commit = (next: PolicyLine[]) => {
    setLocalRows(next);
    onChange?.(next);
  };

  const updateField = <K extends keyof PolicyLine>(
    id: string,
    key: K,
    val: PolicyLine[K],
  ) => {
    commit(localRows.map((r) => (r.id === id ? { ...r, [key]: val } : r)));
  };

  const removeRow = (id: string) => {
    commit(localRows.filter((r) => r.id !== id));
  };

  const addRow = () => {
    const id = `row-${Date.now()}`;
    commit([
      ...localRows,
      { id, name: "", type: "discount", condition: "", reward: "", quota: 0, used: 0 },
    ]);
  };

  return (
    <div
      data-slot="policy-line-editor"
      className={cn("flex flex-col gap-3", className)}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th scope="col" className="px-2 py-1.5 font-medium">政策名称</th>
            <th scope="col" className="px-2 py-1.5 font-medium">类型</th>
            <th scope="col" className="px-2 py-1.5 font-medium">条件</th>
            <th scope="col" className="px-2 py-1.5 font-medium">奖励</th>
            <th scope="col" className="px-2 py-1.5 font-medium">额度</th>
            <th scope="col" className="px-2 py-1.5 font-medium">使用量</th>
            <th scope="col" className="px-2 py-1.5 font-medium">操作</th>
          </tr>
        </thead>
        <tbody>
          {localRows.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-2 py-4 text-center text-muted-foreground">
                暂无政策明细
              </td>
            </tr>
          ) : (
            localRows.map((row) => {
              const pct =
                row.quota > 0 ? Math.min(100, (row.used / row.quota) * 100) : 0;
              return (
                <tr key={row.id} className="border-b last:border-0">
                  <td className="px-2 py-1.5">
                    <Input
                      aria-label={`政策名称 ${row.id}`}
                      value={row.name}
                      onChange={(e) => updateField(row.id, "name", e.target.value)}
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <Input
                      aria-label={`类型 ${row.id}`}
                      value={row.type}
                      onChange={(e) => updateField(row.id, "type", e.target.value)}
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <Input
                      aria-label={`条件 ${row.id}`}
                      value={row.condition}
                      onChange={(e) => updateField(row.id, "condition", e.target.value)}
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <Input
                      aria-label={`奖励 ${row.id}`}
                      value={row.reward}
                      onChange={(e) => updateField(row.id, "reward", e.target.value)}
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <Input
                      aria-label={`额度 ${row.id}`}
                      type="number"
                      value={Number.isFinite(row.quota) ? row.quota : 0}
                      onChange={(e) =>
                        updateField(row.id, "quota", e.target.valueAsNumber)
                      }
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <div className="flex flex-col gap-1">
                      <Progress value={pct} aria-label={`使用进度 ${row.id}`}>
                        <ProgressIndicator style={{ width: `${pct}%` }} />
                      </Progress>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {row.used} / {row.quota}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-1.5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label={`删除政策 ${row.id}`}
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

      <div className="flex items-center justify-between">
        <Label className="text-muted-foreground">共 {localRows.length} 条</Label>
        <Button type="button" variant="outline" size="sm" onClick={addRow}>
          <PlusIcon className="size-4" aria-hidden />
          新增政策
        </Button>
      </div>
    </div>
  );
}

export { PolicyLineEditor };
export type { PolicyLineEditorProps };
