import type { Meta, StoryObj } from "@storybook/react";
import { InlineEdit } from "@/components/business/inline-edit";

const meta = {
  title: "Business/InlineEdit",
  component: InlineEdit,
  tags: ["autodocs"],
} satisfies Meta<typeof InlineEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
