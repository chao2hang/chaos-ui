"use client";

import * as React from "react";
import { Plus, RefreshCw, Download, Trash2, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchTable } from "@/components/business/search-table";
import type { SearchTableColumn, PaginationConfig } from "@/components/business/search-table";
import type { FilterField } from "@/components/business/filter-bar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * @component CrudPage
 * @category business/crud
 * @since 0.2.0
 * @description 增删改查标准页(搜索栏+操作栏+表格+表单弹窗+删除确认) / Standard CRUD page with search, actions, table, form modal, and delete confirmation
 * @keywords crud, page, create, read, update, delete, modal, table
 * @example
 * <CrudPage
 *   filterFields={[{ name: 'keyword', label: 'Keyword', type: 'search' }]}
 *   columns={[{ key: 'name', title: 'Name' }]}
 *   dataSource={data}
 *   formFields={[{ name: 'name', label: 'Name', required: true }]}
 *   onSubmit={handleSubmit}
 *   onDelete={handleDelete}
 * />
 */

interface CrudFormField {
  name: string;
  label: string;
  type?: "input" | "number" | "select";
  required?: boolean;
  options?: { label: string; value: string | number }[];
  placeholder?: string;
  span?: number;
}

interface CrudAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "destructive" | "ghost";
  disabled?: boolean;
}

interface CrudPageProps extends Omit<React.ComponentProps<"div">, "onSubmit" | "onReset"> {
  /** Filter field configs / 筛选字段配置 */
  filterFields?: FilterField[];
  /** Table columns / 表格列定义 */
  columns: SearchTableColumn[];
  /** Table data / 表格数据 */
  dataSource?: Record<string, unknown>[];
  /** Row key field / 行 key 字段 */
  rowKey?: string;
  /** Pagination config / 分页配置 */
  pagination?: PaginationConfig | false;
  /** Search callback / 搜索回调 */
  onSearch?: (values: Record<string, unknown>) => void;
  /** Reset callback / 重置回调 */
  onReset?: () => void;
  /** Page change callback / 页码变更回调 */
  onPageChange?: (page: number, pageSize: number) => void;
  /** Loading state / 加载状态 */
  loading?: boolean;
  /** Form field configs for create/edit modal / 表单字段配置 */
  formFields?: CrudFormField[];
  /** Submit callback (create or edit) / 提交回调 */
  onSubmit?: (values: Record<string, unknown>, isEdit: boolean) => void;
  /** Delete callback / 删除回调 */
  onDelete?: (keys: (string | number)[]) => void;
  /** Whether to show create button / 是否显示新增按钮 */
  showCreate?: boolean;
  /** Whether to show refresh button / 是否显示刷新按钮 */
  showRefresh?: boolean;
  /** Whether to show export button / 是否显示导出按钮 */
  showExport?: boolean;
  /** Whether to show batch delete / 是否显示批量删除 */
  showBatchDelete?: boolean;
  /** Refresh callback / 刷新回调 */
  onRefresh?: () => void;
  /** Export callback / 导出回调 */
  onExport?: () => void;
  /** Dialog title for create / 新增弹窗标题 */
  createTitle?: string;
  /** Dialog title for edit / 编辑弹窗标题 */
  editTitle?: string;
  /** Extra actions / 额外操作按钮 */
  extraActions?: CrudAction[];
  /** Row selection support / 行选择 */
  rowSelection?: {
    selectedRowKeys: (string | number)[];
    onChange: (keys: (string | number)[]) => void;
  };
}

