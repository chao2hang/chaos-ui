import type { Meta, StoryObj } from "@storybook/react";
import { OperationLog } from "@/components/business/operation-log";

const logs = [
  { id: "1", action: "Created order", operator: "Alice", timestamp: "2024-06-15 09:30", detail: "Order #ORD-001 created" },
  { id: "2", action: "Updated status", operator: "Bob", timestamp: "2024-06-15 10:15", detail: "Changed to 'processing'" },
  { id: "3", action: "Approved", operator: "Carol", timestamp: "2024-06-15 11:00" },
  { id: "4", action: "Shipped", operator: "Dave", timestamp: "2024-06-15 14:20" },
];

const meta = {
  title: "Business/Approval/OperationLog",
  component: OperationLog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { logs: [] },
} satisfies Meta<typeof OperationLog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { logs },
};

export const SingleEntry: Story = {
  args: { logs: logs.slice(0, 1) },
};

export const Empty: Story = {};
