import type { Meta, StoryObj } from "@storybook/react";
import { Result } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof Result> = {
  title: "Components/Result",
  component: Result,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
