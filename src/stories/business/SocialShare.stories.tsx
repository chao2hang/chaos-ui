import type { Meta, StoryObj } from "@storybook/react";
import { SocialShare } from "@/components/business/social-share";

const meta = {
  title: "Business/Messaging/SocialShare",
  component: SocialShare,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof SocialShare>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: "https://example.com/report",
    title: "Q3 Financial Report",
  },
};

export const LimitedPlatforms: Story = {
  args: {
    url: "https://example.com/post/42",
    title: "New feature launch",
    platforms: ["wechat", "link"],
  },
};

export const UrlOnly: Story = {
  args: {
    url: "https://example.com",
  },
};
