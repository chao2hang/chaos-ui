import type { Meta, StoryObj } from "@storybook/react";
import { PolicyLineEditor } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof PolicyLineEditor> = {
  title: "Business/PolicyLineEditor",
  component: PolicyLineEditor,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
