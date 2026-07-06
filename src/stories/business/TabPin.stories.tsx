import type { Meta, StoryObj } from "@storybook/react";
import { TabPin } from "@/components/business/tab-pin";

const meta = {
  title: "Business/Nav/TabPin",
  component: TabPin,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { id: "1", label: "Dashboard" },
} satisfies Meta<typeof TabPin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pinned: Story = {
  args: { id: "2", label: "Reports", pinned: true },
};

export const WithCallback: Story = {
  args: {
    id: "3",
    label: "Analytics",
    onPin: (id) => { void id; },
  },
};
