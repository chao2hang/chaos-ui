import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReconciliationLineEditor } from "./reconciliation-line-editor";
import type { ReconciliationLineEditorProps } from "./reconciliation-line-editor";

const baseRows = [
  {
    id: "r1",
    distributor: "华东经销商",
    orderAmount: 1000,
    deduction: 100,
    netAmount: 900,
  },
  {
    id: "r2",
    distributor: "华南经销商",
    orderAmount: 2000,
    deduction: 200,
    netAmount: 1800,
  },
];

describe("ReconciliationLineEditor", () => {
  it("renders all rows with distributor and net amount", () => {
    render(<ReconciliationLineEditor rows={baseRows} />);
    expect(screen.getByText("华东经销商")).toBeDefined();
    expect(screen.getByText("华南经销商")).toBeDefined();
    // netAmount cells
    const netCells = screen.getAllByText(/¥/);
    expect(netCells.length).toBeGreaterThanOrEqual(2);
  });

  it("shows empty state when no rows", () => {
    render(<ReconciliationLineEditor rows={[]} />);
    expect(screen.getByText("暂无对账明细")).toBeDefined();
  });

  it("recalculates netAmount when editing orderAmount", () => {
    render(<ReconciliationLineEditor rows={baseRows} />);
    const orderInput = document.querySelector(
      '[data-field="orderAmount"]',
    ) as HTMLInputElement;
    fireEvent.change(orderInput, { target: { value: "1500" } });
    // net = 1500 - 100 = 1400, displayed as currency
    const netCell = document.querySelector(
      '[data-slot="reconciliation-line-editor-net"]',
    ) as HTMLElement;
    expect(netCell.textContent).toContain("1,400");
  });

  it("recalculates netAmount when editing deduction", () => {
    render(<ReconciliationLineEditor rows={baseRows} />);
    const deductionInput = document.querySelector(
      '[data-field="deduction"]',
    ) as HTMLInputElement;
    fireEvent.change(deductionInput, { target: { value: "300" } });
    // net = 1000 - 300 = 700
    const netCell = document.querySelector(
      '[data-slot="reconciliation-line-editor-net"]',
    ) as HTMLElement;
    expect(netCell.textContent).toContain("700");
  });

  it("calls onChange with updated rows", () => {
    const handleChange = vi.fn();
    render(<ReconciliationLineEditor rows={baseRows} onChange={handleChange} />);
    const orderInput = document.querySelector(
      '[data-field="orderAmount"]',
    ) as HTMLInputElement;
    fireEvent.change(orderInput, { target: { value: "1500" } });
    expect(handleChange).toHaveBeenCalled();
    const calls = handleChange.mock.calls as Array<
      [Array<{ orderAmount: number; deduction: number; netAmount: number }>]
    >;
    const lastRows = calls[calls.length - 1]![0];
    expect(lastRows[0]!.orderAmount).toBe(1500);
    expect(lastRows[0]!.netAmount).toBe(1400);
  });

  it("ReconciliationLineEditorProps type is importable", () => {
    const _props: ReconciliationLineEditorProps = {
      rows: [],
    };
    expect(_props.rows).toEqual([]);
  });
});