function CrudPage({
  className,
  filterFields,
  columns,
  dataSource = [],
  rowKey = "id",
  pagination,
  onSearch,
  onReset,
  onPageChange,
  loading = false,
  formFields = [],
  onSubmit,
  onDelete,
  showCreate = true,
  showRefresh = true,
  showExport = false,
  showBatchDelete = false,
  onRefresh,
  onExport,
  createTitle = "Create",
  editTitle = "Edit",
  extraActions = [],
  rowSelection,
  ...props
}: CrudPageProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editRecord, setEditRecord] = React.useState<Record<string, unknown> | null>(null);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteKeys, setDeleteKeys] = React.useState<(string | number)[]>([]);
  const [formValues, setFormValues] = React.useState<Record<string, unknown>>({});

  const isEdit = !!editRecord;

  const handleCreate = () => {
    setEditRecord(null);
    const emptyValues: Record<string, unknown> = {};
    formFields.forEach((f) => {
      emptyValues[f.name] = "";
    });
    setFormValues(emptyValues);
    setModalOpen(true);
  };

  const handleEdit = (record: Record<string, unknown>) => {
    setEditRecord(record);
    setFormValues({ ...record });
    setModalOpen(true);
  };

  const handleSubmit = () => {
    // Basic validation
    const isValid = formFields
      .filter((f) => f.required)
      .every((f) => formValues[f.name] !== "" && formValues[f.name] !== undefined);
    if (!isValid) return;

    onSubmit?.(formValues, isEdit);
    setModalOpen(false);
    setEditRecord(null);
  };

  const handleDelete = (key: string | number) => {
    setDeleteKeys([key]);
    setDeleteOpen(true);
  };

  const handleBatchDelete = () => {
    if (rowSelection && rowSelection.selectedRowKeys.length > 0) {
      setDeleteKeys(rowSelection.selectedRowKeys);
      setDeleteOpen(true);
    }
  };

  const confirmDelete = () => {
    onDelete?.(deleteKeys);
    setDeleteOpen(false);
    setDeleteKeys([]);
    if (rowSelection) {
      rowSelection.onChange([]);
    }
  };

  // Enhance columns with action column
  const enhancedColumns: SearchTableColumn[] = React.useMemo(() => {
    const actionCol: SearchTableColumn = {
      key: "__actions",
      title: "Actions",
      width: 120,
      align: "center",
      render: (_value, row) => {
        const key = row[rowKey] as string | number;
        return (
          <div className="flex items-center justify-center gap-1">
            {formFields.length > 0 && (
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => handleEdit(row)}
                aria-label="Edit"
              >
                <Pencil className="size-3.5" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => handleDelete(key)}
                className="text-destructive hover:text-destructive"
                aria-label="Delete"
              >
                <Trash2 className="size-3.5" />
              </Button>
            )}
          </div>
        );
      },
    };
    return [...columns, actionCol];
  }, [columns, formFields, onDelete, rowKey]);

  return (
    <div
      data-slot="crud-page"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showCreate && formFields.length > 0 && (
            <Button size="sm" onClick={handleCreate}>
              <Plus className="size-4" />
              {createTitle}
            </Button>
          )}
          {showRefresh && onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="size-4" />
              Refresh
            </Button>
          )}
          {showExport && onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="size-4" />
              Export
            </Button>
          )}
          {showBatchDelete && onDelete && rowSelection && rowSelection.selectedRowKeys.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleBatchDelete}>
              <Trash2 className="size-4" />
              Delete ({rowSelection.selectedRowKeys.length})
            </Button>
          )}
          {extraActions.map((action) => (
            <Button
              key={action.key}
              variant={action.variant ?? "outline"}
              size="sm"
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <SearchTable
        filterFields={filterFields}
        columns={enhancedColumns}
        dataSource={dataSource}
        rowKey={rowKey}
        pagination={pagination}
        onSearch={onSearch}
        onReset={onReset}
        onPageChange={onPageChange}
        loading={loading}
        rowSelection={rowSelection}
      />

      {/* Create/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEdit ? editTitle : createTitle}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {formFields.map((field) => (
              <div
                key={field.name}
                className={cn(
                  "flex flex-col gap-1.5",
                  field.span === 2 && "col-span-2",
                )}
              >
                <Label className="text-sm font-medium">
                  {field.label}
                  {field.required && <span className="ml-0.5 text-destructive">*</span>}
                </Label>
                {field.type === "select" ? (
                  <select
                    value={String(formValues[field.name] ?? "")}
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                    }
                    className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="">{field.placeholder ?? `Select ${field.label}`}</option>
                    {field.options?.map((opt) => (
                      <option key={String(opt.value)} value={String(opt.value)}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={field.type === "number" ? "number" : "text"}
                    value={String(formValues[field.name] ?? "")}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        [field.name]:
                          field.type === "number" ? Number(e.target.value) : e.target.value,
                      }))
                    }
                    placeholder={field.placeholder ?? `Enter ${field.label}`}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deleteKeys.length} item(s)? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { CrudPage };
export type { CrudPageProps, CrudFormField, CrudAction };
