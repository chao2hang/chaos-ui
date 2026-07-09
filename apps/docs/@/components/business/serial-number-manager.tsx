"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@chaos_team/chaos-ui/ui";
import { PlusIcon, Trash2Icon, CopyIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component SerialNumberManager
 * @category business/bill
 * @since 0.7.0
 * @description 编号规则管理器。维护单据编号的 前缀 / 日期格式 / 补零位数 / 分隔符，并实时预览生成示例。
 * @param rules 规则列表
 * @param onChange 规则变更回调
 * @example
 * <SerialNumberManager rules={[{ prefix: "BILL", dateFormat: "yyyyMMdd", zeroFill: 4, separator: "-" }]} />
 */

interface SerialNumberRule {
  prefix: string;
  dateFormat: string;
  zeroFill: number;
  separator: string;
}

interface SerialNumberManagerProps {
  rules: Array<SerialNumberRule>;
  onChange?: (rules: unknown[]) => void;
  className?: string;
}

function preview(rule: SerialNumberRule): string {
  const now = new Date();
  const map: Record<string, string> = {
    yyyy: String(now.getFullYear()),
    yy: String(now.getFullYear()).slice(-2),
    MM: String(now.getMonth() + 1).padStart(2, "0"),
    dd: String(now.getDate()).padStart(2, "0"),
    HH: String(now.getHours()).padStart(2, "0"),
    mm: String(now.getMinutes()).padStart(2, "0"),
    ss: String(now.getSeconds()).padStart(2, "0"),
  };
  let datePart = rule.dateFormat;
  for (const [k, v] of Object.entries(map)) {
    datePart = datePart.replaceAll(k, v);
  }
  const seq = String(1).padStart(Math.max(0, rule.zeroFill), "0");
  return [rule.prefix, datePart, seq]
    .filter(Boolean)
    .join(rule.separator || "-");
}

function SerialNumberManager({
  rules = [],
  onChange,
  className,
}: SerialNumberManagerProps) {
  const [local, setLocal] = React.useState<SerialNumberRule[]>(rules);

  React.useEffect(() => {
    setLocal(rules);
  }, [rules]);

  const emit = (next: SerialNumberRule[]) => {
    setLocal(next);
    onChange?.(next);
  };

  const update = (idx: number, patch: Partial<SerialNumberRule>) => {
    const next = local.map((r, i) => (i === idx ? { ...r, ...patch } : r));
    emit(next);
  };

  const add = () => {
    emit([
      ...local,
      { prefix: "NO", dateFormat: "yyyyMMdd", zeroFill: 4, separator: "-" },
    ]);
  };

  const remove = (idx: number) => {
    emit(local.filter((_, i) => i !== idx));
  };

  const duplicate = (idx: number) => {
    const source = local[idx];
    if (!source) return;
    const copy: SerialNumberRule = { ...source };
    emit([...local, copy]);
  };

  return (
    <Card data-slot="serial-number-manager" className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>编号规则管理</span>
          <Button type="button" variant="outline" size="sm" onClick={add}>
            <PlusIcon /> 新增规则
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {local.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center text-sm">
            暂无编号规则，点击“新增规则”创建。
          </p>
        ) : (
          <ul role="list" className="flex flex-col gap-3">
            {local.map((rule, idx) => (
              <li
                key={idx}
                className="bg-muted/30 flex flex-col gap-3 rounded-lg border p-3"
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor={`prefix-${idx}`}>前缀</Label>
                    <Input
                      id={`prefix-${idx}`}
                      value={rule.prefix}
                      onChange={(e) => update(idx, { prefix: e.target.value })}
                      placeholder="BILL"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor={`date-${idx}`}>日期格式</Label>
                    <Input
                      id={`date-${idx}`}
                      value={rule.dateFormat}
                      onChange={(e) =>
                        update(idx, { dateFormat: e.target.value })
                      }
                      placeholder="yyyyMMdd"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor={`fill-${idx}`}>补零位数</Label>
                    <Input
                      id={`fill-${idx}`}
                      type="number"
                      min={0}
                      value={rule.zeroFill}
                      onChange={(e) =>
                        update(idx, {
                          zeroFill: Math.max(0, Number(e.target.value) || 0),
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor={`sep-${idx}`}>分隔符</Label>
                    <Input
                      id={`sep-${idx}`}
                      value={rule.separator}
                      onChange={(e) =>
                        update(idx, { separator: e.target.value })
                      }
                      placeholder="-"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground text-xs">示例：</span>
                  <code className="bg-card flex-1 truncate rounded px-2 py-1 font-mono text-xs">
                    {preview(rule)}
                  </code>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="复制规则"
                    onClick={() => duplicate(idx)}
                  >
                    <CopyIcon />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="删除规则"
                    onClick={() => remove(idx)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export { SerialNumberManager };
export type { SerialNumberManagerProps };
