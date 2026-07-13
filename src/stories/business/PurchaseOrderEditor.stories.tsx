import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  PurchaseOrderEditor,
  type POLineItem,
} from "@/components/business/purchase-order-editor";

const demoLines: POLineItem[] = [
  {
    id: "1",
    productCode: "SKU-001",
    productName: "酱油 500ml",
    quantity: 20,
    unit: "瓶",
    unitPrice: 12.5,
    taxRate: 0.13,
  },
];

const meta = {
  title: "Business/PurchaseOrderEditor",
  component: PurchaseOrderEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    lineItems: demoLines,
    poNumber: "PO-2026-001",
    vendor: "示例供应商",
    status: "draft",
  },
} satisfies Meta<typeof PurchaseOrderEditor>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [lineItems, setLineItems] = useState(args.lineItems);
    return (
      <div className="bg-card max-w-3xl space-y-3 rounded-xl border p-4 shadow-xs">
        <p className="text-sm font-semibold">PurchaseOrderEditor</p>
        <PurchaseOrderEditor
          {...args}
          lineItems={lineItems}
          onLineItemsChange={setLineItems}
        />
      </div>
    );
  },
};
