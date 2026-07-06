import type { Meta, StoryObj } from "@storybook/react";
import { InviteLink } from "@/components/business/invite-link";

const meta = {
  title: "Business/Dialogs/InviteLink",
  component: InviteLink,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { url: "" },
} satisfies Meta<typeof InviteLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: "https://app.example.com/invite/abc123",
    description: "Share this link to invite teammates to your workspace.",
  },
};

export const NoDescription: Story = {
  args: {
    url: "https://app.example.com/join/xyz789",
  },
};
