import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaskListTable } from "./task-list-table";

describe("TaskListTable", () => {
  it("renders task titles, statuses and priorities", () => {
    render(
      <TaskListTable
        tasks={[
          { id: "1", title: "对账核算", status: "进行中", priority: "高", assignee: "张三", deadline: "2026-01-15" },
          { id: "2", title: "月结报表", status: "待处理", priority: "低" },
        ]}
      />,
    );
    expect(screen.getByText("对账核算")).toBeDefined();
    expect(screen.getByText("月结报表")).toBeDefined();
    expect(screen.getByText("进行中")).toBeDefined();
    expect(screen.getByText("待处理")).toBeDefined();
    expect(screen.getByText("张三")).toBeDefined();
  });

  it("renders empty state", () => {
    render(<TaskListTable tasks={[]} />);
    expect(screen.getByText("暂无任务")).toBeDefined();
  });

  it("uses a table with column headers", () => {
    render(<TaskListTable tasks={[]} />);
    expect(screen.getByRole("columnheader", { name: "标题" })).toBeDefined();
    expect(screen.getByRole("columnheader", { name: "状态" })).toBeDefined();
  });
});
