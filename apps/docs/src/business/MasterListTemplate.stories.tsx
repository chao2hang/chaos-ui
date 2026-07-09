import type { Meta, StoryObj } from "@storybook/react";
import { MasterListTemplate } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof MasterListTemplate> = {
  title: "Business/MasterListTemplate",
  component: MasterListTemplate,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
