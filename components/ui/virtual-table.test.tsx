import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// jsdom has no real layout, so the TanStack virtualizer reports a zero-size
// viewport and renders no items. Mock it with a deterministic virtualizer that
// exposes every data row so row rendering + onRowClick can be exercised.
vi.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: ({
    count,
    estimateSize,
  }: {
    count: number;
    estimateSize: () => number;
  }) => {
    const items = Array.from({ length: count }, (_, index) => ({
      index,
      key: `row-${index}`,
      start: index * estimateSize(),
      size: estimateSize(),
    }));
    return {
      getTotalSize: () => count * estimateSize(),
      getVirtualItems: () => items,
      measureElement: () => {},
    };
  },
}));

import { VirtualTable } from "./virtual-table";
import type { ColumnDef, VirtualTableProps } from "./virtual-table";

interface Row {
  id: string;
  name: string;
  age: number;
}

const columns: ColumnDef<Row>[] = [
  { key: "name", header: "Name" },
  { key: "age", header: "Age", width: 100 },
];

const data: Row[] = [
  { id: "1", name: "Alice", age: 30 },
  { id: "2", name: "Bob", age: 25 },
  { id: "3", name: "Carol", age: 40 },
];

describe("VirtualTable", () => {
  it("exports VirtualTable", () => {
    expect(VirtualTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ColumnDef<unknown> | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: VirtualTableProps<unknown> | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders column headers", () => {
    render(
      <VirtualTable
        columns={columns}
        data={data}
        estimateRowHeight={40}
        height={400}
      />,
    );
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("Age")).toBeDefined();
  });

  it("renders rows using default accessor (row[key])", () => {
    render(
      <VirtualTable
        columns={columns}
        data={data}
        estimateRowHeight={40}
        height={400}
      />,
    );
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("30")).toBeDefined();
  });

  it("renders rows using a custom accessor", () => {
    const cols: ColumnDef<Row>[] = [
      { key: "x", header: "Label", accessor: (r) => r.name },
    ];
    render(
      <VirtualTable
        columns={cols}
        data={data}
        estimateRowHeight={40}
        height={400}
      />,
    );
    expect(screen.getByText("Alice")).toBeDefined();
  });

  it("renders rows using a custom render function", () => {
    const cols: ColumnDef<Row>[] = [
      { key: "x", header: "Rendered", render: (r) => <em>{r.name}-r</em> },
    ];
    render(
      <VirtualTable
        columns={cols}
        data={data}
        estimateRowHeight={40}
        height={400}
      />,
    );
    expect(screen.getByText("Alice-r")).toBeDefined();
  });

  it("renders an empty cell when neither accessor nor render is set and key is absent", () => {
    const cols: ColumnDef<Row>[] = [{ key: "missing", header: "Missing" }];
    const { container } = render(
      <VirtualTable
        columns={cols}
        data={data}
        estimateRowHeight={40}
        height={400}
      />,
    );
    const cells = container.querySelectorAll(
      '[data-slot="virtual-table-cell"]',
    );
    expect(cells.length).toBeGreaterThan(0);
    expect((cells[0] as HTMLElement).textContent).toBe("");
  });

  it("fires onRowClick with the row when a row is clicked", () => {
    const onRowClick = vi.fn();
    render(
      <VirtualTable
        columns={columns}
        data={data}
        estimateRowHeight={40}
        height={400}
        onRowClick={onRowClick}
      />,
    );
    fireEvent.click(screen.getByText("Alice"));
    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick.mock.calls[0]![0]).toMatchObject({ id: "1" });
  });

  it("attaches cursor-pointer when onRowClick is provided", () => {
    const { container } = render(
      <VirtualTable
        columns={columns}
        data={data}
        estimateRowHeight={40}
        height={400}
        onRowClick={vi.fn()}
      />,
    );
    const row = container.querySelector(
      '[data-slot="virtual-table-row"]',
    ) as HTMLElement;
    expect(row.className).toContain("cursor-pointer");
  });

  it("does not attach cursor-pointer when onRowClick omitted", () => {
    const { container } = render(
      <VirtualTable
        columns={columns}
        data={data}
        estimateRowHeight={40}
        height={400}
      />,
    );
    const row = container.querySelector(
      '[data-slot="virtual-table-row"]',
    ) as HTMLElement;
    expect(row.className).not.toContain("cursor-pointer");
  });

  it("shows the default empty state when data is empty and not loading", () => {
    render(
      <VirtualTable
        columns={columns}
        data={[]}
        estimateRowHeight={40}
        height={400}
      />,
    );
    expect(screen.getByText("No data")).toBeDefined();
  });

  it("shows a custom empty component when provided", () => {
    render(
      <VirtualTable
        columns={columns}
        data={[]}
        estimateRowHeight={40}
        height={400}
        emptyComponent={<div>No records here</div>}
      />,
    );
    expect(screen.getByText("No records here")).toBeDefined();
    expect(screen.queryByText("No data")).toBeNull();
  });

  it("shows the loading component when loading is true and data is empty", () => {
    render(
      <VirtualTable
        columns={columns}
        data={[]}
        estimateRowHeight={40}
        height={400}
        loading
        loadingComponent={<div>Loading rows...</div>}
      />,
    );
    expect(screen.getByText("Loading rows...")).toBeDefined();
  });

  it("renders loading component alongside data when loading is true", () => {
    render(
      <VirtualTable
        columns={columns}
        data={data}
        estimateRowHeight={40}
        height={400}
        loading
        loadingComponent={<div>spinner</div>}
      />,
    );
    expect(screen.getByText("spinner")).toBeDefined();
  });

  it("does not render the loading slot when loading but no loadingComponent", () => {
    render(
      <VirtualTable
        columns={columns}
        data={data}
        estimateRowHeight={40}
        height={400}
        loading
      />,
    );
    // Data renders (not the empty state) and no spinner text is present.
    expect(screen.getByText("Alice")).toBeDefined();
  });

  it("applies height and width inline styles", () => {
    const { container } = render(
      <VirtualTable
        columns={columns}
        data={data}
        estimateRowHeight={40}
        height={500}
        width="80%"
      />,
    );
    const root = container.querySelector(
      '[data-slot="virtual-table"]',
    ) as HTMLElement;
    expect(root.style.height).toBe("500px");
    expect(root.style.width).toBe("80%");
  });

  it("uses 100% width by default", () => {
    const { container } = render(
      <VirtualTable
        columns={columns}
        data={data}
        estimateRowHeight={40}
        height={300}
      />,
    );
    const root = container.querySelector(
      '[data-slot="virtual-table"]',
    ) as HTMLElement;
    expect(root.style.width).toBe("100%");
  });

  it("builds grid template columns from widths", () => {
    const { container } = render(
      <VirtualTable
        columns={[
          { key: "a", header: "A", width: 120 },
          { key: "b", header: "B", width: "2fr" },
          { key: "c", header: "C" },
        ]}
        data={data}
        estimateRowHeight={40}
        height={300}
      />,
    );
    const header = container.querySelector(
      '[data-slot="virtual-table-header"]',
    ) as HTMLElement;
    expect(header.style.gridTemplateColumns).toBe("120px 2fr 1fr");
  });

  it("merges a custom className", () => {
    const { container } = render(
      <VirtualTable
        columns={columns}
        data={data}
        estimateRowHeight={40}
        height={300}
        className="my-table"
      />,
    );
    const root = container.querySelector(
      '[data-slot="virtual-table"]',
    ) as HTMLElement;
    expect(root.className).toContain("my-table");
  });

  it("module is importable", async () => {
    const mod = await import("./virtual-table");
    expect(mod.VirtualTable).toBeDefined();
  });
});
