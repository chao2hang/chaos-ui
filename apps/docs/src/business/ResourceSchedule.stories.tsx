import type { Meta, StoryObj } from "@storybook/react";
import { ResourceSchedule } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ResourceSchedule> = {
  title: "Business/ResourceSchedule",
  component: ResourceSchedule,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
