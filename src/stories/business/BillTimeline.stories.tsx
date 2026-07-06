import type { Meta, StoryObj } from "@storybook/react";
import { BillTimeline } from "@/components/business/bill-timeline";

const events = [
  { id: "1", title: "Invoice created", timestamp: "2024-06-14 09:30", status: "done" },
  { id: "2", title: "Sent to customer", timestamp: "2024-06-14 10:00", status: "done" },
  { id: "3", title: "Payment received", description: "$1,250.00 via bank transfer", timestamp: "2024-06-15 14:20", status: "done" },
  { id: "4", title: "Auto-reconciled", timestamp: "2024-06-15 14:25" },
];

const meta = {
  title: "Business/Finance/BillTimeline",
  component: BillTimeline,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { events: [] },
} satisfies Meta<typeof BillTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { events },
};

export const SingleEvent: Story = {
  args: { events: events.slice(0, 1) },
};
