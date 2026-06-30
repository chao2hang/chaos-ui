import { describe, it, expect } from "vitest";
import { TodoListTable } from "./todo-list-table";
import type { TodoListTableProps } from "./todo-list-table";

describe("todo-list-table", () => {
  it("exports TodoListTable", () => {
    expect(TodoListTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TodoListTableProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
