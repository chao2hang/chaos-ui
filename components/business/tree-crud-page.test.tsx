import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { TreeCrudPage } from "./tree-crud-page";
import type { TreeNodeData } from "./tree-crud-page";

const tree: TreeNodeData[] = [
  {
    id: "g1",
    label: "饮料",
    children: [
      { id: "c1", label: "碳酸饮料" },
      { id: "c2", label: "果汁" },
    ],
  },
  { id: "g2", label: "零食" },
];

/** Finds a label text node within the tree region only (excludes the detail header). */
function withinTree(label: string): HTMLElement {
  const treeEl = screen.getByRole("tree", { name: "分类" });
  return within(treeEl).getByText(label);
}

describe("TreeCrudPage", () => {
  it("renders the tree and the detail placeholder when nothing is selected", () => {
    render(<TreeCrudPage tree={tree}>{null}</TreeCrudPage>);
    expect(screen.getByText("饮料")).toBeDefined();
    expect(screen.getByText("零食")).toBeDefined();
    expect(screen.getByText("未选择分类")).toBeDefined();
    expect(screen.getByRole("searchbox", { name: "搜索分类" })).toBeDefined();
  });

  it("renders children as the detail region", () => {
    render(
      <TreeCrudPage tree={tree} defaultSelected="c1">
        <span>详情内容</span>
      </TreeCrudPage>,
    );
    expect(screen.getByText("详情内容")).toBeDefined();
    // "碳酸饮料" appears in both the tree and the detail header, so use getAllByText.
    expect(screen.getAllByText("碳酸饮料").length).toBeGreaterThan(0);
  });

  it("invokes onSelect when a node is clicked", () => {
    const onSelect = vi.fn();
    render(<TreeCrudPage tree={tree} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("饮料"));
    expect(onSelect).toHaveBeenCalledWith("g1");
  });

  it("toggles a group expand/collapse via the caret button", () => {
    render(<TreeCrudPage tree={tree} defaultSelected="g1" />);
    // child visible initially (top-level auto-expanded)
    expect(screen.getByText("碳酸饮料")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "收起 饮料" }));
    expect(screen.queryByText("碳酸饮料")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "展开 饮料" }));
    expect(screen.getByText("碳酸饮料")).toBeDefined();
  });

  it("shows create / refresh buttons only when handlers are provided", () => {
    const onCreate = vi.fn();
    const onRefresh = vi.fn();
    const { rerender } = render(
      <TreeCrudPage tree={tree} onCreate={onCreate} onRefresh={onRefresh} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "新增分类" }));
    expect(onCreate).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "刷新" }));
    expect(onRefresh).toHaveBeenCalledTimes(1);

    rerender(<TreeCrudPage tree={tree} />);
    expect(screen.queryByRole("button", { name: "新增分类" })).toBeNull();
    expect(screen.queryByRole("button", { name: "刷新" })).toBeNull();
  });

  it("filters the tree by the search query", () => {
    render(<TreeCrudPage tree={tree} />);
    fireEvent.change(screen.getByRole("searchbox", { name: "搜索分类" }), {
      target: { value: "果汁" },
    });
    expect(screen.getByText("果汁")).toBeDefined();
    expect(screen.queryByText("零食")).toBeNull();
  });

  it("uses the controlled selected prop and shows it in the detail header", () => {
    const onSelect = vi.fn();
    render(<TreeCrudPage tree={tree} selected="g2" onSelect={onSelect}>{null}</TreeCrudPage>);
    // the detail header shows the selected node's label ("零食")
    expect(screen.getAllByText("零食").length).toBeGreaterThan(0);
    // controlled: clicking a node fires onSelect but does not change internal selection
    const treeNode = withinTree("饮料");
    fireEvent.click(treeNode);
    expect(onSelect).toHaveBeenCalledWith("g1");
  });

  it("selects a node via the treeitem keydown (Enter)", () => {
    const onSelect = vi.fn();
    render(<TreeCrudPage tree={tree} onSelect={onSelect} />);
    const item = withinTree("零食").closest('[role="treeitem"]')!;
    fireEvent.keyDown(item, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("g2");
  });

  it("selects a node via the treeitem keydown (Space)", () => {
    const onSelect = vi.fn();
    render(<TreeCrudPage tree={tree} onSelect={onSelect} />);
    const item = withinTree("零食").closest('[role="treeitem"]')!;
    fireEvent.keyDown(item, { key: " " });
    expect(onSelect).toHaveBeenCalledWith("g2");
  });

  it("expands a collapsed group via ArrowRight on the treeitem", () => {
    render(<TreeCrudPage tree={tree} defaultSelected="g2" />);
    // collapse the auto-expanded 饮料 group first
    fireEvent.click(screen.getByRole("button", { name: "收起 饮料" }));
    expect(screen.queryByText("碳酸饮料")).toBeNull();
    // ArrowRight on the collapsed group treeitem expands it
    const groupItem = withinTree("饮料").closest('[role="treeitem"]')!;
    fireEvent.keyDown(groupItem, { key: "ArrowRight" });
    expect(screen.getByText("碳酸饮料")).toBeDefined();
  });

  it("collapses an expanded group via ArrowLeft on the treeitem", () => {
    render(<TreeCrudPage tree={tree} defaultSelected="g2" />);
    expect(screen.getByText("碳酸饮料")).toBeDefined();
    const groupItem = withinTree("饮料").closest('[role="treeitem"]')!;
    fireEvent.keyDown(groupItem, { key: "ArrowLeft" });
    expect(screen.queryByText("碳酸饮料")).toBeNull();
  });

  it("renders the clear-search button and clears the query when clicked (uncontrolled)", () => {
    render(<TreeCrudPage tree={tree} />);
    const search = screen.getByRole("searchbox", { name: "搜索分类" }) as HTMLInputElement;
    fireEvent.change(search, { target: { value: "果汁" } });
    expect(screen.getByRole("button", { name: "清除搜索" })).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "清除搜索" }));
    expect(search.value).toBe("");
  });

  it("fires onQueryChange('') when the clear-search button is clicked", () => {
    const onQueryChange = vi.fn();
    render(<TreeCrudPage tree={tree} onQueryChange={onQueryChange} />);
    fireEvent.change(screen.getByRole("searchbox", { name: "搜索分类" }), {
      target: { value: "果汁" },
    });
    fireEvent.click(screen.getByRole("button", { name: "清除搜索" }));
    expect(onQueryChange).toHaveBeenCalledWith("");
  });

  it("uses the controlled query value", () => {
    const onQueryChange = vi.fn();
    render(<TreeCrudPage tree={tree} query="果汁" onQueryChange={onQueryChange} />);
    const search = screen.getByRole("searchbox", { name: "搜索分类" }) as HTMLInputElement;
    expect(search.value).toBe("果汁");
    expect(screen.getByText("果汁")).toBeDefined();
    // typing fires onQueryChange but the value is controlled
    fireEvent.change(search, { target: { value: "ignored" } });
    expect(onQueryChange).toHaveBeenCalledWith("ignored");
  });

  it("renders the empty-state message when the tree is empty", () => {
    render(<TreeCrudPage tree={[]}>{null}</TreeCrudPage>);
    expect(screen.getByText("暂无分类")).toBeDefined();
  });

  it("renders the selected node label in the detail header", () => {
    render(<TreeCrudPage tree={tree} defaultSelected="c1">{null}</TreeCrudPage>);
    // the detail header shows the selected node's label
    expect(screen.getAllByText("碳酸饮料").length).toBeGreaterThan(0);
  });

  it("applies the className to the root element", () => {
    render(<TreeCrudPage tree={tree} className="my-tree">{null}</TreeCrudPage>);
    const root = document.querySelector('[data-slot="tree-crud-page"]');
    expect(root?.className).toContain("my-tree");
  });
});
