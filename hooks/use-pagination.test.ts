import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePagination } from "@/hooks/use-pagination";

describe("usePagination", () => {
  it("initial state", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.totalPages).toBe(10);
  });

  it("setPage", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.setPage(5));
    expect(result.current.page).toBe(5);
  });

  it("setPage clamps to bounds", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.setPage(100));
    expect(result.current.page).toBe(10);
    act(() => result.current.setPage(-1));
    expect(result.current.page).toBe(1);
  });

  it("setPageSize resets to page 1", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.setPage(5));
    act(() => result.current.setPageSize(20));
    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(20);
  });

  it("next/prev", () => {
    const { result } = renderHook(() => usePagination(100, { pageSize: 10 }));
    act(() => result.current.setPage(5));
    act(() => result.current.next());
    expect(result.current.page).toBe(6);
    act(() => result.current.prev());
    expect(result.current.page).toBe(5);
  });
});
