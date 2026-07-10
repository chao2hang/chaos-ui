import type { Meta, StoryObj } from "@storybook/react";
import { MobileDashboardLayout } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileDashboardLayout> = {
  title: "Business/MobileDashboardLayout",
  component: MobileDashboardLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MobileDashboardLayout
      children={null}
      title={"示例"}
      description={"这是一个示例描述"}
      actions={null}
      onBack={() => {}}
      onMenu={() => {}}
    />
  ),
};
