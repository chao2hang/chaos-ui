import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTable } from "./use-table";

interface Row {
  id: string;
  name: string;
  age: number;
}

const data: Row[] = [
  { id: "1", name: "Carol", age: 30 },
  { id: "2", name: "Alice", age: 25 },
  { id: "3", name: "Bob", age: 35 },
];

describe("useTable", () => {
  it("paginates data", () => {
    const { result } = renderHook(() =>
      useTable(data, { pageSize: 2, getRowId: (r) => r.id }),
    );
    expect(result.current.rows).toHaveLength(2);
    expect(result.current.totalPages).toBe(2);
    act(() => result.current.setPage(2));
    expect(result.current.page).toBe(2);
    expect(result.current.rows[0]!.name).toBe("Bob");
  });

  it("sorts ascending then descending", () => {
    const { result } = renderHook(() =>
      useTable(data, { pageSize: 10, getRowId: (r) => r.id }),
    );
    act(() => result.current.setSort("name"));
    expect(result.current.rows.map((r) => r.name)).toEqual(["Alice", "Bob", "Carol"]);
    act(() => result.current.setSort("name"));
    expect(result.current.rows.map((r) => r.name)).toEqual(["Carol", "Bob", "Alice"]);
  });

  it("filters rows", () => {
    const { result } = renderHook(() =>
      useTable(data, {
        pageSize: 10,
        getRowId: (r) => r.id,
        filter: (r, term) => r.name.toLowerCase().includes(term.toLowerCase()),
      }),
    );
    act(() => result.current.setFilter("ali"));
    expect(result.current.rows).toHaveLength(1);
    expect(result.current.rows[0]!.name).toBe("Alice");
  });

  it("toggles row selection and select-all", () => {
    const { result } = renderHook(() =>
      useTable(data, { pageSize: 10, getRowId: (r) => r.id }),
    );
    act(() => result.current.toggleRow("2"));
    expect(result.current.selected.has("2")).toBe(true);
    act(() => result.current.toggleAll());
    expect(result.current.selected.size).toBe(3);
    act(() => result.current.clearSelected());
    expect(result.current.selected.size).toBe(0);
  });
});
