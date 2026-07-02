import type { Meta, StoryObj } from "@storybook/react";
import { AuditTrailDiff } from "@/components/business/audit-trail-diff";
import type { AuditChangeEntry } from "@/components/business/audit-trail-diff";

const meta = {
  title: "Business/AuditTrailDiff",
  component: AuditTrailDiff,
  tags: ["autodocs"],
} satisfies Meta<typeof AuditTrailDiff>;

export default meta;
type Story = StoryObj<typeof meta>;

const entries: AuditChangeEntry[] = [
  {
    id: "1", entityType: "PurchaseOrder", entityId: "PO-2026-001",
    field: "status", fieldLabel: "Status", action: "update",
    oldValue: "Draft", newValue: "Submitted",
    user: "Alice Chen", timestamp: "2026-07-01T10:00:00Z",
    section: "Header",
  },
  {
    id: "2", entityType: "PurchaseOrder", entityId: "PO-2026-001",
    field: "totalAmount", fieldLabel: "Total Amount", action: "update",
    oldValue: "¥5,000.00", newValue: "¥7,500.00",
    user: "Alice Chen", timestamp: "2026-07-01T10:05:00Z",
    reason: "Added line items",
  },
  {
    id: "3", entityType: "PurchaseOrder", entityId: "PO-2026-001",
    field: "deliveryDate", fieldLabel: "Delivery Date", action: "update",
    oldValue: "2026-07-15", newValue: "2026-07-20",
    user: "Alice Chen", timestamp: "2026-07-01T10:10:00Z",
  },
  {
    id: "4", entityType: "Invoice", entityId: "INV-2026-042",
    field: "—", action: "create",
    newValue: "Invoice created with 3 line items",
    user: "Bob Smith", timestamp: "2026-07-01T11:00:00Z",
  },
  {
    id: "5", entityType: "Vendor", entityId: "V-100",
    field: "isActive", fieldLabel: "Active Status", action: "delete",
    oldValue: "true", newValue: "—",
    user: "Carol Wu", timestamp: "2026-07-01T14:00:00Z",
    reason: "Vendor went out of business",
  },
  {
    id: "6", entityType: "Product", entityId: "P-200",
    field: "price", fieldLabel: "Unit Price", action: "update",
    oldValue: "¥45.00", newValue: "¥52.00",
    user: "Dave Park", timestamp: "2026-07-01T15:30:00Z",
    section: "Pricing",
  },
  {
    id: "7", entityType: "Product", entityId: "P-201",
    field: "isActive", fieldLabel: "Active", action: "restore",
    oldValue: "false", newValue: "true",
    user: "Eve Lin", timestamp: "2026-07-01T16:00:00Z",
    reason: "Restored after quality re-check",
  },
];

/** Default audit trail diff with mixed action types. */
export const Default: Story = {
  args: { entries },
};

/** With reason column visible. */
export const WithReason: Story = {
  args: { entries, showReason: true },
};

/** Without filter bar. */
export const NoFilter: Story = {
  args: { entries, showFilter: false },
};

/** Minimal view without entity/user/timestamp. */
export const Minimal: Story = {
  args: {
    entries,
    showEntity: false,
    showUser: false,
    showTimestamp: false,
  },
};

/** Empty state. */
export const Empty: Story = {
  args: { entries: [] },
};
