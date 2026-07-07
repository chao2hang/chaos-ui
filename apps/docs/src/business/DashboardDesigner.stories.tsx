import type { Meta, StoryObj } from "@storybook/react";
import { DashboardDesigner } from "@/components/business/dashboard-designer";

const meta = {
  title: "Business/DashboardDesigner",
  component: DashboardDesigner,
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardDesigner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
