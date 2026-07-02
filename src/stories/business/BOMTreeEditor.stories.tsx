import type { Meta, StoryObj } from "@storybook/react";
import { BOMTreeEditor } from "@/components/business/bom-tree-editor";
import type { BOMItem } from "@/components/business/bom-tree-editor";

const meta = {
  title: "Business/BOMTreeEditor",
  component: BOMTreeEditor,
  tags: ["autodocs"],
} satisfies Meta<typeof BOMTreeEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const bicycleBOM: BOMItem[] = [
  {
    id: "1",
    partNumber: "ASSY-001",
    partName: "Frame Assembly",
    quantity: 1,
    unit: "pcs",
    unitCost: 200,
    type: "subassembly",
    children: [
      { id: "1-1", partNumber: "FRM-001", partName: "Top Tube", quantity: 1, unit: "pcs", unitCost: 50, type: "material", reference: "TT" },
      { id: "1-2", partNumber: "FRM-002", partName: "Down Tube", quantity: 1, unit: "pcs", unitCost: 45, type: "material", reference: "DT" },
      { id: "1-3", partNumber: "FRM-003", partName: "Head Tube", quantity: 1, unit: "pcs", unitCost: 35, type: "material", reference: "HT" },
    ],
  },
  {
    id: "2",
    partNumber: "ASSY-002",
    partName: "Wheel Assembly",
    quantity: 2,
    unit: "set",
    unitCost: 80,
    type: "subassembly",
    children: [
      { id: "2-1", partNumber: "WHL-001", partName: "Rim", quantity: 1, unit: "pcs", unitCost: 40, type: "material" },
      { id: "2-2", partNumber: "WHL-002", partName: "Spoke", quantity: 32, unit: "pcs", unitCost: 0.5, type: "material" },
      { id: "2-3", partNumber: "WHL-003", partName: "Hub", quantity: 1, unit: "pcs", unitCost: 24, type: "material" },
    ],
  },
  {
    id: "3",
    partNumber: "DRV-001",
    partName: "Chain",
    quantity: 1,
    unit: "pcs",
    unitCost: 25,
    type: "material",
  },
  {
    id: "4",
    partNumber: "PHN-001",
    partName: "Cable Routing Kit",
    quantity: 1,
    unit: "set",
    unitCost: 10,
    type: "phantom",
    isPhantom: true,
  },
];

/** Default BOM tree with subassemblies and materials. */
export const Default: Story = {
  args: {
    items: bicycleBOM,
  },
};

/** Simple flat BOM without nesting. */
export const FlatBOM: Story = {
  args: {
    items: [
      { id: "1", partNumber: "M-001", partName: "Steel Plate 2mm", quantity: 5, unit: "pcs", unitCost: 12.5, type: "material" },
      { id: "2", partNumber: "M-002", partName: "M8 Bolt", quantity: 20, unit: "pcs", unitCost: 0.3, type: "material" },
      { id: "3", partNumber: "M-003", partName: "M8 Nut", quantity: 20, unit: "pcs", unitCost: 0.15, type: "material" },
      { id: "4", partNumber: "M-004", partName: "Welding Service", quantity: 1, unit: "hr", unitCost: 80, type: "service" },
    ],
  },
};

/** Read-only BOM view for cost analysis. */
export const ReadOnly: Story = {
  args: {
    items: bicycleBOM,
    readOnly: true,
    currencySymbol: "$",
  },
};

/** Empty editor ready for new BOM creation. */
export const Empty: Story = {
  args: {
    items: [],
  },
};
