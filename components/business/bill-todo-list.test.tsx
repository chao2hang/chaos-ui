import { describe, it, expect } from "vitest";
import { BillTodoList } from "./bill-todo-list";
import type { BillTodoListProps } from "./bill-todo-list";

describe("bill-todo-list", () => {
  it("exports BillTodoList", () => {
    expect(BillTodoList).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BillTodoListProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
