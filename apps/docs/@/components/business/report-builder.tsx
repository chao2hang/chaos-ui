"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, Trash2Icon, DownloadIcon, EyeIcon } from "lucide-react";

export interface ReportField {
  id: string;
  field: string;
  aggregation: "sum" | "count" | "avg" | "max" | "min";
}

export interface ReportFilter {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface ReportBuilderProps extends React.HTMLAttributes<HTMLDivElement> {
  fields: ReportField[];
  filters: ReportFilter[];
  onFieldsChange?: (fields: ReportField[]) => void;
  onFiltersChange?: (filters: ReportFilter[]) => void;
  onPreview?: () => void;
  onExport?: () => void;
  availableFields?: string[];
  className?: string;
}

let rfId = 0;

const aggregations = [
  { value: "sum", label: "求和" },
  { value: "count", label: "计数" },
  { value: "avg", label: "平均值" },
  { value: "max", label: "最大值" },
  { value: "min", label: "最小值" },
];

function ReportBuilder({
  fields,
  filters,
  onFieldsChange,
  onFiltersChange,
  onPreview,
  onExport,
  availableFields = ["销售额", "订单数", "客户数", "利润率"],
  className,
  ...props
}: ReportBuilderProps) {
  return (
    <div
      data-slot="report-builder"
      className={cn("space-y-4", className)}
      {...props}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">聚合字段</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {fields.map((f) => (
            <div key={f.id} className="flex items-center gap-2">
              <Select
                value={f.field}
                onValueChange={(v) =>
                  onFieldsChange?.(
                    fields.map((x) => (x.id === f.id ? { ...x, field: v } : x)),
                  )
                }
              >
                <SelectTrigger className="h-8 w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableFields.map((af) => (
                    <SelectItem key={af} value={af}>
                      {af}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={f.aggregation}
                onValueChange={(v) =>
                  onFieldsChange?.(
                    fields.map((x) =>
                      x.id === f.id
                        ? { ...x, aggregation: v as ReportField["aggregation"] }
                        : x,
                    ),
                  )
                }
              >
                <SelectTrigger className="h-8 w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {aggregations.map((a) => (
                    <SelectItem key={a.value} value={a.value}>
                      {a.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() =>
                  onFieldsChange?.(fields.filter((x) => x.id !== f.id))
                }
              >
                <Trash2Icon className="size-3.5" />
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              onFieldsChange?.([
                ...fields,
                {
                  id: `f_${++rfId}`,
                  field: availableFields[0],
                  aggregation: "sum",
                },
              ])
            }
          >
            <PlusIcon /> 添加聚合字段
          </Button>
        </CardContent>
      </Card>
      <div className="flex items-center gap-2">
        {onPreview && (
          <Button variant="outline" size="sm" onClick={onPreview}>
            <EyeIcon /> 预览
          </Button>
        )}
        {onExport && (
          <Button size="sm" onClick={onExport}>
            <DownloadIcon /> 导出
          </Button>
        )}
      </div>
    </div>
  );
}

export { ReportBuilder };
export type { ReportBuilderProps, ReportField, ReportFilter };
