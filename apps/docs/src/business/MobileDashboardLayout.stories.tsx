import type { Meta, StoryObj } from "@storybook/react";
import { MobileDashboardLayout } from "@/components/business/mobile-dashboard-layout";

const meta: Meta<typeof MobileDashboardLayout> = {
  title: "Business/MobileDashboardLayout",
  component: MobileDashboardLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
