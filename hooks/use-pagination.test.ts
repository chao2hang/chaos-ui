import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePagination } from "@/hooks/use-pagination";

describe("usePagination", () => {
  it("initial state", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.totalPages).toBe(10);
    expect(result.current.offset).toBe(0);
    expect(result.current.hasNext).toBe(true);
    expect(result.current.hasPrev).toBe(false);
  });

  it("uses defaults when initial omitted", () => {
    const { result } = renderHook(() => usePagination(25));
    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.totalPages).toBe(3);
  });

  it("setPage", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.setPage(5));
    expect(result.current.page).toBe(5);
    expect(result.current.offset).toBe(40);
    expect(result.current.hasPrev).toBe(true);
    expect(result.current.hasNext).toBe(true);
  });

  it("setPage clamps to upper bound", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.setPage(100));
    expect(result.current.page).toBe(10);
    expect(result.current.hasNext).toBe(false);
  });

  it("setPage clamps to lower bound", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.setPage(-1));
    expect(result.current.page).toBe(1);
    expect(result.current.hasPrev).toBe(false);
  });

  it("setPageSize resets to page 1", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.setPage(5));
    act(() => result.current.setPageSize(20));
    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(20);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.offset).toBe(0);
  });

  it("next/prev", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.setPage(5));
    act(() => result.current.next());
    expect(result.current.page).toBe(6);
    act(() => result.current.prev());
    expect(result.current.page).toBe(5);
  });

  it("next does not exceed totalPages", () => {
    const { result } = renderHook(() => usePagination(10, { pageSize: 10 }));
    act(() => result.current.next());
    expect(result.current.page).toBe(1);
  });

  it("prev does not go below 1", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.prev());
    expect(result.current.page).toBe(1);
  });

  it("first jumps to page 1", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.setPage(7));
    act(() => result.current.first());
    expect(result.current.page).toBe(1);
    expect(result.current.hasPrev).toBe(false);
  });

  it("last jumps to the final page", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.last());
    expect(result.current.page).toBe(10);
    expect(result.current.offset).toBe(90);
    expect(result.current.hasNext).toBe(false);
  });

  it("handles zero total (at least one page)", () => {
    const { result } = renderHook(() => usePagination(0));
    expect(result.current.totalPages).toBe(1);
    expect(result.current.page).toBe(1);
    expect(result.current.offset).toBe(0);
    expect(result.current.hasNext).toBe(false);
    expect(result.current.hasPrev).toBe(false);
  });

  it("handles page beyond totalPages (safePage clamps)", () => {
    const { result } = renderHook(() => usePagination(5, { page: 10, pageSize: 10 }));
    // 5 items / 10 per page = 1 page; requested page 10 clamps to 1.
    expect(result.current.totalPages).toBe(1);
    expect(result.current.page).toBe(1);
  });

  it("non-even total computes correct totalPages", () => {
    const { result } = renderHook(() => usePagination(23, { pageSize: 10 }));
    expect(result.current.totalPages).toBe(3);
    act(() => result.current.last());
    expect(result.current.page).toBe(3);
    expect(result.current.offset).toBe(20);
  });

  it("setPage identity is stable across renders (useCallback)", () => {
    const { result, rerender } = renderHook(() => usePagination(100, { pageSize: 10 }));
    const firstSet = result.current.setPage;
    rerender();
    expect(result.current.setPage).toBe(firstSet);
  });

  it("setPageSize identity is stable across renders (useCallback)", () => {
    const { result, rerender } = renderHook(() =>
      usePagination(100, { pageSize: 10 }),
    );
    const first = result.current.setPageSize;
    rerender();
    expect(result.current.setPageSize).toBe(first);
  });

  it("offset is correct at the final page", () => {
    const { result } = renderHook(() => usePagination(25, { pageSize: 10 }));
    act(() => result.current.last());
    expect(result.current.page).toBe(3);
    expect(result.current.offset).toBe(20);
    expect(result.current.hasNext).toBe(false);
  });

  it("next/prev identity fire setPage clamping", () => {
    const { result } = renderHook(() => usePagination(5, { pageSize: 2 }));
    // 5/2 = 3 pages.
    act(() => result.current.next());
    expect(result.current.page).toBe(2);
    act(() => result.current.next());
    expect(result.current.page).toBe(3);
    act(() => result.current.next()); // clamped
    expect(result.current.page).toBe(3);
    act(() => result.current.prev());
    expect(result.current.page).toBe(2);
  });

  it("first uses the raw setPage (bypasses clamp but page 1 is valid)", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.setPage(5));
    act(() => result.current.first());
    expect(result.current.page).toBe(1);
    expect(result.current.hasPrev).toBe(false);
    expect(result.current.hasNext).toBe(true);
  });

  it("changing total recomputes totalPages and clamps current page", () => {
    const { result, rerender } = renderHook(
      ({ total }) => usePagination(total, { pageSize: 10, page: 5 }),
      { initialProps: { total: 100 } },
    );
    expect(result.current.totalPages).toBe(10);
    expect(result.current.page).toBe(5);
    // Shrink total so page 5 no longer exists.
    rerender({ total: 20 });
    expect(result.current.totalPages).toBe(2);
    expect(result.current.page).toBe(2); // safePage clamps down.
    expect(result.current.hasNext).toBe(false);
  });
});
