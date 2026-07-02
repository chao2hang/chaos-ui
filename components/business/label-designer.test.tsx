import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LabelDesigner } from "./label-designer";
import type { LabelField, LabelSize } from "./label-designer";

const fields: LabelField[] = [
  { id: "f1", type: "text", label: "Product Name", sampleValue: "Widget Pro 2000", x: 5, y: 5, width: 50, height: 6, fontSize: 10 },
  { id: "f2", type: "barcode", label: "SKU Barcode", sampleValue: "6901234567890", x: 5, y: 15, width: 50, height: 12 },
  { id: "f3", type: "qrcode", label: "QR Link", sampleValue: "https://example.com/p/123", x: 40, y: 30, width: 15, height: 15 },
];

const size: LabelSize = { id: "medium", label: "60×40mm", width: 60, height: 40 };

describe("LabelDesigner", () => {
  it("renders with data-slot", () => {
    const { container } = render(<LabelDesigner fields={fields} labelSize={size} />);
    expect(container.querySelector('[data-slot="label-designer"]')).toBeTruthy();
  });

  it("renders field type palette buttons", () => {
    render(<LabelDesigner fields={fields} labelSize={size} />);
    expect(screen.getByText("Text")).toBeTruthy();
    expect(screen.getByText("Barcode")).toBeTruthy();
    expect(screen.getByText("QR Code")).toBeTruthy();
    expect(screen.getByText("Line")).toBeTruthy();
    expect(screen.getByText("Image")).toBeTruthy();
  });

  it("renders label preview area", () => {
    const { container } = render(<LabelDesigner fields={fields} labelSize={size} />);
    expect(container.querySelector('[data-slot="label-preview"]')).toBeTruthy();
  });

  it("renders all field elements in preview", () => {
    const { container } = render(<LabelDesigner fields={fields} labelSize={size} />);
    const fieldEls = container.querySelectorAll('[data-slot="label-field"]');
    expect(fieldEls.length).toBe(3);
  });

  it("renders size preset buttons", () => {
    render(<LabelDesigner fields={fields} labelSize={size} />);
    expect(screen.getByText("40×30mm")).toBeTruthy();
    expect(screen.getByText("60×40mm")).toBeTruthy();
    expect(screen.getByText("100×60mm")).toBeTruthy();
  });

  it("shows empty state when no fields", () => {
    render(<LabelDesigner fields={[]} labelSize={size} />);
    expect(screen.getByText(/Add fields to design/)).toBeTruthy();
  });

  it("renders field list with all field names", () => {
    render(<LabelDesigner fields={fields} labelSize={size} />);
    expect(screen.getByText("Product Name")).toBeTruthy();
    expect(screen.getByText("SKU Barcode")).toBeTruthy();
    expect(screen.getByText("QR Link")).toBeTruthy();
  });

  it("shows properties panel when field selected", () => {
    const { container } = render(<LabelDesigner fields={fields} labelSize={size} />);
    // Click on a field
    const fieldEls = container.querySelectorAll('[data-slot="label-field"]');
    fireEvent.click(fieldEls[0]!);
    expect(screen.getByText("Properties")).toBeTruthy();
    expect(screen.getByLabelText("Field label")).toBeTruthy();
  });

  it("calls onFieldsChange when adding field", () => {
    const onChange = vi.fn();
    render(<LabelDesigner fields={fields} labelSize={size} onFieldsChange={onChange} />);
    fireEvent.click(screen.getByText("Text"));
    expect(onChange.mock.calls[0]![0]!.length).toBe(4);
  });

  it("calls onSizeChange when selecting size", () => {
    const onSizeChange = vi.fn();
    render(<LabelDesigner fields={fields} labelSize={size} onSizeChange={onSizeChange} />);
    fireEvent.click(screen.getByText("40×30mm"));
    expect(onSizeChange).toHaveBeenCalled();
  });

  it("renders print button when onPrint provided", () => {
    render(<LabelDesigner fields={fields} labelSize={size} onPrint={() => {}} />);
    expect(screen.getByText("Print Label")).toBeTruthy();
  });

  it("does not render print button in read-only mode", () => {
    render(<LabelDesigner fields={fields} labelSize={size} onPrint={() => {}} readOnly />);
    expect(screen.queryByText("Print Label")).toBeNull();
  });

  it("disables field type buttons in read-only mode", () => {
    render(<LabelDesigner fields={fields} labelSize={size} readOnly />);
    const textBtn = screen.getByText("Text").closest("button");
    expect(textBtn).toBeDisabled();
  });

  it("renders label size badge", () => {
    render(<LabelDesigner fields={fields} labelSize={size} />);
    expect(screen.getByText("60×40mm")).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(<LabelDesigner fields={fields} labelSize={size} className="my-label" />);
    const el = container.querySelector('[data-slot="label-designer"]') as HTMLElement;
    expect(el.className).toContain("my-label");
  });
});
