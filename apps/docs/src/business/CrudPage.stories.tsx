import type { Meta, StoryObj } from "@storybook/react";
import { CrudPage } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof CrudPage> = {
  title: "Business/CrudPage",
  component: CrudPage,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CrudPage
      title={"示例"}
      filterFields={[]}
      columns={[
        { key: "name", header: "名称" },
        { key: "value", header: "值" },
      ]}
      dataSource={[]}
      pagination={"false"}
      onDialogOpenChange={() => {}}
      onRefresh={() => {}}
      onAdd={() => {}}
      onEdit={() => {}}
      onSearch={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />
  ),
};
