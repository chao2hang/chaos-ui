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
 *
 * Supports multi-field filtering (`filters`) and pre-submit validation
 * (`onValidate` / `onBeforeSubmit`), replacing the per-page useAsync +
 * usePagination + useEffect boilerplate duplicated across business list pages.
 * / 通用 CRUD 状态管理 hook，分离行类型和表单类型，支持多字段筛选与提交前校验。
 * @keywords crud, hook, pagination, form, modal, state, filter, validate
 * @example
 * const crud = useCrud<Company, Partial<Company>>({
 *   fetcher: (page, pageSize, filters) =>
 *     api.list({ page, pageSize, ...filters }),
 *   filterFields: [
 *     { name: "keyword", type: "search" },
 *     { name: "status", type: "select", options: [...] },
 *   ],
 *   onValidate: (form) => (form.code ? null : "请填写必填项"),
 *   onBeforeSubmit: async (form) => {
 *     // 自定义异步校验，返回 false 阻止提交
 *     const ok = await checkCodeUnique(form.code);
 *     return ok;
 *   },
 *   emptyForm: { id: 0, name: "", shortName: "" },
 *   rowKey: "id",
 *   successMessage: { create: "公司创建成功", update: "更新成功", delete: "已删除" },
 * });
 * crud.setFilters({ keyword: "x", status: "OPEN" });
 */

/** Per-operation success messages / 按操作分别配置成功消息 */
interface SuccessMessageMap {
  create?: string;
  update?: string;
  delete?: string;
}

type SuccessMessage = string | false | SuccessMessageMap;

/** Filter field descriptor (drives generated filter UI). / 筛选字段描述 */
interface FilterField {
  name: string;
  type: "search" | "select";
  /** Options for `select` type / select 类型的选项 */
  options?: { label: string; value: string | number }[];
  /** Placeholder / 占位文案 */
  placeholder?: string;
}

/** Aggregated filter values (string-keyed). / 筛选值聚合 */
type Filters = Record<string, unknown>;

interface UseCrudConfig<T, F = Partial<T>> {
  /**
   * Fetcher receives page, pageSize, and the current filters object.
   * Replaces the old single-`keyword` signature so multi-filter pages
   * (keyword + status + categoryId + ...) don't need hand-rolled wiring.
   * / 获取数据，filters 替代旧的单 keyword 签名
   */
  fetcher: (
    page: number,
    pageSize: number,
    filters: Filters,
  ) => Promise<{ list: T[]; total: number }>;
  onCreate?: (form: F) => Promise<unknown>;
  onUpdate?: (id: string | number, form: F) => Promise<unknown>;
  onDelete?: (id: string | number) => Promise<unknown>;
  rowKey?: keyof T & string;
  /** Empty form template — type F, independent of T's required fields / 空表单模板 */
  emptyForm: F;
  defaultPageSize?: number;
  /**
   * Pre-submit validation. Return an error message string to block submit
   * (shown via message.error), or `null` to proceed.
   * / 提交前校验：返回错误文案拦截提交，null 放行
   */
  onValidate?: (form: F) => string | null;
  /**
   * Pre-submit gate (runs after `onValidate`). Return `false` (or a Promise
   * resolving to `false`) to block the submit. Use for async checks like
   * uniqueness validation, permission checks, or confirmation dialogs.
   * / 提交前拦截器（在 onValidate 之后执行）：返回 false 阻止提交
   */
  onBeforeSubmit?: (form: F, isEdit: boolean) => boolean | Promise<boolean>;
  /** Filter field descriptors (for generated filter UI). / 筛选字段描述 */
  filterFields?: FilterField[];
  /** Initial filter values. / 初始筛选值 */
  defaultFilters?: Filters;
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
  /** Current filter values / 当前筛选值 */
  filters: Filters;
  /**
   * Merge a partial patch into filters (shallow merge) and reset to page 1.
   * / 合并筛选值（浅合并）并重置到第 1 页
   */
  setFilters: (patch: Filters) => void;
  /** Replace filters entirely and reset to page 1. / 整体替换筛选值 */
  resetFilters: (next: Filters) => void;
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
    onValidate,
    onBeforeSubmit,
    defaultFilters = {},
    successMessage,
    deleteConfirmTitle,
  } = config;

  const [filters, setFiltersState] = React.useState<Filters>(defaultFilters);
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
      const result = await fetcher(
        pagination.page,
        pagination.pageSize,
        filters,
      );
      setData(result.list);
      setTotal(result.total);
    } finally {
      setLoading(false);
    }
  }, [fetcher, pagination.page, pagination.pageSize, filters]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  // setFilters: shallow-merge patch and reset to page 1 so the new filter
  // takes effect immediately (don't stay on a now-empty high page).
  // Depend on the stable `pagination.setPage` (not the whole `pagination`
  // object, which is recreated every render and would make setFilters
  // identity unstable — breaking consumers who put setFilters in their deps).
  const setFilters = React.useCallback(
    (patch: Filters) => {
      setFiltersState((prev) => ({ ...prev, ...patch }));
      pagination.setPage(1);
    },
    [pagination.setPage],
  );

  const resetFilters = React.useCallback(
    (next: Filters) => {
      setFiltersState(next);
      pagination.setPage(1);
    },
    [pagination.setPage],
  );

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
      setForm((prev) => ({ ...prev, [key]: value }) as F);
    },
    [],
  );

  const handleSubmit = React.useCallback(async () => {
    // Pre-submit validation: block + notify on failure.
    if (onValidate) {
      const error = onValidate(form);
      if (error) {
        message.error(error);
        return;
      }
    }
    // Async pre-submit gate: block if returns false.
    if (onBeforeSubmit) {
      try {
        const ok = await onBeforeSubmit(form, isEdit);
        if (!ok) return;
      } catch {
        message.error("Validation failed");
        return;
      }
    }
    try {
      if (isEdit && editing && onUpdate) {
        await onUpdate(editing[rowKey] as string | number, form);
        const msg = getSuccessMsg(
          successMessage,
          "update",
          "Updated successfully",
        );
        if (msg !== false) message.success(msg);
      } else if (onCreate) {
        await onCreate(form);
        const msg = getSuccessMsg(
          successMessage,
          "create",
          "Created successfully",
        );
        if (msg !== false) message.success(msg);
      }
      setModalOpen(false);
      await fetchData();
    } catch {
      message.error("Operation failed");
    }
  }, [
    editing,
    form,
    isEdit,
    onCreate,
    onUpdate,
    onValidate,
    onBeforeSubmit,
    rowKey,
    fetchData,
    message,
    successMessage,
  ]);

  const handleDelete = React.useCallback(
    async (record: T) => {
      if (!onDelete) return;
      const confirmed = globalThis.confirm?.(
        deleteConfirmTitle ?? "Are you sure you want to delete this item?",
      );
      if (!confirmed) return;
      try {
        await onDelete(record[rowKey] as string | number);
        const msg = getSuccessMsg(
          successMessage,
          "delete",
          "Deleted successfully",
        );
        if (msg !== false) message.success(msg);
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
    filters,
    setFilters,
    resetFilters,
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
export type {
  UseCrudConfig,
  UseCrudReturn,
  SuccessMessage,
  SuccessMessageMap,
  FilterField,
  Filters,
};
