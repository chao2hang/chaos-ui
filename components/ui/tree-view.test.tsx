import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TreeView } from "@/components/ui/tree-view";
import type { TreeNode, TreeViewProps } from "@/components/ui/tree-view";

const sampleData: TreeNode[] = [
  {
    id: "1",
    label: "Folder 1",
    children: [
      { id: "1-1", label: "File 1-1" },
      { id: "1-2", label: "File 1-2" },
    ],
  },
  {
    id: "2",
    label: "Folder 2",
    children: [{ id: "2-1", label: "File 2-1" }],
  },
  { id: "3", label: "File 3" },
];

const disabledData: TreeNode[] = [
  { id: "1", label: "Item 1", disabled: true },
  { id: "2", label: "Item 2" },
];

describe("TreeView", () => {
  it("exports TreeView component", () => {
    expect(TreeView).toBeDefined();
    expect(typeof TreeView).toBe("function");
  });

  it("exports TreeNode type", () => {
    const node: TreeNode = { id: "1", label: "Test" };
    expect(node).toBeDefined();
  });

  it("exports TreeViewProps type", () => {
    const props: TreeViewProps = { data: [] };
    expect(props).toBeDefined();
  });

  it("renders tree nodes", () => {
    render(<TreeView data={sampleData} />);
    expect(screen.getByText("Folder 1")).toBeDefined();
    expect(screen.getByText("Folder 2")).toBeDefined();
    expect(screen.getByText("File 3")).toBeDefined();
  });

  it("renders with data-slot attribute", () => {
    const { container } = render(<TreeView data={sampleData} />);
    expect(container.querySelector('[data-slot="tree-view"]')).not.toBeNull();
  });

  it("does not render children by default (not expanded)", () => {
    render(<TreeView data={sampleData} />);
    expect(screen.queryByText("File 1-1")).toBeNull();
    expect(screen.queryByText("File 1-2")).toBeNull();
  });

  it("renders expanded children when defaultExpandedIds is set", () => {
    render(<TreeView data={sampleData} defaultExpandedIds={["1"]} />);
    expect(screen.getByText("File 1-1")).toBeDefined();
    expect(screen.getByText("File 1-2")).toBeDefined();
  });

  it("renders selected node with appropriate styling", () => {
    render(<TreeView data={sampleData} defaultSelectedIds={["3"]} />);
    expect(screen.getByText("File 3")).toBeDefined();
    // The selected item gets bg-muted class (not just hover:bg-muted)
    const file3Row = screen.getByText("File 3").closest("div");
    const classes = file3Row?.className.split(" ") ?? [];
    expect(classes).toContain("bg-muted");
  });

  it("calls onSelect when a node is clicked", () => {
    const onSelect = vi.fn();
    render(<TreeView data={sampleData} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("File 3"));
    expect(onSelect).toHaveBeenCalledWith(["3"]);
  });

  it("calls onExpand when expand toggle is clicked", () => {
    const onExpand = vi.fn();
    render(<TreeView data={sampleData} onExpand={onExpand} />);
    // Click the expand button for Folder 1
    const folder1Row = screen.getByText("Folder 1").closest("div");

    const expandBtn = folder1Row!.querySelector("button")!;
    fireEvent.click(expandBtn);
    expect(onExpand).toHaveBeenCalledWith(["1"]);
  });

  it("toggles expand state on repeated clicks", () => {
    const onExpand = vi.fn();
    render(<TreeView data={sampleData} onExpand={onExpand} />);
    const folder1Row = screen.getByText("Folder 1").closest("div");

    const expandBtn = folder1Row!.querySelector("button")!;

    // First click expands
    fireEvent.click(expandBtn);
    expect(onExpand).toHaveBeenCalledWith(["1"]);

    // Second click collapses
    fireEvent.click(expandBtn);
    expect(onExpand).toHaveBeenCalledWith([]);
  });

  it("toggles selection on repeated clicks", () => {
    const onSelect = vi.fn();
    render(<TreeView data={sampleData} onSelect={onSelect} />);
    const file3 = screen.getByText("File 3");

    // First click selects
    fireEvent.click(file3);
    expect(onSelect).toHaveBeenCalledWith(["3"]);

    // Second click deselects
    fireEvent.click(file3);
    expect(onSelect).toHaveBeenCalledWith([]);
  });

  it("renders with checkboxes when showCheckbox is true", () => {
    const { container } = render(<TreeView data={sampleData} showCheckbox />);
    // Checkbox uses role="checkbox" via Base UI
    const checkboxes = container.querySelectorAll('[role="checkbox"]');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it("renders with icons by default (showIcon=true)", () => {
    const { container } = render(<TreeView data={sampleData} />);
    // Nodes should have icon elements
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("hides icons when showIcon is false", () => {
    const { container } = render(
      <TreeView data={sampleData} showIcon={false} />,
    );
    // No SVG icons should be rendered for tree nodes
    // (Only the chevron expand buttons may have SVGs)
    const nodeSpans = container.querySelectorAll("span.text-muted-foreground");
    // showIcon=false means no folder/file icons in those spans
    expect(nodeSpans.length).toBe(0);
  });

  it("applies disabled styling to disabled nodes", () => {
    render(<TreeView data={disabledData} />);
    const item1 = screen.getByText("Item 1").closest("div");
    expect(item1?.className).toContain("opacity-50");
  });

  it("does not select disabled nodes on click", () => {
    const onSelect = vi.fn();
    render(<TreeView data={disabledData} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("Item 1"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("disables the whole tree when disabled prop is true", () => {
    const onSelect = vi.fn();
    render(<TreeView data={sampleData} disabled onSelect={onSelect} />);
    fireEvent.click(screen.getByText("File 3"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <TreeView data={sampleData} className="my-tree" />,
    );
    expect(
      container.querySelector('[data-slot="tree-view"]')?.className,
    ).toContain("my-tree");
  });

  it("normalizes data with fieldNames prop", () => {
    const rawData = [
      {
        key: "a",
        name: "Item A",
        subs: [{ key: "a1", name: "Sub A1", subs: [] }],
        isDisabled: false,
        icon: null,
      },
    ];
    render(
      <TreeView
        data={rawData as unknown as TreeNode[]}
        fieldNames={{
          key: "key",
          label: "name",
          children: "subs",
          disabled: "isDisabled",
          icon: "icon",
        }}
        defaultExpandedIds={["a"]}
      />,
    );
    expect(screen.getByText("Item A")).toBeDefined();
    expect(screen.getByText("Sub A1")).toBeDefined();
  });

  it("renders deeply nested children when expanded", () => {
    const nestedData: TreeNode[] = [
      {
        id: "root",
        label: "Root",
        children: [
          {
            id: "child",
            label: "Child",
            children: [{ id: "grandchild", label: "Grandchild" }],
          },
        ],
      },
    ];
    render(
      <TreeView data={nestedData} defaultExpandedIds={["root", "child"]} />,
    );
    expect(screen.getByText("Grandchild")).toBeDefined();
  });

  it("renders custom icon for nodes", () => {
    const customIconData: TreeNode[] = [
      {
        id: "1",
        label: "Custom",
        icon: <span data-testid="custom-icon">*</span>,
      },
    ];
    render(<TreeView data={customIconData} />);
    expect(screen.getByTestId("custom-icon")).not.toBeNull();
  });

  it("supports controlled expandedIds", () => {
    const { rerender } = render(
      <TreeView data={sampleData} expandedIds={["1"]} />,
    );
    expect(screen.getByText("File 1-1")).toBeDefined();

    rerender(<TreeView data={sampleData} expandedIds={[]} />);
    expect(screen.queryByText("File 1-1")).toBeNull();
  });

  it("supports controlled selectedIds", () => {
    const { rerender } = render(
      <TreeView data={sampleData} selectedIds={["3"]} />,
    );
    let file3Row = screen.getByText("File 3").closest("div");
    let classes = file3Row?.className.split(" ") ?? [];
    expect(classes).toContain("bg-muted");

    rerender(<TreeView data={sampleData} selectedIds={[]} />);
    file3Row = screen.getByText("File 3").closest("div");
    classes = file3Row?.className.split(" ") ?? [];
    expect(classes).not.toContain("bg-muted");
  });

  it("TreeViewProps supports all optional fields", () => {
    const props: TreeViewProps = {
      data: [],
      selectedIds: [],
      defaultSelectedIds: [],
      expandedIds: [],
      defaultExpandedIds: [],
      onSelect: () => {},
      onExpand: () => {},
      showCheckbox: true,
      showIcon: false,
      disabled: true,
      className: "test",
      fieldNames: {
        key: "id",
        label: "name",
        children: "subs",
        disabled: "off",
        icon: "ico",
      },
      labelOverflow: "wrap",
    };
    expect(props).toBeDefined();
  });

  it("sets title on truncated labels (issue #48)", () => {
    const long = "030101010101 250ML 玻璃瓶 特级生抽 整箱";
    render(<TreeView data={[{ id: "1", label: long }]} showIcon={false} />);
    const el = screen.getByText(long);
    expect(el.getAttribute("title")).toBe(long);
    expect(el.className).toMatch(/truncate/);
  });

  it("wrap overflow skips title and uses wrap classes (issue #48)", () => {
    const long = "030101010101 250ML wrap mode label";
    render(
      <TreeView
        data={[{ id: "1", label: long }]}
        showIcon={false}
        labelOverflow="wrap"
      />,
    );
    const el = screen.getByText(long);
    expect(el.getAttribute("title")).toBeNull();
    expect(el.className).toMatch(/break-words|whitespace-normal/);
  });
  it("single selectionMode keeps only one id and re-click clears (issue #54)", () => {
    const onSelect = vi.fn();
    render(
      <TreeView
        data={sampleData}
        selectionMode="single"
        defaultExpandedIds={["1"]}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByText("File 1-1"));
    expect(onSelect).toHaveBeenLastCalledWith(["1-1"]);
    fireEvent.click(screen.getByText("File 1-2"));
    expect(onSelect).toHaveBeenLastCalledWith(["1-2"]);
    fireEvent.click(screen.getByText("File 1-2"));
    expect(onSelect).toHaveBeenLastCalledWith([]);
  });

  it("multiple selectionMode still accumulates ids (issue #54)", () => {
    const onSelect = vi.fn();
    render(
      <TreeView
        data={sampleData}
        selectionMode="multiple"
        defaultExpandedIds={["1"]}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByText("File 1-1"));
    fireEvent.click(screen.getByText("File 1-2"));
    expect(onSelect).toHaveBeenLastCalledWith(["1-1", "1-2"]);
  });
});
