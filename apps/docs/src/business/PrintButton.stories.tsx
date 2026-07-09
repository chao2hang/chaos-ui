import type { Meta, StoryObj } from "@storybook/react";
import { PrintButton } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof PrintButton> = {
  title: "Business/PrintButton",
  component: PrintButton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
