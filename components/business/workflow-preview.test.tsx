import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WorkflowPreview } from "./workflow-preview";
import type { WorkflowPreviewProps } from "./workflow-preview";

describe("WorkflowPreview", () => {
  it("renders the preview heading and summary", () => {
    render(<WorkflowPreview nodes={[]} edges={[]} />);
    expect(screen.getByText("工作流预览")).toBeDefined();
    expect(screen.getByText("共 0 个节点，0 条连线。")).toBeDefined();
  });

  it("renders node names and status badges", () => {
    render(
      <WorkflowPreview
        nodes={[
          { id: "n1", name: "提交申请", status: "done" },
          { id: "n2", name: "主管审批", status: "active" },
        ]}
        edges={[{ from: "n1", to: "n2" }]}
      />,
    );
    // "提交申请" is a source-only node, so it appears once in its card.
    expect(screen.getByText("提交申请")).toBeDefined();
    // "主管审批" appears both as its own node card and as n1's downstream
    // target, so it legitimately matches multiple elements.
    expect(screen.getAllByText("主管审批").length).toBeGreaterThan(0);
    expect(screen.getByText("已完成：1")).toBeDefined();
    expect(screen.getByText("进行中：1")).toBeDefined();
    expect(
      screen.getByText("共 2 个节点，1 条连线。"),
    ).toBeDefined();
  });

  it("renders the downstream target for each edge", () => {
    render(
      <WorkflowPreview
        nodes={[
          { id: "n1", name: "开始", status: "done" },
          { id: "n2", name: "结束", status: "pending" },
        ]}
        edges={[{ from: "n1", to: "n2" }]}
      />,
    );
    // "结束" appears both as its own node card and as n1's downstream
    // target, so it legitimately matches multiple elements.
    expect(screen.getAllByText("结束").length).toBeGreaterThan(0);
    expect(screen.getByText("待处理：1")).toBeDefined();
  });

  it("renders an empty state when there are no nodes", () => {
    render(<WorkflowPreview nodes={[]} edges={[]} />);
    expect(screen.getByText("暂无节点。")).toBeDefined();
  });

  it("exports types", () => {
    const _props: WorkflowPreviewProps = {
      nodes: [{ id: "n1", name: "开始", status: "done" }],
      edges: [],
    };
    expect(_props.nodes.length).toBe(1);
  });
});
