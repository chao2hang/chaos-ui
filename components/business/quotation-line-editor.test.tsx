import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QuotationLineEditor } from "./quotation-line-editor";
import type { QuotationLine } from "./quotation-line-editor";

vi.mock("@/components/ui/icons", () => ({
  PlusIcon: (p: Record<string, unknown>) => <svg data-testid="plus" {...p} />,
  Trash2Icon: (p: Record<string, unknown>) => (
    <svg data-testid="trash" {...p} />
  ),
}));

const lines: QuotationLine[] = [
  {
    id: "1",
    productCode: "P-001",
    productName: "Widget A",
    quantity: 10,
    unit: "pcs",
    unitCost: 30,
    unitPrice: 50,
    discountPct: 0,
    taxRate: 13,
  },
  {
    id: "2",
    productCode: "P-002",
    productName: "Widget B",
    quantity: 5,
    unit: "box",
    unitCost: 80,
    unitPrice: 120,
    discountPct: 10,
    taxRate: 13,
  },
];

describe("QuotationLineEditor", () => {
  it("renders with data-slot", () => {
    const { container } = render(<QuotationLineEditor lines={lines} />);
    expect(
      container.querySelector('[data-slot="quotation-line-editor"]'),
    ).toBeTruthy();
  });

  it("renders quote number", () => {
    render(<QuotationLineEditor lines={lines} quoteNo="Q-2026-001" />);
    expect(screen.getByText("Q-2026-001")).toBeTruthy();
  });

  it("renders line items", () => {
    render(<QuotationLineEditor lines={lines} />);
    expect(screen.getByDisplayValue("P-001")).toBeTruthy();
    expect(screen.getByDisplayValue("P-002")).toBeTruthy();
  });

  it("calculates line total with discount", () => {
    render(<QuotationLineEditor lines={lines} />);
    // Line 1: 10 * 50 * (1 - 0) = 500
    // Line 2: 5 * 120 * (1 - 0.10) = 540
    // subtotal = 500 + 540 = 1,040 (footer + summary both render it).
    expect(screen.getAllByText("¥1,040.00").length).toBeGreaterThan(0);
  });

  it("calculates profit margin", () => {
    render(<QuotationLineEditor lines={lines} />);
    // Overall: cost=700, subtotal=1,040, profit=340, margin=340/1,040 = 32.7%.
    // Rendered as "Margin: 32.7%" in the summary and "32.7%" in the footer.
    expect(screen.getAllByText("32.7%").length).toBeGreaterThan(0);
  });

  it("calls onLinesChange when adding line", () => {
    const onChange = vi.fn();
    render(<QuotationLineEditor lines={lines} onLinesChange={onChange} />);
    fireEvent.click(screen.getByText("Add Line"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0]![0]!.length).toBe(3);
  });

  it("calls onLinesChange when removing line", () => {
    const onChange = vi.fn();
    render(<QuotationLineEditor lines={lines} onLinesChange={onChange} />);
    fireEvent.click(screen.getAllByLabelText("Remove line")[0]!);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0]![0]!.length).toBe(1);
  });

  it("calls onLinesChange when editing quantity", () => {
    const onChange = vi.fn();
    render(<QuotationLineEditor lines={lines} onLinesChange={onChange} />);
    const qtyInputs = screen.getAllByLabelText("Quantity");
    fireEvent.change(qtyInputs[0]!, { target: { value: "200" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("renders empty state when no lines", () => {
    render(<QuotationLineEditor lines={[]} />);
    expect(screen.getByText(/No line items/i)).toBeTruthy();
  });
});
