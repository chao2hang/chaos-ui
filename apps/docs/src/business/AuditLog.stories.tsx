import type { Meta, StoryObj } from "@storybook/react";
import { AuditLog } from "@/components/business/audit-log";

  const entries: any[] = [
  {
    id: "1",
    actor: { name: "Alice" },
    action: "create",
    target: "Order #1234",
    timestamp: Date.now() - 3600_000,
    changes: [{ field: "amount", before: "0", after: "1000" }],
  },
  {
    id: "2",
    actor: { name: "Bob" },
    action: "update",
    target: "Order #1234",
    timestamp: Date.now() - 1800_000,
    changes: [{ field: "status", before: "pending", after: "approved" }],
  },
  {
    id: "3",
    actor: { name: "Charlie" },
    action: "delete",
    target: "Old Order #567",
    timestamp: Date.now() - 600_000,
  },
  {
    id: "4",
    actor: { name: "Alice" },
    action: "login",
    target: "System",
    timestamp: Date.now() - 60_000,
    ip: "192.168.1.100",
  },
  {
    id: "5",
    actor: { name: "Bob" },
    action: "logout",
    target: "System",
    timestamp: Date.now() - 30_000,
  },
];

const meta: Meta<typeof AuditLog> = {
  title: "Business/AuditLog",
  component: AuditLog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entries: entries as any,
  },
};

export const WithChanges: Story = {
  args: {
    entries: entries.filter((e) => e.changes),
  },
};

export const Dark: Story = {
  args: {
    entries: entries as any,
  },
  parameters: { backgrounds: { default: "dark" } },
};
