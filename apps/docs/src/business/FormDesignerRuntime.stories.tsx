import type { Meta, StoryObj } from "@storybook/react";
import { FormDesignerRuntime } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof FormDesignerRuntime> = {
  title: "Business/FormDesignerRuntime",
  component: FormDesignerRuntime,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
