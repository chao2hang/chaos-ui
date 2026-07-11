import { describe, it, expect, vi } from "vitest";
import { toSearchTablePagination } from "./to-search-table-pagination";

describe("toSearchTablePagination", () => {
  it("maps page/pageSize/total into SearchTable shape", () => {
    const setPage = vi.fn();
    const setPageSize = vi.fn();
    const result = toSearchTablePagination(
      { page: 2, pageSize: 20, setPage, setPageSize },
      120,
    );
    expect(result).toEqual({
      current: 2,
      pageSize: 20,
      total: 120,
      onChange: expect.any(Function),
    });
  });

  it("onChange with same pageSize calls setPage only", () => {
    const setPage = vi.fn();
    const setPageSize = vi.fn();
    const result = toSearchTablePagination(
      { page: 1, pageSize: 10, setPage, setPageSize },
      50,
    );
    result.onChange(3, 10);
    expect(setPage).toHaveBeenCalledWith(3);
    expect(setPageSize).not.toHaveBeenCalled();
  });

  it("onChange with new pageSize calls setPageSize (which typically resets page)", () => {
    const setPage = vi.fn();
    const setPageSize = vi.fn();
    const result = toSearchTablePagination(
      { page: 2, pageSize: 10, setPage, setPageSize },
      50,
    );
    result.onChange(1, 20);
    expect(setPageSize).toHaveBeenCalledWith(20);
    expect(setPage).not.toHaveBeenCalled();
  });
});
