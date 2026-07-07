import type { Meta, StoryObj } from "@storybook/react";
import { ExperimentSummary } from "@/components/business/experiment-summary";

const meta = {
  title: "Business/ExperimentSummary",
  component: ExperimentSummary,
  tags: ["autodocs"],
} satisfies Meta<typeof ExperimentSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
