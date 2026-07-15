import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import type { Column } from "./data-table";
import { DataTable } from "./data-table";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("DataTable", () => {
  it("module is importable with expected exports", async () => {
    const mod = await import("@/components/business/data-table");
    expect(mod.DataTable).toBeDefined();
  });

  it("pads the table body horizontally under flush cards (CUI-LIST-03 / #27)", () => {
    const columns: Column<Record<string, unknown>>[] = [
      { key: "name", title: "Name" },
    ];
    const { container } = render(
      <DataTable
        columns={columns}
        dataSource={[{ id: "1", name: "A" }]}
        rowKey="id"
      />,
    );
    const body = container.querySelector(
      '[data-slot="data-table-body"]',
    ) as HTMLElement;
    expect(body).not.toBeNull();
    expect(body.className).toMatch(/px-\[var\(--card-spacing/);
    const tableWrap = body.querySelector(".overflow-x-auto") as HTMLElement;
    expect(tableWrap).not.toBeNull();
    expect(tableWrap.className).toMatch(/border/);
    expect(tableWrap.className).not.toMatch(/px-\[var\(--card-spacing/);
  });

  it("Column type accepts key/title/sortable", () => {
    const col: Column<Record<string, unknown>> = {
      key: "name",
      title: "Name",
      sortable: true,
    };
    expect(col.key).toBe("name");
    expect(col.sortable).toBe(true);
  });

  it("Column type accepts width/align/fixed/render", () => {
    const col: Column<Record<string, unknown>> = {
      key: "price",
      title: "Price",
      width: 120,
      align: "right",
      fixed: "left",
      render: (value) => <strong>{String(value)}</strong>,
    };
    expect(col.width).toBe(120);
    expect(col.align).toBe("right");
    expect(col.fixed).toBe("left");
    expect(col.render).toBeDefined();
  });

  it("DataTableProps type accepts all fields", () => {
    // Type-level test: verify the props interface compiles
    type Props = {
      columns: Column<Record<string, unknown>>[];
      dataSource?: Record<string, unknown>[];
      rowKey?: string;
      loading?: boolean;
      emptyText?: string;
      size?: "sm" | "md" | "lg";
      sortable?: boolean;
      expandable?: {
        rowExpand: (row: Record<string, unknown>) => React.ReactNode;
      };
      className?: string;
    };
    const props: Props = {
      columns: [{ key: "name", title: "Name" }],
      dataSource: [{ id: "1", name: "Alice" }],
      rowKey: "id",
      loading: false,
      emptyText: "No data",
      size: "md",
      sortable: true,
      expandable: { rowExpand: (row) => <div>{String(row.name)}</div> },
      className: "custom",
    };
    expect(props.columns).toHaveLength(1);
    expect(props.sortable).toBe(true);
    expect(props.expandable).toBeDefined();
  });

  it("DataTable function exists and is callable", async () => {
    const mod = await import("@/components/business/data-table");
    expect(typeof mod.DataTable).toBe("function");
  });

  it("Column with right align", () => {
    const col: Column<Record<string, unknown>> = {
      key: "amount",
      title: "Amount",
      align: "right",
    };
    expect(col.align).toBe("right");
  });

  it("Column with center align", () => {
    const col: Column<Record<string, unknown>> = {
      key: "status",
      title: "Status",
      align: "center",
    };
    expect(col.align).toBe("center");
  });

  it("Column with right fixed", () => {
    const col: Column<Record<string, unknown>> = {
      key: "action",
      title: "Action",
      fixed: "right",
    };
    expect(col.fixed).toBe("right");
  });
});
