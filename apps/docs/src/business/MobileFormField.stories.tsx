import type { Meta, StoryObj } from "@storybook/react";
import { MobileFormField } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileFormField> = {
  title: "Business/MobileFormField",
  component: MobileFormField,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
