import type { Meta, StoryObj } from "@storybook/react";
import { AuditSidebar } from "@/components/business/audit-sidebar";

const meta = {
  title: "Business/AuditSidebar",
  component: AuditSidebar,
  tags: ["autodocs"],
} satisfies Meta<typeof AuditSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
