import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCrud } from "@/hooks/use-crud";

describe("useCrud", () => {
  it("setFilters triggers a single fetch and resets to page 1", async () => {
    const fetcher = vi.fn(
      async (_page: number, _pageSize: number, _filters: Record<string, unknown>) => ({
        list: [{ id: 1, name: "x" }],
        total: 1,
      }),
    );
    const { result } = renderHook(() =>
      useCrud<{ id: number; name: string }, Partial<{ id: number; name: string }>>({
        fetcher,
        emptyForm: {},
        defaultPageSize: 10,
      }),
    );

    // Initial fetch on mount.
    await act(async () => {});
    const initialCalls = fetcher.mock.calls.length;
    expect(initialCalls).toBeGreaterThanOrEqual(1);

    // Move to page 3 first.
    act(() => {
      result.current.pagination.setPage(3);
    });
    await act(async () => {});

    fetcher.mockClear();
    act(() => {
      result.current.setFilters({ keyword: "abc" });
    });
    await act(async () => {});

    // Should fetch with the new filter AND page reset to 1.
    const lastCall = fetcher.mock.calls[fetcher.mock.calls.length - 1];
    expect(lastCall?.[0]).toBe(1); // page reset to 1
    expect(lastCall?.[2]).toEqual({ keyword: "abc" });

    // React batches setFiltersState + setPage(1) → a single fetch, not two.
    expect(fetcher.mock.calls.length).toBe(1);
  });

  it("setFilters identity is stable across renders (depends on setPage, not pagination)", () => {
    const fetcher = vi.fn(async () => ({ list: [], total: 0 }));
    const { result, rerender } = renderHook(() =>
      useCrud<{ id: number }, Partial<{ id: number }>>({
        fetcher,
        emptyForm: {},
      }),
    );
    const first = result.current.setFilters;
    rerender();
    rerender();
    expect(result.current.setFilters).toBe(first);
  });

  it("module is importable with expected exports", async () => {
    const mod = await import("@/hooks/use-crud");
    expect(mod.useCrud).toBeDefined();
  });
});
