import type { Meta, StoryObj } from "@storybook/react";
import { MobileListItem } from "@/components/business/mobile-list-item";
import { ChevronRightIcon, MoreHorizontalIcon } from "@/components/ui/icons";

const meta = {
  title: "Business/Mobile/MobileListItem",
  component: MobileListItem,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "List item" },
} satisfies Meta<typeof MobileListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {
  args: { title: "Account settings" },
};

export const WithSubtitle: Story = {
  args: {
    title: "Profile",
    subtitle: "Tap to update your public info",
  },
};

export const Tappable: Story = {
  args: {
    title: "Notifications",
    subtitle: "Push, email, in-app",
    onClick: noop,
  },
};

export const WithTrailing: Story = {
  args: {
    title: "Storage",
    subtitle: "12.4 GB used",
    trailing: <ChevronRightIcon className="text-muted-foreground size-4" />,
  },
};

export const WithCustomTrailing: Story = {
  args: {
    title: "Recent activity",
    trailing: <MoreHorizontalIcon className="text-muted-foreground size-4" />,
  },
};
