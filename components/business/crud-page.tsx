"use client";

import * as React from "react";
import { Button } from "@/components/ui";
import { PageContainer, PageHeader } from "@/components/ui";
import { FilterBar, type FilterField } from "./filter-bar";
import { SearchTable, type ColumnDef } from "./search-table";
import { FormDialog, type FormDialogField } from "./form-dialog";
import { RefreshButton } from "./refresh-button";

/** @deprecated Prefer FormDialogField from form-dialog. Kept for CrudPage API. */
type FormField = FormDialogField;

interface CrudPageProps {
  title: string;
  filterFields: FilterField[];
  columns: ColumnDef[];
  dataSource: Record<string, unknown>[];
  rowKey?: string;
  loading?: boolean;
  pagination?:
    | false
    | {
        current: number;
        pageSize: number;
        total: number;
        onChange: (page: number, pageSize: number) => void;
      }
    | undefined;
  formFields?: FormField[];
  formTitle?: string;
  dialogOpen?: boolean;
  onDialogOpenChange?: (open: boolean) => void;
  editingRecord?: Record<string, unknown> | null;
  actions?: React.ReactNode;
  /** Built-in refresh button (shown when onRefresh provided). / 内置刷新按钮 */
  onRefresh?: () => void;
  /** When true, spins/disables the built-in refresh button. / 刷新中 */
  refreshing?: boolean;
  /** Built-in add button (shown when onAdd provided). / 内置新增按钮 */
  onAdd?: () => void;
  /** Edit a record (sets editingRecord + opens dialog). / 编辑记录 */
  onEdit?: (record: Record<string, unknown>) => void;
  onSearch: (values: Record<string, unknown>) => void;
  onDelete?: (record: Record<string, unknown>) => void;
  onSubmit?: (values: Record<string, unknown>) => void;
  rowSelection?: {
    selectedRowKeys: string[];
    onChange: (keys: string[]) => void;
  };
  className?: string;
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
  refreshing = false,
  onAdd,
  onEdit,
  onSearch,
  onDelete,
  onSubmit,
  className,
}: CrudPageProps) {
  // Enrich columns with operation column
  const enrichedColumns = React.useMemo(() => {
    if (!onDelete && !onSubmit && !onEdit) return columns;
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
                  if (onEdit) onEdit(record);
                  else onDialogOpenChange?.(true);
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
    ];
  }, [columns, onDelete, onSubmit, onEdit, onDialogOpenChange]);

  // Built-in standard actions (refresh + add) so each page doesn't hand-write
  // the same icon/size/variant. Custom `actions` render alongside.
  const builtinActions = (
    <>
      {onRefresh && <RefreshButton onClick={onRefresh} loading={refreshing} />}
      {onAdd && (
        <Button size="sm" onClick={onAdd}>
          新增
        </Button>
      )}
    </>
  );

  return (
    <PageContainer data-slot="crud-page" className={className}>
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
          key={
            editingRecord
              ? `edit-${String(editingRecord[rowKey] ?? "")}`
              : `new-${dialogOpen ? "1" : "0"}`
          }
          title={formTitle}
          fields={formFields}
          record={editingRecord}
          onSubmit={onSubmit}
          open={dialogOpen ?? false}
          onOpenChange={onDialogOpenChange}
        />
      )}
    </PageContainer>
  );
}

export { CrudPage };
export type { CrudPageProps, FormField };
