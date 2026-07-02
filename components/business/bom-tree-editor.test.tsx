import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BOMTreeEditor } from "./bom-tree-editor";
import type { BOMItem } from "./bom-tree-editor";

vi.mock("@/components/ui/icons", () => ({
  ChevronRightIcon: (p: Record<string, unknown>) => <svg data-testid="chevron-right" {...p} />,
  ChevronDownIcon: (p: Record<string, unknown>) => <svg data-testid="chevron-down" {...p} />,
  PlusIcon: (p: Record<string, unknown>) => <svg data-testid="plus" {...p} />,
  Trash2Icon: (p: Record<string, unknown>) => <svg data-testid="trash" {...p} />,
  CopyIcon: (p: Record<string, unknown>) => <svg data-testid="copy" {...p} />,
  PackageIcon: (p: Record<string, unknown>) => <svg data-testid="package" {...p} />,
  LayersIcon: (p: Record<string, unknown>) => <svg data-testid="layers" {...p} />,
}));

const bomItems: BOMItem[] = [
  {
    id: "1",
    partNumber: "A-100",
    partName: "Bicycle Frame",
    quantity: 1,
    unit: "pcs",
    unitCost: 200,
    type: "subassembly",
    children: [
      {
        id: "1-1",
        partNumber: "A-101",
        partName: "Top Tube",
        quantity: 1,
        unit: "pcs",
        unitCost: 50,
        type: "material",
      },
      {
        id: "1-2",
        partNumber: "A-102",
        partName: "Down Tube",
        quantity: 1,
        unit: "pcs",
        unitCost: 45,
        type: "material",
      },
    ],
  },
  {
    id: "2",
    partNumber: "B-200",
    partName: "Wheel Set",
    quantity: 2,
    unit: "set",
    unitCost: 150,
    type: "material",
  },
];

describe("BOMTreeEditor", () => {
  it("renders with data-slot", () => {
    const { container } = render(<BOMTreeEditor items={bomItems} />);
    expect(container.querySelector('[data-slot="bom-tree-editor"]')).toBeTruthy();
  });

  it("renders top-level items", () => {
    render(<BOMTreeEditor items={bomItems} />);
    expect(screen.getByDisplayValue("A-100")).toBeTruthy();
    expect(screen.getByDisplayValue("B-200")).toBeTruthy();
  });

  it("shows expand button for items with children", () => {
    render(<BOMTreeEditor items={bomItems} />);
    const expandBtns = screen.getAllByLabelText("Expand");
    expect(expandBtns.length).toBeGreaterThanOrEqual(1);
  });

  it("expands children when toggle is clicked", () => {
    render(<BOMTreeEditor items={bomItems} />);
    // Initially children are hidden
    expect(screen.queryByDisplayValue("A-101")).toBeNull();
    // Click expand
    const expandBtn = screen.getAllByLabelText("Expand")[0];
    fireEvent.click(expandBtn!);
    // Now children are visible
    expect(screen.getByDisplayValue("A-101")).toBeTruthy();
    expect(screen.getByDisplayValue("A-102")).toBeTruthy();
  });

  it("shows grand total", () => {
    const { container } = render(<BOMTreeEditor items={bomItems} />);
    const grandTotal = container.querySelector('[data-slot="bom-grand-total"]');
    expect(grandTotal).toBeTruthy();
    // Frame: 1*200 + (1*50 + 1*45) = 295
    // Wheels: 2*150 = 300
    // Total: 595
    expect(grandTotal!.textContent).toContain("595");
  });

  it("calls onChange when adding root component", () => {
    const onChange = vi.fn();
    render(<BOMTreeEditor items={bomItems} onChange={onChange} />);
    fireEvent.click(screen.getByText("Add Component"));
    expect(onChange).toHaveBeenCalledTimes(1);
    const newItems = onChange.mock.calls[0]![0]!;
    expect(newItems.length).toBe(3);
  });

  it("calls onChange when removing an item", () => {
    const onChange = vi.fn();
    render(<BOMTreeEditor items={bomItems} onChange={onChange} />);
    const removeBtns = screen.getAllByLabelText("Remove item");
    fireEvent.click(removeBtns[0]!);
    expect(onChange).toHaveBeenCalledTimes(1);
    const newItems = onChange.mock.calls[0]![0]!;
    expect(newItems.length).toBe(1);
  });

  it("calls onChange when adding child to subassembly", () => {
    const onChange = vi.fn();
    render(<BOMTreeEditor items={bomItems} onChange={onChange} />);
    // The first item (subassembly) should have an "Add child" button
    const addChildBtns = screen.getAllByLabelText("Add child component");
    fireEvent.click(addChildBtns[0]!);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("calls onChange when duplicating an item", () => {
    const onChange = vi.fn();
    render(<BOMTreeEditor items={bomItems} onChange={onChange} />);
    const dupBtns = screen.getAllByLabelText("Duplicate item");
    fireEvent.click(dupBtns[0]!);
    expect(onChange).toHaveBeenCalledTimes(1);
    const newItems = onChange.mock.calls[0]![0]!;
    expect(newItems.length).toBe(3);
    expect(newItems[2].partNumber).toContain("COPY");
  });

  it("renders empty state", () => {
    render(<BOMTreeEditor items={[]} />);
    expect(screen.getByText(/No BOM items/)).toBeTruthy();
  });

  it("shows type badges", () => {
    render(<BOMTreeEditor items={bomItems} />);
    expect(screen.getByText("Sub-assembly")).toBeTruthy();
    expect(screen.getByText("Material")).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(
      <BOMTreeEditor items={bomItems} className="custom-bom" />,
    );
    const el = container.querySelector('[data-slot="bom-tree-editor"]') as HTMLElement;
    expect(el.className).toContain("custom-bom");
  });

  it("does not show action buttons in read-only mode", () => {
    render(<BOMTreeEditor items={bomItems} readOnly />);
    expect(screen.queryByText("Add Component")).toBeNull();
    expect(screen.queryAllByLabelText("Remove item").length).toBe(0);
  });

  it("updates field value on change", () => {
    const onChange = vi.fn();
    render(<BOMTreeEditor items={bomItems} onChange={onChange} />);
    const partNameInput = screen.getByDisplayValue("Wheel Set");
    fireEvent.change(partNameInput, { target: { value: "Premium Wheel Set" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    const updated = onChange.mock.calls[0]![0] as BOMItem[];
    expect(updated[1]!.partName).toBe("Premium Wheel Set");
  });
});
