import type { Meta, StoryObj } from "@storybook/react";
import { DiffViewer } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof DiffViewer> = {
  title: "Business/DiffViewer",
  component: DiffViewer,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DiffViewer items={[]} />,
};
