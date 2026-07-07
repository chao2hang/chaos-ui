import type { Meta, StoryObj } from "@storybook/react";
import { DiffViewer } from "@/components/business/diff-viewer";

const meta = {
  title: "Business/DiffViewer",
  component: DiffViewer,
  tags: ["autodocs"],
} satisfies Meta<typeof DiffViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
