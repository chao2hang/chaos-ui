import type { Meta, StoryObj } from "@storybook/react";
import { TreeCrudPage } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof TreeCrudPage> = {
  title: "Business/TreeCrudPage",
  component: TreeCrudPage,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
