import type { Meta, StoryObj } from "@storybook/react";
import { DiffViewerTable } from "@/components/business/diff-viewer-table";

const meta = {
  title: "Business/DiffViewerTable",
  component: DiffViewerTable,
  tags: ["autodocs"],
} satisfies Meta<typeof DiffViewerTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
