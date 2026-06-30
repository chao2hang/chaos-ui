import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FlowTracker } from "./flow-tracker";

describe("FlowTracker", () => {
  it("renders step names and operators", () => {
    render(
      <FlowTracker
        steps={[
          { id: "1", name: "提交申请", status: "done", operator: "张三", time: "09:00" },
          { id: "2", name: "部门审批", status: "active", operator: "李四" },
          { id: "3", name: "财务复核", status: "pending" },
        ]}
      />,
    );
    expect(screen.getByText("提交申请")).toBeDefined();
    expect(screen.getByText("部门审批")).toBeDefined();
    expect(screen.getByText("财务复核")).toBeDefined();
    expect(screen.getByText("操作人：张三")).toBeDefined();
    expect(screen.getByText("09:00")).toBeDefined();
  });

  it("renders rejected status", () => {
    render(
      <FlowTracker
        steps={[{ id: "1", name: "审批", status: "rejected", operator: "王五" }]}
      />,
    );
    expect(screen.getByText("审批")).toBeDefined();
  });
});
