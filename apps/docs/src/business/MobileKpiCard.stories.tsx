import type { Meta, StoryObj } from "@storybook/react";
import { MobileKPICard } from "@/components/business/mobile-kpi-card";

const meta: Meta<typeof MobileKPICard> = {
  title: "Business/MobileKpiCard",
  component: MobileKPICard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
