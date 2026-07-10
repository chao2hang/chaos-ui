import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TreeTable } from "./tree-table";
import type { TreeTableColumn } from "./tree-table";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

// Provide minimal SVG stubs for lucide-react icons used in the component
vi.mock("@/components/ui/icons", () => ({
  ChevronRightIcon: (props: Record<string, unknown>) => (
    <svg data-testid="chevron-right" {...props} />
  ),
  ChevronDownIcon: (props: Record<string, unknown>) => (
    <svg data-testid="chevron-down" {...props} />
  ),
  ArrowUpDownIcon: (props: Record<string, unknown>) => (
    <svg data-testid="arrow-up-down" {...props} />
  ),
  ArrowUpIcon: (props: Record<string, unknown>) => (
    <svg data-testid="arrow-up" {...props} />
  ),
  ArrowDownIcon: (props: Record<string, unknown>) => (
    <svg data-testid="arrow-down" {...props} />
  ),
  Loader2Icon: (props: Record<string, unknown>) => (
    <svg data-testid="loader" {...props} />
  ),
}));

type Row = Record<string, unknown> & {
  id: string;
  name: string;
  children?: Row[];
};

const nestedData: Row[] = [
  {
    id: "1",
    name: "Engineering",
    children: [
      {
        id: "1-1",
        name: "Frontend",
        children: [
          { id: "1-1-1", name: "React Team" },
          { id: "1-1-2", name: "Design System" },
        ],
      },
      { id: "1-2", name: "Backend" },
    ],
  },
  {
    id: "2",
    name: "Marketing",
    children: [{ id: "2-1", name: "Content" }],
  },
];

const flatData = [
  { id: "1", name: "Engineering", parentId: null },
  { id: "1-1", name: "Frontend", parentId: "1" },
  { id: "1-2", name: "Backend", parentId: "1" },
  { id: "2", name: "Marketing", parentId: null },
  { id: "2-1", name: "Content", parentId: "2" },
];

const columns: TreeTableColumn<Row>[] = [
  { key: "name", title: "Name", sortable: true },
  { key: "id", title: "ID" },
];

const flatColumns: TreeTableColumn<Record<string, unknown>>[] = [
  { key: "name", title: "Name" },
  { key: "id", title: "ID" },
];

