import type { Meta, StoryObj } from "@storybook/react";
import { LineEditor } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof LineEditor> = {
  title: "Business/LineEditor",
  component: LineEditor,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
