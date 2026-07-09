import type { Meta, StoryObj } from "@storybook/react";
import { InlineEdit } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof InlineEdit> = {
  title: "Business/InlineEdit",
  component: InlineEdit,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
