import type { Meta, StoryObj } from "@storybook/react";
import { AnnouncementBanner, type Announcement } from "@/components/business/announcement-banner";

const announcements: Announcement[] = [
  { id: "1", title: "System upgrade on July 15", content: "The platform will be unavailable from 2-4 AM UTC.", priority: "critical" },
  { id: "2", title: "New feature: bulk export", content: "You can now export up to 10,000 records at once.", priority: "warning" },
  { id: "3", title: "Holiday schedule", content: "Support hours reduced on July 20.", priority: "info" },
];

const meta = {
  title: "Business/Messaging/AnnouncementBanner",
  component: AnnouncementBanner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof AnnouncementBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { announcements },
};

export const Single: Story = {
  args: {
    announcements: announcements.slice(0, 1),
  },
};

export const MaxVisible: Story = {
  args: {
    announcements,
    maxVisible: 1,
  },
};

export const WithCallbacks: Story = {
  args: {
    announcements,
    onDismiss: (id) => { void id; },
    onViewAll: () => {},
  },
};
