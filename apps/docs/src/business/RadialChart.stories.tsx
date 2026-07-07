import type { Meta, StoryObj } from "@storybook/react";
import { RadialChart } from "@/components/business/radial-chart";

const meta = {
  title: "Business/RadialChart",
  component: RadialChart,
  tags: ["autodocs"],
} satisfies Meta<typeof RadialChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
