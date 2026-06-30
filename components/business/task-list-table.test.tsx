import { describe, it, expect } from "vitest";
import { TaskListTable } from "./task-list-table";
import type { TaskListTableProps } from "./task-list-table";

describe("task-list-table", () => {
  it("exports TaskListTable", () => {
    expect(TaskListTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TaskListTableProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
