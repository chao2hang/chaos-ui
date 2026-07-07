import type { Meta, StoryObj } from "@storybook/react";
import { MobileKPICard } from "@/components/business/mobile-kpi-card";

const meta = {
  title: "Business/MobileKpiCard",
  component: MobileKPICard,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileKPICard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
