import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaskHistory } from "./task-history";

describe("TaskHistory", () => {
  it("renders task rows", () => {
    render(
      <TaskHistory
        tasks={[
          {
            id: "T-001",
            type: "数据导出",
            status: "完成",
            startTime: "2026-01-01T09:00:00Z",
            endTime: "2026-01-01T09:05:00Z",
          },
          {
            id: "T-002",
            type: "报表生成",
            status: "失败",
            startTime: "2026-01-02T10:00:00Z",
          },
        ]}
      />,
    );
    expect(screen.getByText("T-001")).toBeDefined();
    expect(screen.getByText("T-002")).toBeDefined();
    expect(screen.getByText("数据导出")).toBeDefined();
    expect(screen.getByText("报表生成")).toBeDefined();
    expect(screen.getAllByText("完成")).toBeDefined();
  });

  it("renders empty state", () => {
    render(<TaskHistory tasks={[]} />);
    expect(screen.getByText("暂无历史任务")).toBeDefined();
  });
});
