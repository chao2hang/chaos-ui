import type { Meta, StoryObj } from "@storybook/react";
import { CronEditor } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof CronEditor> = {
  title: "Business/CronEditor",
  component: CronEditor,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
