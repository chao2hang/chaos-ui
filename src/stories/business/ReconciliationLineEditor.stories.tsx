import type { Meta, StoryObj } from "@storybook/react";
import { ReconciliationLineEditor, type ReconciliationRow } from "@/components/business/reconciliation-line-editor";

const rows: ReconciliationRow[] = [
  { id: "1", distributor: "Distributor A", orderAmount: 5000, deduction: 200, netAmount: 4800 },
  { id: "2", distributor: "Distributor B", orderAmount: 12000, deduction: 500, netAmount: 11500 },
  { id: "3", distributor: "Distributor C", orderAmount: 7500, deduction: 300, netAmount: 7200 },
];

const meta = {
  title: "Business/Finance/ReconciliationLineEditor",
  component: ReconciliationLineEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { rows: [] },
} satisfies Meta<typeof ReconciliationLineEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { rows },
};

export const AllMatched: Story = {
  args: {
    rows: rows.map((r) => ({ ...r })),
  },
};

export const WithChange: Story = {
  args: {
    rows,
    onChange: (r) => { void r; },
  },
};
