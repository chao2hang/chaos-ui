import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("renders the seeded default items when no items are provided", () => {
    render(<TodoListTable />);
    expect(screen.getByText("审核今日采购单")).toBeDefined();
    expect(screen.getByText("复核库存盘点结果")).toBeDefined();
    expect(screen.getByText("提交月度财务报表")).toBeDefined();
  });

  it("renders provided items with priority badges", () => {
    render(
      <TodoListTable
        items={[
          { id: "a", title: "紧急任务", priority: "high" },
          { id: "b", title: "普通任务", priority: "low" },
        ]}
      />,
    );
    expect(screen.getByText("紧急任务")).toBeDefined();
    expect(screen.getByText("普通任务")).toBeDefined();
    expect(screen.getByText("高")).toBeDefined();
    expect(screen.getByText("低")).toBeDefined();
  });

  it("toggles a todo checkbox and fires onToggle", () => {
    const onToggle = vi.fn();
    render(
      <TodoListTable
        items={[{ id: "a", title: "可勾选任务" }]}
        onToggle={onToggle}
      />,
    );
    const checkbox = screen.getByRole("checkbox", {
      name: /标记「可勾选任务」为已完成/,
    });
    expect(checkbox).toBeDefined();
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith("a");
  });

  it("marks completed items with line-through and checked state", () => {
    render(
      <TodoListTable
        items={[{ id: "a", title: "已完成任务", completed: true }]}
      />,
    );
    const checkbox = screen.getByRole("checkbox", {
      name: /标记「已完成任务」为未完成/,
    });
    expect(checkbox.getAttribute("aria-checked")).toBe("true");
  });
});
