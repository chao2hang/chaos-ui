import type { Meta, StoryObj } from "@storybook/react";
import { FeeTypeBrowse } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof FeeTypeBrowse> = {
  title: "Business/FeeTypeBrowse",
  component: FeeTypeBrowse,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
