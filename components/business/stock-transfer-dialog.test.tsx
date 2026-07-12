import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StockTransferDialog } from "./stock-transfer-dialog";
import type { TransferLine } from "./stock-transfer-dialog";

vi.mock("@/components/ui/icons", () => ({
  PlusIcon: (p: Record<string, unknown>) => <svg data-testid="plus" {...p} />,
  Trash2Icon: (p: Record<string, unknown>) => (
    <svg data-testid="trash" {...p} />
  ),
  ArrowRightIcon: (p: Record<string, unknown>) => (
    <svg data-testid="arrow" {...p} />
  ),
  ChevronDownIcon: (p: Record<string, unknown>) => (
    <svg data-testid="chevron-down" {...p} />
  ),
}));

const lines: TransferLine[] = [
  {
    id: "1",
    productCode: "P-001",
    productName: "Widget A",
    quantity: 50,
    unit: "pcs",
    batchNo: "B2026-001",
    availableQty: 100,
  },
  {
    id: "2",
    productCode: "P-002",
    productName: "Widget B",
    quantity: 30,
    unit: "box",
    batchNo: "B2026-002",
    availableQty: 45,
  },
];

describe("StockTransferDialog", () => {
  it("renders with data-slot", () => {
    const { container } = render(
      <StockTransferDialog lines={lines} warehouses={["WH-A", "WH-B"]} />,
    );
    expect(
      container.querySelector('[data-slot="stock-transfer-dialog"]'),
    ).toBeTruthy();
  });

  it("renders transfer number", () => {
    render(<StockTransferDialog lines={lines} transferNo="ST-2026-001" />);
    expect(screen.getByText("ST-2026-001")).toBeTruthy();
  });

  it("renders warehouse dropdowns", () => {
    render(
      <StockTransferDialog
        lines={lines}
        warehouses={["WH-A", "WH-B"]}
        fromWarehouse="WH-A"
        toWarehouse="WH-B"
      />,
    );
    expect(screen.getByDisplayValue("WH-A")).toBeTruthy();
    expect(screen.getByDisplayValue("WH-B")).toBeTruthy();
  });

  it("shows same warehouse warning", () => {
    render(
      <StockTransferDialog
        lines={lines}
        warehouses={["WH-A"]}
        fromWarehouse="WH-A"
        toWarehouse="WH-A"
      />,
    );
    expect(
      screen.getByText(/Source and destination cannot be the same/),
    ).toBeTruthy();
  });

  it("shows total quantity", () => {
    render(<StockTransferDialog lines={lines} />);
    expect(screen.getByText(/Total:/)).toBeTruthy();
    expect(screen.getByText("80")).toBeTruthy();
  });

  it("calls onLinesChange when adding line", () => {
    const onChange = vi.fn();
    render(<StockTransferDialog lines={lines} onLinesChange={onChange} />);
    fireEvent.click(screen.getByText("Add Item"));
    expect(onChange.mock.calls[0]![0]!.length).toBe(3);
  });

  it("calls onLinesChange when removing line", () => {
    const onChange = vi.fn();
    render(<StockTransferDialog lines={lines} onLinesChange={onChange} />);
    fireEvent.click(screen.getAllByLabelText("Remove line")[0]!);
    expect(onChange.mock.calls[0]![0]!.length).toBe(1);
  });

  it("renders transfer type buttons", () => {
    const onTypeChange = vi.fn();
    render(
      <StockTransferDialog
        lines={lines}
        transferType="regular"
        onTransferTypeChange={onTypeChange}
      />,
    );
    fireEvent.click(screen.getByText("Urgent"));
    expect(onTypeChange).toHaveBeenCalledWith("urgent");
  });

  it("disables submit when same warehouse", () => {
    const onSubmit = vi.fn();
    render(
      <StockTransferDialog
        lines={lines}
        fromWarehouse="WH-A"
        toWarehouse="WH-A"
        onSubmit={onSubmit}
      />,
    );
    expect(screen.getByText("Submit Transfer")).toBeDisabled();
  });

  it("hides actions in read-only mode", () => {
    render(<StockTransferDialog lines={lines} readOnly onSubmit={() => {}} />);
    expect(screen.queryByText("Add Item")).toBeNull();
    expect(screen.queryByText("Submit Transfer")).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StockTransferDialog lines={lines} className="custom-st" />,
    );
    const el = container.querySelector(
      '[data-slot="stock-transfer-dialog"]',
    ) as HTMLElement;
    expect(el.className).toContain("custom-st");
  });
});
