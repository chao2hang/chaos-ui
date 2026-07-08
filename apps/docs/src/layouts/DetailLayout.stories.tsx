import type { Meta, StoryObj } from "@storybook/react";
import { DetailLayout } from "@/components/layout/detail-layout";

const meta: Meta<typeof DetailLayout> = {
  title: "Layouts/DetailLayout",
  component: DetailLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
