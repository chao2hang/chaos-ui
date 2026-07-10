import type { Meta, StoryObj } from "@storybook/react";
import { AuditSidebar } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof AuditSidebar> = {
  title: "Business/AuditSidebar",
  component: AuditSidebar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AuditSidebar entries={[]} />,
};
