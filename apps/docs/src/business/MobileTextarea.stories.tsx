import type { Meta, StoryObj } from "@storybook/react";
import { MobileTextarea } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileTextarea> = {
  title: "Business/MobileTextarea",
  component: MobileTextarea,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
