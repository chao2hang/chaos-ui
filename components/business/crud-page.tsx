"use client"

import * as React from "react"
import { Button } from "@/components/ui"
import { PageContainer, PageHeader } from "@/components/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui"
import { FilterBar, type FilterField } from "./filter-bar"
import { SearchTable, type ColumnDef } from "./search-table"

interface FormField {
  key: string
  label: string
  type?: "input" | "select" | "number" | "date" | "textarea" | "custom"
  required?: boolean
  placeholder?: string
  options?: { label: string; value: string }[]
  render?: (value: unknown, onChange: (val: unknown) => void) => React.ReactNode
  defaultValue?: unknown
}

interface CrudPageProps {
  title: string
  filterFields: FilterField[]
  columns: ColumnDef[]
  dataSource: Record<string, unknown>[]
  rowKey?: string
  loading?: boolean
  pagination?: false | {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize: number) => void
  } | undefined
  formFields?: FormField[]
  formTitle?: string
  dialogOpen?: boolean
  onDialogOpenChange?: (open: boolean) => void
  editingRecord?: Record<string, unknown> | null
  actions?: React.ReactNode
  /** Built-in refresh button (shown when onRefresh provided). / 内置刷新按钮 */
  onRefresh?: () => void
  /** Built-in add button (shown when onAdd provided). / 内置新增按钮 */
  onAdd?: () => void
  /** Edit a record (sets editingRecord + opens dialog). / 编辑记录 */
  onEdit?: (record: Record<string, unknown>) => void
  onSearch: (values: Record<string, unknown>) => void
  onDelete?: (record: Record<string, unknown>) => void
  onSubmit?: (values: Record<string, unknown>) => void
  rowSelection?: {
    selectedRowKeys: string[]
    onChange: (keys: string[]) => void
  }
  className?: string
}

/** Internal form dialog that remounts via key, avoiding useEffect setState */
function FormDialog({
  open,
  onOpenChange,
  title,
  fields,
  record,
  onSubmit,
}: {
  open?: boolean | undefined
  onOpenChange?: ((open: boolean) => void) | undefined
  title: string
  fields: FormField[]
  record?: Record<string, unknown> | null | undefined
  onSubmit?: ((values: Record<string, unknown>) => void) | undefined
}) {
  const initial = React.useMemo(() => {
    if (record) return { ...record }
    const init: Record<string, unknown> = {}
    fields.forEach((f) => {
      if (f.defaultValue !== undefined) init[f.key] = f.defaultValue
    })
    return init
  }, [record, fields])

  const [values, setValues] = React.useState(initial)

  const handleChange = (key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const renderField = (field: FormField) => {
    if (field.render) {
      return field.render(values[field.key], (val) => handleChange(field.key, val))
    }

    const value = values[field.key]

    if (field.type === "select" && field.options) {
      return (
        <select
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          value={String(value ?? "")}
          onChange={(e) => handleChange(field.key, e.target.value || undefined)}
        >
          <option value="">{field.placeholder || `请选择${field.label}`}</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )
    }

    if (field.type === "textarea") {
      return (
        <textarea
          className="min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder={field.placeholder}
          value={String(value ?? "")}
          onChange={(e) => handleChange(field.key, e.target.value)}
        />
      )
    }

    if (field.type === "number") {
      return (
        <input
          type="number"
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          placeholder={field.placeholder}
          value={value != null ? String(value) : ""}
          onChange={(e) => handleChange(field.key, e.target.valueAsNumber || undefined)}
        />
      )
    }

    return (
      <input
        className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        placeholder={field.placeholder}
        value={String(value ?? "")}
        onChange={(e) => handleChange(field.key, e.target.value)}
      />
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                {field.label}
                {field.required && <span className="ml-1 text-red-500">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            取消
          </Button>
          <Button onClick={() => onSubmit?.(values)}>
            确定
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/**
 * 增删改查标准页 —— 搜索 + 表格 + 新增/编辑弹窗 一体。
 *
 * @component CrudPage
 * @category business/crud
 * @since 0.2.0
 */
function CrudPage({
  title,
  filterFields,
  columns,
  dataSource,
  rowKey = "id",
  loading = false,
  pagination,
  formFields,
  formTitle = "表单",
  dialogOpen,
  onDialogOpenChange,
  editingRecord,
  actions,
  onRefresh,
  onAdd,
  onEdit,
  onSearch,
  onDelete,
  onSubmit,
  className,
}: CrudPageProps) {
  // Enrich columns with operation column
  const enrichedColumns = React.useMemo(() => {
    if (!onDelete && !onSubmit && !onEdit) return columns
    return [
      ...columns,
      {
        key: "_operations",
        title: "操作",
        width: 120,
        align: "center" as const,
        render: (_: unknown, record: Record<string, unknown>) => (
          <div className="flex items-center justify-center gap-1">
            {(onSubmit || onEdit) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Prefer onEdit (sets editingRecord) over raw dialog open.
                  if (onEdit) onEdit(record)
                  else onDialogOpenChange?.(true)
                }}
              >
                编辑
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => onDelete(record)}
              >
                删除
              </Button>
            )}
          </div>
        ),
      },
    ]
  }, [columns, onDelete, onSubmit, onEdit, onDialogOpenChange])

  // Built-in standard actions (refresh + add) so each page doesn't hand-write
  // the same icon/size/variant. Custom `actions` render alongside.
  const builtinActions = (
    <>
      {onRefresh && (
        <Button variant="outline" size="sm" onClick={onRefresh}>
          刷新
        </Button>
      )}
      {onAdd && (
        <Button size="sm" onClick={onAdd}>
          新增
        </Button>
      )}
    </>
  )

  return (
    <PageContainer className={className}>
      <PageHeader title={title} />

      <div className="mb-4">
        <FilterBar fields={filterFields} onSearch={onSearch} />
      </div>

      {(actions || onRefresh || onAdd) && (
        <div className="mb-3 flex items-center gap-2">
          {builtinActions}
          {actions}
        </div>
      )}

      <SearchTable
        columns={enrichedColumns}
        dataSource={dataSource}
        rowKey={rowKey}
        loading={loading}
        pagination={pagination}
      />

      {formFields && (
        <FormDialog
          key={editingRecord ? `edit-${String(editingRecord[rowKey] ?? "")}` : `new-${dialogOpen ? "1" : "0"}`}
          open={dialogOpen}
          onOpenChange={onDialogOpenChange}
          title={formTitle}
          fields={formFields}
          record={editingRecord}
          onSubmit={onSubmit}
        />
      )}
    </PageContainer>
  )
}

export { CrudPage }
export type { CrudPageProps, FormField }
