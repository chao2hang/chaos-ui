import type { Meta, StoryObj } from "@storybook/react";
import { QuotationLineEditor } from "@/components/business/quotation-line-editor";
import type { QuotationLine } from "@/components/business/quotation-line-editor";

const meta = {
  title: "Business/QuotationLineEditor",
  component: QuotationLineEditor,
  tags: ["autodocs"],
} satisfies Meta<typeof QuotationLineEditor>;
export default meta;
type Story = StoryObj<typeof meta>;

const lines: QuotationLine[] = [
  { id: "1", productCode: "ERP-LIC", productName: "ERP Enterprise License", quantity: 50, unit: "user", unitCost: 2000, unitPrice: 5000, discountPct: 15, taxRate: 13 },
  { id: "2", productCode: "IMP-SVC", productName: "Implementation Service", quantity: 1, unit: "project", unitCost: 80000, unitPrice: 150000, discountPct: 5, taxRate: 6 },
  { id: "3", productCode: "TRN-PKG", productName: "Training Package", quantity: 20, unit: "session", unitCost: 800, unitPrice: 2000, discountPct: 0, taxRate: 6 },
  { id: "4", productCode: "SUP-Y1", productName: "Annual Support (Year 1)", quantity: 1, unit: "year", unitCost: 30000, unitPrice: 75000, discountPct: 10, taxRate: 6 },
];

export const Default: Story = {
  args: { quoteNo: "QT-2026-0042", lines, currencySymbol: "¥" },
};

export const ReadOnly: Story = {
  args: { ...Default.args, readOnly: true },
};

export const Usd: Story = {
  args: {
    quoteNo: "QT-2026-0099",
    lines: [
      { id: "1", productCode: "SW-LIC", productName: "Software License", quantity: 100, unit: "seat", unitCost: 30, unitPrice: 99, discountPct: 20, taxRate: 0 },
      { id: "2", productCode: "API-10M", productName: "API Calls (10M)", quantity: 5, unit: "pack", unitCost: 500, unitPrice: 1200, discountPct: 0, taxRate: 0 },
    ],
    currencySymbol: "$",
  },
};

export const Empty: Story = {
  args: { lines: [] },
};

export const LowMargin: Story = {
  args: {
    quoteNo: "QT-2026-0050",
    lines: [
      { id: "1", productCode: "HW-001", productName: "Server Hardware", quantity: 10, unit: "unit", unitCost: 8000, unitPrice: 8500, discountPct: 5, taxRate: 13 },
      { id: "2", productCode: "HW-002", productName: "Network Switch", quantity: 5, unit: "unit", unitCost: 3000, unitPrice: 3100, discountPct: 0, taxRate: 13 },
    ],
    currencySymbol: "¥",
  },
};
