import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  StockTransferDialog,
  type TransferLine,
} from "@/components/business/stock-transfer-dialog";

const demoLines: TransferLine[] = [
  {
    id: "1",
    productCode: "SKU-001",
    productName: "酱油 500ml",
    quantity: 10,
    unit: "瓶",
    batchNo: "B202607",
    availableQty: 100,
  },
];

const meta = {
  title: "Business/StockTransferDialog",
  component: StockTransferDialog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    lines: demoLines,
    transferNo: "ST-2026-001",
    fromWarehouse: "华东仓",
    toWarehouse: "华南仓",
    warehouses: ["华东仓", "华南仓", "华北仓"],
  },
} satisfies Meta<typeof StockTransferDialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [lines, setLines] = useState(args.lines);
    return (
      <div className="bg-card max-w-3xl space-y-3 rounded-xl border p-4 shadow-xs">
        <p className="text-sm font-semibold">StockTransferDialog</p>
        <StockTransferDialog {...args} lines={lines} onLinesChange={setLines} />
      </div>
    );
  },
};
