import type { Meta, StoryObj } from "@storybook/react";
import { Statistic } from "@/components/ui/statistic";

const meta: Meta<typeof Statistic> = {
  title: "Components/Statistic",
  component: Statistic,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: "Active Users", value: "12,345" },
};

export const WithPrefix: Story = {
  args: { title: "Revenue", value: "98,765", prefix: "$" },
};

export const WithSuffix: Story = {
  args: { title: "Conversion", value: "3.2", suffix: "%" },
};

export const WithTrend: Story = {
  args: { title: "Growth", value: "12.5%", trend: "up" },
};
