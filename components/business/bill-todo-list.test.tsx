import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BillTodoList } from "./bill-todo-list";
import type { BillTodoListProps } from "./bill-todo-list";

describe("BillTodoList", () => {
  it("renders each item title and type badge", () => {
    render(
      <BillTodoList
        items={[
          { id: "1", title: "待审批付款单", type: "付款" },
          { id: "2", title: "待复核报销单", type: "报销" },
        ]}
      />,
    );
    expect(screen.getByText("待审批付款单")).toBeDefined();
    expect(screen.getByText("待复核报销单")).toBeDefined();
    expect(screen.getByText("付款")).toBeDefined();
    expect(screen.getByText("报销")).toBeDefined();
  });

  it("renders the formatted deadline when provided", () => {
    render(
      <BillTodoList
        items={[{ id: "1", title: "待办", type: "付款", deadline: "2026-06-01" }]}
      />,
    );
    expect(screen.getByText("2026年6月1日")).toBeDefined();
  });

  it("calls onItemClick with the item id when a row is clicked", () => {
    const onItemClick = vi.fn();
    render(
      <BillTodoList
        items={[{ id: "abc", title: "待办", type: "付款" }]}
        onItemClick={onItemClick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /待办/ }));
    expect(onItemClick).toHaveBeenCalledWith("abc");
  });

  it("renders items inside a list", () => {
    render(
      <BillTodoList items={[{ id: "1", title: "待办", type: "付款" }]} />,
    );
    expect(screen.getByRole("list")).toBeDefined();
  });

  it("exports types", () => {
    const _tc: BillTodoListProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
