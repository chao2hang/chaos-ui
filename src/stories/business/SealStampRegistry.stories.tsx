import type { Meta, StoryObj } from "@storybook/react";
import { SealStampRegistry } from "@/components/business/seal-stamp-registry";
import type { SealRecord, SealUsageLog } from "@/components/business/seal-stamp-registry";

const meta = {
  title: "Business/SealStampRegistry",
  component: SealStampRegistry,
  tags: ["autodocs"],
} satisfies Meta<typeof SealStampRegistry>;
export default meta;
type Story = StoryObj<typeof meta>;

const seals: SealRecord[] = [
  { id: "s1", name: "Company Official Seal", type: "official", regNo: "SEAL-2020-001", custodian: "Alice Wang", department: "Administration", issueDate: "2020-01-15", status: "active", lastUsed: "2026-06-28", usageCount: 156 },
  { id: "s2", name: "Financial Seal", type: "financial", regNo: "SEAL-2020-002", custodian: "Bob Li", department: "Finance", issueDate: "2020-01-15", status: "custody", lastUsed: "2026-06-20", usageCount: 89 },
  { id: "s3", name: "Contract Seal", type: "contract", regNo: "SEAL-2021-003", custodian: "Carol Zhang", department: "Legal", issueDate: "2021-03-10", status: "active", lastUsed: "2026-06-25", usageCount: 234 },
  { id: "s4", name: "HR Seal", type: "hr", regNo: "SEAL-2021-004", custodian: "Dave Chen", department: "Human Resources", issueDate: "2021-05-20", status: "active", usageCount: 67 },
  { id: "s5", name: "Invoice Seal", type: "invoice", regNo: "SEAL-2022-005", custodian: "Eve Liu", department: "Finance", issueDate: "2022-01-10", status: "stored", usageCount: 312 },
  { id: "s6", name: "Legacy Seal (Revoked)", type: "official", regNo: "SEAL-2018-OLD", custodian: "—", issueDate: "2018-06-01", status: "revoked", usageCount: 45 },
];

const logs: SealUsageLog[] = [
  { id: "l1", sealId: "s1", applicant: "Frank Wu", document: "Annual Report 2025", date: "2026-06-28", approver: "Alice Wang", status: "completed" },
  { id: "l2", sealId: "s2", applicant: "Grace Sun", document: "Bank Transfer Authorization #BT-0892", date: "2026-06-27", approver: "Bob Li", status: "approved" },
  { id: "l3", sealId: "s3", applicant: "Henry Zhao", document: "Supplier Partnership Agreement", date: "2026-06-26", approver: "Carol Zhang", status: "pending" },
  { id: "l4", sealId: "s5", applicant: "Iris Wang", document: "Invoice #INV-2026-0456", date: "2026-06-25", approver: "Eve Liu", status: "completed" },
  { id: "l5", sealId: "s3", applicant: "Jack Liu", document: "ND Agreement — Tech Partner", date: "2026-06-24", approver: "Carol Zhang", status: "rejected" },
];

export const Default: Story = {
  args: { seals, usageLogs: logs },
};

export const ReadOnly: Story = {
  args: { ...Default.args, readOnly: true },
};

export const NoLogs: Story = {
  args: { seals },
};
