import type { Meta, StoryObj } from "@storybook/react";
import { ComposedChartComp } from "@/components/business/charts/composed-chart";

const meta = {
  title: "Business/ComposedChart",
  component: ComposedChartComp,
  tags: ["autodocs"],
} satisfies Meta<typeof ComposedChartComp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
