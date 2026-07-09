import type { Meta, StoryObj } from "@storybook/react";
import { SequencePreview } from "@/components/ui/sequence-preview";

const meta: Meta<typeof SequencePreview> = {
  title: "Components/SequencePreview",
  component: SequencePreview,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prefix: "ORDER",
    date: new Date(),
    seq: 42,
  } as any,
};

export const Single: Story = {
  args: {
    prefix: "INV",
    date: new Date(),
    seq: 1,
  } as any,
};
