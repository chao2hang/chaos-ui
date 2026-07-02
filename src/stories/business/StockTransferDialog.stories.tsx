import type { Meta, StoryObj } from "@storybook/react";
import { StockTransferDialog } from "@/components/business/stock-transfer-dialog";
import type { TransferLine } from "@/components/business/stock-transfer-dialog";

const meta = { title: "Business/StockTransferDialog", component: StockTransferDialog, tags: ["autodocs"] } satisfies Meta<typeof StockTransferDialog>;
export default meta;
type Story = StoryObj<typeof meta>;

const lines: TransferLine[] = [
  { id: "1", productCode: "RAW-001", productName: "Steel Sheet 2mm", quantity: 200, unit: "pcs", batchNo: "B2026-001", availableQty: 500 },
  { id: "2", productCode: "RAW-002", productName: "Aluminum Bar", quantity: 150, unit: "m", batchNo: "B2026-002", availableQty: 300 },
  { id: "3", productCode: "HW-001", productName: "M8 Bolt", quantity: 1000, unit: "pcs", availableQty: 5000 },
];

export const Default: Story = { args: { transferNo: "ST-2026-0042", fromWarehouse: "Main Warehouse", toWarehouse: "Branch Warehouse B", warehouses: ["Main Warehouse", "Branch Warehouse A", "Branch Warehouse B"], lines, transferType: "regular", remark: "Monthly stock redistribution" } };
export const Urgent: Story = { args: { ...Default.args, transferType: "urgent", remark: "Urgent: production line shortage" } };
export const ReadOnly: Story = { args: { ...Default.args, readOnly: true } };
export const Empty: Story = { args: { lines: [], warehouses: ["WH-A", "WH-B"] } };
