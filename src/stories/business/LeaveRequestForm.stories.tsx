import type { Meta, StoryObj } from "@storybook/react";
import { LeaveRequestForm } from "@/components/business/leave-request-form";
import type { LeaveBalance, Approver } from "@/components/business/leave-request-form";

const meta = {
  title: "Business/LeaveRequestForm",
  component: LeaveRequestForm,
  tags: ["autodocs"],
} satisfies Meta<typeof LeaveRequestForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const balances: LeaveBalance[] = [
  { type: "annual", label: "Annual Leave", total: 15, used: 5, unit: "days" },
  { type: "sick", label: "Sick Leave", total: 10, used: 2, unit: "days" },
  { type: "personal", label: "Personal Leave", total: 3, used: 1, unit: "days" },
  { type: "maternity", label: "Maternity", total: 98, used: 0, unit: "days" },
  { type: "unpaid", label: "Unpaid Leave", total: 999, used: 0, unit: "days" },
];

const approvers: Approver[] = [
  { id: "1", name: "Alice Chen", title: "Direct Manager" },
  { id: "2", name: "Bob Smith", title: "HR Director" },
];

/** Default leave request form with annual leave selected. */
export const Default: Story = {
  args: {
    leaveType: "annual",
    startDate: "2026-07-06",
    endDate: "2026-07-10",
    balances,
    approvers,
    reason: "Family vacation to the beach.",
  },
};

/** Sick leave request. */
export const SickLeave: Story = {
  args: {
    leaveType: "sick",
    startDate: "2026-07-02",
    endDate: "2026-07-03",
    balances,
    approvers,
    reason: "Flu symptoms, doctor's visit required.",
  },
};

/** Insufficient balance scenario. */
export const InsufficientBalance: Story = {
  args: {
    leaveType: "personal",
    startDate: "2026-07-01",
    endDate: "2026-07-10",
    balances,
    approvers,
    reason: "Personal matters requiring extended leave.",
  },
};

/** Read-only view of submitted request. */
export const ReadOnly: Story = {
  args: {
    leaveType: "annual",
    startDate: "2026-07-06",
    endDate: "2026-07-10",
    balances,
    approvers,
    reason: "Approved family vacation.",
    readOnly: true,
  },
};
