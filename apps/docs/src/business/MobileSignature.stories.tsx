import type { Meta, StoryObj } from "@storybook/react";
import { MobileSignature } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof MobileSignature> = {
  title: "Business/MobileSignature",
  component: MobileSignature,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
