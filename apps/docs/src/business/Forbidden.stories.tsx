import type { Meta, StoryObj } from "@storybook/react";
import { Forbidden } from "@/components/business/forbidden";

const meta: Meta<typeof Forbidden> = {
  title: "Business/Forbidden",
  component: Forbidden,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
