"use client";

import * as React from "react";
import { usePagination } from "@/hooks/use-pagination";
import { useMessage } from "@/hooks/use-message";

/**
 * @hook useCrud
 * @category hooks/business
 * @since 0.5.0
 * @description Generic CRUD state manager. Uses separate type params for
 * the data row (T) and the form (F), so interfaces with optional fields
 * like `shortName?: string` work without type errors.
 * / 通用 CRUD 状态管理 hook，分离行类型和表单类型避免反向推断
 * @keywords crud, hook, pagination, form, modal, state
 * @example
 * const crud = useCrud<Company, Partial<Company>>({
 *   fetcher: (page, pageSize, keyword) => api.list({ page, pageSize, keyword }),
 *   emptyForm: { id: 0, name: "", shortName: "" },
 *   rowKey: "id",
 *   successMessage: { create: "公司创建成功", update: "更新成功", delete: "已删除" },
 * });
 */

/** Per-operation success messages / 按操作分别配置成功消息 */
interface SuccessMessageMap {
  create?: string;
  update?: string;
  delete?: string;
}

type SuccessMessage = string | false | SuccessMessageMap;

interface UseCrudConfig<T, F = Partial<T>> {
  fetcher: (page: number, pageSize: number, keyword: string) => Promise<{ list: T[]; total: number }>;
  onCreate?: (form: F) => Promise<unknown>;
  onUpdate?: (id: string | number, form: F) => Promise<unknown>;
  onDelete?: (id: string | number) => Promise<unknown>;
  rowKey?: keyof T & string;
  /** Empty form template — type F, independent of T's required fields / 空表单模板 */
  emptyForm: F;
  defaultPageSize?: number;
  /**
   * Success message after create/update/delete.
   * - `string` — used for all operations
   * - `false` — disable success messages
   * - `{ create?, update?, delete? }` — per-operation messages
   * / 成功提示：字符串=全部, false=禁用, 对象=按操作分别配置
   */
  successMessage?: SuccessMessage;
  deleteConfirmTitle?: string;
}

function getSuccessMsg(
  msg: SuccessMessage | undefined,
  action: "create" | "update" | "delete",
  fallback: string,
): string | false {
  if (msg === false) return false;
  if (msg === undefined) return fallback;
  if (typeof msg === "string") return msg;
  // msg is SuccessMessageMap
  const specific = msg[action];
  if (specific !== undefined) return specific;
  return fallback;
}

interface UseCrudReturn<T, F = Partial<T>> {
  data: T[];
  total: number;
  loading: boolean;
  keyword: string;
  setKeyword: (v: string) => void;
  pagination: ReturnType<typeof usePagination>;
  modalOpen: boolean;
  setModalOpen: (v: boolean) => void;
  editing: T | null;
  form: F;
  setForm: React.Dispatch<React.SetStateAction<F>>;
  /** Update a single form field / 更新单个表单字段 */
  updateFormField: <K extends keyof F>(key: K, value: F[K]) => void;
  handleAdd: () => void;
  handleEdit: (record: T) => void;
  handleSubmit: () => Promise<void>;
  handleDelete: (record: T) => Promise<void>;
  refresh: () => void;
  isEdit: boolean;
}

function useCrud<T extends Record<string, unknown>, F = Partial<T>>(
  config: UseCrudConfig<T, F>,
): UseCrudReturn<T, F> {
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
  const [form, setForm] = React.useState<F>(emptyForm);
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

  React.useEffect(() => { fetchData(); }, [fetchData]);

  const handleAdd = React.useCallback(() => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }, [emptyForm]);

  const handleEdit = React.useCallback((record: T) => {
    setEditing(record);
    setForm({ ...record } as unknown as F);
    setModalOpen(true);
  }, []);

  const updateFormField = React.useCallback(
    <K extends keyof F>(key: K, value: F[K]) => {
      setForm((prev) => ({ ...prev, [key]: value } as F));
    },
    [],
  );

  const handleSubmit = React.useCallback(async () => {
    try {
      if (isEdit && editing && onUpdate) {
        await onUpdate((editing as any)[rowKey] as string | number, form);
        const msg = getSuccessMsg(successMessage, "update", "Updated successfully");
        if (msg !== false) message.success(msg);
      } else if (onCreate) {
        await onCreate(form);
        const msg = getSuccessMsg(successMessage, "create", "Created successfully");
        if (msg !== false) message.success(msg);
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
      const confirmed = globalThis.confirm?.(deleteConfirmTitle ?? "Are you sure you want to delete this item?");
      if (!confirmed) return;
      try {
        await onDelete((record as any)[rowKey] as string | number);
        const msg = getSuccessMsg(successMessage, "delete", "Deleted successfully");
        if (msg !== false) message.success(msg);
        await fetchData();
      } catch {
        message.error("Delete failed");
      }
    },
    [onDelete, rowKey, fetchData, message, successMessage, deleteConfirmTitle],
  );

  return {
    data, total, loading, keyword, setKeyword, pagination,
    modalOpen, setModalOpen, editing, form, setForm, updateFormField,
    handleAdd, handleEdit, handleSubmit, handleDelete,
    refresh: fetchData, isEdit,
  };
}

export { useCrud };
export type { UseCrudConfig, UseCrudReturn, SuccessMessage, SuccessMessageMap };
