import type { Meta, StoryObj } from "@storybook/react";
import { CrudToolbar } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof CrudToolbar> = {
  title: "Business/CrudToolbar",
  component: CrudToolbar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CrudToolbar
      primaryActions={[]}
      searchValue={"示例"}
      onSearch={() => {}}
      onSearchChange={() => {}}
      moreActions={[]}
      bulkActionLabel={"示例"}
    />
  ),
};
