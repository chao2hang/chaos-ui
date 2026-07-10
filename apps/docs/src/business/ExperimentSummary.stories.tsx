import type { Meta, StoryObj } from "@storybook/react";
import { ExperimentSummary } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ExperimentSummary> = {
  title: "Business/ExperimentSummary",
  component: ExperimentSummary,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ExperimentSummary
      name={"示例名称"}
      hypothesis={"示例"}
      variants={[]}
      primaryMetric={"示例"}
    />
  ),
};
