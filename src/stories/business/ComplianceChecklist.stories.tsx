import type { Meta, StoryObj } from "@storybook/react";
import { ComplianceChecklist } from "@/components/business/compliance-checklist";
import type { ComplianceItem } from "@/components/business/compliance-checklist";

const meta = {
  title: "Business/ComplianceChecklist",
  component: ComplianceChecklist,
  tags: ["autodocs"],
} satisfies Meta<typeof ComplianceChecklist>;
export default meta;
type Story = StoryObj<typeof meta>;

const items: ComplianceItem[] = [
  { id: "i1", code: "ISO-4.1", description: "Quality policy documented and communicated to all staff", category: "Quality Management", status: "compliant", owner: "Alice Wang", dueDate: "2026-06-01", evidence: "QM-POL-001 v2.0", risk: "low" },
  { id: "i2", code: "ISO-6.2", description: "Quality objectives established at relevant functions and levels", category: "Quality Management", status: "in_progress", owner: "Bob Li", dueDate: "2026-07-15", risk: "medium", notes: "Drafting department-level objectives" },
  { id: "i3", code: "ISO-9.1", description: "Monitoring and measurement of processes", category: "Quality Management", status: "pending", dueDate: "2026-08-01" },
  { id: "i4", code: "GDPR-12", description: "Privacy policy accessible and up to date", category: "Data Privacy", status: "compliant", owner: "Carol Zhang", evidence: "PRIV-POL-2026", risk: "low" },
  { id: "i5", code: "GDPR-17", description: "Right to erasure (right to be forgotten) implemented", category: "Data Privacy", status: "non_compliant", owner: "Dave Chen", dueDate: "2026-06-30", risk: "high", notes: "Awaiting engineering implementation — ETA July 20" },
  { id: "i6", code: "GDPR-25", description: "Data protection by design and by default", category: "Data Privacy", status: "in_progress", owner: "Eve Liu", risk: "medium" },
  { id: "i7", code: "SOC-1.1", description: "Access control policy and enforcement", category: "Security", status: "compliant", owner: "Frank Wu", evidence: "SEC-POL-005", risk: "low" },
  { id: "i8", code: "SOC-2.3", description: "Encryption at rest for sensitive data", category: "Security", status: "compliant", owner: "Grace Sun", evidence: "SEC-ENC-002" },
  { id: "i9", code: "SOC-3.1", description: "Intrusion detection system deployed", category: "Security", status: "not_applicable", notes: "Outsourced to cloud provider" },
  { id: "i10", code: "SOC-4.2", description: "Annual penetration testing", category: "Security", status: "pending", owner: "Henry Zhao", dueDate: "2026-09-30", risk: "high" },
];

export const Default: Story = {
  args: { items, title: "Annual Compliance Audit 2026" },
};

export const ReadOnly: Story = {
  args: { ...Default.args, readOnly: true },
};

export const Editable: Story = {
  args: { ...Default.args, onStatusChange: () => {} },
};

export const Empty: Story = {
  args: { items: [], title: "New Compliance Program" },
};
