import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { usePageList } from "./use-page-list";
import type { PageListParams, PageListResult } from "./use-page-list";

type Row = { id: number; name: string };
type Params = PageListParams & { keyword?: string };

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client }, children);
  };
}

describe("usePageList", () => {
  const fetcher = vi.fn(
    async (params: Params): Promise<PageListResult<Row>> => ({
      records: [{ id: params.page, name: `row-${params.page}` }],
      total: 100,
    }),
  );

  beforeEach(() => {
    fetcher.mockClear();
  });

  it("fetches with initial page/pageSize and exposes rows from records", async () => {
    const { result } = renderHook(
      () =>
        usePageList<Row, Params>({
          queryKey: ["orders"],
          fetcher,
          initialPage: 1,
          initialPageSize: 10,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(fetcher).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, pageSize: 10 }),
    );
    expect(result.current.rows).toEqual([{ id: 1, name: "row-1" }]);
    expect(result.current.pagination.total).toBe(100);
    expect(result.current.pagination.current).toBe(1);
  });

  it("normalizes list field when records is absent", async () => {
    const listFetcher = vi.fn(async (): Promise<PageListResult<Row>> => ({
      list: [{ id: 9, name: "from-list" }],
      total: 1,
    }));
    const { result } = renderHook(
      () =>
        usePageList<Row, Params>({
          queryKey: ["list-shape"],
          fetcher: listFetcher,
        }),
      { wrapper: createWrapper() },
    );
    await waitFor(() => expect(result.current.rows.length).toBe(1));
    expect(result.current.rows[0]?.name).toBe("from-list");
  });

  it("setFilters merges filters and resets to initial page", async () => {
    const { result } = renderHook(
      () =>
        usePageList<Row, Params>({
          queryKey: ["orders-filter"],
          fetcher,
          initialPage: 1,
        }),
      { wrapper: createWrapper() },
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => result.current.setPage(3));
    await waitFor(() => expect(result.current.page).toBe(3));

    fetcher.mockClear();
    act(() => result.current.setFilters({ keyword: "abc" }));
    await waitFor(() =>
      expect(fetcher).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1, keyword: "abc" }),
      ),
    );
    expect(result.current.page).toBe(1);
    expect(result.current.filters).toEqual({ keyword: "abc" });
  });

  it("setPageSize resets to page 1", async () => {
    const { result } = renderHook(
      () =>
        usePageList<Row, Params>({
          queryKey: ["orders-size"],
          fetcher,
        }),
      { wrapper: createWrapper() },
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => result.current.setPage(4));
    await waitFor(() => expect(result.current.page).toBe(4));

    act(() => result.current.setPageSize(50));
    await waitFor(() => {
      expect(result.current.pageSize).toBe(50);
      expect(result.current.page).toBe(1);
    });
  });

  it("pagination.onChange with new pageSize resets page", async () => {
    const { result } = renderHook(
      () =>
        usePageList<Row, Params>({
          queryKey: ["orders-pag"],
          fetcher,
          initialPageSize: 10,
        }),
      { wrapper: createWrapper() },
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => result.current.setPage(2));
    await waitFor(() => expect(result.current.page).toBe(2));

    act(() => result.current.pagination.onChange(2, 30));
    await waitFor(() => {
      expect(result.current.pageSize).toBe(30);
      expect(result.current.page).toBe(1);
    });
  });

  it("pagination.onChange with same pageSize only changes page", async () => {
    const { result } = renderHook(
      () =>
        usePageList<Row, Params>({
          queryKey: ["orders-page"],
          fetcher,
          initialPageSize: 10,
        }),
      { wrapper: createWrapper() },
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => result.current.pagination.onChange(5, 10));
    await waitFor(() => expect(result.current.page).toBe(5));
    expect(result.current.pageSize).toBe(10);
  });
});
