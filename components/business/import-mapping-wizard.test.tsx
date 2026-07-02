import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImportMappingWizard } from "./import-mapping-wizard";
import type { SourceColumn, TargetField } from "./import-mapping-wizard";

vi.mock("@/components/ui/icons", () => ({
  ArrowRightIcon: (p: Record<string, unknown>) => <svg data-testid="arrow-right" {...p} />,
  ArrowLeftIcon: (p: Record<string, unknown>) => <svg data-testid="arrow-left" {...p} />,
  CheckCircle2Icon: (p: Record<string, unknown>) => <svg data-testid="check" {...p} />,
  AlertCircleIcon: (p: Record<string, unknown>) => <svg data-testid="alert" {...p} />,
}));

const sourceColumns: SourceColumn[] = [
  { name: "product_name", index: 0, detectedType: "string", samples: ["Widget A", "Widget B", "Widget C"] },
  { name: "price", index: 1, detectedType: "number", samples: ["9.99", "19.99", "29.99"] },
  { name: "created_date", index: 2, detectedType: "date", samples: ["2026-01-01", "2026-02-01"] },
  { name: "sku_code", index: 3, detectedType: "string", samples: ["SKU-001", "SKU-002"] },
];

const targetFields: TargetField[] = [
  { name: "name", label: "Product Name", type: "string", required: true },
  { name: "price", label: "Unit Price", type: "number", required: true },
  { name: "createdAt", label: "Created At", type: "date", required: false },
  { name: "sku", label: "SKU Code", type: "string", required: true },
];

describe("ImportMappingWizard", () => {
  it("renders with data-slot", () => {
    const { container } = render(
      <ImportMappingWizard sourceColumns={sourceColumns} targetFields={targetFields} mappings={[]} />,
    );
    expect(container.querySelector('[data-slot="import-mapping-wizard"]')).toBeTruthy();
  });

  it("renders all target fields", () => {
    render(<ImportMappingWizard sourceColumns={sourceColumns} targetFields={targetFields} mappings={[]} />);
    expect(screen.getByText("Product Name")).toBeTruthy();
    expect(screen.getByText("Unit Price")).toBeTruthy();
    expect(screen.getByText("Created At")).toBeTruthy();
    expect(screen.getByText("SKU Code")).toBeTruthy();
  });

  it("auto-matches columns on initial render", () => {
    render(<ImportMappingWizard sourceColumns={sourceColumns} targetFields={targetFields} mappings={[]} />);
    // "price" should be auto-matched to "price"
    const selects = screen.getAllByRole("combobox");
    // The second select (price target) should have "price" selected
    expect((selects[1] as HTMLSelectElement).value).toBe("price");
  });

  it("renders mapping summary", () => {
    render(<ImportMappingWizard sourceColumns={sourceColumns} targetFields={targetFields} mappings={[]} />);
    expect(screen.getByText("Mapping Summary:")).toBeTruthy();
  });

  it("shows continue button", () => {
    render(<ImportMappingWizard sourceColumns={sourceColumns} targetFields={targetFields} mappings={[]} />);
    expect(screen.getByText("Continue")).toBeTruthy();
  });

  it("shows back button", () => {
    render(<ImportMappingWizard sourceColumns={sourceColumns} targetFields={targetFields} mappings={[]} onBack={() => {}} />);
    expect(screen.getByText("Back")).toBeTruthy();
  });

  it("fires onContinue when clicked and mapping is valid", () => {
    const onContinue = vi.fn();
    const validMappings = [
      { source: "product_name", target: "name", typeMatch: true },
      { source: "price", target: "price", typeMatch: true },
      { source: "created_date", target: "createdAt", typeMatch: true },
      { source: "sku_code", target: "sku", typeMatch: true },
    ];
    render(
      <ImportMappingWizard
        sourceColumns={sourceColumns}
        targetFields={targetFields}
        mappings={validMappings}
        onContinue={onContinue}
      />,
    );
    fireEvent.click(screen.getByText("Continue"));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("disables continue when required fields are unmapped", () => {
    const invalidMappings = [
      { source: "product_name", target: "name", typeMatch: true },
      { source: "", target: "price", typeMatch: true },
      { source: "created_date", target: "createdAt", typeMatch: true },
      { source: "sku_code", target: "sku", typeMatch: true },
    ];
    render(
      <ImportMappingWizard
        sourceColumns={sourceColumns}
        targetFields={targetFields}
        mappings={invalidMappings}
      />,
    );
    expect(screen.getByText("Continue")).toBeDisabled();
  });

  it("fires onMappingsChange when source is changed", () => {
    const onMappingsChange = vi.fn();
    render(
      <ImportMappingWizard
        sourceColumns={sourceColumns}
        targetFields={targetFields}
        mappings={[]}
        onMappingsChange={onMappingsChange}
      />,
    );
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0]!, { target: { value: "product_name" } });
    expect(onMappingsChange).toHaveBeenCalled();
  });

  it("auto-match button re-runs matching", () => {
    const onMappingsChange = vi.fn();
    render(
      <ImportMappingWizard
        sourceColumns={sourceColumns}
        targetFields={targetFields}
        mappings={[
          { source: "", target: "name" },
          { source: "", target: "price" },
          { source: "", target: "createdAt" },
          { source: "", target: "sku" },
        ]}
        onMappingsChange={onMappingsChange}
      />,
    );
    fireEvent.click(screen.getByText("Auto-Match"));
    expect(onMappingsChange).toHaveBeenCalled();
    const updated = onMappingsChange.mock.calls[0]![0]!;
    // After auto-match, at least some should be mapped
    expect(updated.filter((m: { source: string }) => m.source).length).toBeGreaterThan(0);
  });

  it("shows sample data when showSamples is true", () => {
    render(
      <ImportMappingWizard
        sourceColumns={sourceColumns}
        targetFields={targetFields}
        mappings={[]}
        showSamples
      />,
    );
    expect(screen.getByText("Widget A")).toBeTruthy();
  });

  it("hides sample data when showSamples is false", () => {
    render(
      <ImportMappingWizard
        sourceColumns={sourceColumns}
        targetFields={targetFields}
        mappings={[]}
        showSamples={false}
      />,
    );
    expect(screen.queryByText("Widget A")).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ImportMappingWizard
        sourceColumns={sourceColumns}
        targetFields={targetFields}
        mappings={[]}
        className="custom-mapping"
      />,
    );
    const el = container.querySelector('[data-slot="import-mapping-wizard"]') as HTMLElement;
    expect(el.className).toContain("custom-mapping");
  });
});
