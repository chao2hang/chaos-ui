import type { Meta, StoryObj } from "@storybook/react";
import { DynamicFormBuilder } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof DynamicFormBuilder> = {
  title: "Business/DynamicFormBuilder",
  component: DynamicFormBuilder,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
