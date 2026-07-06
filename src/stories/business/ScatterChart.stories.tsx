import type { Meta, StoryObj } from "@storybook/react";
import { ScatterChart } from "@/components/business/scatter-chart";

const meta = {
  title: "Business/Charts/ScatterChart",
  component: ScatterChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ScatterChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const regressionPoints = Array.from({ length: 20 }, (_, i) => {
  const x = i * 5;
  const noise = (i % 3) * 4 - 4;
  return { x, y: Math.round(2 * x + 10 + noise) };
});

const clusterPoints = [
  ...Array.from({ length: 8 }, (_, i) => ({
    x: 15 + i * 2,
    y: 25 + i * 3,
    color: "var(--chart-1)",
    label: `A${i + 1}`,
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    x: 55 + i * 3,
    y: 60 + i * 2,
    color: "var(--chart-2)",
    label: `B${i + 1}`,
  })),
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default scatter plot with five points. */
export const Default: Story = {};

/** Linear regression dataset with 20 points showing a positive trend. */
export const LinearTrend: Story = {
  args: {
    data: regressionPoints,
    xLabel: "投入",
    yLabel: "产出",
    height: 240,
  },
};

/** Two labeled clusters with distinct colors. */
export const Clusters: Story = {
  args: {
    data: clusterPoints,
    xLabel: "特征 X",
    yLabel: "特征 Y",
    height: 260,
  },
};

/** Outlier detection — most points cluster, one is far off. */
export const Outlier: Story = {
  args: {
    data: [
      { x: 20, y: 22 },
      { x: 25, y: 28 },
      { x: 22, y: 24 },
      { x: 28, y: 26 },
      { x: 24, y: 30 },
      { x: 80, y: 85, color: "var(--destructive)", label: "异常" },
    ],
    xLabel: "CPU %",
    yLabel: "内存 %",
    height: 220,
  },
};
