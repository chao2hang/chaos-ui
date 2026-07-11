"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

/**
 * @hook usePageList
 * @category hooks/business
 * @since 1.5.0
 * @description React Query-backed paginated list hook. Owns page/pageSize/filters
 * and returns a SearchTable-ready `pagination` object.
 * Consumers must install `@tanstack/react-query` and wrap with QueryClientProvider.
 * / 基于 React Query 的通用分页列表 Hook，返回可直接喂给 SearchTable 的 pagination。
 * @keywords list, pagination, react-query, filter, search-table
 * @example
 * const { rows, isLoading, pagination, setFilters, refresh } = usePageList({
 *   queryKey: ["orders"],
 *   fetcher: (params) => orderApi.page(params),
 * });
 */

/** 分页查询参数基础接口 */
export interface PageListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: unknown;
}

/** 列表接口返回。兼容 records / list 两种字段名 */
export interface PageListResult<T> {
  records?: T[];
  list?: T[];
  total: number;
}

export interface UsePageListOptions<T, P extends PageListParams> {
  /** React Query 缓存键前缀 */
  queryKey: readonly unknown[];
  /** 数据获取函数，接收完整查询参数 */
  fetcher: (params: P) => Promise<PageListResult<T>>;
  /** 初始页码，默认 1 */
  initialPage?: number;
  /** 初始每页条数，默认 20 */
  initialPageSize?: number;
  /** 初始筛选条件 */
  initialFilters?: Omit<P, "page" | "pageSize">;
  /** staleTime 覆盖（默认 60s） */
  staleTime?: number;
  /** 自定义行提取；默认 data.records ?? data.list ?? [] */
  selectRows?: (data: PageListResult<T>) => T[];
}

export interface UsePageListResult<T, P extends PageListParams> {
  /** 当前查询原始结果 */
  data: PageListResult<T> | undefined;
  /** 归一化后的行数组 */
  rows: T[];
  /** 首次加载 */
  isLoading: boolean;
  /** 后台刷新中（分页/筛选 placeholder） */
  isFetching: boolean;
  page: number;
  pageSize: number;
  filters: Omit<P, "page" | "pageSize">;
  /** 合并筛选并重置到第一页 */
  setFilters: (filters: Partial<Omit<P, "page" | "pageSize">>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  refresh: () => void;
  /** SearchTable pagination prop */
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

function defaultSelectRows<T>(data: PageListResult<T>): T[] {
  return data.records ?? data.list ?? [];
}

export function usePageList<T, P extends PageListParams>(
  options: UsePageListOptions<T, P>,
): UsePageListResult<T, P> {
  const {
    queryKey,
    fetcher,
    initialPage = 1,
    initialPageSize = 20,
    initialFilters = {} as Omit<P, "page" | "pageSize">,
    staleTime = 60_000,
    selectRows = defaultSelectRows,
  } = options;

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [filters, setFiltersState] =
    useState<Omit<P, "page" | "pageSize">>(initialFilters);

  const params = useMemo(
    () => ({ ...filters, page, pageSize }) as P,
    [filters, page, pageSize],
  );

  const queryKeyWithParams = useMemo(
    () => [...queryKey, params] as const,
    [queryKey, params],
  );

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: queryKeyWithParams,
    queryFn: () => fetcher(params),
    placeholderData: keepPreviousData,
    staleTime,
  });

  const setFilters = useCallback(
    (newFilters: Partial<Omit<P, "page" | "pageSize">>) => {
      setFiltersState((prev) => ({ ...prev, ...newFilters }));
      setPage(initialPage);
    },
    [initialPage],
  );

  const handleSetPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleSetPageSize = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  }, []);

  const refresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  const rows = useMemo(
    () => (data ? selectRows(data) : []),
    [data, selectRows],
  );

  const pagination = useMemo(
    () => ({
      current: page,
      pageSize,
      total: data?.total ?? 0,
      onChange: (newPage: number, newPageSize: number) => {
        if (newPageSize !== pageSize) {
          setPageSize(newPageSize);
          setPage(1);
          return;
        }
        setPage(newPage);
      },
    }),
    [page, pageSize, data?.total],
  );

  return {
    data,
    rows,
    isLoading,
    isFetching,
    page,
    pageSize,
    filters,
    setFilters,
    setPage: handleSetPage,
    setPageSize: handleSetPageSize,
    refresh,
    pagination,
  };
}
