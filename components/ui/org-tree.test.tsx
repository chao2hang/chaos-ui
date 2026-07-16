import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { OrgTree } from "@/components/ui/org-tree";
import type { OrgTreeNode } from "@/components/ui/org-tree";

const sampleData: OrgTreeNode[] = [
  {
    id: "1",
    label: "总公司",
    children: [
      {
        id: "2",
        label: "技术部",
        description: "30人",
        children: [
          { id: "4", label: "前端组", description: "12人" },
          { id: "5", label: "后端组", description: "18人" },
        ],
      },
      {
        id: "3",
        label: "市场部",
        description: "15人",
      },
    ],
  },
];

describe("OrgTree", () => {
  it("renders root nodes", () => {
    const { container } = render(<OrgTree data={sampleData} />);
    const treeitems = container.querySelectorAll('[role="treeitem"]');
    expect(treeitems.length).toBeGreaterThanOrEqual(1);
  });

  it("expands node on click when it has children", async () => {
    const onExpand = vi.fn();
    const { container } = render(
      <OrgTree data={sampleData} onExpand={onExpand} />,
    );

    // Click the expand button on the first root node
    const expandBtn = container.querySelector("button");
    expect(expandBtn).not.toBeNull();

    await act(async () => {
      if (expandBtn) fireEvent.click(expandBtn);
    });

    expect(onExpand).toHaveBeenCalled();
    expect(onExpand.mock.calls[0]?.[0]).toContain("1");
  });

  it("selects node in single mode", async () => {
    const onSelect = vi.fn();
    const { container } = render(
      <OrgTree data={sampleData} selectable="single" onSelect={onSelect} />,
    );

    const treeitems = container.querySelectorAll('[role="treeitem"]');
    expect(treeitems.length).toBeGreaterThan(0);

    await act(async () => {
      fireEvent.click(treeitems[0]!);
    });

    expect(onSelect).toHaveBeenCalled();
    expect(onSelect.mock.calls[0]?.[0]).toContain("1");
  });

  it("renders checkboxes when checkable", () => {
    const { container } = render(<OrgTree data={sampleData} checkable />);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBeGreaterThanOrEqual(1);
  });

  it("shows search input when searchable", () => {
    const { container } = render(<OrgTree data={sampleData} searchable />);
    const searchInput = container.querySelector('input[placeholder="搜索..."]');
    expect(searchInput).not.toBeNull();
  });

  it("filters nodes on search", () => {
    const { container } = render(<OrgTree data={sampleData} searchable />);
    const searchInput = container.querySelector('input[placeholder="搜索..."]');
    expect(searchInput).not.toBeNull();

    fireEvent.change(searchInput!, { target: { value: "技术" } });

    // Should find matching nodes
    expect(container.textContent).toContain("技术部");
  });

  it("shows empty state when no search results", () => {
    const { container } = render(<OrgTree data={sampleData} searchable />);
    const searchInput = container.querySelector('input[placeholder="搜索..."]');
    expect(searchInput).not.toBeNull();

    fireEvent.change(searchInput!, { target: { value: "ZZZZNOTEXISTZZZZ" } });
    expect(container.textContent).toContain("无匹配结果");
  });

  it("respects controlled expandedKeys", () => {
    const { container } = render(
      <OrgTree data={sampleData} expandedKeys={["1"]} />,
    );
    // With expandedKeys=["1"], children of node "1" should be visible
    expect(container.textContent).toContain("技术部");
  });

  it("respects controlled selectedKeys", () => {
    const { container } = render(
      <OrgTree data={sampleData} selectedKeys={["1"]} selectable="single" />,
    );
    const selected = container.querySelector('[aria-selected="true"]');
    expect(selected).not.toBeNull();
  });

  it("calls onNodeClick when a node is clicked", async () => {
    const onNodeClick = vi.fn();
    const { container } = render(
      <OrgTree data={sampleData} onNodeClick={onNodeClick} />,
    );

    const treeitems = container.querySelectorAll('[role="treeitem"]');
    await act(async () => {
      fireEvent.click(treeitems[0]!);
    });

    expect(onNodeClick).toHaveBeenCalled();
    expect(onNodeClick.mock.calls[0]?.[0].label).toBe("总公司");
  });

  it("renders custom node with renderNode prop", () => {
    const { container } = render(
      <OrgTree
        data={sampleData}
        renderNode={(node) => (
          <span data-testid="custom-node">{node.label}</span>
        )}
      />,
    );
    expect(container.textContent).toContain("总公司");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/org-tree");
    expect(mod.OrgTree).toBeDefined();
  });

  it("sets title on truncated labels (#48 sibling)", () => {
    const long = "超长组织节点名称用于截断与 title 恢复测试";
    const data: OrgTreeNode[] = [
      { id: "1", label: long, description: "备注很长" },
    ];
    const { getByText } = render(<OrgTree data={data} />);
    const label = getByText(long);
    expect(label.getAttribute("title")).toBe(long);
    expect(getByText("备注很长").getAttribute("title")).toBe("备注很长");
  });
  it("uses equal indent width for leaf and parent at same depth (issue #51)", () => {
    const mixed: OrgTreeNode[] = [
      {
        id: "p",
        label: "采购部",
        children: [{ id: "c", label: "董事办" }],
      },
      { id: "leaf", label: "漂白部" },
    ];
    const { getByText } = render(
      <OrgTree data={mixed} defaultExpandedKeys={["p"]} />,
    );
    const indentOf = (label: string) => {
      const row = getByText(label).closest(
        '[role="treeitem"]',
      ) as HTMLElement | null;
      const indent = row?.children[0] as HTMLElement | undefined;
      return indent?.getAttribute("style") ?? "";
    };
    // Same depth (0): parent and leaf share indent (no leaf +16)
    expect(indentOf("采购部")).toBe(indentOf("漂白部"));
    expect(indentOf("采购部")).toContain("width: 0px");
    // depth 1 child
    expect(indentOf("董事办")).toContain("width: 20px");
  });

  it("single mode re-click clears selection (issue #54 sibling)", async () => {
    const onSelect = vi.fn();
    const { container } = render(
      <OrgTree data={sampleData} selectable="single" onSelect={onSelect} />,
    );
    const treeitems = container.querySelectorAll('[role="treeitem"]');
    await act(async () => {
      fireEvent.click(treeitems[0]!);
    });
    expect(onSelect.mock.calls.at(-1)?.[0]).toEqual(["1"]);
    await act(async () => {
      fireEvent.click(treeitems[0]!);
    });
    expect(onSelect.mock.calls.at(-1)?.[0]).toEqual([]);
  });
});
