import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BatchPrintDialog } from "@/components/business/batch-print-dialog";
import { Button } from "@/components/ui/button";

const items = [
  { id: "1", title: "Invoice #INV-001" },
  { id: "2", title: "Invoice #INV-002" },
  { id: "3", title: "Invoice #INV-003" },
];

const meta = {
  title: "Business/Print/BatchPrintDialog",
  component: BatchPrintDialog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { open: false, onOpenChange: () => {}, items: [] },
} satisfies Meta<typeof BatchPrintDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {
  render: () => (
    <BatchPrintDialog
      open
      onOpenChange={noop}
      items={items}
      onPrint={(ids) => { void ids; }}
    />
  ),
};

export const SingleItem: Story = {
  render: () => (
    <BatchPrintDialog
      open
      onOpenChange={noop}
      items={items.slice(0, 1)}
    />
  ),
};

export const WithTrigger: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open print dialog</Button>
        <BatchPrintDialog
          open={open}
          onOpenChange={setOpen}
          items={items}
        />
      </div>
    );
  },
};
