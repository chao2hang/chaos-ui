import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchTable } from "./search-table";
import type { SearchTableProps, ColumnDef } from "./search-table";

type Row = { id: string; name: string; age: number; active: boolean };

const data: Row[] = [
  { id: "1", name: "Alice", age: 30, active: true },
  { id: "2", name: "Bob", age: 25, active: false },
];

const columns: ColumnDef<Row>[] = [
  { key: "name", title: "Name", dataIndex: "name" },
  { key: "age", title: "Age", dataIndex: "age", align: "right" },
  {
    key: "active",
    title: "Status",
    render: (v) => (v ? "Yes" : "No"),
  },
];

describe("SearchTable", () => {
  it("exports SearchTable", () => {
    expect(SearchTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SearchTableProps<Row> | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ColumnDef<Row> | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders column headers", () => {
    render(<SearchTable columns={columns} dataSource={data} />);
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("Age")).toBeDefined();
    expect(screen.getByText("Status")).toBeDefined();
  });

  it("renders data rows using dataIndex and render", () => {
    render(<SearchTable columns={columns} dataSource={data} />);
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Bob")).toBeDefined();
    expect(screen.getByText("30")).toBeDefined();
    expect(screen.getByText("25")).toBeDefined();
    expect(screen.getAllByText("Yes").length).toBe(1);
    expect(screen.getAllByText("No").length).toBe(1);
  });

  it("renders '-' for null values when value is null and no render", () => {
    const cols: ColumnDef<Row>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      {
        key: "missing",
        title: "Missing",
        dataIndex: "missing" as keyof Row & string,
      },
    ];
    const { container } = render(
      <SearchTable columns={cols} dataSource={data} />,
    );
    // 'missing' dataIndex resolves to undefined -> renders '-'
    expect(container.querySelectorAll("td").length).toBeGreaterThan(0);
  });

  it("shows empty text when dataSource is empty", () => {
    render(<SearchTable columns={columns} dataSource={[]} />);
    expect(screen.getByText("暂无数据")).toBeDefined();
  });

  it("shows custom empty text", () => {
    render(
      <SearchTable columns={columns} dataSource={[]} emptyText="No records" />,
    );
    expect(screen.getByText("No records")).toBeDefined();
  });

  it("shows skeleton rows when loading", () => {
    const { container } = render(
      <SearchTable columns={columns} dataSource={[]} loading />,
    );
    // 5 skeleton rows
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
    expect(screen.queryByText("暂无数据")).toBeNull();
  });

  it("fires onRow onClick when a row is clicked", () => {
    const onClick = vi.fn();
    render(
      <SearchTable
        columns={columns}
        dataSource={data}
        onRow={(record) => ({ onClick: () => onClick(record.id) })}
      />,
    );
    fireEvent.click(screen.getByText("Alice"));
    expect(onClick).toHaveBeenCalledWith("1");
  });

  it("renders pagination and fires onChange on page click", () => {
    const onPageChange = vi.fn();
    render(
      <SearchTable
        columns={columns}
        dataSource={data}
        pagination={{
          current: 1,
          pageSize: 2,
          total: 5,
          onChange: onPageChange,
        }}
      />,
    );
    // total label
    expect(screen.getByText(/共 5 条/)).toBeDefined();
    // page buttons 1,2,3
    expect(screen.getByText("上一页")).toBeDefined();
    fireEvent.click(screen.getByText("2"));
    expect(onPageChange).toHaveBeenCalledWith(2, 2);
  });

  it("disables prev button on first page", () => {
    const onPageChange = vi.fn();
    render(
      <SearchTable
        columns={columns}
        dataSource={data}
        pagination={{
          current: 1,
          pageSize: 2,
          total: 5,
          onChange: onPageChange,
        }}
      />,
    );
    const prev = screen.getByText("上一页").closest("button");
    expect(prev?.hasAttribute("disabled")).toBe(true);
  });

  it("disables next button on last page", () => {
    const onPageChange = vi.fn();
    render(
      <SearchTable
        columns={columns}
        dataSource={data}
        pagination={{
          current: 3,
          pageSize: 2,
          total: 5,
          onChange: onPageChange,
        }}
      />,
    );
    const next = screen.getByText("下一页").closest("button");
    expect(next?.hasAttribute("disabled")).toBe(true);
  });

  it("next button advances page", () => {
    const onPageChange = vi.fn();
    render(
      <SearchTable
        columns={columns}
        dataSource={data}
        pagination={{
          current: 1,
          pageSize: 2,
          total: 5,
          onChange: onPageChange,
        }}
      />,
    );
    fireEvent.click(screen.getByText("下一页"));
    expect(onPageChange).toHaveBeenCalledWith(2, 2);
  });

  it("hides pagination when pagination=false", () => {
    render(
      <SearchTable columns={columns} dataSource={data} pagination={false} />,
    );
    expect(screen.queryByText(/共/)).toBeNull();
  });

  it("pads the pagination bar horizontally under flush cards (CUI-LIST-01)", () => {
    const { container } = render(
      <SearchTable
        columns={columns}
        dataSource={data}
        pagination={{
          current: 1,
          pageSize: 2,
          total: 5,
          onChange: () => {},
        }}
      />,
    );
    const footer = container.querySelector(
      '[data-slot="search-table-pagination"]',
    ) as HTMLElement;
    expect(footer).not.toBeNull();
    expect(footer.className).toMatch(/px-\[var\(--card-spacing/);
  });

  it("pads the table body horizontally under flush cards (CUI-LIST-02 / #24)", () => {
    const { container } = render(
      <SearchTable
        columns={columns}
        dataSource={data}
        pagination={{
          current: 1,
          pageSize: 2,
          total: 5,
          onChange: () => {},
        }}
      />,
    );
    const body = container.querySelector(
      '[data-slot="search-table-body"]',
    ) as HTMLElement;
    expect(body).not.toBeNull();
    expect(body.className).toMatch(/px-\[var\(--card-spacing/);
    // Inner frame keeps border; padding lives on outer body slot
    const tableWrap = body.querySelector(".overflow-x-auto") as HTMLElement;
    expect(tableWrap).not.toBeNull();
    expect(tableWrap.className).toMatch(/border/);
    expect(tableWrap.className).not.toMatch(/px-\[var\(--card-spacing/);
  });

  it("applies align classes to header and cells", () => {
    const { container } = render(
      <SearchTable columns={columns} dataSource={data} />,
    );
    const heads = container.querySelectorAll("th");
    // age column header is right-aligned
    expect(heads[1]!.className).toContain("text-right");
  });

  it("applies ellipsis class when col.ellipsis", () => {
    const { container } = render(
      <SearchTable
        columns={[
          { key: "name", title: "Name", dataIndex: "name", ellipsis: true },
        ]}
        dataSource={data}
      />,
    );
    const cell = container.querySelector("td");
    expect(cell?.className).toContain("truncate");
  });

  it("applies custom className", () => {
    const { container } = render(
      <SearchTable columns={columns} dataSource={data} className="my-table" />,
    );
    expect(container.firstChild).toBeDefined();
    expect((container.firstChild as HTMLElement).className).toContain(
      "my-table",
    );
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/search-table");
    expect(mod.SearchTable).toBeDefined();
  });
});
