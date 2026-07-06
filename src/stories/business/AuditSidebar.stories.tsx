import type { Meta, StoryObj } from "@storybook/react";
import { AuditSidebar } from "@/components/business/audit-sidebar";

const meta = { title: "Business/Audit/AuditSidebar", component: AuditSidebar, tags: ["autodocs"], parameters: { layout: "padded" }, args: { entries: [] } } satisfies Meta<typeof AuditSidebar>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { title: "Audit log", entries: [{ id: "1", action: "UPDATE", operator: "Alice", time: new Date(), details: "Changed status to approved" }, { id: "2", action: "CREATE", operator: "Bob", time: new Date(), details: "Created invoice INV-001" }] } };
export const Loading: Story = { args: { entries: [], loading: true } };
