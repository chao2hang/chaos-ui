import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PurchaseOrderEditor } from "./purchase-order-editor";
import type { POLineItem, ApprovalStep } from "./purchase-order-editor";

vi.mock("@/components/ui/icons", () => ({
  PlusIcon: (p: Record<string, unknown>) => <svg data-testid="plus" {...p} />,
  Trash2Icon: (p: Record<string, unknown>) => <svg data-testid="trash" {...p} />,
  CheckCircle2Icon: (p: Record<string, unknown>) => <svg data-testid="check" {...p} />,
  CircleIcon: (p: Record<string, unknown>) => <svg data-testid="circle" {...p} />,
  ClockIcon: (p: Record<string, unknown>) => <svg data-testid="clock" {...p} />,
}));

const lines: POLineItem[] = [
  { id: "1", productCode: "P-001", productName: "Widget A", quantity: 10, unit: "pcs", unitPrice: 50, taxRate: 13 },
  { id: "2", productCode: "P-002", productName: "Widget B", quantity: 5, unit: "box", unitPrice: 120, taxRate: 13 },
];

const approvals: ApprovalStep[] = [
  { id: "a1", approver: "Manager", title: "Dept Head", status: "approved" },
  { id: "a2", approver: "Director", title: "VP", status: "current" },
  { id: "a3", approver: "CFO", title: "Finance", status: "pending" },
];

describe("PurchaseOrderEditor", () => {
  it("renders with data-slot", () => {
    const { container } = render(<PurchaseOrderEditor lineItems={lines} />);
    expect(container.querySelector('[data-slot="purchase-order-editor"]')).toBeTruthy();
  });

  it("renders PO number badge", () => {
    render(<PurchaseOrderEditor lineItems={lines} poNumber="PO-2026-001" />);
    expect(screen.getByText("PO-2026-001")).toBeTruthy();
  });

  it("renders status badge", () => {
    render(<PurchaseOrderEditor lineItems={lines} status="pending" />);
    expect(screen.getByText("Pending Approval")).toBeTruthy();
  });

  it("renders line items", () => {
    render(<PurchaseOrderEditor lineItems={lines} />);
    expect(screen.getByDisplayValue("P-001")).toBeTruthy();
    expect(screen.getByDisplayValue("P-002")).toBeTruthy();
  });

  it("calculates subtotal, tax, and total", () => {
    const { container } = render(<PurchaseOrderEditor lineItems={lines} />);
    // Subtotal: 10*50 + 5*120 = 500 + 600 = 1100
    // Tax: 1100 * 0.13 = 143
    // Total: 1243
    expect(container.querySelector('[data-slot="po-subtotal"]')?.textContent).toContain("1,100.00");
    expect(container.querySelector('[data-slot="po-tax"]')?.textContent).toContain("143.00");
    expect(container.querySelector('[data-slot="po-total"]')?.textContent).toContain("1,243.00");
  });

  it("calls onLineItemsChange when adding line", () => {
    const onChange = vi.fn();
    render(<PurchaseOrderEditor lineItems={lines} onLineItemsChange={onChange} />);
    fireEvent.click(screen.getByText("Add Line"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0]![0]!.length).toBe(3);
  });

  it("calls onLineItemsChange when removing line", () => {
    const onChange = vi.fn();
    render(<PurchaseOrderEditor lineItems={lines} onLineItemsChange={onChange} />);
    fireEvent.click(screen.getAllByLabelText("Remove line")[0]!);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0]![0]!.length).toBe(1);
  });

  it("renders approval flow", () => {
    render(<PurchaseOrderEditor lineItems={lines} approvalSteps={approvals} />);
    expect(screen.getByText("Approval Flow")).toBeTruthy();
    expect(screen.getByText("Manager")).toBeTruthy();
    expect(screen.getByText("Director")).toBeTruthy();
    expect(screen.getByText("CFO")).toBeTruthy();
  });

  it("calls onSubmit when submit button is clicked", () => {
    const onSubmit = vi.fn();
    render(<PurchaseOrderEditor lineItems={lines} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("Submit for Approval"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("hides actions in read-only mode", () => {
    render(<PurchaseOrderEditor lineItems={lines} readOnly onSubmit={() => {}} />);
    expect(screen.queryByText("Add Line")).toBeNull();
    expect(screen.queryByText("Submit for Approval")).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(<PurchaseOrderEditor lineItems={lines} className="custom-po" />);
    const el = container.querySelector('[data-slot="purchase-order-editor"]') as HTMLElement;
    expect(el.className).toContain("custom-po");
  });
});
