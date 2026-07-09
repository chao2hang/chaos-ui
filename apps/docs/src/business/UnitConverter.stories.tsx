import type { Meta, StoryObj } from "@storybook/react";
import { UnitConverter } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof UnitConverter> = {
  title: "Business/UnitConverter",
  component: UnitConverter,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
