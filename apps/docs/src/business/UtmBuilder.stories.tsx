import type { Meta, StoryObj } from "@storybook/react";
import { UtmBuilder } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof UtmBuilder> = {
  title: "Business/UtmBuilder",
  component: UtmBuilder,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
