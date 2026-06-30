import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OperationLog } from "./operation-log";

describe("OperationLog", () => {
  it("renders action, operator and detail", () => {
    render(
      <OperationLog
        logs={[
          {
            id: "1",
            action: "审批通过",
            operator: "李四",
            timestamp: "2026-01-01T09:00:00Z",
            detail: "金额无误",
          },
          {
            id: "2",
            action: "提交单据",
            operator: "张三",
            timestamp: "2026-01-01T08:00:00Z",
          },
        ]}
      />,
    );
    expect(screen.getByText("审批通过")).toBeDefined();
    expect(screen.getByText("提交单据")).toBeDefined();
    expect(screen.getByText("李四")).toBeDefined();
    expect(screen.getByText("张三")).toBeDefined();
    expect(screen.getByText("金额无误")).toBeDefined();
  });

  it("renders empty state", () => {
    render(<OperationLog logs={[]} />);
    expect(screen.getByText("暂无操作日志")).toBeDefined();
  });
});
