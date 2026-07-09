import type { Meta, StoryObj } from "@storybook/react";
import { VersionHistory } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof VersionHistory> = {
  title: "Business/VersionHistory",
  component: VersionHistory,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
