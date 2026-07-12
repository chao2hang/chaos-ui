import type { Meta, StoryObj } from "@storybook/react";
import { ActivityFeed } from "@/components/business/activity-feed";

const meta = {
  title: "Business/ActivityFeed",
  component: ActivityFeed,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ActivityFeed>;
export default meta;
type Story = StoryObj<typeof meta>;

export const TeamFeed: Story = {
  args: {
    items: [
      {
        user: "张三",
        action: "提交了订单 SO-20260088",
        time: new Date().toISOString(),
        avatarFallback: "张",
        variant: "success",
      },
      {
        user: "李四",
        action: "驳回了差旅报销",
        time: new Date(Date.now() - 3600000).toISOString(),
        avatarFallback: "李",
        variant: "warning",
      },
      {
        user: "王五",
        action: "完成出库复核",
        time: new Date(Date.now() - 7200000).toISOString(),
        avatarFallback: "王",
        variant: "default",
      },
    ],
  } as any,
};
