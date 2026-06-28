"use client";

import * as React from "react";
import { usePagination } from "@/hooks/use-pagination";
import { useMessage } from "@/hooks/use-message";

/**
 * @hook useCrud
 * @category hooks/business
 * @since 0.5.0
 * @description Generic CRUD state manager — eliminates ~80 lines of duplicated
 * keyword/pagination/modal/form state logic per page.
 * / 通用 CRUD 状态管理 hook，消除每个页面 ~80 行重复逻辑
 * @keywords crud, hook, pagination, form, modal, state
 * @example
 * const crud = useCrud<{ id: number; name: string }>({
 *   fetcher: (page, pageSize, keyword) => api.list({ page, pageSize, keyword }),
 *   onCreate: (form) => api.create(form),
 *   onUpdate: (id, form) => api.update(id, form),
 *   onDelete: (id) => api.delete(id),
 *   emptyForm: { id: 0, name: "" },
 *   rowKey: "id",
 *   defaultPageSize: 20,
 * });
 */

interface UseCrudConfig<T> {
  /** Fetch function returning { list, total } / 数据拉取函数 */
  fetcher: (page: number, pageSize: number, keyword: string) => Promise<{ list: T[]; total: number }>;
  /** Create handler / 新增回调 */
  onCreate?: (form: Partial<T>) => Promise<unknown>;
  /** Update handler / 更新回调 */
  onUpdate?: (id: string | number, form: Partial<T>) => Promise<unknown>;
  /** Delete handler / 删除回调 */
  onDelete?: (id: string | number) => Promise<unknown>;
  /** Row key field name / 行 key 字段 */
  rowKey?: keyof T & string;
  /** Empty form template / 空表单模板 */
  emptyForm: Partial<T>;
  /** Default page size / 默认每页条数 */
  defaultPageSize?: number;
  /** Success message template — set false to suppress / 成功消息模板，false 关闭 */
  successMessage?: string | false;
  /** Title for confirm delete dialog / 删除确认标题 */
  deleteConfirmTitle?: string;
}

interface UseCrudReturn<T> {
  data: T[];
  total: number;
  loading: boolean;
  keyword: string;
  setKeyword: (v: string) => void;
  pagination: ReturnType<typeof usePagination>;
  modalOpen: boolean;
  setModalOpen: (v: boolean) => void;
  editing: T | null;
  form: Partial<T>;
  setForm: React.Dispatch<React.SetStateAction<Partial<T>>>;
  updateFormField: <K extends keyof T>(key: K, value: T[K]) => void;
  handleAdd: () => void;
  handleEdit: (record: T) => void;
  handleSubmit: () => Promise<void>;
  handleDelete: (record: T) => Promise<void>;
  refresh: () => void;
  isEdit: boolean;
}

function useCrud<T extends Record<string, unknown>>(config: UseCrudConfig<T>): UseCrudReturn<T> {
  const {
    fetcher,
    onCreate,
    onUpdate,
    onDelete,
    rowKey = "id" as keyof T & string,
    emptyForm,
    defaultPageSize = 20,
    successMessage,
    deleteConfirmTitle,
  } = config;

  const [keyword, setKeyword] = React.useState("");
  const [data, setData] = React.useState<T[]>([]);
  const [total, setTotal] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<T | null>(null);
  const [form, setForm] = React.useState<Partial<T>>(emptyForm);
  const [loading, setLoading] = React.useState(false);

  const pagination = usePagination(total, { pageSize: defaultPageSize });

  const message = useMessage();

  const isEdit = editing !== null;

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetcher(pagination.page, pagination.pageSize, keyword);
      setData(result.list);
      setTotal(result.total);
    } finally {
      setLoading(false);
    }
  }, [fetcher, pagination.page, pagination.pageSize, keyword]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAdd = React.useCallback(() => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }, [emptyForm]);

  const handleEdit = React.useCallback((record: T) => {
    setEditing(record);
    setForm({ ...record });
    setModalOpen(true);
  }, []);

  const updateFormField = React.useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleSubmit = React.useCallback(async () => {
    try {
      if (isEdit && editing && onUpdate) {
        await onUpdate(editing[rowKey] as string | number, form);
        if (successMessage !== false) {
          message.success(successMessage ?? "Updated successfully");
        }
      } else if (onCreate) {
        await onCreate(form);
        if (successMessage !== false) {
          message.success(successMessage ?? "Created successfully");
        }
      }
      setModalOpen(false);
      await fetchData();
    } catch {
      message.error("Operation failed");
    }
  }, [editing, form, isEdit, onCreate, onUpdate, rowKey, fetchData, message, successMessage]);

  const handleDelete = React.useCallback(
    async (record: T) => {
      if (!onDelete) return;
      const confirmed = globalThis.confirm?.(
        deleteConfirmTitle ?? "Are you sure you want to delete this item?"
      );
      if (!confirmed) return;
      try {
        await onDelete(record[rowKey] as string | number);
        if (successMessage !== false) {
          message.success("Deleted successfully");
        }
        await fetchData();
      } catch {
        message.error("Delete failed");
      }
    },
    [onDelete, rowKey, fetchData, message, successMessage, deleteConfirmTitle],
  );

  return {
    data,
    total,
    loading,
    keyword,
    setKeyword,
    pagination,
    modalOpen,
    setModalOpen,
    editing,
    form,
    setForm,
    updateFormField,
    handleAdd,
    handleEdit,
    handleSubmit,
    handleDelete,
    refresh: fetchData,
    isEdit,
  };
}

export { useCrud };
export type { UseCrudConfig, UseCrudReturn };
