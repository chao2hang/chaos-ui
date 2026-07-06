import type { Meta, StoryObj } from "@storybook/react";
import { AnnouncementCard } from "@/components/business/announcement-card";

const meta = {
  title: "Business/Messaging/AnnouncementCard",
  component: AnnouncementCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "", content: "" },
} satisfies Meta<typeof AnnouncementCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "System upgrade on July 15",
    content: "The platform will be unavailable from 2-4 AM UTC.",
    date: "2024-07-12",
  },
};

export const Pinned: Story = {
  args: {
    title: "Welcome to Chaos UI v2",
    content: "New components, faster builds, better DX.",
    pinned: true,
  },
};

export const NoDate: Story = {
  args: {
    title: "Quick tip",
    content: "Use Cmd+K to open the command palette.",
  },
};
