import type { Meta, StoryObj } from "@storybook/react";
import { DictSelect } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof DictSelect> = {
  title: "Business/DictSelect",
  component: DictSelect,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
