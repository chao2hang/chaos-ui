import type { Meta, StoryObj } from "@storybook/react";
import { AdvancedSearch } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof AdvancedSearch> = {
  title: "Business/AdvancedSearch",
  component: AdvancedSearch,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AdvancedSearch fields={[]} onSearch={() => {}} onSaveSearch={() => {}} />
  ),
};
