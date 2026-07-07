import type { Meta, StoryObj } from "@storybook/react";
import { SequencePreview } from "@/components/ui/sequence-preview";

const meta = {
  title: "Components/SequencePreview",
  component: SequencePreview,
  tags: ["autodocs"],
} satisfies Meta<typeof SequencePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "A001-A100, B001-B050",
  },
};

export const Single: Story = {
  args: {
    value: "INV-2024-0001 ~ INV-2024-0099",
  },
};
