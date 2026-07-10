import type { Meta, StoryObj } from "@storybook/react";
import { MobileKPICard } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileKPICard> = {
  title: "Business/MobileKpiCard",
  component: MobileKPICard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MobileKPICard title={"示例"} value={"示例内容"} change={"示例"} />
  ),
};
