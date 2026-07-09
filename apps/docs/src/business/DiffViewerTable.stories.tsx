import type { Meta, StoryObj } from "@storybook/react";
import { DiffViewerTable } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof DiffViewerTable> = {
  title: "Business/DiffViewerTable",
  component: DiffViewerTable,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
