import type { Meta, StoryObj } from "@storybook/react";
import { DashboardDesigner } from "@/components/business/dashboard-designer";

const meta: Meta<typeof DashboardDesigner> = {
  title: "Business/DashboardDesigner",
  component: DashboardDesigner,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
