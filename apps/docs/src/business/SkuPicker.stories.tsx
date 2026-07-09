import type { Meta, StoryObj } from "@storybook/react";
import { SkuPicker } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof SkuPicker> = {
  title: "Business/SkuPicker",
  component: SkuPicker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
