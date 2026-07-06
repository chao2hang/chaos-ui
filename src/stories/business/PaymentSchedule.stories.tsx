import type { Meta, StoryObj } from "@storybook/react";
import { PaymentSchedule } from "@/components/business/payment-schedule";

const schedule = [
  { id: "1", date: "2024-07-01", amount: 500, status: "paid" },
  { id: "2", date: "2024-08-01", amount: 500, status: "paid" },
  { id: "3", date: "2024-09-01", amount: 500, status: "pending" },
  { id: "4", date: "2024-10-01", amount: 500, status: "pending" },
];

const meta = {
  title: "Business/Finance/PaymentSchedule",
  component: PaymentSchedule,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { schedule: [] },
} satisfies Meta<typeof PaymentSchedule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { schedule },
};

export const AllPaid: Story = {
  args: {
    schedule: schedule.map((s) => ({ ...s, status: "paid" })),
  },
};

export const Single: Story = {
  args: { schedule: schedule.slice(0, 1) },
};
