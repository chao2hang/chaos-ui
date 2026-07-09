import type { Meta, StoryObj } from "@storybook/react";
import { MobileNavigation } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileNavigation> = {
  title: "Business/MobileNavigation",
  component: MobileNavigation,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
