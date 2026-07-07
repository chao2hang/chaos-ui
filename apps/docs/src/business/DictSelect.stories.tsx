import type { Meta, StoryObj } from "@storybook/react";
import { DictSelect } from "@/components/business/dict-select";

const meta = {
  title: "Business/DictSelect",
  component: DictSelect,
  tags: ["autodocs"],
} satisfies Meta<typeof DictSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
