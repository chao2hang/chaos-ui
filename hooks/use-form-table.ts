"use client";
import * as React from "react";

/**
 * @hook useFormTable
 * @category Data
 * @since 1.0.0-beta.0
 * @description Editable table rows backed by a form-like state: add/update/remove rows with field-level validation and dirty tracking.
 * @param initial Initial rows.
 * @param config validate, id generator.
 * @example
 * const { rows, addRow, updateRow, removeRow, errors, isValid, dirty } = useFormTable([{ id: "1", name: "" }]);
 */
export interface UseFormTableConfig<T> {
  validate?: (row: T, index: number) => Record<string, string>;
  createId?: () => string;
}

export interface UseFormTableResult<T> {
  rows: T[];
  addRow: (row: T) => void;
  updateRow: (index: number, patch: Partial<T>) => void;
  removeRow: (index: number) => void;
  setRows: (rows: T[]) => void;
  reset: (rows?: T[]) => void;
  errors: Record<number, Record<string, string>>;
  isValid: boolean;
  dirty: boolean;
}

export function useFormTable<T extends { id?: string }>(
  initial: T[],
  config: UseFormTableConfig<T> = {},
): UseFormTableResult<T> {
  const { validate, createId = () => Math.random().toString(36).slice(2) } = config;
  const [rows, setRowsState] = React.useState<T[]>(initial);
  const [dirty, setDirty] = React.useState(false);

  const errors = React.useMemo(() => {
    if (!validate) return {};
    const map: Record<number, Record<string, string>> = {};
    rows.forEach((row, i) => {
      const e = validate(row, i);
      if (e && Object.keys(e).length > 0) map[i] = e;
    });
    return map;
  }, [rows, validate]);

  const markDirty = React.useCallback(() => setDirty(true), []);

  const addRow = React.useCallback(
    (row: T) => {
      setRowsState((prev) => [...prev, { ...row, id: ((row as { id?: string }).id || createId()) } as T]);
      markDirty();
    },
    [createId, markDirty],
  );

  const updateRow = React.useCallback(
    (index: number, patch: Partial<T>) => {
      setRowsState((prev) =>
        prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
      );
      markDirty();
    },
    [markDirty],
  );

  const removeRow = React.useCallback(
    (index: number) => {
      setRowsState((prev) => prev.filter((_, i) => i !== index));
      markDirty();
    },
    [markDirty],
  );

  const setRows = React.useCallback(
    (next: T[]) => {
      setRowsState(next);
      markDirty();
    },
    [markDirty],
  );

  const reset = React.useCallback((next?: T[]) => {
    setRowsState(next ?? initial);
    setDirty(false);
  }, [initial]);

  return {
    rows,
    addRow,
    updateRow,
    removeRow,
    setRows,
    reset,
    errors,
    isValid: Object.keys(errors).length === 0,
    dirty,
  };
}
