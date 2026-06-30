import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaxDetailTable } from "./tax-detail-table";
import type { TaxDetailTableProps } from "./tax-detail-table";

describe("tax-detail-table", () => {
  it("exports TaxDetailTable", () => {
    expect(TaxDetailTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TaxDetailTableProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders a row per tax line and the totals footer", () => {
    render(
      <TaxDetailTable
        rows={[
          { id: "t1", name: "商品A", amount: 1000, taxRate: 0.13, taxAmount: 130 },
          { id: "t2", name: "商品B", amount: 2000, taxRate: 0.06, taxAmount: 120 },
        ]}
      />,
    );
    expect(screen.getByText("税务明细")).toBeDefined();
    expect(screen.getByText("商品A")).toBeDefined();
    expect(screen.getByText("商品B")).toBeDefined();
    // tax rates
    expect(screen.getByText("13.0%")).toBeDefined();
    expect(screen.getByText("6.0%")).toBeDefined();
    // footer: total tax = 250, total amount = 3000
    expect(screen.getByText("合计")).toBeDefined();
    expect(screen.getByText("¥250.00")).toBeDefined();
  });

  it("shows the empty state when there are no rows", () => {
    render(<TaxDetailTable rows={[]} />);
    expect(screen.getByText("暂无税务明细")).toBeDefined();
  });
});
