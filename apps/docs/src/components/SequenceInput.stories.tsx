import type { Meta, StoryObj } from "@storybook/react";
import { SequenceInput } from "@/components/ui/sequence-input";

const meta = {
  title: "Components/SequenceInput",
  component: SequenceInput,
  tags: ["autodocs"],
} satisfies Meta<typeof SequenceInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "e.g. A001, A002, A003" },
};

export const WithValue: Story = {
  args: { defaultValue: ["A001", "A002", "A003"] },
};
