import type { Meta, StoryObj } from "@storybook/react";
import { BillPage } from "@/components/business/bill-page";
import { BillHeader } from "@/components/business/bill-header";
import { BillFooter } from "@/components/business/bill-footer";
import { BillStatusBar } from "@/components/business/bill-status-bar";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/Finance/Bills",
  component: BillPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { title: "Invoice", children: null },
} satisfies Meta<typeof BillPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const BillPageDefault: Story = {
  args: {
    title: "Invoice",
    subtitle: "INV-2024-001",
    status: "draft" as const,
    onBack: noop,
    actions: <Button size="sm">Edit</Button>,
    children: <div className="p-4 text-sm text-muted-foreground">Bill content placeholder.</div>,
  },
};

export const BillHeaderDefault: Story = {
  render: () => (
    <div className="max-w-lg p-4">
      <BillHeader
        fields={[
          { label: "Invoice No.", value: "INV-2024-001" },
          { label: "Date", value: "2024-06-15" },
          { label: "Customer", value: "Acme Inc." },
          { label: "Amount", value: "$1,250.00" },
        ]}
      />
    </div>
  ),
};

export const BillFooterDefault: Story = {
  render: () => (
    <div className="p-4">
      <BillFooter
        status="draft"
        onSaveDraft={noop}
        onSubmit={noop}
        onCancel={noop}
      />
    </div>
  ),
};

export const BillStatusBarDefault: Story = {
  render: () => (
    <div className="max-w-lg p-4">
      <BillStatusBar
        steps={[
          { label: "Submitted", status: "completed" as const },
          { label: "Reviewed", status: "completed" as const },
          { label: "Approved", status: "current" as const },
          { label: "Paid", status: "pending" as const },
        ]}
      />
    </div>
  ),
};
