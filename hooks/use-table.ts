"use client";
import * as React from "react";

/**
 * @hook useTable
 * @category Data
 * @since 1.0.0-beta.0
 * @description Client-side table controller: sorting, filtering, pagination, and row selection over a flat data array.
 * @param data Source rows.
 * @param config initial sort, page size, filter predicate.
 * @example
 * const { rows, page, pageSize, totalPages, sort, setFilter, toggleRow, selected } = useTable(data, { pageSize: 20 });
 */
export interface UseTableConfig<T> {
  pageSize?: number;
  initialSort?: { key: keyof T; direction?: "asc" | "desc" };
  filter?: (row: T, term: string) => boolean;
  getRowId?: (row: T, index: number) => string;
}

export interface SortState<T> {
  key: keyof T | null;
  direction: "asc" | "desc";
}

export interface UseTableResult<T> {
  rows: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  sort: SortState<T>;
  setSort: (key: keyof T) => void;
  filterTerm: string;
  setFilter: (term: string) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  selected: Set<string>;
  toggleRow: (id: string) => void;
  toggleAll: () => void;
  clearSelected: () => void;
}

export function useTable<T>(data: T[], config: UseTableConfig<T> = {}): UseTableResult<T> {
  const {
    pageSize: initialPageSize = 10,
    initialSort = { key: null, direction: "asc" },
    filter,
    getRowId = (_row: T, index: number) => String(index),
  } = config;

  const [page, setPageState] = React.useState(1);
  const [pageSize, setPageSizeState] = React.useState(initialPageSize);
  const [sort, setSortState] = React.useState<SortState<T>>(initialSort as SortState<T>);
  const [filterTerm, setFilterTerm] = React.useState("");
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const filtered = React.useMemo(() => {
    if (!filterTerm || !filter) return data;
    return data.filter((row) => filter(row, filterTerm));
  }, [data, filterTerm, filter]);

  const sorted = React.useMemo(() => {
    if (!sort.key) return filtered;
    const key = sort.key;
    const dir = sort.direction === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av === bv) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      return av > bv ? dir : -dir;
    });
  }, [filtered, sort]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const offset = (safePage - 1) * pageSize;
  const rows = React.useMemo(
    () => sorted.slice(offset, offset + pageSize),
    [sorted, offset, pageSize],
  );

  const setSort = React.useCallback((key: keyof T) => {
    setSortState((prev) => {
      if (prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return { key: null, direction: "asc" };
    });
  }, []);

  const setFilter = React.useCallback((term: string) => {
    setFilterTerm(term);
    setPageState(1);
  }, []);

  const setPage = React.useCallback(
    (p: number) => setPageState(Math.min(Math.max(1, p), totalPages)),
    [totalPages],
  );
  const setPageSize = React.useCallback((size: number) => {
    setPageSizeState(size);
    setPageState(1);
  }, []);

  const pageIds = React.useMemo(
    () => rows.map((r, i) => getRowId(r, offset + i)),
    [rows, offset, getRowId],
  );
  const toggleRow = React.useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  const toggleAll = React.useCallback(() => {
    setSelected((prev) => {
      const allSelected = pageIds.every((id) => prev.has(id));
      if (allSelected) {
        const next = new Set(prev);
        pageIds.forEach((id) => next.delete(id));
        return next;
      }
      const next = new Set(prev);
      pageIds.forEach((id) => next.add(id));
      return next;
    });
  }, [pageIds]);
  const clearSelected = React.useCallback(() => setSelected(new Set()), []);

  return {
    rows,
    page: safePage,
    pageSize,
    total,
    totalPages,
    sort,
    setSort,
    filterTerm,
    setFilter,
    setPage,
    setPageSize,
    selected,
    toggleRow,
    toggleAll,
    clearSelected,
  };
}
