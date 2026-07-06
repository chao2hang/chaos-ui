import type { Meta, StoryObj } from "@storybook/react";
import { StatCardWithSparkline } from "@/components/business/stat-card-with-sparkline";

const meta = {
  title: "Business/DataDisplay/StatCardWithSparkline",
  component: StatCardWithSparkline,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "", value: "" },
} satisfies Meta<typeof StatCardWithSparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Daily visitors",
    value: "3,842",
    trend: 5.2,
    sparklineData: [120, 180, 220, 190, 260, 310, 280, 340, 390, 350],
  },
};

export const NegativeTrend: Story = {
  args: {
    label: "Bounce rate",
    value: "42%",
    trend: -3.1,
    sparklineData: [50, 48, 45, 43, 44, 42, 40],
  },
};
