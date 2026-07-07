import type { Meta, StoryObj } from "@storybook/react";
import { PullToRefresh } from "@/components/business/mobile-pull-to-refresh";

const meta = {
  title: "Business/MobilePullToRefresh",
  component: PullToRefresh,
  tags: ["autodocs"],
} satisfies Meta<typeof PullToRefresh>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
