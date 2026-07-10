import type { Meta, StoryObj } from "@storybook/react";
import { LineEditor } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof LineEditor> = {
  title: "Business/LineEditor",
  component: LineEditor,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <LineEditor
      columns={[
        { key: "name", header: "名称" },
        { key: "value", header: "值" },
      ]}
      data={["选项A", "选项B", "选项C"]}
      onChange={() => {}}
      footer={null}
      summaryKeys={[]}
    />
  ),
};
