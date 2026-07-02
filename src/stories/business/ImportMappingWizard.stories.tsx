import type { Meta, StoryObj } from "@storybook/react";
import { ImportMappingWizard } from "@/components/business/import-mapping-wizard";
import type { SourceColumn, TargetField } from "@/components/business/import-mapping-wizard";

const meta = {
  title: "Business/ImportMappingWizard",
  component: ImportMappingWizard,
  tags: ["autodocs"],
} satisfies Meta<typeof ImportMappingWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sourceColumns: SourceColumn[] = [
  { name: "product_name", index: 0, detectedType: "string", samples: ["Widget A", "Widget B", "Widget C"] },
  { name: "unit_price", index: 1, detectedType: "number", samples: ["9.99", "19.99", "29.99"] },
  { name: "stock_qty", index: 2, detectedType: "number", samples: ["100", "250", "50"] },
  { name: "category_id", index: 3, detectedType: "string", samples: ["CAT-01", "CAT-02", "CAT-03"] },
  { name: "is_active", index: 4, detectedType: "boolean", samples: ["true", "false", "true"] },
  { name: "created_at", index: 5, detectedType: "date", samples: ["2026-01-15", "2026-02-20", "2026-03-10"] },
];

const targetFields: TargetField[] = [
  { name: "name", label: "Product Name", type: "string", required: true },
  { name: "price", label: "Unit Price", type: "number", required: true },
  { name: "quantity", label: "Stock Quantity", type: "number", required: true },
  { name: "category", label: "Category", type: "string", required: false },
  { name: "active", label: "Is Active", type: "boolean", required: false },
  { name: "createdAt", label: "Created Date", type: "date", required: false },
];

/** Default mapping wizard with auto-matching. */
export const Default: Story = {
  args: {
    sourceColumns,
    targetFields,
    mappings: [],
  },
};

/** With pre-configured mappings. */
export const PreMapped: Story = {
  args: {
    sourceColumns,
    targetFields,
    mappings: [
      { source: "product_name", target: "name", autoMatched: true, typeMatch: true },
      { source: "unit_price", target: "price", autoMatched: true, typeMatch: true },
      { source: "stock_qty", target: "quantity", autoMatched: false, typeMatch: true },
      { source: "category_id", target: "category", autoMatched: false, typeMatch: true },
      { source: "is_active", target: "active", autoMatched: true, typeMatch: true },
      { source: "created_at", target: "createdAt", autoMatched: true, typeMatch: true },
    ],
  },
};

/** Without sample data preview. */
export const NoSamples: Story = {
  args: {
    sourceColumns,
    targetFields,
    mappings: [],
    showSamples: false,
  },
};

/** Minimal mapping scenario. */
export const Minimal: Story = {
  args: {
    sourceColumns: [
      { name: "col1", index: 0, detectedType: "string" },
      { name: "col2", index: 1, detectedType: "number" },
    ],
    targetFields: [
      { name: "field1", label: "Field 1", type: "string", required: true },
      { name: "field2", label: "Field 2", type: "number", required: false },
    ],
    mappings: [],
    showSamples: false,
  },
};
