import type { Meta, StoryObj } from "@storybook/react";
import { MobileDashboardLayout } from "@/components/business/mobile-dashboard-layout";

const meta = {
  title: "Business/MobileDashboardLayout",
  component: MobileDashboardLayout,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileDashboardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
