import type { Meta, StoryObj } from "@storybook/react";
import { DonutChart } from "@/components/business/donut-chart";

const meta = {
  title: "Business/Charts/DonutChart",
  component: DonutChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default donut with three task-status segments. */
export const Default: Story = {};

/** Donut with a numeric center label. */
export const WithCenterLabel: Story = {
  args: {
    data: [
      { label: "移动端", value: 62, color: "var(--chart-1)" },
      { label: "桌面端", value: 28, color: "var(--chart-2)" },
      { label: "平板", value: 10, color: "var(--chart-3)" },
    ],
    centerLabel: "62%",
    size: 160,
    thickness: 16,
  },
};

/** Thin ring for compact dashboard cards. */
export const Thin: Story = {
  args: {
    data: [
      { label: "达标", value: 78, color: "var(--success)" },
      { label: "未达标", value: 22, color: "var(--muted)" },
    ],
    size: 96,
    thickness: 8,
    centerLabel: "78%",
  },
};

/** Large donut for hero dashboards. */
export const Hero: Story = {
  args: {
    data: [
      { label: "已完成", value: 45, color: "var(--brand-500)" },
      { label: "进行中", value: 30, color: "var(--brand-600)" },
      { label: "待处理", value: 15, color: "var(--brand-700)" },
      { label: "已阻塞", value: 10, color: "var(--destructive)" },
    ],
    size: 220,
    thickness: 22,
    centerLabel: "100",
  },
};
