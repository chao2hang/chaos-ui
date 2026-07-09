import type { Meta, StoryObj } from "@storybook/react";
import { FormDesigner } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof FormDesigner> = {
  title: "Business/FormDesigner",
  component: FormDesigner,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
