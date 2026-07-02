import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InventoryAlertList } from "./inventory-alert-list";
import type { InventoryAlertItem } from "./inventory-alert-list";

const sampleItems: InventoryAlertItem[] = [
  {
    id: "1",
    name: "Steel Sheet A",
    code: "SS-A-001",
    currentQty: 10,
    safetyStock: 50,
    unit: "pcs",
    severity: "critical",
    message: "Below safety stock",
    trend: [80, 60, 45, 30, 20, 15, 10],
    warehouse: "WH-01",
    recentTransactions: [
      { date: "2024-03-10", type: "out", quantity: 20, reference: "PO-1001" },
      { date: "2024-03-09", type: "out", quantity: 15, reference: "PO-1000" },
    ],
  },
  {
    id: "2",
    name: "Bolt M8x30",
    code: "BL-M8-030",
    currentQty: 200,
    safetyStock: 500,
    unit: "pcs",
    severity: "warning",
    trend: [600, 550, 480, 400, 320, 260, 200],
    warehouse: "WH-01",
  },
  {
    id: "3",
    name: "Lubricant Oil",
    code: "LB-OIL-5L",
    currentQty: 800,
    safetyStock: 100,
    maxStock: 500,
    unit: "L",
    severity: "info",
    trend: [100, 200, 400, 500, 600, 700, 800],
    warehouse: "WH-02",
  },
  {
    id: "4",
    name: "Copper Wire",
    code: "CW-2MM",
    currentQty: 150,
    safetyStock: 100,
    unit: "m",
    severity: "normal",
    trend: [120, 130, 140, 135, 145, 148, 150],
    warehouse: "WH-01",
  },
];

describe("InventoryAlertList", () => {
  it("renders table with items", () => {
    render(<InventoryAlertList items={sampleItems} />);
    expect(screen.getByText("Steel Sheet A")).toBeDefined();
    expect(screen.getByText("Bolt M8x30")).toBeDefined();
    expect(screen.getByText("Lubricant Oil")).toBeDefined();
    expect(screen.getByText("Copper Wire")).toBeDefined();
  });

  it("filter tabs show correct counts", () => {
    render(<InventoryAlertList items={sampleItems} />);
    const tabs = screen.getByTestId("filter-tabs");
    expect(tabs.textContent).toContain("(4)"); // All
    const ones = screen.getAllByText("(1)");
    expect(ones.length).toBeGreaterThanOrEqual(3);
  });

  it("tab switching filters items", () => {
    render(<InventoryAlertList items={sampleItems} />);
    const tabs = screen.getByTestId("filter-tabs");
    const criticalBtn = Array.from(tabs.querySelectorAll("button")).find(
      (btn) => btn.textContent?.includes("Critical"),
    );
    fireEvent.click(criticalBtn!);
    expect(screen.getByText("Steel Sheet A")).toBeDefined();
    expect(screen.queryByText("Bolt M8x30")).toBeNull();
    expect(screen.queryByText("Lubricant Oil")).toBeNull();
  });

  it("severity badge colors are correct", () => {
    render(<InventoryAlertList items={sampleItems} />);
    expect(screen.getByTestId("severity-badge-1").textContent).toBe("Critical");
    expect(screen.getByTestId("severity-badge-2").textContent).toBe("Warning");
    expect(screen.getByTestId("severity-badge-3").textContent).toBe("Info");
    expect(screen.getByTestId("severity-badge-4").textContent).toBe("Normal");
  });

  it("row highlighting by severity", () => {
    const { container } = render(<InventoryAlertList items={sampleItems} />);
    const criticalRow = container.querySelector('[data-testid="row-1"]');
    expect(criticalRow?.className).toContain("bg-red");
    const warningRow = container.querySelector('[data-testid="row-2"]');
    expect(warningRow?.className).toContain("bg-yellow");
  });

  it("trend sparklines render when showTrend", () => {
    render(<InventoryAlertList items={sampleItems} showTrend />);
    const sparklines = screen.getAllByTestId("sparkline");
    expect(sparklines.length).toBe(4);
  });

  it("expandable rows show transactions", () => {
    render(<InventoryAlertList items={sampleItems} showTransactions />);
    const expandBtn = screen.getByTestId("expand-1");
    fireEvent.click(expandBtn);
    expect(screen.getByText("Recent Transactions")).toBeDefined();
    expect(screen.getByText("PO-1001")).toBeDefined();
  });

  it("onItemClick fires", () => {
    const onItemClick = vi.fn();
    render(
      <InventoryAlertList items={sampleItems} onItemClick={onItemClick} />,
    );
    fireEvent.click(screen.getByText("Steel Sheet A"));
    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick).toHaveBeenCalledWith(sampleItems[0]);
  });

  it("onReorder fires for critical items", () => {
    const onReorder = vi.fn();
    render(<InventoryAlertList items={sampleItems} onReorder={onReorder} />);
    const reorderBtns = screen.getAllByText("Reorder");
    // critical (id=1) and warning (id=2) have reorder buttons
    expect(reorderBtns.length).toBe(2);
    fireEvent.click(reorderBtns[0]!);
    expect(onReorder).toHaveBeenCalledTimes(1);
    expect(onReorder).toHaveBeenCalledWith(sampleItems[0]);
  });

  it("loading state shows skeletons", () => {
    const { container } = render(
      <InventoryAlertList items={sampleItems} loading />,
    );
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("empty state when no items match filter", () => {
    render(<InventoryAlertList items={[]} />);
    expect(screen.getByTestId("empty-state")).toBeDefined();
  });

  it("has data-slot attribute on root", () => {
    const { container } = render(
      <InventoryAlertList items={sampleItems} />,
    );
    expect(
      container.querySelector('[data-slot="inventory-alert-list"]'),
    ).toBeDefined();
  });

  it("renders SKU code below item name", () => {
    render(<InventoryAlertList items={sampleItems} />);
    expect(screen.getByText("SS-A-001")).toBeDefined();
    expect(screen.getByText("BL-M8-030")).toBeDefined();
  });

  it("renders warehouse column", () => {
    render(<InventoryAlertList items={sampleItems} />);
    expect(screen.getAllByText("WH-01").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("WH-02")).toBeDefined();
  });
});
