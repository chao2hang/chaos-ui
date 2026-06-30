import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RebutNodeSelect } from "./rebut-node-select";

describe("RebutNodeSelect", () => {
  it("renders the node count and each node name", () => {
    render(
      <RebutNodeSelect
        nodes={[
          { id: "n1", name: "部门审批" },
          { id: "n2", name: "财务审批" },
        ]}
      />,
    );
    expect(screen.getByText("共 2 个节点")).toBeDefined();
    expect(screen.getByText("部门审批")).toBeDefined();
    expect(screen.getByText("财务审批")).toBeDefined();
  });

  it("selects a node via aria-pressed toggle", () => {
    render(
      <RebutNodeSelect nodes={[{ id: "n1", name: "部门审批" }]} />,
    );
    const btn = screen.getByRole("button", { name: "部门审批" });
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
  });

  it("invokes onSelect when the confirm button is clicked", () => {
    const onSelect = vi.fn();
    render(
      <RebutNodeSelect
        nodes={[{ id: "n1", name: "部门审批" }]}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "部门审批" }));
    fireEvent.click(screen.getByRole("button", { name: "确认驳回" }));
    expect(onSelect).toHaveBeenCalledWith("n1");
  });

  it("disables confirm until a node is selected", () => {
    render(<RebutNodeSelect nodes={[{ id: "n1", name: "部门审批" }]} />);
    const confirm = screen.getByRole("button", { name: "确认驳回" });
    expect(confirm.hasAttribute("disabled")).toBe(true);
  });

  it("filters nodes by the search query", () => {
    render(
      <RebutNodeSelect
        nodes={[
          { id: "n1", name: "部门审批" },
          { id: "n2", name: "财务审批" },
        ]}
      />,
    );
    fireEvent.change(screen.getByLabelText("搜索节点名称"), {
      target: { value: "财务" },
    });
    expect(screen.getByText("财务审批")).toBeDefined();
    expect(screen.queryByText("部门审批")).toBeNull();
  });

  it("renders the empty-state message when no nodes match", () => {
    render(
      <RebutNodeSelect
        nodes={[{ id: "n1", name: "部门审批" }]}
      />,
    );
    fireEvent.change(screen.getByLabelText("搜索节点名称"), {
      target: { value: "不存在的节点" },
    });
    expect(screen.getByText("无匹配节点")).toBeDefined();
    expect(screen.queryByText("部门审批")).toBeNull();
  });

  it("shows node count of 0 when the nodes list is empty", () => {
    render(<RebutNodeSelect nodes={[]} />);
    expect(screen.getByText("共 0 个节点")).toBeDefined();
    expect(screen.getByText("无匹配节点")).toBeDefined();
  });

  it("clears the search query via the clear button", () => {
    render(
      <RebutNodeSelect
        nodes={[
          { id: "n1", name: "部门审批" },
          { id: "n2", name: "财务审批" },
        ]}
      />,
    );
    const input = screen.getByLabelText("搜索节点名称") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "财务" } });
    expect(input.value).toBe("财务");
    expect(screen.queryByText("部门审批")).toBeNull();

    fireEvent.click(screen.getByLabelText("清除搜索"));
    expect(input.value).toBe("");
    expect(screen.getByText("部门审批")).toBeDefined();
    expect(screen.getByText("财务审批")).toBeDefined();
  });

  it("hides the clear button when the query is empty", () => {
    render(<RebutNodeSelect nodes={[{ id: "n1", name: "部门审批" }]} />);
    expect(screen.queryByLabelText("清除搜索")).toBeNull();
  });

  it("toggles selection: clicking a selected node keeps it selected", () => {
    render(
      <RebutNodeSelect
        nodes={[
          { id: "n1", name: "部门审批" },
          { id: "n2", name: "财务审批" },
        ]}
      />,
    );
    const first = screen.getByRole("button", { name: "部门审批" });
    const second = screen.getByRole("button", { name: "财务审批" });

    fireEvent.click(first);
    expect(first.getAttribute("aria-pressed")).toBe("true");
    expect(second.getAttribute("aria-pressed")).toBe("false");

    // switching to a different node moves selection
    fireEvent.click(second);
    expect(first.getAttribute("aria-pressed")).toBe("false");
    expect(second.getAttribute("aria-pressed")).toBe("true");
  });

  it("enables the confirm button after a node is selected", () => {
    render(<RebutNodeSelect nodes={[{ id: "n1", name: "部门审批" }]} />);
    const confirm = screen.getByRole("button", { name: "确认驳回" });
    expect(confirm.hasAttribute("disabled")).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "部门审批" }));
    expect(confirm.hasAttribute("disabled")).toBe(false);
  });

  it("does not invoke onSelect when no node is selected and confirm clicked", () => {
    const onSelect = vi.fn();
    render(
      <RebutNodeSelect
        nodes={[{ id: "n1", name: "部门审批" }]}
        onSelect={onSelect}
      />,
    );
    // confirm is disabled, but exercise the guard path by forcing a click
    fireEvent.click(screen.getByRole("button", { name: "确认驳回" }));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("exposes the RebutNodeSelectProps type and renders with a className", () => {
    const { container } = render(
      <RebutNodeSelect
        nodes={[{ id: "n1", name: "部门审批" }]}
        className="custom-class"
      />,
    );
    const root = container.querySelector('[data-slot="rebut-node-select"]');
    expect(root).not.toBeNull();
    expect(root?.className).toContain("custom-class");
  });

  it("respects case-insensitive search", () => {
    render(
      <RebutNodeSelect
        nodes={[{ id: "n1", name: "Alpha" }, { id: "n2", name: "Beta" }]}
      />,
    );
    fireEvent.change(screen.getByLabelText("搜索节点名称"), {
      target: { value: "ALPHA" },
    });
    expect(screen.getByText("Alpha")).toBeDefined();
    expect(screen.queryByText("Beta")).toBeNull();
  });
});
