"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Input } from "@/components/ui";
import { Badge } from "@/components/ui";
import { PlusIcon, Trash2Icon } from "@/components/ui/icons";

const defaultOperators: Array<{ value: string; labelKey: string }> = [
  { value: "eq", labelKey: "filterBuilder.operator.equals" },
  { value: "neq", labelKey: "filterBuilder.operator.notEquals" },
  { value: "contains", labelKey: "filterBuilder.operator.contains" },
  { value: "gt", labelKey: "filterBuilder.operator.greaterThan" },
  { value: "lt", labelKey: "filterBuilder.operator.lessThan" },
  { value: "gte", labelKey: "filterBuilder.operator.gte" },
  { value: "lte", labelKey: "filterBuilder.operator.lte" },
];

type FilterRule = {
  field: string;
  operator: string;
  value: string;
};

/**
 * @component FilterBuilder
 * @category business/ux
 * @since 0.2.0
 * @description Visual query builder for constructing AND/OR filter rules with field, operator, and value inputs / 可视化查询构建器，通过字段、运算符和值输入构建 AND/OR 过滤规则
 * @keywords filter, query, builder, search, where, condition
 * @example
 * <FilterBuilder fields={[{ key: "name", label: "Name" }]} onChange={handleChange} />
 */
function FilterBuilder({
  fields,
  onChange,
  className,
}: {
  fields: { key: string; label: string }[];
  onChange?: (result: {
    logic: string;
    filters: { field: string; operator: string; value: string }[];
  }) => void;
  className?: string;
}) {
  const { t } = useTranslation("data");
  const [filters, setFilters] = React.useState<FilterRule[]>([]);
  const [logic, setLogic] = React.useState("AND");

  const updateFilters = (next: FilterRule[]): void => {
    setFilters(next);
    onChange?.({ logic, filters: next });
  };

  const addFilter = (): void => {
    updateFilters([
      ...filters,
      { field: fields[0]?.key ?? "", operator: "eq", value: "" },
    ]);
  };

  const removeFilter = (index: number): void => {
    updateFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilter = (index: number, key: string, val: string): void => {
    const next = filters.map((f, i) =>
      i === index ? { ...f, [key]: val } : f,
    );
    updateFilters(next);
  };

  return (
    <div data-slot="filter-builder" className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{t("filterBuilder.where")}</span>
        <Select
          value={logic}
          onValueChange={(v) => {
            if (v) {
              setLogic(v);
              onChange?.({ logic: v, filters });
            }
          }}
        >
          <SelectTrigger className="h-7 w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AND">AND</SelectItem>
            <SelectItem value="OR">OR</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={addFilter}>
          <PlusIcon className="size-3 mr-1" />
          {t("filterBuilder.addFilter")}
        </Button>
      </div>
      {filters.length === 0 && (
        <p className="text-sm text-muted-foreground py-4 text-center">
          {t("filterBuilder.empty")}
        </p>
      )}
      {filters.map((filter, i) => (
        <div key={i} className="flex items-center gap-2">
          <Select
            value={filter.field}
            onValueChange={(v) => v && updateFilter(i, "field", v)}
          >
            <SelectTrigger className="h-8 w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fields.map((f) => (
                <SelectItem key={f.key} value={f.key}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filter.operator}
            onValueChange={(v) => v && updateFilter(i, "operator", v)}
          >
            <SelectTrigger className="h-8 w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {defaultOperators.map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {t(op.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            className="h-8 flex-1"
            placeholder={t("filterBuilder.valuePlaceholder")}
            value={filter.value}
            onChange={(e) => updateFilter(i, "value", e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => removeFilter(i)}
          >
            <Trash2Icon className="size-4 text-destructive" />
          </Button>
        </div>
      ))}
      {filters.length > 0 && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Badge variant="outline">
            {t("filterBuilder.activeCount", { count: filters.length })}
          </Badge>
          {t("filterBuilder.active")}
        </div>
      )}
    </div>
  );
}

export { FilterBuilder };
