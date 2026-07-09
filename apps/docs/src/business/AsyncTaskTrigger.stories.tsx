import type { Meta, StoryObj } from "@storybook/react";
import { AsyncTaskTrigger } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof AsyncTaskTrigger> = {
  title: "Business/AsyncTaskTrigger",
  component: AsyncTaskTrigger,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
