import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PivotTable } from "./pivot-table";
import type { Aggregation } from "./pivot-table";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

type Row = { region: string; product: string; amount: number };

const data: Row[] = [
  { region: "East", product: "A", amount: 10 },
  { region: "East", product: "B", amount: 20 },
  { region: "West", product: "A", amount: 5 },
  { region: "West", product: "B", amount: 7 },
];

describe("PivotTable", () => {
  it("exports PivotTable", () => {
    expect(PivotTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: Aggregation | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders the title with field names and aggregation", () => {
    render(
      <PivotTable
        data={data}
        rowField="region"
        columnField="product"
        valueField="amount"
      />,
    );
    expect(screen.getByText("region × product · sum")).toBeDefined();
  });

  it("renders row/column headers sorted and aggregated cells (sum)", () => {
    render(
      <PivotTable
        data={data}
        rowField="region"
        columnField="product"
        valueField="amount"
      />,
    );
    // column headers A, B + total header
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
    // row labels
    expect(screen.getByText("East")).toBeDefined();
    expect(screen.getByText("West")).toBeDefined();
    // East x A = 10, East x B = 20
    expect(screen.getByText("10")).toBeDefined();
    expect(screen.getByText("20")).toBeDefined();
    // West x A = 5, West x B = 7
    expect(screen.getByText("5")).toBeDefined();
    expect(screen.getByText("7")).toBeDefined();
  });

  it("shows row totals and column totals and grand total", () => {
    const { container } = render(
      <PivotTable
        data={data}
        rowField="region"
        columnField="product"
        valueField="amount"
      />,
    );
    // grand total = 10+20+5+7 = 42
    expect(screen.getByText("42")).toBeDefined();
    // two "total" labels (header + footer)
    const totals = screen.getAllByText("pivotTable.total");
    expect(totals.length).toBe(2);
    // footer exists
    expect(container.querySelector("tfoot")).not.toBeNull();
  });

  it("hides column total when showColumnTotal=false", () => {
    render(
      <PivotTable
        data={data}
        rowField="region"
        columnField="product"
        valueField="amount"
        showColumnTotal={false}
      />,
    );
    // only the footer "total" label remains (no header total column)
    expect(screen.getAllByText("pivotTable.total").length).toBe(1);
    // grand total cell absent
    expect(screen.queryByText("42")).toBeNull();
  });

  it("hides row total (footer) when showRowTotal=false", () => {
    const { container } = render(
      <PivotTable
        data={data}
        rowField="region"
        columnField="product"
        valueField="amount"
        showRowTotal={false}
      />,
    );
    expect(container.querySelector("tfoot")).toBeNull();
  });

  it("supports count aggregation", () => {
    render(
      <PivotTable
        data={data}
        rowField="region"
        columnField="product"
        valueField="amount"
        aggregation="count"
      />,
    );
    expect(screen.getByText("region × product · count")).toBeDefined();
    // 2 rows x 2 cols = 4 cells, each with count 1 (totals are 2/2/2/2/4, no "1")
    const ones = screen.getAllByText("1");
    expect(ones.length).toBe(4);
  });

  it("supports avg aggregation", () => {
    const dup: Row[] = [
      { region: "East", product: "A", amount: 10 },
      { region: "East", product: "A", amount: 20 },
    ];
    render(
      <PivotTable
        data={dup}
        rowField="region"
        columnField="product"
        valueField="amount"
        aggregation="avg"
      />,
    );
    expect(screen.getByText("region × product · avg")).toBeDefined();
    // avg of [10,20] = 15 — appears in the cell and the row/col/grand totals
    expect(screen.getAllByText("15").length).toBeGreaterThan(0);
  });

  it("supports min and max aggregation", () => {
    const dup: Row[] = [
      { region: "East", product: "A", amount: 10 },
      { region: "East", product: "A", amount: 30 },
      { region: "East", product: "A", amount: 20 },
    ];
    const { unmount } = render(
      <PivotTable
        data={dup}
        rowField="region"
        columnField="product"
        valueField="amount"
        aggregation="min"
      />,
    );
    // min of [10,30,20] = 10 — appears in cell and totals
    expect(screen.getAllByText("10").length).toBeGreaterThan(0);
    unmount();

    render(
      <PivotTable
        data={dup}
        rowField="region"
        columnField="product"
        valueField="amount"
        aggregation="max"
      />,
    );
    // max of [10,30,20] = 30 — appears in cell and totals
    expect(screen.getAllByText("30").length).toBeGreaterThan(0);
  });

  it("renders no-data row when data is empty", () => {
    render(
      <PivotTable
        data={[]}
        rowField="region"
        columnField="product"
        valueField="amount"
      />,
    );
    expect(screen.getByText("pivotTable.noData")).toBeDefined();
  });

  it("applies filter prop to exclude rows", () => {
    render(
      <PivotTable
        data={data}
        rowField="region"
        columnField="product"
        valueField="amount"
        filter={(r) => r.region === "East"}
      />,
    );
    expect(screen.getByText("East")).toBeDefined();
    expect(screen.queryByText("West")).toBeNull();
  });

  it("uses custom formatValue", () => {
    render(
      <PivotTable
        data={data}
        rowField="region"
        columnField="product"
        valueField="amount"
        formatValue={(v) => `\$${v.toFixed(0)}`}
      />,
    );
    expect(screen.getByText("$10")).toBeDefined();
    expect(screen.getByText("$20")).toBeDefined();
  });

  it("search input filters rows by row field text", () => {
    render(
      <PivotTable
        data={data}
        rowField="region"
        columnField="product"
        valueField="amount"
      />,
    );
    const input = screen.getByPlaceholderText("pivotTable.searchPlaceholder");
    fireEvent.change(input, { target: { value: "east" } });
    expect(screen.getByText("East")).toBeDefined();
    expect(screen.queryByText("West")).toBeNull();
  });

  it("coerces non-numeric values to numbers", () => {
    type Str = { region: string; product: string; amount: string };
    const strData: Str[] = [
      { region: "East", product: "A", amount: "12" },
    ];
    render(
      <PivotTable
        data={strData}
        rowField="region"
        columnField="product"
        valueField="amount"
      />,
    );
    // "12" coerced to number 12 — appears in the cell and row/col/grand totals
    expect(screen.getAllByText("12").length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <PivotTable
        data={data}
        rowField="region"
        columnField="product"
        valueField="amount"
        className="my-pivot"
      />,
    );
    expect(
      container.querySelector('[data-slot="pivot-table"]')?.className,
    ).toContain("my-pivot");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/pivot-table");
    expect(mod.PivotTable).toBeDefined();
  });
});