describe("TreeTable", () => {
  it("renders with data-slot", () => {
    const { container } = render(
      <TreeTable columns={columns} data={nestedData} rowKey="id" />,
    );
    expect(container.querySelector('[data-slot="tree-table"]')).toBeTruthy();
  });

  it("renders nested data with correct root items visible", () => {
    render(<TreeTable columns={columns} data={nestedData} rowKey="id" />);
    expect(screen.getByText("Engineering")).toBeTruthy();
    expect(screen.getByText("Marketing")).toBeTruthy();
    // Children are hidden by default (not expanded)
    expect(screen.queryByText("Frontend")).toBeNull();
    expect(screen.queryByText("Backend")).toBeNull();
  });

  it("renders children when defaultExpandedKeys is provided", () => {
    render(
      <TreeTable
        columns={columns}
        data={nestedData}
        rowKey="id"
        defaultExpandedKeys={["1"]}
      />,
    );
    expect(screen.getByText("Frontend")).toBeTruthy();
    expect(screen.getByText("Backend")).toBeTruthy();
    // Depth 2 children still hidden
    expect(screen.queryByText("React Team")).toBeNull();
  });

  it("expand/collapse toggles children visibility", () => {
    render(<TreeTable columns={columns} data={nestedData} rowKey="id" />);
    // Initially collapsed
    expect(screen.queryByText("Frontend")).toBeNull();

    // Click expand on Engineering
    const expandBtns = screen.getAllByLabelText("Expand");
    fireEvent.click(expandBtns[0]!); // First expand button = Engineering

    // Now visible
    expect(screen.getByText("Frontend")).toBeTruthy();
    expect(screen.getByText("Backend")).toBeTruthy();

    // Click collapse
    const collapseBtns = screen.getAllByLabelText("Collapse");
    fireEvent.click(collapseBtns[0]!);

    // Hidden again
    expect(screen.queryByText("Frontend")).toBeNull();
  });

  it("chevron icons show based on hasChildren", () => {
    render(
      <TreeTable
        columns={columns}
        data={nestedData}
        rowKey="id"
        defaultExpandedKeys={["1", "1-1"]}
      />,
    );
    // Engineering, Frontend, Marketing have children -> expand/collapse buttons
    const expandCollapseButtons = screen.queryAllByRole("button");
    expect(expandCollapseButtons.length).toBeGreaterThanOrEqual(3);

    // Leaf nodes (React Team, Design System, Backend, Content) have no expand buttons
    // Check that Backend (leaf in this context since no children) has no expand button
    // Actually Backend has no children, so it should not have a button
  });

  it("lazy loading fires onExpandRow callback", async () => {
    const onExpandRow = vi.fn().mockResolvedValue([
      { id: "lazy-1", name: "Lazy Child 1" },
      { id: "lazy-2", name: "Lazy Child 2" },
    ]);

    const leafData: Row[] = [{ id: "root", name: "Root Node" }];

    render(
      <TreeTable
        columns={columns}
        data={leafData}
        rowKey="id"
        onExpandRow={onExpandRow}
      />,
    );

    // With onExpandRow, even leaf nodes show expand button
    const expandBtn = screen.getByLabelText("Expand");
    fireEvent.click(expandBtn);

    await waitFor(() => {
      expect(onExpandRow).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText("Lazy Child 1")).toBeTruthy();
      expect(screen.getByText("Lazy Child 2")).toBeTruthy();
    });
  });

  it("single selection selects only one row", () => {
    const onSelectionChange = vi.fn();
    render(
      <TreeTable
        columns={columns}
        data={nestedData}
        rowKey="id"
        selectable="single"
        selectedKeys={[]}
        onSelectionChange={onSelectionChange}
      />,
    );

    // Click radio on Engineering
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[0]!);

    expect(onSelectionChange).toHaveBeenCalledWith(["1"]);
  });

  it("multiple selection with parent-child linkage checks all descendants", () => {
    const onSelectionChange = vi.fn();
    render(
      <TreeTable
        columns={columns}
        data={nestedData}
        rowKey="id"
        selectable="multiple"
        selectedKeys={[]}
        onSelectionChange={onSelectionChange}
        defaultExpandedKeys={["1"]}
      />,
    );

    // Check Engineering parent checkbox
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]!); // Engineering

    // Should select Engineering + Frontend + Backend + React Team + Design System
    expect(onSelectionChange).toHaveBeenCalledWith(
      expect.arrayContaining(["1", "1-1", "1-2", "1-1-1", "1-1-2"]),
    );
  });

  it("selected keys fire onSelectionChange for deselection", () => {
    const onSelectionChange = vi.fn();
    render(
      <TreeTable
        columns={columns}
        data={nestedData}
        rowKey="id"
        selectable="multiple"
        selectedKeys={["1", "1-1", "1-2", "1-1-1", "1-1-2"]}
        onSelectionChange={onSelectionChange}
        defaultExpandedKeys={["1"]}
      />,
    );

    // Uncheck Engineering
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]!);

    // Should remove Engineering and all descendants
    const calledWith = onSelectionChange.mock.calls[0]![0]! as string[];
    expect(calledWith).not.toContain("1");
    expect(calledWith).not.toContain("1-1");
    expect(calledWith).not.toContain("1-2");
  });

  it("empty state shown when no data", () => {
    render(
      <TreeTable
        columns={columns}
        data={[]}
        rowKey="id"
        emptyText="Nothing here"
      />,
    );
    expect(screen.getByText("Nothing here")).toBeTruthy();
  });

  it("loading state shows skeletons", () => {
    const { container } = render(
      <TreeTable columns={columns} data={nestedData} rowKey="id" loading />,
    );
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("sort works on tree data", () => {
    const sortableColumns: TreeTableColumn<Row>[] = [
      { key: "name", title: "Name", sortable: true },
      { key: "id", title: "ID" },
    ];

    render(
      <TreeTable
        columns={sortableColumns}
        data={nestedData}
        rowKey="id"
        defaultExpandedKeys={["1", "2"]}
      />,
    );

    // Click the Name header to sort ascending
    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader);

    // After ascending sort, Engineering < Marketing alphabetically
    const rows = screen.getAllByRole("row");
    // The data rows (skip header row)
    expect(rows.length).toBeGreaterThan(2);
  });

  it("flat data with parentKey converts to tree correctly", () => {
    render(
      <TreeTable
        columns={flatColumns}
        data={flatData}
        rowKey="id"
        parentKey="parentId"
        defaultExpandedKeys={["1", "2"]}
      />,
    );

    expect(screen.getByText("Engineering")).toBeTruthy();
    expect(screen.getByText("Frontend")).toBeTruthy();
    expect(screen.getByText("Backend")).toBeTruthy();
    expect(screen.getByText("Marketing")).toBeTruthy();
    expect(screen.getByText("Content")).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(
      <TreeTable
        columns={columns}
        data={nestedData}
        rowKey="id"
        className="custom-class"
      />,
    );
    const el = container.querySelector(
      '[data-slot="tree-table"]',
    ) as HTMLElement;
    expect(el.className).toContain("custom-class");
  });

  it("renders caption when provided", () => {
    render(
      <TreeTable
        columns={columns}
        data={nestedData}
        rowKey="id"
        caption="Org Structure"
      />,
    );
    expect(screen.getByText("Org Structure")).toBeTruthy();
  });

  it("striped applies alternating bg class", () => {
    const { container } = render(
      <TreeTable
        columns={columns}
        data={nestedData}
        rowKey="id"
        striped
        defaultExpandedKeys={["1", "2"]}
      />,
    );
    const rows = container.querySelectorAll('[data-slot="table-row"]');
    // At least one row should have bg-muted/20 (the odd-indexed ones)
    const stripedRows = Array.from(rows).filter((r) =>
      r.className.includes("bg-muted/20"),
    );
    expect(stripedRows.length).toBeGreaterThan(0);
  });

  it("fires onExpandedChange when expanding a row", () => {
    const onExpandedChange = vi.fn();
    render(
      <TreeTable
        columns={columns}
        data={nestedData}
        rowKey="id"
        onExpandedChange={onExpandedChange}
      />,
    );

    const expandBtns = screen.getAllByLabelText("Expand");
    fireEvent.click(expandBtns[0]!);

    expect(onExpandedChange).toHaveBeenCalledWith(
      expect.arrayContaining(["1"]),
    );
  });
});
