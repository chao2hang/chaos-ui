import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFormTable } from "./use-form-table";

interface Row {
  id: string;
  name: string;
  qty: number;
}

describe("useFormTable", () => {
  it("adds, updates, removes rows", () => {
    const { result } = renderHook(() =>
      useFormTable<Row>([{ id: "1", name: "A", qty: 1 }]),
    );
    act(() => result.current.addRow({ id: "", name: "B", qty: 2 }));
    expect(result.current.rows).toHaveLength(2);
    expect(result.current.rows[1]!.id).toBeTruthy();
    expect(result.current.dirty).toBe(true);
    act(() => result.current.updateRow(0, { name: "A2" }));
    expect(result.current.rows[0]!.name).toBe("A2");
    act(() => result.current.removeRow(1));
    expect(result.current.rows).toHaveLength(1);
  });

  it("validates rows", () => {
    const validate = (row: Row) =>
      row.qty < 0 ? { qty: "negative" } : {};
    const { result } = renderHook(() =>
      useFormTable<Row>([{ id: "1", name: "A", qty: -1 }], { validate }),
    );
    expect(result.current.isValid).toBe(false);
    act(() => result.current.updateRow(0, { qty: 5 }));
    expect(result.current.isValid).toBe(true);
  });

  it("reset restores initial and clears dirty", () => {
    const { result } = renderHook(() =>
      useFormTable<Row>([{ id: "1", name: "A", qty: 1 }]),
    );
    act(() => result.current.addRow({ id: "", name: "B", qty: 2 }));
    act(() => result.current.reset());
    expect(result.current.rows).toHaveLength(1);
    expect(result.current.dirty).toBe(false);
  });
});
