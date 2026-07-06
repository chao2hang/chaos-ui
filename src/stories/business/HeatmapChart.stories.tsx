import type { Meta, StoryObj } from "@storybook/react";
import { HeatmapChart } from "@/components/business/heatmap-chart";

const meta = {
  title: "Business/Charts/HeatmapChart",
  component: HeatmapChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof HeatmapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const hours = ["00", "04", "08", "12", "16", "20"];

const trafficHeat = days.flatMap((d) =>
  hours.map((h) => ({
    x: h,
    y: d,
    value: Math.round(Math.random() * 100),
  })),
);

const gitActivity: Array<{ x: string; y: string; value: number }> = [];
const weeks = ["W1", "W2", "W3", "W4"];
for (const w of weeks) {
  for (const d of days) {
    gitActivity.push({ x: w, y: d, value: Math.round(Math.random() * 12) });
  }
}

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Weekly traffic heatmap across days and hours. */
export const TrafficByHour: Story = {
  args: {
    data: trafficHeat,
  },
};

/** Git contribution-style heatmap (4 weeks × 7 days). */
export const GitActivity: Story = {
  args: {
    data: gitActivity,
  },
};

/** Sparse heatmap with a few zero-value cells. */
export const Sparse: Story = {
  args: {
    data: [
      { x: "Q1", y: "产品A", value: 80 },
      { x: "Q1", y: "产品B", value: 0 },
      { x: "Q1", y: "产品C", value: 45 },
      { x: "Q2", y: "产品A", value: 60 },
      { x: "Q2", y: "产品B", value: 90 },
      { x: "Q2", y: "产品C", value: 0 },
      { x: "Q3", y: "产品A", value: 30 },
      { x: "Q3", y: "产品B", value: 50 },
      { x: "Q3", y: "产品C", value: 70 },
    ],
  },
};
