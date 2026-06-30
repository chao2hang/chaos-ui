import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WriteoffFlow } from "./writeoff-flow";

describe("WriteoffFlow", () => {
  it("renders each step name and its status label", () => {
    render(
      <WriteoffFlow
        steps={[
          { id: "s1", name: "申请核销", status: "done", amount: 1200 },
          { id: "s2", name: "财务复核", status: "doing" },
          { id: "s3", name: "完成核销", status: "pending" },
        ]}
      />,
    );
    // "财务复核" appears as both a step name and the next-step pointer, so
    // assert via getAllByText for the duplicated label and getByText for unique ones.
    // Each interior step's name also appears as the "next step" pointer, so
    // duplicated labels are asserted via getAllByText.
    expect(screen.getByText("申请核销")).toBeDefined();
    expect(screen.getAllByText("财务复核").length).toBeGreaterThan(0);
    expect(screen.getAllByText("完成核销").length).toBeGreaterThan(0);
    expect(screen.getByText("已完成")).toBeDefined();
    expect(screen.getByText("进行中")).toBeDefined();
    expect(screen.getByText("待处理")).toBeDefined();
  });

  it("shows the formatted amount when provided", () => {
    render(
      <WriteoffFlow
        steps={[{ id: "s1", name: "申请核销", status: "done", amount: 1200 }]}
      />,
    );
    expect(screen.getByText("¥1,200.00")).toBeDefined();
  });

  it("shows rejected status for a rejected step", () => {
    render(
      <WriteoffFlow
        steps={[{ id: "s1", name: "财务复核", status: "rejected" }]}
      />,
    );
    expect(screen.getByText("已驳回")).toBeDefined();
  });

  it("renders an empty state when there are no steps", () => {
    render(<WriteoffFlow steps={[]} />);
    expect(screen.getByText("暂无核销步骤")).toBeDefined();
  });

  it("renders step position counters", () => {
    render(
      <WriteoffFlow
        steps={[
          { id: "s1", name: "申请核销", status: "done" },
          { id: "s2", name: "完成核销", status: "pending" },
        ]}
      />,
    );
    expect(screen.getByText("步骤 1 / 2")).toBeDefined();
    expect(screen.getByText("步骤 2 / 2")).toBeDefined();
  });
});
