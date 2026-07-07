import type { Meta, StoryObj } from "@storybook/react";
import { ColorTag } from "@/components/business/color-tag";

const meta = {
  title: "Business/ColorTag",
  component: ColorTag,
  tags: ["autodocs"],
} satisfies Meta<typeof ColorTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
