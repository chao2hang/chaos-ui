import type { Meta, StoryObj } from "@storybook/react";
import { KPICard } from "@/components/business/kpi-card";

const meta = {
  title: "Business/KpiCard",
  component: KPICard,
  tags: ["autodocs"],
} satisfies Meta<typeof KPICard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
