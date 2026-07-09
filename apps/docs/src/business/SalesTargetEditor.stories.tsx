import type { Meta, StoryObj } from "@storybook/react";
import { SalesTargetEditor } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof SalesTargetEditor> = {
  title: "Business/SalesTargetEditor",
  component: SalesTargetEditor,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
