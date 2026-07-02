import type { Meta, StoryObj } from "@storybook/react";
import { PurchaseOrderEditor } from "@/components/business/purchase-order-editor";
import type { POLineItem, ApprovalStep } from "@/components/business/purchase-order-editor";

const meta = { title: "Business/PurchaseOrderEditor", component: PurchaseOrderEditor, tags: ["autodocs"] } satisfies Meta<typeof PurchaseOrderEditor>;
export default meta;
type Story = StoryObj<typeof meta>;

const lines: POLineItem[] = [
  { id: "1", productCode: "RAW-001", productName: "Steel Sheet 2mm", quantity: 500, unit: "pcs", unitPrice: 25.5, taxRate: 13 },
  { id: "2", productCode: "RAW-002", productName: "Aluminum Profile", quantity: 200, unit: "m", unitPrice: 18.0, taxRate: 13 },
  { id: "3", productCode: "HW-001", productName: "M8 Bolt", quantity: 2000, unit: "pcs", unitPrice: 0.35, taxRate: 13 },
];

const approvals: ApprovalStep[] = [
  { id: "a1", approver: "Alice Chen", title: "Dept Manager", status: "approved", timestamp: "2026-07-01T10:00:00Z" },
  { id: "a2", approver: "Bob Smith", title: "VP Operations", status: "current" },
  { id: "a3", approver: "Carol Wu", title: "CFO", status: "pending" },
];

export const Default: Story = { args: { poNumber: "PO-2026-0731", vendor: "Shanghai Steel Co.", orderDate: "2026-07-01", expectedDelivery: "2026-07-15", paymentTerms: "Net 30", lineItems: lines, approvalSteps: approvals, status: "pending" } };
export const Draft: Story = { args: { lineItems: [{ id: "1", productCode: "", productName: "", quantity: 1, unit: "pcs", unitPrice: 0, taxRate: 13 }], status: "draft" } };
export const ReadOnly: Story = { args: { ...Default.args, readOnly: true, status: "approved" } };
export const Empty: Story = { args: { lineItems: [] } };
