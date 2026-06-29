"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, Trash2Icon } from "lucide-react"

const defaultOperators = [
  { value: "eq", label: "equals" },
  { value: "neq", label: "not equals" },
  { value: "equals", label: "equals (alias)" },
  { value: "not_equals", label: "not equals (alias)" },
  { value: "contains", label: "contains" },
  { value: "gt", label: "greater than" },
  { value: "greater_than", label: "greater than (alias)" },
  { value: "lt", label: "less than" },
  { value: "less_than", label: "less than (alias)" },
  { value: "gte", label: ">= " },
  { value: "lte", label: "<= " },
]

type FieldType = "string" | "number" | "date" | "select" | "boolean"

interface FieldDef {
  key: string
  label: string
  type?: FieldType
  options?: { label: string; value: string }[]
}

interface Filter {
  field: string
  operator: string
  value: string
}

interface FilterBuilderProps {
  fields: FieldDef[]
  initialFilters?: Filter[]
  onChange?: (result: { logic: string; filters: Filter[] }) => void
  className?: string
}

function getFieldType(fields: FieldDef[], key: string): FieldType {
  return fields.find((f) => f.key === key)?.type ?? "string"
}

function FilterValueInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef
  value: string
  onChange: (v: string) => void
}) {
  if (field.type === "select" && field.options?.length) {
    return (
      <Select value={value} onValueChange={(v) => v && onChange(v)}>
        <SelectTrigger className="h-8 flex-1">
          <SelectValue placeholder="Select value" />
        </SelectTrigger>
        <SelectContent>
          {field.options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  if (field.type === "number") {
    return (
      <Input
        className="h-8 flex-1"
        type="number"
        placeholder="Value"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  if (field.type === "date") {
    return (
      <Input
        className="h-8 flex-1"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  return (
    <Input
      className="h-8 flex-1"
      placeholder="Value"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

function FilterBuilder({ fields, initialFilters, onChange, className }: FilterBuilderProps) {
  const [filters, setFilters] = React.useState<Filter[]>(initialFilters ?? [])
  const [logic, setLogic] = React.useState("AND")

  const updateFilters = (next: Filter[]): void => {
    setFilters(next)
    onChange?.({ logic, filters: next })
  }

  const addFilter = (): void => {
    updateFilters([...filters, { field: fields[0]?.key ?? "", operator: "eq", value: "" }])
  }

  const removeFilter = (index: number): void => {
    updateFilters(filters.filter((_, i) => i !== index))
  }

  const updateFilter = (index: number, key: string, val: string): void => {
    const next = filters.map((f, i) => (i === index ? { ...f, [key]: val } : f))
    updateFilters(next)
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Where</span>
        <Select value={logic} onValueChange={(v) => { if (v) { setLogic(v); onChange?.({ logic: v, filters }) } }}>
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
          Add Filter
        </Button>
      </div>
      {filters.length === 0 && (
        <p className="text-sm text-muted-foreground py-4 text-center">No filters applied. Click "Add Filter" to start.</p>
      )}
      {filters.map((filter, i) => {
        const fieldDef = fields.find((f) => f.key === filter.field) ?? { key: filter.field, label: filter.field }
        return (
          <div key={`${filter.field}-${i}`} className="flex items-center gap-2">
            <Select value={filter.field} onValueChange={(v) => v && updateFilter(i, "field", v)}>
              <SelectTrigger className="h-8 w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fields.map((f) => (
                  <SelectItem key={f.key} value={f.key}>{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filter.operator} onValueChange={(v) => v && updateFilter(i, "operator", v)}>
              <SelectTrigger className="h-8 w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {defaultOperators.map((op) => (
                  <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FilterValueInput
              field={{ ...fieldDef, type: getFieldType(fields, filter.field) }}
              value={filter.value}
              onChange={(v) => updateFilter(i, "value", v)}
            />
            <Button variant="ghost" size="icon-sm" onClick={() => removeFilter(i)}>
              <Trash2Icon className="size-4 text-destructive" />
            </Button>
          </div>
        )
      })}
      {filters.length > 0 && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Badge variant="outline">{filters.length} filter(s)</Badge>
          active
        </div>
      )}
    </div>
  )
}

export { FilterBuilder, type FieldDef, type Filter, type FilterBuilderProps }
