import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WorkflowDesigner } from "./workflow-designer";
import type {
  WorkflowDesignerProps,
  WorkflowNode,
  WorkflowEdge,
} from "./workflow-designer";

describe("WorkflowDesigner", () => {
  it("renders the designer heading and add-node button", () => {
    render(<WorkflowDesigner nodes={[]} edges={[]} />);
    expect(screen.getByText("工作流设计器")).toBeDefined();
    expect(screen.getByRole("button", { name: "新增节点" })).toBeDefined();
  });

  it("renders existing node names and summary", () => {
    render(
      <WorkflowDesigner
        nodes={[
          { id: "n1", type: "start", name: "开始" },
          { id: "n2", type: "end", name: "结束" },
        ]}
        edges={[{ from: "n1", to: "n2" }]}
      />,
    );
    expect(screen.getByDisplayValue("开始")).toBeDefined();
    expect(screen.getByDisplayValue("结束")).toBeDefined();
    expect(screen.getByText("共 2 个节点，1 条连线。")).toBeDefined();
  });

  it("renders an empty state and edge form when there are no nodes", () => {
    render(<WorkflowDesigner nodes={[]} edges={[]} />);
    expect(screen.getByText("暂无节点，请新增节点。")).toBeDefined();
  });

  it("exports types", () => {
    const _node: WorkflowNode = { id: "n1", type: "start", name: "开始" };
    const _edge: WorkflowEdge = { from: "n1", to: "n2" };
    const _props: WorkflowDesignerProps = {
      nodes: [_node],
      edges: [_edge],
    };
    expect(_node.id).toBe("n1");
    expect(_props.edges.length).toBe(1);
  });
});
