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

// ─── CrudFormField ──────────────────────────────────────────────

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

// ─── Generic CrudPageProps ──────────────────────────────────────

interface CrudPageProps<T = Record<string, unknown>>
  extends Omit<React.ComponentProps<"div">, "onSubmit" | "onReset"> {
  filterFields?: FilterField[];
  columns: SearchTableColumn<T>[];
  dataSource?: T[];
  rowKey?: keyof T & string;
  pagination?: PaginationConfig | false;
  onSearch?: (values: Record<string, unknown>) => void;
  onReset?: () => void;
  onPageChange?: (page: number, pageSize: number) => void;
  loading?: boolean;
  formFields?: CrudFormField[];
  onSubmit?: (values: Record<string, unknown>, isEdit: boolean) => void;
  onDelete?: (keys: (string | number)[]) => void;
  showCreate?: boolean;
  showRefresh?: boolean;
  showExport?: boolean;
  showBatchDelete?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  createTitle?: string;
  editTitle?: string;
  extraActions?: CrudAction[];
  rowSelection?: {
    selectedRowKeys: (string | number)[];
    onChange: (keys: (string | number)[]) => void;
  };
  /** Custom form renderer — replaces auto-generated form when provided */
  formRenderer?: (props: {
    values: Record<string, unknown>;
    onChange: (values: Record<string, unknown>) => void;
    isEdit: boolean;
  }) => React.ReactNode;
}

function CrudPage<T = Record<string, unknown>>({
  className,
  filterFields,
  columns,
  dataSource = [] as T[],
  rowKey = "id" as keyof T & string,
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
  formRenderer,
  ...props
}: CrudPageProps<T>) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editRecord, setEditRecord] = React.useState<Record<string, unknown> | null>(null);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteKeys, setDeleteKeys] = React.useState<(string | number)[]>([]);
  const [formValues, setFormValues] = React.useState<Record<string, unknown>>({});

  const isEdit = !!editRecord;

  const handleCreate = () => {
    setEditRecord(null);
    const emptyValues: Record<string, unknown> = {};
    formFields.forEach((f) => { emptyValues[f.name] = ""; });
    setFormValues(emptyValues);
    setModalOpen(true);
  };

  const handleEdit = (record: Record<string, unknown>) => {
    setEditRecord(record);
    setFormValues({ ...record });
    setModalOpen(true);
  };

  const handleRowEdit = (record: Record<string, unknown>) => {
    handleEdit(record);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formValues, isEdit);
    }
    setModalOpen(false);
  };

  const handleDelete = (keys: (string | number)[]) => {
    setDeleteKeys(keys);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(deleteKeys);
    }
    setDeleteOpen(false);
  };

  const handleBatchDelete = () => {
    if (rowSelection) {
      handleDelete(rowSelection.selectedRowKeys);
    }
  };

  const enhancedColumns = columns.map((col) => {
    if (col.key === "actions") {
      return {
        ...col,
        render: col.render ?? ((_: unknown, row: T) => {
          const record = row as unknown as Record<string, unknown>;
          return (
            <div className="flex items-center gap-1">
              <Button
                variant="link"
                size="sm"
                onClick={() => handleRowEdit(record)}
              >
                <Pencil className="size-3" />
                Edit
              </Button>
              {onDelete && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() =>
                    handleDelete([record[rowKey] as string | number])
                  }
                >
                  <Trash2 className="size-3" />
                  Delete
                </Button>
              )}
            </div>
          );
        }),
      };
    }
    return col;
  });

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <div />
        <div className="flex items-center gap-2">
          {showCreate && (
            <Button size="sm" onClick={handleCreate}>
              <Plus className="size-4" />
              Create
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

      <SearchTable<T>
        filterFields={filterFields ?? undefined}
        columns={enhancedColumns}
        dataSource={dataSource}
        rowKey={rowKey}
        pagination={pagination}
        onSearch={onSearch}
        onReset={onReset}
        onPageChange={onPageChange}
        loading={loading}
        rowSelection={rowSelection ?? undefined}
      />

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEdit ? editTitle : createTitle}</DialogTitle>
          </DialogHeader>
          {formRenderer ? (
            formRenderer({ values: formValues, onChange: setFormValues, isEdit })
          ) : (
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
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
