import type { Meta, StoryObj } from "@storybook/react";
import { LabelDesigner } from "@/components/business/label-designer";
import type { LabelField, LabelSize } from "@/components/business/label-designer";

const meta = {
  title: "Business/LabelDesigner",
  component: LabelDesigner,
  tags: ["autodocs"],
} satisfies Meta<typeof LabelDesigner>;
export default meta;
type Story = StoryObj<typeof meta>;

const size: LabelSize = { id: "medium", label: "60×40mm", width: 60, height: 40 };

const fields: LabelField[] = [
  { id: "f1", type: "text", label: "Company Name", sampleValue: "ACME Industries Ltd.", x: 5, y: 3, width: 50, height: 5, fontSize: 9 },
  { id: "f2", type: "text", label: "Product Name", sampleValue: "Widget Pro 2000", x: 5, y: 9, width: 50, height: 5, fontSize: 8 },
  { id: "f3", type: "barcode", label: "SKU Barcode", sampleValue: "6901234567890", x: 5, y: 16, width: 40, height: 12 },
  { id: "f4", type: "qrcode", label: "Product URL", sampleValue: "https://example.com/p/wpg2000", x: 47, y: 16, width: 12, height: 12 },
  { id: "f5", type: "line", label: "Divider", sampleValue: "", x: 5, y: 30, width: 50, height: 1 },
  { id: "f6", type: "text", label: "Batch No", sampleValue: "BATCH-2026-0789", x: 5, y: 32, width: 30, height: 5, fontSize: 7 },
];

export const Default: Story = {
  args: { fields, labelSize: size },
};

export const ShippingLabel: Story = {
  args: {
    fields: [
      { id: "f1", type: "text", label: "From", sampleValue: "Shanghai, China", x: 5, y: 5, width: 90, height: 6, fontSize: 9 },
      { id: "f2", type: "text", label: "To", sampleValue: "New York, USA", x: 5, y: 15, width: 90, height: 6, fontSize: 9 },
      { id: "f3", type: "line", label: "Separator", sampleValue: "", x: 5, y: 25, width: 90, height: 1 },
      { id: "f4", type: "barcode", label: "Tracking No", sampleValue: "SF1234567890CN", x: 5, y: 35, width: 60, height: 15 },
      { id: "f5", type: "qrcode", label: "Track QR", sampleValue: "https://track.example.com/SF1234567890CN", x: 70, y: 35, width: 25, height: 25 },
      { id: "f6", type: "text", label: "Weight", sampleValue: "2.5 kg", x: 5, y: 60, width: 40, height: 5, fontSize: 8 },
      { id: "f7", type: "text", label: "Service", sampleValue: "Express", x: 50, y: 60, width: 45, height: 5, fontSize: 8 },
    ],
    labelSize: { id: "shipping", label: "100×150mm", width: 100, height: 150 },
  },
};

export const Empty: Story = {
  args: { fields: [], labelSize: size },
};

export const ReadOnly: Story = {
  args: { ...Default.args, readOnly: true },
};
