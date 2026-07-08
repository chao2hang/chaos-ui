import type { Meta, StoryObj } from "@storybook/react";
import { HeatmapCalendar } from "@/components/business/heatmap-calendar";

function generateData(days: number) {
  const data: Array<{ date: string; value: number }> = [];
  const now = Date.now();
  for (let i = 0; i < days; i++) {
    const d = new Date(now - i * 86400_000);
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    data.push({ date, value: Math.floor(Math.random() * 10) });
  }
  return data;
}

const data = generateData(365);

const meta: Meta<typeof HeatmapCalendar> = {
  title: "Business/HeatmapCalendar",
  component: HeatmapCalendar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data,
  },
};

export const CustomColors: Story = {
  args: {
    data,
    colorStops: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  },
};

export const SmallCells: Story = {
  args: {
    data,
    cellSize: 8,
    gap: 1,
  },
};

export const Dark: Story = {
  args: {
    data,
  },
  parameters: { backgrounds: { default: "dark" } },
};
