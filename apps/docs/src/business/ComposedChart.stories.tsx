import type { Meta, StoryObj } from "@storybook/react";
import { ComposedChartComp } from "@/components/business/charts/composed-chart";

const meta: Meta<typeof ComposedChartComp> = {
  title: "Business/ComposedChart",
  component: ComposedChartComp,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ComposedChartComp loading={false} />,
};
