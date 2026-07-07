import type { Meta, StoryObj } from "@storybook/react";
import { Forbidden } from "@/components/business/forbidden";

const meta = {
  title: "Business/Forbidden",
  component: Forbidden,
  tags: ["autodocs"],
} satisfies Meta<typeof Forbidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
