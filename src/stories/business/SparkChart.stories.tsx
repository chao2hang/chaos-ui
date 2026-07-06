import type { Meta, StoryObj } from "@storybook/react";
import { SparkChart } from "@/components/business/spark-chart";

const meta = {
  title: "Business/Charts/SparkChart",
  component: SparkChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof SparkChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default 7-point sparkline. */
export const Default: Story = {};

/** Uptrending revenue sparkline in brand color. */
export const RevenueUp: Story = {
  args: {
    data: [10, 15, 12, 20, 18, 25, 28, 32, 30, 40],
    color: "var(--success)",
    width: 160,
    height: 40,
  },
};

/** Downtrending error rate — smaller size for a table cell. */
export const ErrorRateDown: Story = {
  args: {
    data: [80, 75, 82, 70, 65, 60, 55, 50, 48, 42],
    color: "var(--destructive)",
    width: 100,
    height: 24,
  },
};

/** Volatile time series with sharp swings. */
export const Volatile: Story = {
  args: {
    data: [50, 20, 80, 30, 90, 25, 75, 35, 85, 40],
    color: "var(--warning)",
    width: 180,
    height: 48,
  },
};

/** Wide dashboard sparkline for a hero metric card. */
export const WideDashboard: Story = {
  args: {
    data: Array.from({ length: 30 }, (_, i) => 20 + Math.sin(i / 3) * 15 + i),
    color: "var(--brand-500)",
    width: 320,
    height: 56,
  },
};
