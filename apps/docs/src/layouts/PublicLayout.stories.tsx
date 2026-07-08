import type { Meta, StoryObj } from "@storybook/react";
import { PublicLayout } from "@/components/layout/public-layout";

const meta: Meta<typeof PublicLayout> = {
  title: "Layouts/PublicLayout",
  component: PublicLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
