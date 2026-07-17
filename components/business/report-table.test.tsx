import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import {
  ReportTable,
  type ReportColumn,
  type ReportLoadParams,
  type ReportLoadResult,
} from "./report-table";

interface Row extends Record<string, unknown> {
  id: string;
  name: string;
  amount: number;
  status: string;
  createdAt: string;
}

const rows: Row[] = [
  {
    id: "1",
    name: "销售订单 A",
    amount: 1200.5,
    status: "approved",
    createdAt: "2026-07-01T08:30:00Z",
  },
  {
    id: "2",
    name: "采购单 B",
    amount: 800,
    status: "pending",
    createdAt: "2026-07-02T10:00:00Z",
  },
];

function makeLoadData(
  result: Partial<ReportLoadResult<Row>> = {},
): (params: ReportLoadParams) => Promise<ReportLoadResult<Row>> {
  return vi.fn(async () => ({
    rows,
    total: rows.length,
    ...result,
  }));
}

describe("ReportTable", () => {
  it("renders rows from loadData", async () => {
    const loadData = makeLoadData();
    render(
      <ReportTable
        columns={[{ key: "name", title: "名称" }]}
        loadData={loadData}
        rowKey="id"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("销售订单 A")).toBeInTheDocument();
      expect(screen.getByText("采购单 B")).toBeInTheDocument();
    });
    expect(loadData).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
  });

  it("renders summary row when summary is provided", async () => {
    const loadData = makeLoadData({ summary: { amount: 2000.5 } });
    const columns: ReportColumn<Row>[] = [
      { key: "name", title: "名称" },
      { key: "amount", title: "金额", render: "money" },
    ];
    render(<ReportTable columns={columns} loadData={loadData} rowKey="id" />);

    await waitFor(() => {
      expect(screen.getByText("销售订单 A")).toBeInTheDocument();
    });
    // summary value rendered (formatNumber formats 2000.5)
    expect(screen.getByText("2,000.5")).toBeInTheDocument();
  });

  it("renders money cells with currency formatting", async () => {
    const loadData = makeLoadData();
    const columns: ReportColumn<Row>[] = [
      { key: "amount", title: "金额", render: "money" },
    ];
    render(<ReportTable columns={columns} loadData={loadData} rowKey="id" />);

    await waitFor(() => {
      // formatCurrency produces ¥1,200.50
      expect(screen.getByText(/1,200\.50/)).toBeInTheDocument();
      expect(screen.getByText(/800/)).toBeInTheDocument();
    });
  });

  it("renders datetime cells", async () => {
    const loadData = makeLoadData();
    const columns: ReportColumn<Row>[] = [
      { key: "createdAt", title: "创建时间", render: "datetime" },
    ];
    const { container } = render(
      <ReportTable columns={columns} loadData={loadData} rowKey="id" />,
    );

    // datetime uses formatDateTime (locale-aware medium date + short time).
    // The text may be split across table cell elements, so check textContent.
    await waitFor(() => {
      expect(container.textContent).toMatch(/2026.*\d{1,2}:\d{2}/);
    });
  });

  it("renders link cells with href", async () => {
    const loadData = makeLoadData();
    const columns: ReportColumn<Row>[] = [
      {
        key: "name",
        title: "名称",
        render: "link",
        href: (row) => `/detail/${row.id}`,
      },
    ];
    render(<ReportTable columns={columns} loadData={loadData} rowKey="id" />);

    await waitFor(() => {
      const link = screen.getByText("销售订单 A").closest("a");
      expect(link).toHaveAttribute("href", "/detail/1");
    });
  });

  it("renders badge cells from enumMap", async () => {
    const loadData = makeLoadData();
    const columns: ReportColumn<Row>[] = [
      {
        key: "status",
        title: "状态",
        render: "badge",
        enumMap: {
          approved: { label: "已批准" },
          pending: { label: "待处理", color: "destructive" },
        },
      },
    ];
    render(<ReportTable columns={columns} loadData={loadData} rowKey="id" />);

    await waitFor(() => {
      expect(screen.getByText("已批准")).toBeInTheDocument();
      expect(screen.getByText("待处理")).toBeInTheDocument();
    });
  });

  it("renders custom cellRender override", async () => {
    const loadData = makeLoadData();
    const columns: ReportColumn<Row>[] = [
      {
        key: "name",
        title: "名称",
        cellRender: (value) => (
          <span data-testid="custom-cell">{String(value)} ✏️</span>
        ),
      },
    ];
    render(<ReportTable columns={columns} loadData={loadData} rowKey="id" />);

    await waitFor(() => {
      expect(screen.getByText("销售订单 A ✏️")).toBeInTheDocument();
    });
  });

  it("does not render summary row when no summary values", async () => {
    const loadData = makeLoadData();
    const columns: ReportColumn<Row>[] = [{ key: "name", title: "名称" }];
    const { container } = render(
      <ReportTable columns={columns} loadData={loadData} rowKey="id" />,
    );

    await waitFor(() => {
      expect(screen.getByText("销售订单 A")).toBeInTheDocument();
    });
    // No summary footer bg-muted/40 element
    expect(container.querySelector(".bg-muted\\/40")).toBeNull();
  });

  it("handles loadData error gracefully", async () => {
    const loadData = vi.fn(async () => {
      throw new Error("network");
    });
    const columns: ReportColumn<Row>[] = [{ key: "name", title: "名称" }];
    render(<ReportTable columns={columns} loadData={loadData} rowKey="id" />);

    // Should not throw; table renders empty
    await waitFor(() => {
      expect(loadData).toHaveBeenCalled();
    });
  });
});
