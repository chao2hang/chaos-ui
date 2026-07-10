import type { Meta, StoryObj } from "@storybook/react";
import { FilterBar } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof FilterBar> = {
  title: "Business/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FilterBar fields={[]} onSearch={() => {}} onReset={() => {}} />
  ),
};
