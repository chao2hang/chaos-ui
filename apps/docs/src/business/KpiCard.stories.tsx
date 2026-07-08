import type { Meta, StoryObj } from "@storybook/react";
import { KPICard } from "@/components/business/kpi-card";

const meta: Meta<typeof KPICard> = {
  title: "Business/KpiCard",
  component: KPICard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
