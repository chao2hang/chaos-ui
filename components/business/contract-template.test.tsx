import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContractTemplate } from "./contract-template";
import type { ContractField, ContractMetadata } from "./contract-template";

const sampleFields: ContractField[] = [
  {
    name: "partyA",
    label: "Party A",
    category: "party",
    type: "text",
  },
  {
    name: "partyB",
    label: "Party B",
    category: "party",
    type: "text",
  },
  {
    name: "amount",
    label: "Total Amount",
    category: "financial",
    type: "currency",
    defaultValue: "10000",
  },
  {
    name: "startDate",
    label: "Start Date",
    category: "date",
    type: "date",
  },
  {
    name: "paymentTerms",
    label: "Payment Terms",
    category: "terms",
    type: "text",
    description: "Payment terms description",
  },
];

const sampleMetadata: ContractMetadata = {
  contractNo: "C-2025-001",
  contractType: "service",
  effectiveDate: "2025-01-01",
  expiryDate: "2025-12-31",
  partyA: "Acme Corp",
  partyB: "Widget Inc",
  amount: 50000,
  status: "draft",
};

const sampleTemplate =
  "This agreement is entered into between {{partyA}} and {{partyB}} on {{startDate}}. The total amount is {{amount}}. Payment terms: {{paymentTerms}}.";

