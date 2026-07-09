import type { Meta, StoryObj } from "@storybook/react";
import { ChatImageGallery } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ChatImageGallery> = {
  title: "Business/ChatImageGallery",
  component: ChatImageGallery,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
