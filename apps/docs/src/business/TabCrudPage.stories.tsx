import type { Meta, StoryObj } from "@storybook/react";
import { TabCrudPage } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof TabCrudPage> = {
  title: "Business/TabCrudPage",
  component: TabCrudPage,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
