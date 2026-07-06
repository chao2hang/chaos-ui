import type { Meta, StoryObj } from "@storybook/react";
import { MobileTabs } from "@/components/mobile/mobile-tabs";

const meta = {
  title: "Mobile/MobileTabs",
  component: MobileTabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    tabs: [
      { value: "overview", label: "Overview", content: <p>Overview content</p> },
      { value: "details", label: "Details", content: <p>Details content</p> },
      { value: "settings", label: "Settings", content: <p>Settings content</p> },
    ],
  },
} satisfies Meta<typeof MobileTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultValue: Story = {
  args: {
    defaultValue: "details",
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: [
      { value: "home", label: "Home", content: <p>Home</p> },
      { value: "feed", label: "Feed", content: <p>Feed</p> },
      { value: "activity", label: "Activity", content: <p>Activity</p> },
      { value: "messages", label: "Messages", content: <p>Messages</p> },
      { value: "settings", label: "Settings", content: <p>Settings</p> },
    ],
  },
};
