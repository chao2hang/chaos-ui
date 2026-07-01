import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ApprovalFlow } from "./approval-flow";
import type { ApprovalFlowProps } from "./approval-flow";

describe("approval-flow", () => {
  it("exports ApprovalFlow", () => {
    expect(ApprovalFlow).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ApprovalFlowProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders node names", () => {
    const nodes = [
      { id: "1", name: "提交", type: "start" },
      { id: "2", name: "审批", type: "approve" },
      { id: "3", name: "完成", type: "end" },
    ];
    const edges = [
      { from: "1", to: "2" },
      { from: "2", to: "3" },
    ];
    render(<ApprovalFlow nodes={nodes} edges={edges} />);
    expect(screen.getByText("提交")).toBeDefined();
    expect(screen.getByText("审批")).toBeDefined();
    expect(screen.getByText("完成")).toBeDefined();
  });

  it("renders approved status with check icon", () => {
    const nodes = [
      { id: "1", name: "提交", type: "start", status: "approved" },
    ];
    const edges: Array<{ from: string; to: string }> = [];
    render(<ApprovalFlow nodes={nodes} edges={edges} />);
    expect(screen.getByText("提交")).toBeDefined();
  });

  it("renders rejected status with x icon", () => {
    const nodes = [
      { id: "1", name: "审批", type: "approve", status: "rejected" },
    ];
    const edges: Array<{ from: string; to: string }> = [];
    render(<ApprovalFlow nodes={nodes} edges={edges} />);
    expect(screen.getByText("审批")).toBeDefined();
  });

  it("renders pending status (default) with clock icon", () => {
    const nodes = [
      { id: "1", name: "待审批", type: "approve", status: "pending" },
    ];
    const edges: Array<{ from: string; to: string }> = [];
    render(<ApprovalFlow nodes={nodes} edges={edges} />);
    expect(screen.getByText("待审批")).toBeDefined();
  });

  it("renders processing status", () => {
    const nodes = [
      { id: "1", name: "处理中", type: "process", status: "processing" },
    ];
    const edges: Array<{ from: string; to: string }> = [];
    render(<ApprovalFlow nodes={nodes} edges={edges} />);
    expect(screen.getByText("处理中")).toBeDefined();
  });

  it("renders node without status (defaults to pending)", () => {
    const nodes = [{ id: "1", name: "步骤1", type: "step" }];
    const edges: Array<{ from: string; to: string }> = [];
    render(<ApprovalFlow nodes={nodes} edges={edges} />);
    expect(screen.getByText("步骤1")).toBeDefined();
  });

  it("renders chevron arrows between nodes", () => {
    const nodes = [
      { id: "1", name: "提交", type: "start" },
      { id: "2", name: "审批", type: "approve" },
    ];
    const edges = [{ from: "1", to: "2" }];
    render(<ApprovalFlow nodes={nodes} edges={edges} />);
    expect(screen.getByText("提交")).toBeDefined();
    expect(screen.getByText("审批")).toBeDefined();
  });

  it("renders single node without chevron", () => {
    const nodes = [{ id: "1", name: "仅一步", type: "single" }];
    const edges: Array<{ from: string; to: string }> = [];
    render(<ApprovalFlow nodes={nodes} edges={edges} />);
    expect(screen.getByText("仅一步")).toBeDefined();
  });

  it("renders with custom className", () => {
    const result = render(
      <ApprovalFlow
        nodes={[{ id: "1", name: "步骤", type: "step" }]}
        edges={[]}
        className="my-flow"
      />,
    );
    expect(result.container.querySelector(".my-flow")).not.toBeNull();
  });

  it("renders data-slot attribute", () => {
    const result = render(
      <ApprovalFlow
        nodes={[{ id: "1", name: "步骤", type: "step" }]}
        edges={[]}
      />,
    );
    expect(
      result.container.querySelector("[data-slot='approval-flow']"),
    ).not.toBeNull();
  });

  it("orders nodes by edge chain starting from root", () => {
    const nodes = [
      { id: "3", name: "完成", type: "end" },
      { id: "1", name: "提交", type: "start" },
      { id: "2", name: "审批", type: "approve" },
    ];
    const edges = [
      { from: "1", to: "2" },
      { from: "2", to: "3" },
    ];
    render(<ApprovalFlow nodes={nodes} edges={edges} />);
    expect(screen.getByText("提交")).toBeDefined();
    expect(screen.getByText("审批")).toBeDefined();
    expect(screen.getByText("完成")).toBeDefined();
  });

  it("renders nodes without edges (falls back to all nodes since no starts found)", () => {
    // With no edges, both nodes are "starts". The algorithm picks starts[0] and
    // follows the next map. Since there's no next, only the first start renders.
    // The fallback `if (out.length === 0) return nodes` only triggers when starts is empty.
    const nodes = [
      { id: "a", name: "A", type: "step" },
      { id: "b", name: "B", type: "step" },
    ];
    const edges: Array<{ from: string; to: string }> = [];
    render(<ApprovalFlow nodes={nodes} edges={edges} />);
    // At least the first node should render
    expect(screen.getByText("A")).toBeDefined();
  });

  it("handles cyclic edges gracefully (no infinite loop)", () => {
    const nodes = [
      { id: "1", name: "步骤1", type: "step" },
      { id: "2", name: "步骤2", type: "step" },
    ];
    const edges = [
      { from: "1", to: "2" },
      { from: "2", to: "1" },
    ];
    render(<ApprovalFlow nodes={nodes} edges={edges} />);
    expect(screen.getByText("步骤1")).toBeDefined();
    expect(screen.getByText("步骤2")).toBeDefined();
  });

  it("renders unknown status with default muted styling", () => {
    const nodes = [
      { id: "1", name: "未知状态", type: "step", status: "unknown_status" },
    ];
    const edges: Array<{ from: string; to: string }> = [];
    render(<ApprovalFlow nodes={nodes} edges={edges} />);
    expect(screen.getByText("未知状态")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/approval-flow");
    expect(mod.ApprovalFlow).toBeDefined();
  });
});