describe("ContractTemplate", () => {
  it("renders with tab navigation", () => {
    render(<ContractTemplate fields={sampleFields} />);
    expect(screen.getByRole("region", { name: "Contract Template" })).toBeDefined();
    expect(screen.getByText("Edit")).toBeDefined();
    expect(screen.getAllByText("Preview").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Metadata")).toBeDefined();
  });

  it("edit tab shows textarea with template content", () => {
    render(<ContractTemplate template={sampleTemplate} fields={sampleFields} />);
    const textarea = screen.getByLabelText("Contract template editor");
    expect(textarea).toBeDefined();
    expect((textarea as HTMLTextAreaElement).value).toBe(sampleTemplate);
  });

  it("field sidebar shows fields grouped by category", () => {
    render(<ContractTemplate fields={sampleFields} />);
    expect(screen.getByText("Party Info")).toBeDefined();
    expect(screen.getByText("Financial")).toBeDefined();
    expect(screen.getByText("Dates")).toBeDefined();
    expect(screen.getByText("Terms")).toBeDefined();
    expect(screen.getByText("Party A")).toBeDefined();
    expect(screen.getByText("Party B")).toBeDefined();
    expect(screen.getByText("Total Amount")).toBeDefined();
  });

  it("clicking field chip inserts merge tag at cursor", () => {
    const onTemplateChange = vi.fn();
    render(
      <ContractTemplate
        template=""
        fields={sampleFields}
        onTemplateChange={onTemplateChange}
      />,
    );
    const chip = screen.getByLabelText("Insert Party A field");
    fireEvent.click(chip);
    expect(onTemplateChange).toHaveBeenCalledWith("{{partyA}}");
  });

  it("preview tab replaces merge fields with sample values", () => {
    render(
      <ContractTemplate
        template={sampleTemplate}
        fields={sampleFields}
        sampleValues={{
          partyA: "Acme Corp",
          partyB: "Widget Inc",
          startDate: "2025-06-01",
          amount: 50000,
          paymentTerms: "Net 30",
        }}
        activeTab="preview"
      />,
    );
    const mergeFields = document.querySelectorAll("[data-slot='contract-template-merge-field']");
    expect(mergeFields.length).toBe(5);
    expect(mergeFields[0]!.textContent).toBe("Acme Corp");
    expect(mergeFields[1]!.textContent).toBe("Widget Inc");
  });

  it("preview shows default values when no sample provided", () => {
    render(
      <ContractTemplate
        template="Amount: {{amount}}"
        fields={sampleFields}
        activeTab="preview"
      />,
    );
    const mergeField = document.querySelector(
      "[data-field-name='amount']",
    );
    expect(mergeField).toBeDefined();
    expect(mergeField!.textContent).toBe("10000");
  });

  it("preview shows unresolved tags when no value or default", () => {
    render(
      <ContractTemplate
        template="Date: {{startDate}}"
        fields={sampleFields}
        activeTab="preview"
      />,
    );
    const mergeField = document.querySelector(
      "[data-field-name='startDate']",
    );
    expect(mergeField).toBeDefined();
    expect(mergeField!.textContent).toBe("{{startDate}}");
  });

  it("metadata tab shows all form fields", () => {
    render(
      <ContractTemplate
        metadata={sampleMetadata}
        activeTab="metadata"
      />,
    );
    expect(screen.getByLabelText("Contract No")).toBeDefined();
    expect(screen.getByLabelText("Contract Type")).toBeDefined();
    expect(screen.getByLabelText(/Effective Date/)).toBeDefined();
    expect(screen.getByLabelText(/Expiry Date/)).toBeDefined();
    expect(screen.getByLabelText("Party A")).toBeDefined();
    expect(screen.getByLabelText("Party B")).toBeDefined();
    expect(screen.getByLabelText("Amount")).toBeDefined();
    expect(screen.getByLabelText("Status")).toBeDefined();
  });

  it("metadata changes fire onMetadataChange", () => {
    const onMetadataChange = vi.fn();
    render(
      <ContractTemplate
        metadata={sampleMetadata}
        onMetadataChange={onMetadataChange}
        activeTab="metadata"
      />,
    );
    const contractNoInput = screen.getByPlaceholderText("e.g. C-2025-001");
    fireEvent.change(contractNoInput, { target: { value: "C-2025-002" } });
    expect(onMetadataChange).toHaveBeenCalledWith(
      expect.objectContaining({ contractNo: "C-2025-002" }),
    );
  });

  it("template changes fire onTemplateChange", () => {
    const onTemplateChange = vi.fn();
    render(
      <ContractTemplate
        template=""
        onTemplateChange={onTemplateChange}
      />,
    );
    const textarea = screen.getByLabelText("Contract template editor");
    fireEvent.change(textarea, { target: { value: "Hello world" } });
    expect(onTemplateChange).toHaveBeenCalledWith("Hello world");
  });

  it("save fires onSave with template and metadata", () => {
    const onSave = vi.fn();
    render(
      <ContractTemplate
        template={sampleTemplate}
        metadata={sampleMetadata}
        onSave={onSave}
      />,
    );
    fireEvent.click(screen.getByLabelText("Save contract"));
    expect(onSave).toHaveBeenCalledWith({
      template: sampleTemplate,
      metadata: sampleMetadata,
    });
  });

  it("readOnly mode disables editing", () => {
    render(
      <ContractTemplate
        template={sampleTemplate}
        fields={sampleFields}
        metadata={sampleMetadata}
        readOnly={true}
      />,
    );
    // Save button should not be present
    expect(screen.queryByLabelText("Save contract")).toBeNull();
    // Textarea should be disabled
    const textarea = screen.getByLabelText("Contract template editor");
    expect((textarea as HTMLTextAreaElement).disabled).toBe(true);
  });

  it("status badge shows correct color for signed status", () => {
    render(
      <ContractTemplate
        metadata={{ ...sampleMetadata, status: "signed" }}
      />,
    );
    const badge = document.querySelector(
      "[data-slot='contract-template-status']",
    );
    expect(badge).toBeDefined();
    expect(badge!.textContent).toBe("Signed");
    expect(badge!.className).toContain("emerald");
  });

  it("status badge shows correct color for expired status", () => {
    render(
      <ContractTemplate
        metadata={{ ...sampleMetadata, status: "expired" }}
      />,
    );
    const badge = document.querySelector(
      "[data-slot='contract-template-status']",
    );
    expect(badge).toBeDefined();
    expect(badge!.textContent).toBe("Expired");
    expect(badge!.className).toContain("red");
  });

  it("empty template handled gracefully in preview", () => {
    render(
      <ContractTemplate template="" activeTab="preview" />,
    );
    expect(screen.getByText("No template content to preview.")).toBeDefined();
  });

  it("shows contract number in header when provided", () => {
    render(
      <ContractTemplate metadata={{ contractNo: "C-2025-099" }} />,
    );
    expect(screen.getByText("C-2025-099")).toBeDefined();
  });

  it("shows no status badge when status is not set", () => {
    render(<ContractTemplate metadata={{}} />);
    const badge = document.querySelector(
      "[data-slot='contract-template-status']",
    );
    expect(badge).toBeNull();
  });
});
