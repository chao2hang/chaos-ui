import type { Meta, StoryObj } from "@storybook/react";
import { PullToRefresh } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof PullToRefresh> = {
  title: "Business/MobilePullToRefresh",
  component: PullToRefresh,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PullToRefresh
      onRefresh={() => {}}
      disabled={false}
      refreshingText={"示例"}
      pullText={"示例"}
      releaseText={"示例"}
      children={"内容"}
    />
  ),
};
